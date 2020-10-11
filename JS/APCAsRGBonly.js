////////////////////////////////////////////////////////////////////////////////
/////        Advanced Perceptual Contrast Algorithm 0.97f
/////   Version as Licensed to W3 under Collaborative Agreement
/////
/////   Function to determine APCA contrast
/////   The function takes sRGB values as integers 0-255.
/////   This file only contains the basic APCA function.
/////   There is no input parsing or validation of the input values.
/////   Ensure that values are properly validated and limited to 0-255.
/////
/////   Copyright © 2019-2020 by Andrew Somers. All Rights Reserved.
/////   CONTACT: For SAPC/APCA Please use the ISSUES tab at:
/////   https://github.com/Myndex/SAPC-APCA/
/////
/////   REQUIREMENTS: ECMAScript 6 - ECMAScript 2015
/////
/////           APCA tool — W3 Version
/////   •••• Version 0.97f by Andrew Somers ••••
/////   https://www.myndex.com/WEB/Perception
/////   
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////
/////   *****  APCA BLOCK  *****
/////
/////   Based on the SAPC-7 Methods and Maths
/////   (S-LUV Advanced Perceptual Contrast)
/////   Copyright © 2019-2020 by Andrew Somers. All Rights Reserved.
/////   APCA is Licensed to the W3C Per Collaborator Agreement
/////   SIMPLE VERSION — This Version Is Stripped Of Extensions:
/////       • No Low Contrast Module
/////       • No Color Vision Module
/////       • No Spatial Frequency Module
/////       • No Light Adaptation Module
/////       • No Dynamics Module
/////       • No Alpha Module
/////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
///// CONSTANTS USED IN VERSION 0.97f //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    const sRGBtrc = 2.218;  
        // Transfer Curve (aka "Gamma") for sRGB linearization.
        // 2.223 or other values could be used instead
        // 2.218 sets unity with the piecewise sRGB at #777
        // Simple power curve vs piecewise described in docs
                
    const Rco = 0.2126;     // sRGB Red Coefficient (standard)
    const Gco = 0.7156;     // sRGB Green Coefficient (standard)
    const Bco = 0.0722;     // sRGB Blue Coefficient (standard)

    const scaleBoW = 1.618;     // Scaling for dark text on light (phi)
    const scaleWoB = 1.618;     // Scaling for light text on dark — same as
                                // BoW, but separated for possible future use.

    const normBGExp = 0.38;     // Constants for Power Curve Exponents.
    const normTXTExp = 0.43;    // One pair for normal text,and one for REVERSE
    const revBGExp = 0.5;       // FUTURE: These will eventually be dynamic
    const revTXTExp = 0.43;     // as a function of light adaptation and context

    const blkThrs = 0.02;   // Level that triggers the soft black clamp
    const blkClmp = 1.33;   // Exponent for the soft black clamp curve

    const clipLevel = 0.12;  // Output clip level. At least 0.1 to remove noise
    
////////////////////////////////////////////////////////////////////////////////    
/////  Basic APCA Function  ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Send the function sRGB values as integers 0-255
// This function does not perform input validation
// Ensure values are legal sRGB encoded integers 0-255

// Returns a string indicating the APCA contrast value (i.e. 80%)

function APCAbasic(BGr=255,BGg=255,BGb=255,txtr=0,txtg=0,txtb=0) {

    var outputContrast = 0.0;
    var polarity = "";
    
    // Absent the color module, we are only concerned with Y at this point
    // Ybg and Ytxt: divide sRGB to 0.0-1.0 range, linearize, and then
    // apply the standard coefficients and sum to Y.
    
    var Ybg =   Math.pow(BGr/255.0, sRGBtrc) * Rco +
                Math.pow(BGg/255.0, sRGBtrc) * Gco +
                Math.pow(BGb/255.0, sRGBtrc) * Bco;
    
    var Ytxt =  Math.pow(txtr/255.0, sRGBtrc) * Rco +
                Math.pow(txtg/255.0, sRGBtrc) * Gco +
                Math.pow(txtb/255.0, sRGBtrc) * Bco;

        /////   INSERT COLOR MODULE HERE    /////
        /////   INSERT ALPHA MODULE HERE    /////

    // Now, determine polarity, soft clamp black, and calculate contrast
    // Finally scale for easy to remember percentages.
    // Note that reverse contrast (white text on black) 
    // intentionally returns a negative number.
    
    if ( Ybg >= Ytxt ) {    // For normal polarity, black text on white

        // soft clamp darkest input color if near black.
        Ytxt = (Ytxt > blkThrs) ? Ytxt : Ytxt + Math.abs(Ytxt - blkThrs) ** blkClmp;
        
        if (Ytxt > Ybg ) {  // Hard clamp to 0, return error for reversals
            return "Error"
        } else {
                // Calculate the APCA contrast value
                // ** is power, use Math.pow() for older versions of JS
            outputContrast = ( Ybg ** normBGExp - Ytxt ** normTXTExp ) * scaleBoW;
        }
    } else {    // For reverse polarity, white text on black

        Ybg = (Ybg > blkThrs) ? Ybg : Ybg + Math.abs(Ybg - blkThrs) ** blkClmp;
        
        if (Ybg > Ytxt ) {
            return "-Error"
        } else {
            outputContrast = ( Ybg ** revBGExp - Ytxt ** revTXTExp ) * scaleWoB;
            polarity = "-";  // For reporting polarity of LOW returns
        }
    }
    //  Hard clip output at clipLevel to eliminate noise and return string
    return (outputContrast > clipLevel || outputContrast < -clipLevel) ? (outputContrast * 100).toFixed(1) + "%" : polarity + "LOW";        
}

////////////////////////////////////////////////////////////////////////////////
/////  END OF APCA BLOCK  //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

