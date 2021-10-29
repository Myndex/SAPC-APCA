///////////////////////////////////////////////////////////////////////////////
/////
/////    SAPC APCA - Advanced Perceptual Contrast Algorithm
/////           Beta 0.98G-4g • contrast function only
/////           DIST: GH SE Revision date: Oct 1, 2021
/////    Function to parse color values and determine Lc contrast
/////    Copyright © 2019-2021 by Andrew Somers. All Rights Reserved.
/////    LICENSE:  AGPU v3
/////    CONTACT: For SAPC/APCA Please use the ISSUES tab at:
/////    https://github.com/Myndex/SAPC-APCA/
/////
///////////////////////////////////////////////////////////////////////////////
/////
/////    USAGE:
/////        Use sRGBtoY(color) to convert sRGB to Luminance (Y)
/////        Then send Y-text and Y-background to APCAcontrast(Text, BG)
/////
/////    Lc = APCAcontrast( sRGBtoY(TEXTcolor) , sRGBtoY(BACKGNDcolor) );
/////
/////    Live Demonstrator at https://www.myndex.com/APCA/
/////
///////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////
/////                      SAPC Method and APCA Algorithm
/////
/////   GITHUB: https://github.com/Myndex/SAPC-APCA
/////   DEVELOPER SITE: https://www.myndex.com/WEB/Perception
/////
/////   Acknowledgments and Thanks To:
/////   • This project references the research and work of Dr.Lovie-Kitchin, 
/////     Dr.Legge, Dr.Arditi, M.Fairchild, R.Hunt, M.Stone, Dr.Poynton, 
/////     L.Arend, M.Luo, E.Burns, R.Blackwell, P.Barton, M.Brettel, and many 
/////     others — see refs at https://www.myndex.com/WEB/WCAG_CE17polarity
/////   • Bruce Bailey of USAccessBoard for his encouragement, ideas, & feedback
/////   • Chris Lilley of W3 for his early and continued comments & feedback.
/////   • Chris Loiselle of Oracle for getting us back on track in a pandemic
/////   • The many volunteer test subjects for participating in the studies.
/////   • Principal research conducted at Myndex by A.Somers.
/////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////
/////   *****  SAPC BLOCK  *****
/////
/////   For Evaluations, refer to this as: SAPC-8, v0.98 G-series constant 4g
/////            SAPC • S-LUV Advanced Predictive Color
/////
/////   SIMPLE VERSION — Only the basic APCA contrast predictor.
/////
/////   Included Extensions & Model Features in this file:
/////       • SAPC-8 Core Contrast (Base APCA) 
/////       • G series constants, group "G-4g" using a 2.4 monitor exponent
/////       • sRGB to Y, parses numeric sRGB color to luminance
/////       • SmoothScale™ scaling technique (non-clinical use only)
/////       • SoftToe black level soft clamp and flare compensation.
/////
/////
////////////////////////////////////////////////////////////////////////////////
/////
/////               DISCLAIMER AND LIMITATIONS OF USE
/////     APCA is an embodiment of certain suprathreshold contrast
/////     prediction technologies and it is licensed to the W3 on a
/////     limited basis for use in certain specific accessibility
/////     guidelines for web content only. APCA may be used for 
/////     predicting colors for web content use without royalty.
/////
/////     However, Any such license excludes other use cases
/////     not related to web content. Prohibited uses include
/////     medical, clinical evaluation, human safety related,
/////     aerospace, transportation, military applications, 
/////     and uses which are not specific to web based content
/////     presented on self-illuminated displays or devices.
/////
////////////////////////////////////////////////////////////////////////////////

//////////   APCA 0.98 G USAGE  ////////////////////////////////////////////////
///
///  The API for "APCA_0_98G_4g_minimal" is trivially simple.
///  Send text and background sRGB numeric values to the sRGBtoY() function,
///  and send the resulting text-Y and background-Y to the APCAcontrast function,
///  it returns a signed float with the numeric Lc contrast result.
///  
///  The two inputs are TEXT color and BACKGROUND color in that order.
///  Each must be a numeric NOT a string, as this simple version has
///  no string parsing utilities. EXAMPLE:
///  ________________________________________________________________________
///
///     txtColor = 0x123456; // color of the text, as will be rendered
///     bgColor  = 0xabcdef; // color for the background, as will be rendered
///
///     contrastLc = APCAcontrast( sRGBtoY(txtColor) , sRGBtoY(bgColor) );
///  ________________________________________________________________________
///
///                  **********   QUICK START   **********
///
///  Each color must be a 24bit color (8 bit per channel) as a single integer
///  (or 0x) sRGB encoded color, i.e. White is either the integer 16777216 or
///  the hex 0xffffff. A float is returned with a positive or negative value.
///  Negative values mean light text and a dark background, positive values
///  mean dark text and a light background. 60.0, or -60.0 is a contrast
///  "sort of like" the old WCAG 2's 4.5:1. NOTE: the total range is now less
///  than ± 110, so output can be rounded to a signed INT but DO NOT output
///  an absolute value - light text on dark BG should return a negative number.
///
///     *****  IMPORTANT: Do Not Mix Up Text and Background inputs.  *****
///     ****************   APCA is polarity dependent!   *****************
///  
//////////   APCA 0.98 G - 4g Constants   //////////////////////////////////////

const mainTRC = 2.4; // 2.4 exponent emulates actual monitor perception
    
const sRco = 0.2126729, 
      sGco = 0.7151522, 
      sBco = 0.0721750; // sRGB coefficients

const normBG = 0.56, 
      normTXT = 0.57,
      revTXT = 0.62,
      revBG = 0.65;  // G-4g constants for use with 2.4 exponent

const blkThrs = 0.022,
      blkClmp = 1.414, 
      scaleBoW = 1.14,
      scaleWoB = 1.14,
      loBoWthresh = loWoBthresh = 0.035991,
      loBoWfactor = loWoBfactor = 27.7847239587675,
      loBoWoffset = loWoBoffset = 0.027,
      loClip = 0.001,
      deltaYmin = 0.0005;

//////////  ƒ sRGBtoY()  ///////////////////////////////////////////////////////

function sRGBtoY (sRGBcolor) {
                  // send 8 bit-per-channel integer sRGB (0xFFFFFF)

  let r = (sRGBcolor & 0xFF0000) >> 16,
      g = (sRGBcolor & 0x00FF00) >> 8,
      b = (sRGBcolor & 0x0000FF);
    
  function simpleExp (chan) { return Math.pow(chan/255.0, mainTRC); }
 
		 // linearize r, g, or b then apply coefficients
		// and sum then return the resulting luminance
    
   return sRco * simpleExp(r) + sGco * simpleExp(g) + sBco * simpleExp(b);
}


//////////  ƒ APCAcontrast()  //////////////////////////////////////////////////

function APCAcontrast (txtY,bgY) {
                         // send linear Y (luminance) for text and background.
                        // IMPORTANT: Do not swap, polarity is important.
        
  var SAPC = 0.0;            // For raw SAPC values
  var outputContrast = 0.0; // For weighted final values
  
  // TUTORIAL
  
  // Use Y for text and BG, and soft clamp black,
  // return 0 for very close luminances, determine
  // polarity, and calculate SAPC raw contrast
  // Then scale for easy to remember levels.

  // Note that reverse contrast (white text on black)
  // intentionally returns a negative number
  // Proper polarity is important!

//////////   BLACK SOFT CLAMP   /////////////////////////////////////////

          // Soft clamps Y for either color if it is near black.
  txtY = (txtY > blkThrs) ? txtY :
                            txtY + Math.pow(blkThrs - txtY, blkClmp);
  bgY = (bgY > blkThrs) ? bgY :
                          bgY + Math.pow(blkThrs - bgY, blkClmp);

       ///// Return 0 Early for extremely low ∆Y
  if ( Math.abs(bgY - txtY) < deltaYmin ) { return 0.0; }


//////////   APCA/SAPC CONTRAST   ///////////////////////////////////////

  if ( bgY > txtY ) {  // For normal polarity, black text on white (BoW)

           // Calculate the SAPC contrast value and scale
      
    SAPC = ( Math.pow(bgY, normBG) - Math.pow(txtY, normTXT) ) * scaleBoW;

            // Low Contrast smooth rollout to prevent polarity reversal
           // and also a low-clip for very low contrasts
    outputContrast = (SAPC < loClip) ? 0.0 :
                     (SAPC < loBoWthresh) ?
                      SAPC - SAPC * loBoWfactor * loBoWoffset :
                      SAPC - loBoWoffset;

  } else {  // For reverse polarity, light text on dark (WoB)
           // WoB should always return negative value.

    SAPC = ( Math.pow(bgY, revBG) - Math.pow(txtY, revTXT) ) * scaleWoB;

    outputContrast = (SAPC > -loClip) ? 0.0 :
                     (SAPC > -loWoBthresh) ?
                      SAPC - SAPC * loWoBfactor * loWoBoffset :
                      SAPC + loWoBoffset;
  }

         // return Lc (lightness contrast) as a signed numeric value 
        // It is permissible to round to the nearest whole number.
       
  return  outputContrast * 100.0;
  
} // End APCAcontrast()

////\                             //////////////////////////////////////////////
/////\  END 0.98G4g APCA BLOCK   //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
