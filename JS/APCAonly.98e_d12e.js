    ////////////////////////////////////////////////////////////////////////////////
    /** @preserve
    /////
    /////   SAPC - S-Luv Advanced Perceptual Contrast - Beta Algorithm 0.98e_d12e
    /////                *** With the NEW SmoothScale extension ***
    /////              *** Optimized for the Font Select Extension ***
    /////
    /////   Functions to parse color values and determine SAPC/APCA contrast
    /////   Copyright © 2019-2021 by Andrew Somers. All Rights Reserved.
    /////   LICENSE: GNU AGPL v3  https://www.gnu.org/licenses/
    /////   CONTACT: For SAPC/APCA Please use the ISSUES tab at:
    /////   https://github.com/Myndex/SAPC-APCA/
    // */
    ////////////////////////////////////////////////////////////////////////////////
    /////
    /////                        SAPC Method and APCA Algorithm
    /////          •••• Version 0.98e_d12e with SmoothScale™ by Andrew Somers ••••
    /////
    /////   GITHUB: https://github.com/Myndex/SAPC-APCA
    /////   DEVELOPER SITE: https://www.myndex.com/WEB/Perception
    /////
    /////   Thanks To: 
    /////   • This project references the research and work of Dr.Legge, Dr.Arditi,
    /////     Dr.Lovie-Kitchin, M.Fairchild, R.Hunt, M.Stone, Dr.Poynton, L.Arend, &
    /////     many others — see refs at https://www.myndex.com/WEB/WCAG_CE17polarity
    /////   • Stoyan Stefanov for his input parsing idea, Twitter @stoyanstefanov
    /////   • Bruce Bailey of USAccessBoard for his encouragement, ideas, & feedback
    /////   • Chris Loiselle of Oracle for getting us back on track in a pandemic
    /////
    ////////////////////////////////////////////////////////////////////////////////

 
    ////////////////////////////////////////////////////////////////////////////////
    /////
    /////   *****  SAPC BLOCK  *****
    /////
    /////   For Evaluations, this is referred to as: SAPC-8, D-series constants
    /////                S-LUV Advanced Perceptual Contrast
    /////   Copyright © 2019-2021 by Andrew Somers. All Rights Reserved.
    /////
    /////
    /////   INCLUDED Extensions or Model Features:
    /////       • SAPC-8 Core Contrast
    /////       • SmoothScale™ scaling technique
    /////       • SoftToe black level soft clamp
    /////
    /////   NOT INCLUDED — This Version Does NOT Have These Extensions:
    /////       • Color Vision Module
    /////       • Spatial Frequency Module
    /////       • Light Adaptation Module
    /////       • Dynamics Module
    /////       • Alpha Module
    /////       • Personalization Module
    /////       • Multiway Module
    /////       • DynaFont™ font display
    /////       • ResearchMode middle contrast explorer
    /////       • ResearchMode static target
    /////       • CIE function suite
    /////       • SAPColor listings and sorting suite
    /////       • RGBcolor() colorString parsing
    /////
    /////
    ////////////////////////////////////////////////////////////////////////////////




    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////
    /////  BEGIN SAPC/APCA CONTRAST BLOCK  \//////////////////////////////////////
    ////                                    \////////////////////////////////////

            /////  MAGICAL NUMBERS  ///////////////////////////////

            /////  sRGB Conversion to Relative Luminance (Y)  /////

      const mainTRC = 2.4; // Transfer Curve (aka "Gamma") for sRGB linearization
                          // Simple power curve vs piecewise described in docs
                         // Essentially, 2.4 best models actual display
                        // characteristics in combination with the total method

      const mainTRCencode = 0.41666666666666666667; // = 1.0/mainTRC;

      const Rco = 0.2126729,        // sRGB Red Coefficient (from matrix)
            Gco = 0.7151522,        // sRGB Green Coefficient (from matrix)
            Bco = 0.0721750;        // sRGB Blue Coefficient (from matrix)


            /////  For Finding Raw SAPC Contrast from Relative Luminance (Y)  /////

      const normBG = 0.55,          // Constants for SAPC Power Curve Exponents
            normTXT = 0.58,         // One pair for normal text, and one for reverse
            revTXT = 0.57,          // These are the "beating heart" of SAPC
            revBG = 0.62;


            /////  For Clamping and Scaling Values  /////

      const blkThrs = 0.03,         // Level that triggers the soft black clamp
            blkClmp = 1.45,         // Exponent for the soft black clamp curve
            YdeltaMin = 0.0005,     // Lint trap
            scaleBoW = 1.25,        // Scaling for dark text on light
            scaleWoB = 1.25,        // Scaling for light text on dark
            loConThresh = 0.078,    // Threshold for new simple offset scale
            loConFactor = 12.82051282051282,    // = 1/0.078,
            loConOffset = 0.06,     // The simple offset
            loClip = 0.001;         // Output clip (lint trap #2)




    ////////////////////////////////////////////////////////////////////////////
    ///// SAPC Function with SmoothScale  \////////////////////////////////////
    ////                                   \//////////////////////////////////
    ///

    ///// *** Polarity is Important: do not mix up background and text *** /////

                    /////  Number must be 8bit RGB order  /////

                /////  DO NOT use a Y from any other method  /////


    function APCAcontrast (background, text) {
    
        let Rbg = (background & 0xFF0000) >> 16,
            Gbg = (background & 0x00FF00) >> 8,
            Bbg = (background & 0x0000FF);

        let Rtxt = (text & 0xFF0000) >> 16,
            Gtxt = (text & 0x00FF00) >> 8,
            Btxt = (text & 0x0000FF);

            // We are only concerned with Y at this point
            // Ybg and Ytxt: divide sRGB to 0.0-1.0 range, linearize, 
            // and then apply the standard coefficients and sum to Y.
            // Note that the Y we create here is unique and designed
            // exclusively for SAPC. Do not use Y from other methods.
        
        let Ybg =   Math.pow(Rbg/255.0, mainTRC) * Rco +
                    Math.pow(Gbg/255.0, mainTRC) * Gco +
                    Math.pow(Bbg/255.0, mainTRC) * Bco;

        let Ytxt =  Math.pow(Rtxt/255.0, mainTRC) * Rco +
                    Math.pow(Gtxt/255.0, mainTRC) * Gco +
                    Math.pow(Btxt/255.0, mainTRC) * Bco;
    
        let SAPC = 0.0;             // For holding raw SAPC values
        let outputContrast = 0.0;   // For weighted final values
    

        ///// TUTORIAL  /////
    
        // Take Y and soft clamp black, return 0 for very close luminances
        // determine polarity, and calculate SAPC raw contrast
        // Then apply the output scaling 

        // Note that reverse contrast (white text on black)
        // intentionally returns a negative number
        // Proper polarity is important! 


    //////////   BLACK SOFT CLAMP & INPUT CLIP  ////////////////////////////////

            // Soft clamp Y when near black.
            // Now clamping all colors to prevent crossover errors       
        Ytxt = (Ytxt > blkThrs) ? Ytxt :
                                  Ytxt + Math.pow(blkThrs - Ytxt, blkClmp);

        Ybg = (Ybg > blkThrs) ? Ybg :
                                Ybg + Math.pow(blkThrs - Ybg, blkClmp);


            /////   Return 0 Early for extremely low ∆Y (lint trap #1) /////
        if(Math.abs(Ybg - Ytxt) < YdeltaMin){ return 0.0 }



    //////////   SAPC CONTRAST   ///////////////////////////////////////////////

        if ( Ybg > Ytxt ) {     // For normal polarity, black text on white

                ///// Calculate the SAPC contrast value and scale
            
            SAPC = ( Math.pow(Ybg, normBG) - Math.pow(Ytxt, normTXT) ) * scaleBoW;

                ///// NEW! SAPC SmoothScale™
               // Low Contrast Smooth Scale Rollout to prevent polarity reversal
              // and also a low clip for very low contrasts (lint trap #2)
             // much of this is for very low contrasts, less than 10
            // therefore for most reversing needs, only loConOffset is important
            outputContrast = ( SAPC < loClip ) ? 0.0 :
                             ( SAPC < loConThresh ) ?
                               SAPC - SAPC * loConFactor * loConOffset :
                               SAPC - loConOffset;
                 

        } else {     // For reverse polarity, light text on dark
                    // WoB should always return negative value.

            SAPC = ( Math.pow(Ybg, revBG) - Math.pow(Ytxt, revTXT) ) * scaleWoB;

            outputContrast = ( SAPC > -loClip ) ? 0.0 :
                             ( SAPC > -loConThresh ) ?
                               SAPC - SAPC * loConFactor * loConOffset :
                               SAPC + loConOffset;
        }

        return  outputContrast * 100;

    } // Close APCAcontrast()

    ////\                            ///////////////////////////////////////////\
    /////\  END OF SAPC/APCA BLOCK  /////////////////////////////////////////////\
    //////////////////////////////////////////////////////////////////////////////\
    ///////////////////////////////////////////////////////////////////////////////\

