////////////////////////////////////////////////////////////////////////////////
/** @preserve
/////   SAPC - S-Luv Advanced Perceptual Contrast - Beta Algorithm 0.98g
/////           *** With the NEW full-scale extension ***
/////        *** Optimized for the Font Select Extension ***
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
/////          •••• Version 0.98g with SmoothScale™ by Andrew Somers ••••
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


//~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/
//~/~  CONTAINS RESEARCH ONLY ITEMS  ••  REMOVE BEFORE FLIGHT  /~/~/~/~/~/~/~/~/
//~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/


// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name SAPCsRGB.98.min.js
// @code_url https://www.myndex.com/SAPC/JS/SAPCsRGB.98.js
// ==/ClosureCompiler==
// https://closure-compiler.appspot.com/home#code%3D%252F%252F%2520%253D%253DClosureCompiler%253D%253D%250A%252F%252F%2520%2540compilation_level%2520SIMPLE_OPTIMIZATIONS%250A%252F%252F%2520%2540output_file_name%2520SAPCsRGB.98.min.js%250A%252F%252F%2520%2540code_url%2520https%253A%252F%252Fwww.myndex.com%252FSAPC%252FJS%252FSAPCsRGB.98.js%250A%252F%252F%2520%253D%253D%252FClosureCompiler%253D%253D%250A

////////////////////////////////////////////////////////////////////////////////
/////
/////   *****  SAPC BLOCK  *****
/////
/////   For Evaluations, this is referred to as: SAPC-8, d-series constants
/////                S-LUV Advanced Perceptual Contrast
/////   Copyright © 2019-2021 by Andrew Somers. All Rights Reserved.
/////   SIMPLE VERSION — This Version Does Not Have These Extensions:
/////       • No Color Vision Module
/////       • No Spatial Frequency Module
/////       • No Light Adaptation Module
/////       • No Dynamics Module
/////       • No Alpha Module
/////       • No Personalization Module
/////       • No Multiway Module
/////
/////   Included Extensions or Model Features:
/////       • SAPC-8 Core Contrast
/////       • RGBcolor() colorString parsing
/////       • SmoothScale™ scaling technique
/////       • SoftToe black level soft clamp
/////       • DynaFont™ font display
/////       • ResearchMode middle contrast explorer
/////       • ResearchMode static target
/////       • CIE function suite
/////       • SAPColor listings and sorting suite
/////
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
/////////////  THE G SERIES EXPONENTS  \////////////////////////////////////////
////////////  NEW 0.98g exponents

var SAPCparams = { sDark: 0,sMid: 0,sLight: 0,sAltMid: 0,sAdapt: 0,
				   Ydark: 0,Ymid: 0,Ylight: 0,YaltMid: 0,Yadapt: 0,
				
				mainTRC: 2.4,
				//mainTRC: 2.34, // C series
				//mainTRC: 2.218, // A series
				
				mainTRCencode: 1.0 / 2.4,
		
				Rco: 0.2126729, //0.2126,
				Gco: 0.7151522, //0.7152,
				Bco: 0.0721750, //0.0722,

				normBG: 0.56, // g4g with 2.4
				normTXT: 0.57,
				revTXT: 0.62,
				revBG: 0.65,



				blkThrs: 0.022,
				blkClmp: 1.414, // old 1.45 .. old inv  1.54967,
				blkClmpOut: 0.004530913, // is Math.pow(0.022,1.414) rnded+
				blkClmpInvert: 1.514845946588640, // for inversion of 1.414 
				blkClmpInvFactor:	2.067216148486810, // for inversion only
				
				scaleBoW: 1.14, //1.414
				scaleWoB: 1.14, //1.414

				loBoWthresh: 0.035991,
				loBoWfactor: 27.7847239587675, // 1/0.035991,
				loBoWoffset: 0.027,

				loWoBthresh: 0.035991,
				loWoBfactor: 27.7847239587675, 
				loWoBoffset: 0.027,

				loClip: 0.001,
				deltaYmin: 0.0005,
				places: 0, 
				
				}; 

//*  // SWITCH

///// Primary Constants /////

	// Exponents and coefficients
			let mainTRC = SAPCparams.mainTRC;
			let mainTRCencode = SAPCparams.mainTRCencode;

			let Rco = SAPCparams.Rco;
			let Gco = SAPCparams.Gco;
			let Bco = SAPCparams.Bco;
			
			let normBG = SAPCparams.normBG;
			let normTXT = SAPCparams.normTXT;
			let revBG = SAPCparams.revBG;
			let revTXT = SAPCparams.revTXT;
			
	// Clamps				
			let blkThrs = SAPCparams.blkThrs;
			let blkClmp = SAPCparams.blkClmp;
			let blkClmpOut = SAPCparams.blkClmpOut;
			let blkClmpInvert = SAPCparams.blkClmpInvert;
			let blkClmpInvFactor = SAPCparams.blkClmpInvFactor;

	// Scalers
			let scaleBoW = SAPCparams.scaleBoW;
			let scaleWoB = SAPCparams.scaleWoB;

			let	loBoWthresh = SAPCparams.loBoWthresh;
			let	loBoWfactor = SAPCparams.loBoWfactor;			
			let	loBoWoffset = SAPCparams.loBoWoffset;
			
			let	loWoBthresh = SAPCparams.loWoBthresh;
			let	loWoBfactor = SAPCparams.loWoBfactor;			
			let	loWoBoffset = SAPCparams.loWoBoffset;			

	//  Lint Traps & misc
			let loClip = SAPCparams.loClip;
			let deltaYmin = SAPCparams.deltaYmin;
			
			let places = SAPCparams.places;
			
			
//  */ // END SWITCH /////

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////  BEGIN SAPC/APCA CONTRAST BLOCK  \////////////////////////////////////////
////                                    \///////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
///// SAPC Function with SmoothScale™ \////////////////////////////////////
////                                   \//////////////////////////////////
///
//    This requires linear luminance Y as a 0-1.0 value.


/////    APCA interface — colorString, RGBcolor() object, or number.     /////

/////	*** Polarity is Important: do not mix up background and text *** /////

/////    Number must be 8bit RGB order, string can be any that is        /////
/////    supported in the RGBcolor() object's parser. Supported strings:
/////		* rgb(123,123,123) rgba(123,123,123,123) (note: alpha is ignored)
/////		* aquamarine, orange, and 140 other HTML names
/////		* #ab #abc #abcdef  RGBA: #abcd #aabbccdd (alpha ignored)
/////		* #ab becomes #ababab, and the hash # is not required

// Note order is corrected per new way, text first then others

function APCAcontrast (text, background, places = 2) {

	let bkgndObj = {}, txtObj = {};
	
		// Parse background color
	if (typeof background === 'string') {
		bkgndObj = new RGBcolor(background);
	} else if (typeof background === 'object') {
		if (background.ok) {
			bkgndObj = background;
		} else { return (places) ? 'BGerror01' : 0; }
	} else if (typeof background === 'number') {
		let R = (background & 0xFF0000) >> 16,
			G = (background & 0x00FF00) >> 8,
			B = (background & 0x0000FF);
		bkgndObj = new RGBcolor('rgb('+R+','+G+','+B+')');
	} else { return (places) ? 'BGerror02' : 0; }

		// Parse text color
	if (typeof text === 'string') {
		txtObj = new RGBcolor(text);
	} else if (typeof text === 'object') {
		if (text.ok) {
			txtObj = text;
		} else { return (places) ? 'TXTerror01' : 0; }
	} else if (typeof text === 'number') {
		let R = (text & 0xFF0000) >> 16,
			G = (text & 0x00FF00) >> 8,
			B = (text & 0x0000FF);
		txtObj = new RGBcolor('rgb('+R+','+G+','+B+')');
	} else { return (places) ? 'TXTerror02' : 0; }

		// Sanity check that the colors are valid and send to SAPCcontrast()
	if (bkgndObj.ok && txtObj.ok) {
		return SAPCcontrast(txtObj.LYP,bkgndObj.LYP,places);
	} else {
		return (places) ? 'RGBerror' : 0;
	}
}


/////               Direct SAPC interface — send Ys only                 /////
/////	*** Polarity is Important: do not reverse background & text *** /////

//    In the following implementation, color sent as an RGBcolor() object

function SAPCcontrast(Ytxt,Ybg,places = -1) {
				
    var SAPC = 0.0; 			// For holding raw SAPC values
    var outputContrast = 0.0; 	// For weighted final values
    var polarity = "1";  		// for indicating "LOW" polarity


	///// TUTORIAL  /////
	
	// Take Y and soft clamp black, return 0 for very close luminances,
	// determine polarity, and calculate SAPC raw contrast
	// Then use phi for a power curve scale, 
	// and as a scale factor for easy to remember levels.

	// Note that reverse contrast (white text on black)
	// intentionally returns a negative number
	// Proper polarity is important! 


//////////   BLACK SOFT CLAMP MODULE    ////////////////////////////////////

		// Soft clamp Y when near black.
		// Now clamping all colors to prevent crossover errors       
	Ytxt = (Ytxt > blkThrs) ? Ytxt :
							  Ytxt + Math.pow(blkThrs - Ytxt, blkClmp);
	Ybg = (Ybg > blkThrs) ? Ybg :
							Ybg + Math.pow(blkThrs - Ybg, blkClmp);

		/////   Return 0 Early for extremely low ∆Y  /////
	if(Math.abs(Ybg - Ytxt) < deltaYmin){ return (places == -1) ? 0.0 : "Y∆LOW";}

//////////   SAPC CONTRAST MODULE       ////////////////////////////////////

    if ( Ybg > Ytxt ) { 	// For normal polarity, black text on white

			///// Calculate the SAPC contrast value and scale
			///// NEW! SAPC SmoothScale™ II 
			
		SAPC = ( Math.pow(Ybg, normBG) - Math.pow(Ytxt, normTXT) ) * scaleBoW;

			// Low Contrast smooth rollout to prevent polarity reversal
			// and also a low clip for very low contrasts
		outputContrast = ( SAPC < loClip ) ? 0.0 :
						 ( SAPC < loBoWthresh ) ?
				 		   SAPC - SAPC * loBoWfactor * loBoWoffset :
				 		   SAPC - loBoWoffset;

    } else { 	// For reverse polarity, light text on dark
				// WoB should always return negative value.

		SAPC = ( Math.pow(Ybg, revBG) - Math.pow(Ytxt, revTXT) ) * scaleWoB;

		outputContrast = ( SAPC > -loClip ) ? 0.0 :
						 ( SAPC > -loWoBthresh ) ?
				 		   SAPC - SAPC * loWoBfactor * loWoBoffset :
				 		   SAPC + loWoBoffset;

		polarity = "-";  // For reporting polarity of 'LOW' string returns
	
    }

			 // return a numeric value (float) if places == 0,
			// otherwise return a string of number, rounded to places
    return  (places == -1) ? outputContrast * 100.0 : (outputContrast != 0.0) ?
    		(outputContrast * 100.0).toFixed(places) : polarity + "LOW";

} // Close SAPCcontrast()





function YunClmp (YtoUnClamp = 1.0) {
		YtoUnClamp = (YtoUnClamp > blkThrs) ? YtoUnClamp :
					 (YtoUnClamp < blkClmpOut) ? 0.0 :
					  YtoUnClamp - 
					  blkClmpInvFactor * Math.pow(blkThrs - YtoUnClamp, blkClmpInvert);
		return YtoUnClamp;
}  





					// colorA is object, type is kind of color to *return*
					// *** not accurate for contrasts less than 8 ***
function SAPCinverse (colorA, returnType = 'TXT',targetContrast = 40, returnAs = 'color') {
	
	let YA = colorA.Yclmp(), Ynew = 0.0;
	let BGexponent,TXTexponent,scaleSAPC,SAPCoffset;
	
	if (targetContrast > 0) {
		BGexponent = normBG;
		TXTexponent = normTXT;
		scaleSAPC = scaleBoW;
		SAPCoffset = loBoWoffset;
	} else {
		BGexponent = revBG;
		TXTexponent = revTXT;
		scaleSAPC = scaleWoB;
		SAPCoffset = -loWoBoffset;
	}

	// targetContrast /= 100;
	let SAPC = (targetContrast * 0.01 + SAPCoffset) / scaleSAPC;


	switch (returnType) {
		
		case 0:
		case 'TXT':
			Ynew = YunClmp( 
				   Math.pow(
				   Math.max(0.0, -1 * ( SAPC - Math.pow(YA, BGexponent) )), 
				   			1 / TXTexponent) );


		break;
		
		case 1:
		case 'BG':
			Ynew = YunClmp( 
				   Math.pow(
				   Math.max(0.0, SAPC + Math.pow(YA, TXTexponent)), 
				   			1 / BGexponent) );
		break;
	}
	
	if (returnAs === 'color') {
		let colorB = ( Math.min( 255,
					   Math.round(Math.pow(Ynew,mainTRCencode) * 255)
					 		) ).toString(16).padStart(2,'0');
					 			
		return  colorB + colorB + colorB;
	} else if (returnAs === 'Y') {
		return  Ynew;
	} else if (returnAs === 'Lstar') {
		return  Math.pow(Ynew,0.385);
	} else { return 'error'}
}

////\                                ///////////////////////////////////////////
/////\  END OF SAPC/APCA BLOCK END  ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////                                                   \///////////////////////
///|    RGB COLOR STRING PROCESSING AND CIE FUNCTIONS    |//////////////////////
////\                                                   ////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////  BEGIN RGB INPUT FORM AND PROCESSING BLOCK  \/////////////////////////////
////                                               \////////////////////////////

function RGBcolor (colorString = 'bad',rin='',gin='',bin='',ain='',
								expin='',TRCencode='') {

    // strip spaces, #, & common junk and make a clean string
    colorString = colorString.replaceAll(/[\s\\ ?|`~!@#$%^&*<>{}:;"'+=-]/g,'');
	this.cleaned = colorString = colorString.toLowerCase();   // set lowercase

//console.log(colorString);

		// init validator
	this.ok = false;
		
		// Determine input type: params OR parse a string
	switch (colorString) {
		case 'sRGB':
		case 'piecewise': // same as sRGB, here for backwards compatibility
		case 'Rec709':
		case 'simpleExp':
		case 'altExp':
		case 'ProPhoto':
		case 'AdobeRGB':
		case 'DCIP3':
		case 'Log':
		case 'LogC':
		case 'linear':
		case 'float':
			this.r = isNaN(rin) ? '' : rin;
			this.g = isNaN(gin) ? '' : gin;
			this.b = isNaN(bin) ? '' : bin;
			this.a = isNaN(ain) ? '' : ain;
			this.exp = isNaN(expin) ? '' : expin;
			this.TRCencode = colorString;	
			
			if (!isNaN(this.r) && !isNaN(this.g) && !isNaN(this.b)) {
				this.ok = true;
			}
		break;
		
		default:
			var parsedArray = parseColorString();
			this.r = parsedArray[0];
			this.g = parsedArray[1];
			this.b = parsedArray[2];
			this.a = parsedArray[3];
			this.ok = parsedArray[4];
			this.exp = mainTRC;
			this.TRCencode = 'sRGBstring';	
		break;
	};
	
		// Main string parse to rgb INTs function	
			
function parseColorString () {
	
////////////////////////////////////////////////////////////////////////////////
///// HTML COLOR NAMES • Switch On to Allow Using HTML Color Names /////////////

//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

        // See if name is matched and overwrite the input
    var HTMLcolors = {
        aliceblue:'f0f8ff', antiquewhite:'faebd7', aqua:'00ffff', aquamarine:'7fffd4', azure:'f0ffff', beige:'f5f5dc', bisque:'ffe4c4', black:'000000', blanchedalmond:'ffebcd', blue:'0000ff', blueviolet:'8a2be2', brown:'a52a2a', burlywood:'deb887', cadetblue:'5f9ea0', chartreuse:'7fff00', chocolate:'d2691e', coral:'ff7f50', cornflowerblue:'6495ed', cornsilk:'fff8dc', crimson:'dc143c', cyan:'00ffff', darkblue:'00008b', darkcyan:'008b8b', darkgoldenrod:'b8860b', darkgray:'a9a9a9', darkorange:'ff8c00', darksalmon:'e9967a', darkseagreen:'8fbc8f', deepskyblue:'00bfff', dodgerblue:'1e90ff', feldspar:'d19275', darkgreen:'006400', darkkhaki:'bdb76b', darkmagenta:'8b008b', darkolivegreen:'556b2f', darkorchid:'9932cc', darkred:'8b0000', darkslateblue:'483d8b', darkslategray:'2f4f4f', darkturquoise:'00ced1', darkviolet:'9400d3', deeppink:'ff1493', dimgray:'696969', firebrick:'b22222', floralwhite:'fffaf0', forestgreen:'228b22', fuchsia:'ff00ff', gainsboro:'dcdcdc', ghostwhite:'f8f8ff', gold:'ffd700', goldenrod:'daa520', gray:'808080', green:'008000', greenyellow:'adff2f', honeydew:'f0fff0', hotpink:'ff69b4', indianred:'cd5c5c', indigo:'4b0082', ivory:'fffff0', khaki:'f0e68c', lavender:'e6e6fa', lavenderblush:'fff0f5', lawngreen:'7cfc00', lemonchiffon:'fffacd', lightblue:'add8e6', lightcoral:'f08080', lightcyan:'e0ffff', lightgoldenrodyellow:'fafad2', lightgrey:'d3d3d3', lightgreen:'90ee90', lightpink:'ffb6c1', lightsalmon:'ffa07a', lightseagreen:'20b2aa', lightskyblue:'87cefa', lightslateblue:'8470ff', lightslategray:'778899', lightsteelblue:'b0c4de', lightyellow:'ffffe0', lime:'00ff00', limegreen:'32cd32', linen:'faf0e6', magenta:'ff00ff', maroon:'800000', mediumaquamarine:'66cdaa', mediumblue:'0000cd', mediumorchid:'ba55d3', mediumpurple:'9370d8', mediumseagreen:'3cb371', mediumslateblue:'7b68ee', mediumspringgreen:'00fa9a', mediumturquoise:'48d1cc', mediumvioletred:'c71585', midnightblue:'191970', mintcream:'f5fffa', mistyrose:'ffe4e1', moccasin:'ffe4b5', navajowhite:'ffdead', navy:'000080', oldlace:'fdf5e6', olive:'808000', olivedrab:'6b8e23', orange:'ffa500', orangered:'ff4500', orchid:'da70d6', palegoldenrod:'eee8aa', palegreen:'98fb98', paleturquoise:'afeeee', palevioletred:'d87093', papayawhip:'ffefd5', peachpuff:'ffdab9', peru:'cd853f', pink:'ffc0cb', plum:'dda0dd', powderblue:'b0e0e6', purple:'800080', red:'ff0000', rosybrown:'bc8f8f', royalblue:'4169e1', saddlebrown:'8b4513', salmon:'fa8072', sandybrown:'f4a460', seagreen:'2e8b57', seashell:'fff5ee', sienna:'a0522d', silver:'c0c0c0', skyblue:'87ceeb', slateblue:'6a5acd', slategray:'708090', snow:'fffafa', springgreen:'00ff7f', steelblue:'4682b4', tan:'d2b48c', teal:'008080', thistle:'d8bfd8', tomato:'ff6347', turquoise:'40e0d0', violet:'ee82ee', violetred:'d02090', wheat:'f5deb3', white:'ffffff', whitesmoke:'f5f5f5', yellow:'ffff00', yellowgreen:'9acd32', controlgrey_1:'111111', controlgrey_2:'222222', controlgrey_3:'333333', controlgrey_4:'444444', controlgrey_5:'555555', controlgrey_6:'666666', controlgrey_7:'777777', controlgrey_8:'888888', controlgrey_9:'999999', controlgrey_a:'aaaaaa', controlgrey_b:'bbbbbb', controlgrey_c:'cccccc', controlgrey_d:'dddddd', controlgrey_e:'eeeeee'
    };

	for (var key in HTMLcolors) {
		if (colorString == key) {
			colorString = HTMLcolors[key];
		}
	}

    // end of HTML type-in colors section
    
//  */  ////\ End of Switched Section /////
//////////////////////////////////////////

    // ARRAY OF COLOR DEFINITION OBJECTS
    // objects with alpha are separated, and immediately
    // follow the non-alpha version. Float rgb is not added yet.
	var colorDefs = [
    
        {
            regex: /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        
        {
            regex: /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
            example: ['rgba(123,234,45,128)', 'rgba(255,234,245,233)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3]),
                    parseInt(bits[4])
                ];
            }
        },

        {
            regex: /^(\d{1,3}),(\d{1,3}),(\d{1,3})$/,
            example: ['123,234,45', '255,234,245'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },

        {
            regex: /^(\d{1,3}),$/,
            example: ['123,', '255,'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[1]),
                    parseInt(bits[1])
                ];
            }
        },

        {
            regex: /^([0-9|a-f]{2})$/,
            example: ['fe', '73'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[1], 16),
                    parseInt(bits[1], 16)
                ];
            }
        },

        {
            regex: /^([0-9|a-f]{1})([0-9|a-f]{1})([0-9|a-f]{1})$/,
            example: ['fb0', 'b0b'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        },

        {
            regex: /^([0-9|a-f]{1})([0-9|a-f]{1})([0-9|a-f]{1})([0-9|a-f]{1})$/,
            example: ['fb0F', 'b0b8'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16),
                    parseInt(bits[4] + bits[4], 16)
                ];
            }
        },

        {
            regex: /^([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})$/,
            example: ['05f3a0', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },

        {
            regex: /^([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})$/,
            example: ['05f3a0ff', '336699aa'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16),
                    parseInt(bits[4], 16)
                ];
            }
        }
    ];


    // REGEX SEARCH CASCADE TO DETERMINE INPUT TYPE
    // NEW: Alpha Inputs and the new "2 Char Hex"
    // Which auto-makes grey based on the first
    // two characters typed. (f4 becomes f4f4f4)
    // this.r etc are type INT
	
	var colorDefLen = colorDefs.length;
	var regexInput, bitsInput;
	
	this.ok = false;

		// Loop stops once valid color is found
    for (var i = 0; i < colorDefLen && this.ok == false; i++) {
        regexInput = colorDefs[i].regex;
        bitsInput = regexInput.exec(colorString);
        if (bitsInput) {
            var channel = colorDefs[i].process(bitsInput);
            //  Shishado™ cleansing masks for that refreshing, clean feeling.
            this.r = channel[0] & 0xFF;
            this.g = channel[1] & 0xFF;
            this.b = channel[2] & 0xFF;
            (isNaN(channel[3])) ? this.a = '' : this.a = channel[3] & 0xFF;
            this.ok = true;
        }
    }
    
//console.log('In Function '+ this.ok +' is it ' + this.r);
 
	return [this.r,this.g,this.b,this.a,this.ok,this.cleaned];
} // close parser

	//this.cleaned = colorString;
	
//console.log('out Function '+ this.ok +' r '+this.r+' g '+this.g+' b '+this.b)

//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

		// STOPS all parsing of this script if no valid color is found
		// and sets basic properties (this.r) to 0 then returns.
		// If this section is ON, then a call to new RGBcolor('')
		// must have a valid color to access the methods
		// RGBcolor() does have a default '777' to access methods 
		// without a color, send no params: RGBcolor() or turn this
		// section off.
		
	if (!this.ok) { this.r = this.g = this.b = this.a = 0; return};

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////  Terminology Note For this script:
/////
/////  Because color values are often strings, but can be number values,
/////  some clarification is in order. Let's just say that number values
/////  are either integer or float (we know that all numbers are
/////  stored as float in JS). So there is no difference between hex and int as
/////  a number type... int 255 is no different than 0xFF or 0b11111111
/////  255.0 though is type float in the computer, but in math called "decimal"
/////
/////  In dealing with color, we often need to clamp values. For instance
/////  Alpha is always clamped 0.0 to 1.0 or 0 to 255 even if the color
/////  is floating point, the alpha (opacity) is still 0.0 to 1.0 
/////
/////  To help keep it all straight, we use terms the following ways:
/////
/////  INT or integer is 0-255 8bit, 0-1024 10bit 0-4096 12bit etc
/////  and means each channel is an independent variable
/////  regardless of if stored as a number or string.
/////  8 bit per color is always assumed unless defined otherwise.
/////  parseInt(str) is used to convert INT strings to number types
/////
/////  HEX is identical to INT when stored as a number type.
/////  but here it ALSO means RGB & RGBA number types of all channels together
/////  hex as string is 00 to FF and parses to 8 bit int.
/////  parseInt(str,16) is used to convert HEX strings to number types
/////  
/////  DEC or "decimal" means the traditional math definition: 0.2345
/////  but here it ALSO means clamped 0.0 to 1.0 inclusive,
/////  regardless of if stored as a number or string. DEC never means INT
/////  8 bit per color not assumed and 'tween values are of course floats
/////  parseFloat(str) is used to convert DEC strings to number types
/////
/////  float means what float is: unclamped and negative values allowed
/////  parseFloat(str) is used to convert float strings to number types
/////
/////  STRING EXAMPLES
/////
/////  INT: x = '204'; HEX: x = 'CC'; DEC: x = '0.8';
/////  RGB INT: x = 'rgb(128,204,255)';
/////  RGB HEX: x = '80CCFF';
/////  RGB DEC: x = 'rgb(0.5,0.8,1.0)';
/////  
/////  NUMBER TYPE EXAMPLES
/////
/////  INT: x = 204; HEX: x = 0xCC; DEC(float): x = 0.8;
/////  RGB INT: N/A use hex
/////  RGB HEX: x = 0x80CCFF;
/////  RGB DEC: N/A floats are always independent channels per color
/////
////////////////////////////////////////////////////////////////////////////////
/////
/////  The always-on properties are: this .r .g .b .a .ok .cleaned
/////  If this.ok is false, this .r .g .b .a will be 0.0
/////
/////  Properties only on if this.ok is true and section is on:
/////	   
/////     ("P" for property as opposed to a function)
/////
/////     this .RGBAstrP .RGBAhexP .RGBstrP .RGBhexP
/////     this .RlinP .GlinP .BlinP  .RlinCoP .GlinCoP .BlinCoP .LYP
/////     this .sRlinP .sGlinP .sBlinP (s means sRGB piecewise version)
/////     refWhtPt.X .Y .Z .xRef .yRef
/////     
/////
////////////////////////////////////////////////////////////////////////////////
/////   Get a variety of things that need to be gotten.  ///////////////////////
////////////////////////////////////////////////////////////////////////////////

// certain common getters are available as properties in addition to methods

    // hex — returns plain 6 or 8 char hex string no hash #
    
    this.hex = function hexString(sR=this.r,sG=this.g,sB=this.b,sA=this.a) {
        var R = sR.toString(16).padStart(2, '0');
        var G = sG.toString(16).padStart(2, '0');
        var B = sB.toString(16).padStart(2, '0');
        var A = (sA === '') ? '' : sA.toString(16).padStart(2, '0') ;
        return R + G + B + A;
    }

    // hex2 — returns hex string of 3 or 4 chars if that was entered, no #
    
    this.hex2 = function () {
        var R = this.r.toString(16).padStart(2, '0');
        var G = this.g.toString(16).padStart(2, '0');
        var B = this.b.toString(16).padStart(2, '0');
        var A = (this.a === '') ? '' : this.a.toString(16).padStart(2, '0') ;
        if ( this.r % 17 == 0 &&
             this.g % 17 == 0 &&
             this.b % 17 == 0 &&
             this.a % 17 == 0 ) {
            	return R.charAt(0) + G.charAt(0) + B.charAt(0) + A.charAt(0);
        } else {
        		return R + G + B + A;
        }
    }

    // HexNoA — returns 6 char hex string WITH hash # and IGNORING the alpha
    
    this.hexNoA = function (sR = this.r,sG = this.g,sB = this.b) {
        var R = sR.toString(16).padStart(2, '0');
        var G = sG.toString(16).padStart(2, '0');
        var B = sB.toString(16).padStart(2, '0');
        return '#' + R + G + B;
    }

    function hexStringNoA(sR = this.r,sG = this.g,sB = this.b) {
        var R = sR.toString(16).padStart(2, '0');
        var G = sG.toString(16).padStart(2, '0');
        var B = sB.toString(16).padStart(2, '0');
        return '#' + R + G + B;
    }

    // hexNoA2 — returns hex string of 3 chars if that was entered,
    // ignores alpha and adds a #

    this.hexNoA2 = function () {
        var R = this.r.toString(16).padStart(2, '0');
        var G = this.g.toString(16).padStart(2, '0');
        var B = this.b.toString(16).padStart(2, '0');
        if ( this.r % 17 == 0 &&
             this.g % 17 == 0 &&
             this.b % 17 == 0 ) {
            return '#' + R.charAt(0) + G.charAt(0) + B.charAt(0);
        } else {
            return '#' + R + G + B;
        }
    }


//////////////////////////////////////////
	var RGBstringProperties = false;   // reports if next section is available
//////////////////////////////////////////
/* SECTION SWITCH  (remove/add first slash to toggle:  /* off   //* on )

	RGBstringProperties = true; // reports if properties are available

        // "hex" is in RGBA Byte Order
    if (this.a === '') {
		this.RGBAstrP = 'rgba('+this.r+','+this.g+','+this.b+',255';
		this.RGBAhexP = this.r << 24 | this.g << 16 | this.b << 8 | 0xFF;
    } else {
		this.RGBAstrP = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
		this.RGBAhexP = this.r << 24 | this.g << 16 | this.b << 8 | this.a;
    }

        // Ignores Alpha even if present:
    this.RGBstrP = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    this.RGBhexP = this.r << 16 | this.g << 8 | this.b ;

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle:  /* off   //* on )

    // RGBAstr — returns rgb() or rgba() INT value string (0-255) no spaces
    this.RGBAstr = function () {
        return ( this.a == '') ?
        'rgb(' + this.r + ',' + this.g + ',' + this.b + ')' :
        'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    }

    // RGBstr — returns rgb() value string with spaces & IGNORES alpha if any
    this.RGBstr = function () {
        return 'rgb( ' + this.r + ', ' + this.g + ', ' + this.b + ' )';
    }

    // RGBAhex — returns color as number in RGBA Byte Order
    // sets alpha to 255 if it is not present
    this.RGBAhex = function () {
        return ( this.a == '') ?
		this.r << 24 | this.g << 16 | this.b << 8 | 0xFF  :
		this.r << 24 | this.g << 16 | this.b << 8 | this.a;
    }

    // RGBhex — returns color as number in RGB Byte Order
    this.RGBhex = function () {
        return this.r << 16 | this.g << 8 | this.b ;
    }

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

/////  DEC ALPHA RETURNS (see what I did there?)  /////

    // decRGBstr — returns rgb() value string using decimal 0.0-1.0
    // uses fixed places unlike decRGBAstr which uses the precision hack.
    this.decRGBstr = function (places = 3) {
        return 'rgb('
            + (this.r/255.0).toFixed(places) + ','
            + (this.g/255.0).toFixed(places) + ','
            + (this.b/255.0).toFixed(places) + ')';
    }

    // decRGBAstr — returns rgb() value string using decimal 0.0-1.0
    // Returns rgba only if alpha is present
    // substr hack is to truncate extremely small fractions.
    this.decRGBAstr = function (places = 4) {
        return ( this.a === '') ?
            'rgb('
            + (this.r/255.0).toPrecision(places).substr(0,places + 4) + ','
            + (this.g/255.0).toPrecision(places).substr(0,places + 4) + ','
            + (this.b/255.0).toPrecision(places).substr(0,places + 4) + ')' :
            'rgba('
            + (this.r/255.0).toPrecision(places).substr(0,places + 4) + ','
            + (this.g/255.0).toPrecision(places).substr(0,places + 4) + ','
            + (this.b/255.0).toPrecision(places).substr(0,places + 4) + ','
            + (this.a/255.0).toPrecision(places).substr(0,places + 4) + ')';
    }

    // decRGBarray — returns decimal array for R, G, and B ignores alpha
    this.decRGBarray = function () {
        return [this.r/255.0,this.g/255.0,this.b/255.0];
    }
    // decRGBAarray — returns decimal array for R, G, B and A
    // sets alpha to 1.0 if it is not present
    this.decRGBAarray = function () {
        return ( this.a === '') ?
            [this.r/255.0,this.g/255.0,this.b/255.0,1.0] :
            [this.r/255.0,this.g/255.0,this.b/255.0,this.a/255.0];
    }

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
	var alphaProperties = false; // reports if next section is available
//////////////////////////////////////////
/* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

	alphaProperties = true; // reports if properties are available
	
	///// ALPHAS /////

	// As Elsewhere, "P" denotes property not function
	
    // decAlphaP — decimalized alpha
    this.decAlphaP = this.a/255.0;

    // decAlphaPow — You can choose an exponent (experimental)
    // Adds a power curve to match perceptual intent of other gammas
    // as a function expression in this section. As function in next.
    this.decAlphaPow = function (exp = 1.0) {
        return Math.pow(this.a/255.0, exp);
    }

    // decAlphaPowP — returns decimal alpha with sRGB linearizing (experimental)
    this.decAlphaPowP = Math.pow(this.a/255.0, mainTRC);

    // decAlphaKungPowP — returns decimal alpha with sRGB invert (experimental)
    this.decAlphaKungPowP = Math.pow(this.a/255.0, mainTRCencode);


//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
	var alphaExpressions = false; // reports if next section is available
//////////////////////////////////////////
/* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

	///// ALPHA EXPRESSIONS /////

	alphaExpressions = true; // reports if properties are available

    // same alpha versions but as function expressions
     
    // decAlpha — returns decimal A
    this.decAlpha = function () {
        return this.a/255.0;
    }

    // decAlphaPowExp — You can choose an exponent (experimental)
    // Adds a power curve to match perceptual intent of other gammas
     function decAlphaPowExp(exp = 1.0) {
        return Math.pow(this.a/255.0, exp);
    }
    
    // decAlphaPow — returns decimal A with sRGB linearizing (experimental)
    this.decAlphaPow = function () {
        return Math.pow(this.a/255.0, mainTRC);
    }

    // decAlphaKungPow — returns decimal A with sRGB invert (experimental)
    this.decAlphaKungPow = function () {
        return Math.pow(this.a/255.0, mainTRCencode);
    }


//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
	var sRGBsimpleExpProperties = false; // reports if next section is available
//////////////////////////////////////////

// IMPORTANT NOTE: These simple exponent linearizations use the mainTRC constant
// which is non-standard and optimized for use with SAPC/APCA, as opposed to
// generic linearization use. Use 2.2 for "standard" generic linearization.

//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

	sRGBsimpleExpProperties = true; // reports if properties are available
	
// this.linearProperties (Name ending in cap P indicates Property not function)

    function simpleExp (chan) { return Math.pow(chan/255.0, mainTRC); }
    
    // Rlin — these are linearized R, G, or B via mainTRC
    this.RlinP = simpleExp(this.r);
    this.GlinP = simpleExp(this.g);
    this.BlinP = simpleExp(this.b);

    // RlinCo — these return linearized R, G, or B via mainTRC * coefficients
    this.RlinCoP = Rco * this.RlinP;
    this.GlinCoP = Gco * this.GlinP;
    this.BlinCoP = Bco * this.BlinP;

    // LY —  linear Y per mainTRC (luminance)
    this.LYP = this.RlinCoP + this.GlinCoP + this.BlinCoP;

    // LY100 — linear Y per mainTRC, scaled 0-100
    this.LY100P = 100 * this.LYP;

    // RGBmonoValueP — convert to a mono sRGB via exponent
    this.RGBmonoValueP = Math.min(
    					 Math.pow(this.LYP, mainTRCencode) * 255, 255) & 0xFF;

    
//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
	var sRGBsimpleExpFunctions = false; // reports if next section is available
//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

// this.linearized functions
// Note with all of these the exponent can be given in parameter

	sRGBsimpleExpFunctions = true; // reports if properties are available

    // Rlin — returns linearized R, G, B  function(can send exponent)
    this.Rlin = function (exp = mainTRC) {return Math.pow(this.r/255.0, exp);}
    this.Glin = function (exp = mainTRC) {return Math.pow(this.g/255.0, exp);}
    this.Blin = function (exp = mainTRC) {return Math.pow(this.b/255.0, exp);}

    // RlinCo — returns linearized R, G, B but adjusted with sRGB coefficients
    this.RlinCo = function (exp = mainTRC, coef = Rco) {
        return coef * this.Rlin(exp);
    }
    this.GlinCo = function (exp = mainTRC, coef = Gco) {
        return coef * this.Glin(exp);
    }
    this.BlinCo = function (exp = mainTRC, coef = Bco) {
        return coef * this.Blin(exp);
    }

    // LY — This returns linear Y per mainTRC (luminance)
    this.LY = function (exp = mainTRC, Rcof = Rco, Gcof = Gco, Bcof = Bco) {
        return  this.RlinCo(exp,Rcof) + this.GlinCo(exp,Gcof) + this.BlinCo(exp,Bcof);
    }

    // LY100 — This returns linear Y per mainTRC, scaled 0-100
    this.LY100 = function (exp = mainTRC) {
        return  100 * this.LY(exp);
    }

    // LY100str — This returns linear Y  with Precision and Str trim
    this.LY100str = function (places = 4) {
        return this.LY100().toPrecision(places).substr(0,places + 4);
    }
 
 
 	// SAPC specials
	
	// Clamped Y as in the main APCA function
	
    this.Yclmp = function (YtoClamp = this.LYP, clampWhite = false) {

			YtoClamp = (YtoClamp > blkThrs) ? YtoClamp :
                		YtoClamp + Math.pow(blkThrs - YtoClamp, blkClmp);

			return YtoClamp;
    }
	
    this.YunClmp = function (YtoUnClamp = this.LYP) {

		YtoUnClamp = (YtoUnClamp > blkThrs) ? YtoUnClamp :
					 (YtoUnClamp < Math.pow(blkThrs,blkClmp)) ? 0.0 :
					  YtoUnClamp - 2.0 * Math.pow(blkThrs - YtoUnClamp, blkClmpInvert);


			//YtoUnClamp = (YtoUnClamp > blkThrs) ? YtoUnClamp :
              //  		YtoUnClamp + Math.pow(blkThrs - Math.max(0,YtoUnClamp), 1 / blkClmp);

			return Math.max(0,YtoUnClamp);
    }    



    // Ls — This returns Ls as in SAPC lightness 
		// As a reminder:
		// normBG = 0.55, normTXT = 0.58, revBG = 0.62, revTXT = 0.57;
		// 0.56 is the value matched with 2.4 for S-LUV perceptual lightness
    this.Ls = function (exp = 0.56) {
    	return  100 * Math.pow(this.Yclmp(),exp);
    }

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////
	var LstarStandalone = false; // reports if next section is available
//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

	// Note: the processLstar() function is in the CIE functions section
	// These use Y linearized with mainTRC
	// For sLstar, linearized with piecewise, see CIE section	
    // Lstar — This returns Perceptual Lightness L* as in LAB

	LstarStandalone = true; // reports if properties are available

    this.Lstar = function (Y = this.LYP, refY = 1.0) {
        Y = Y / refY;
        return processLstar(Y);
    }

    // LstarStr — Perceptual Lightness with Precision and Str trim hack
    this.LstarStr = function (places = 4, Y = this.LYP, refY = 1.0) {
        Y = Y / refY;
        return processLstar(Y).toPrecision(places).substr(0,places + 4);
    }

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
///// ALTERNATES USING PIECEWISE sRGB LINEARIZATION ////////////////////////////
/////      Required for the CIE functions           ////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////
/////  Several of these are identical the those above,  
/////  but use the sRGB piecewise method of linearization
/////  instead of the simple mainTRC exponent. These piecewise
/////  linearized versions have 's' prepended to the function name.
/////
////////////////////////////////////////////////////////////////////////////////

// sRGBtoLin — these functions return linearized R, G, or B via piecewise method

	/////  These are required for the CIE functions  /////

        // 8bit sRGB to Linear RGB per IEC Standard:
    function piecewise(chan) {
        chan = chan/255.0;
        return ( chan > 0.04045 ) ?
                Math.pow((( chan + 0.055 ) / 1.055 ), 2.4 ) :
                chan / 12.92;
    }

        // Linear to sRGB 0.0-1.0 per IEC Standard:
    function piecewiseEncode(linChan) {
         return ( linChan > 0.0031308 ) ?
                Math.pow(linChan , 0.416666666666667 ) * 1.055 - 0.055 :
                linChan * 12.92;
    }

        // Linear to sRGB per IEC, round to INT and clamp 0-255:
    function sRGB8bit(linChan) {
        return Math.max( 0,
        	    Math.min( 255,
        	     Math.round(piecewiseEncode(linChan) * 255.0)));
    }

	
//////////////////////////////////////////
	var sRGBpiecewiseProperties = false;// reports if next section is available
//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )

	sRGBpiecewiseProperties = true; // reports if properties are available
		
	///// sRGB Piecewise Linearized Properties /////

    // sRGB sRlinP — linearized R, G, B via piecewise method
    this.sRlinP = piecewise(this.r);
    this.sGlinP = piecewise(this.g);
    this.sBlinP = piecewise(this.b);

    // sRGB sRlinCoP — linearized R, G, B adj with sRGB coefficients
    this.sRlinCoP = Rco * this.sRlinP;
    this.sGlinCoP = Gco * this.sGlinP;
    this.sBlinCoP = Bco * this.sBlinP; 

    // sLYP — This returns linear Y (luminance) using piecewise
    this.sLYP = this.sRlinCoP + this.sGlinCoP + this.sBlinCoP;

    // sLY100P — linear Y per piecewise, scaled 0-100
    this.sLY100P = 100 * this.sLYP;

    // sRGBmonoValueP — convert to a mono sRGB
    this.sRGBmonoValueP = sRGB8bit(this.sLYP);

//  */  ////\ End of Switched Section /////
//////////////////////////////////////////

    // sRGB sRlin — returns linearized R, G, B via piecewise method
    // allows a different color per channel in parameter
    this.sRlin = function (sChan = this.r) { return piecewise(sChan); }
    this.sGlin = function (sChan = this.g) { return piecewise(sChan); }
    this.sBlin = function (sChan = this.b) { return piecewise(sChan); }

    // sRGB sRlinCo — returns linearized R, G, B but adj with sRGB coefficients
    this.sRlinCo = function (coef = Rco) { return coef * this.sRlin(); }
    this.sGlinCo = function (coef = Gco) { return coef * this.sGlin(); }
    this.sBlinCo = function (coef = Bco) { return coef * this.sBlin(); }

    // sLY — This returns linear Y (luminance) using piecewise
    this.sLY = function () {
        return this.sRlinCo() + this.sGlinCo() + this.sBlinCo();
    }

    // sLY100 — This returns linear Y (luminance) times 100
    this.sLY100 = function () {
        return 100 * this.sLY();
    }

    // sLstar — This returns Perceptual Lightness L* as in LAB
    this.sLstar = function (Y = this.sLY(), refY = 1.0) {
        Y = Y / refY;
        return processLstar(Y);
    }
    

////////////////////////////////////////////////////////////////////////////////
///// CIE XYZ, xyY, LAB, and LUV FUNCTIONS \////////////////////////////////////
////                                        \///////////////////////////////////


///// Some equations and matrix values derived from the treasure trove /////////
///// of information at BruceLindbloom.com  Thanks Bruce!              /////////

///// Note however that we've optimized for speed as much as possible, /////////
///// including things like using only the D65 whitepoint, which       /////////
///// allows deleting code that merely multiplies or divides by 1,     /////////
///// and pre-calculating most constants and references.               /////////
///// This might make some code look "odd" to those familiar with      /////////
///// the math, which I tried to make up for with commenting.          /////////

	/////  D65 REFERENCE  /////

	// D65 Ref White and pre-computed values for efficiency
	// The div labels are all 1/n of the value, so multiplication
	// can be used where division was indicated.

	const refWhtPt = {
		X: 0.95047, Y: 1.0, Z: 1.08883, XYZumRef: 3.0393,
		Xdiv: 1.0521110608435826486, Ydiv: 1.0, Zdiv: 0.91841701643048042394,
		xRef: 0.31272661468101207515, yRef: 0.32902313032606192215,
		UV: 19.21696, Uref: 0.19783982482140775648, Vref: 0.46833630293240970476
	};

    var CIEreturn = {
		Y100: 0.0,
		Lstar: 0.0, La: 0.0, Lb: 0.0, Lu: 0.0, Lv: 0.0,
		X: 0.0, Z: 0.0,
		x: 0.0, y: 0.0, Y: 0.0,
		Labuv: 0.0, Cab: 0.0, hab: 0.0, Cuv: 0.0, huv: 0.0
	};
        
        // CIE LAB LUV Constants
        // const e = 216.0 / 24389.0;
        // const k = 24389.0 / 27.0;
        // const ke = 8.0;
        
        // Pre-calcs to 20 places:
    const CIEe = 0.0088564516790356308172;      //216.0 / 24389.0
    const CIEk = 903.2962962962962963;          // 24389.0 / 27.0
    const CIEkdiv = 0.0011070564598794538521;   // 1.0 / (24389.0 / 27.0)
    const CIEke = 8.0;
    const CIE116 = 116.0;
    const CIE116div = 0.0086206896551724137931; // 1.0 / CIE116
	const pi180 = 0.017453292519943295769;      // Math.PI / 180
	const piDiv = 0.31830988618379067154;       // n*piDiv instead of n/Math.PI
    const cubeRoot = 0.33333333333333333333;    // Math.pow(n, cubeRoot)
                                                // Instead of Math.cbrt()
//////////////////////////////////////////
/* SECTION SWITCH  (remove/add first slash to toggle:  /* off   //* on )

	// Initialize these RGBcolor object values
	// Turn on section if you are going to use
	// the CIE back to sRGB methods...
    this.CIECuv = 0.0;
    this.CIEhuv = 0.0;
    this.CIELu = 0.0;
    this.CIELv = 0.0;
    this.CIECab = 0.0;
    this.CIEhab = 0.0;
    this.CIELa = 0.0;
    this.CIELb = 0.0;
    this.CIELstar = 0.0;
    this.CIEx = 0.0;
    this.CIEy = 0.0;
    this.X = 0.0;
    this.Y = 0.0;
    this.Z = 0.0;
    
//  */  ////\ End of Switched Section /////
//////////////////////////////////////////

/////  SUPPORTING PRIVATE FUNCTIONS FOR CIE  /////

    function processLstar(Y) {
        // NOTE: Y must be linear and ref whitepoint adjusted
        return (Y > CIEe) ?
            (Math.pow(Y, cubeRoot) * CIE116 - 16.0) : (Y * CIEk);
    }   

    function processLAB(XYZ) {
        // This is for the CIE function, not Lstar alone
        // To use this for L* you must use form: processLAB(Y) * 116.0 - 16.0;
        return (XYZ > CIEe) ?
            Math.pow(XYZ, cubeRoot) : ((XYZ * CIEk + 16.0) * CIE116div);
    }
    
    function processLCh(au,bv) {
        // This is for the CIE function, sent either LAB or LUV to create LCh
            var Cabuv = Math.pow(au * au + bv * bv, 0.5);
            	// if Cabuv less than 0.1, set hue to 360, NaN, or 0
            var habuv = (Cabuv < 0.01) ? 0.0 : 180.0 * Math.atan2(bv,au) * piDiv;
                habuv = (habuv < 0.0) ? habuv + 360.0 : habuv;
        return [Cabuv,habuv];
    }

////////////////////////////////////////////////////////////////////////////////
///////  this.CIE(spaces) documentation  \//////////////////////////////////////
//  
//  	spaces bits:
//  	
//  	0  XYZ only 0000 XYZ is always active when function is called 
//  	1  L*       0001 Lstar (and XYZ) only
//  	2  Lab      0010 adds a* and b*
//  	3  LChab    0011 adds Ch for LabCH
//  	4  Luv      0100 drops a*b* for u*v*
//  	5  LChuv    0101 adds Ch for LuvCH
//  	6  LabLuv   0110 Lab & Luv but no lch
//  	7  All      0111 Lab & Luv and LCh for both
//  	8  xyY      1000 only xyY, no lab, no Lstar
//  	9  L*       1001 Here down: same as first 8, but includes xyY
//  	10 Lab      1010
//  	11 LChab    1011
//  	12 Luv      1100
//  	13 LChuv    1101
//  	14 LabLuv   1110  
//  	15 All      1111  All Features of Function (default)
//  
//  These CIE functions are based around the sRGB colorspace ONLY,
//  so the whitepoint is always D65, the only matrixes are to get from 
//  linear sRGB to XYZ and back. For this function, the sRGB linearization
//  is using the piecewise method by default. 
//
//  You can alternately send int or floats R G and B via the parameters:
//
//  Second parameter determines the color source and linearization type.
//
//  Default (case 0 or 'piecewise') is this.r.g.b using sRGB piecewise
//  (case 1 or 'simpleExp') is this.r.g.b using mainTRC exponent
//  (case 2 or 'int') is 8bit int sent to param 3,4,5 using sRGB piecewise
//  (case 3 or 'intExp') is 8bit int sent to param 3,4,5 using mainTRC exponent
//  (case 4 or 'float') for already linearized decimal sent to param 3,4,5 
//  With float, it must be linear and it is assumed that white is 1.0
//
//  By default the this.CIE() function processes everything from XYZ to LCh 
//  in one fell swoop (including both Luv and Lab). This was done as much 
//  of the processing is redundant and results often used together. 
//  
//  But if you are really starving for cycles LOL, the 'spaces' parameter allows
//  you to turn off some of the spaces you might not need. If you are going to
//  do that you'll also want to copy the returned array to a local variable or 
//  you'll be re-calling the function for every iteration (and weird behavior
//  will be seen with the spaces bits).
//  
//  EXAMPLE:
//  
//      var tempCIE = thisColor.CIE(0b0011);
//  
//  This processes for LAB and the LAB version of LCh
//  All other array values should be 0.0 (except XYZ)
//  
//  You can use either the form on the right of the list as 0b0011
//  or just put the INT value on the left of the list, in which
//  case the following is identical to the above example:
//  
//      var tempCIE = thisColor.CIE(3);
//  
//  The prototype return object is above, 'CIEreturn', outside
//  the CIE function so values are only set to 0.0 when creating
//  a new RGBcolor object.
//
//
//
/*		FUTURE for "using"
		case 'sRGB':
		case 'piecewise': // same as sRGB, here for backwards compatibility
		case 'Rec709':
		case 'simpleExp':
		case 'altExp':
		case 'ProPhoto':
		case 'AdobeRGB':
		case 'DCIP3':
		case 'Log':
		case 'LogC':
		case 'linear':
		case 'float':
// */
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
/////  CIE MAIN FUNCTION  \/////////////////////////////////////////////////////

///// CIE XYZ, xyY, LAB, LUV, & LCh from sRGB //////////////////////////////////

this.CIE = function processCIE(spaces = 0b1111,
								using = this.TRCencode,
								Rin, Gin, Bin) {
								// Input params are optional, defaults to this.x
								// Matrixes use sRGB primaries
								
	var Rlin=0.0,Glin=0.0,Blin=0.0;
	
		// linearize sRGB  
	switch (using) {
		case 0:
		case 'sRGB':
		case 'sRGBstring':
		case 'piecewise':
			if (sRGBpiecewiseProperties) {
				Rlin = this.sRlinP;
				Glin = this.sGlinP;
				Blin = this.sBlinP;
			} else {
				Rlin = this.sRlin();
				Glin = this.sGlin();
				Blin = this.sBlin();
			}
			break; 
		case 1:
		case 'simpleExp':
			if (sRGBsimpleExpProperties) {
				Rlin = this.RlinP;
				Glin = this.GlinP;
				Blin = this.BlinP;
			} else {
				Rlin = this.Rlin();
				Glin = this.Glin();
				Blin = this.Blin();
			}
			break; 
		case 2:
		case 'int':
			Rlin = this.sRlin(isNaN(Rin)?170:Rin&0xFF);
			Glin = this.sGlin(isNaN(Gin)?170:Gin&0xFF);
			Blin = this.sBlin(isNaN(Bin)?170:Bin&0xFF);
			break; 
		case 3:
		case 'intExp':
			Rlin = this.Rlin(isNaN(Rin)?128:Rin&0xFF);
			Glin = this.Glin(isNaN(Gin)?128:Gin&0xFF);
			Blin = this.Blin(isNaN(Bin)?128:Bin&0xFF);
			break; 
		case 4:
		case 'linear':
		case 'float': // must already be linearized!!
			Rlin = isNaN(Rin)?0.184:Rin;
			Glin = isNaN(Gin)?0.184:Gin;
			Blin = isNaN(Bin)?0.184:Bin;
			break;
		default:
			Rlin = 0.496933;
			Glin = 0.401978;
			Blin = 0.72306;
	} // Lin R 0.496933 G 0.401978 B 0.72306 = sRGB 187,170,221 = #BAD

    spaces &= 0x0F;  // discard all but the rightmost 4 bits
    
    /////  D65 Rec709/sRGB PRIMARIES MATRIX TO XYZ  /////

    var X = Rlin * 0.4124564 + Glin * 0.3575761 + Blin * 0.1804375;
    var Y = Rlin * 0.2126729 + Glin * 0.7151522 + Blin * 0.0721750;
    var Z = Rlin * 0.0193339 + Glin * 0.1191920 + Blin * 0.9503041;

    CIEreturn.X = X;
    CIEreturn.Y = Y;
    CIEreturn.Z = Z;
    CIEreturn.Y100 = Y * 100;
    
/////  PROCESS xyY  /////

/////  Bitwise tutorial:
/////  bitwise AND & with 'spaces' and a binary mask
/////  That filters a specific value. In this next case,
/////  it is all values 8 to 15; the mask 0b1000 discards
/////  the first 3 bits (9 thru 15) making it easy to 
/////  isolate the '8'.

if ((spaces & 0b1000) == 8){
    var XYZum = X + Y + Z;

    CIEreturn.x = ( XYZum > 0.0 ) ? X / XYZum : refWhtPt.xRef;
    CIEreturn.y = ( XYZum > 0.0 ) ? Y / XYZum : refWhtPt.yRef;
}

/////  PROCESS LSTAR for use with LAB and LUV or solo  /////

/////  Bitwise tutorial: here we want this "on" for everything except
/////  0 and 8 so '& 0b0111' returns 0 only for 0b0000 and 0b1000.

if ((spaces & 0b0111) != 0){
	// var Yr = Y * refWhtPt.Ydiv; // /refWhtPt.Y; i.e. Yr = Y*1.0
	var fY = processLAB(Y);

		CIEreturn.Lstar = CIEreturn.Labuv = CIE116 * fY - 16.0;
}

    /////  PROCESS LAB  /////
    if ((spaces & 0b0010) == 2) {
        var Xr = X * refWhtPt.Xdiv; // /refWhtPt.X;
        var Zr = Z * refWhtPt.Zdiv; // /refWhtPt.Z;
        var fX = processLAB(Xr);
        var fZ = processLAB(Zr);

        CIEreturn.La = 500.0 * (fX - fY);
        CIEreturn.Lb = 200.0 * (fY - fZ);
    }

    /////  PROCESS LUV  /////
    if ((spaces & 0b0100) == 4){
        var divisor = ( X + 15.0 * Y + 3.0 * Z);
        var Upri = (divisor > 0.0) ? ((4.0 * X) / divisor) : 0.0;
        var Vpri = (divisor > 0.0) ? ((9.0 * Y) / divisor) : 0.0;
        //var Uref = (4.0 * refWhtPt.X) * refWhtPt.UVdiv; //refWhtPt.Uref
        //var Vref = (9.0 * refWhtPt.Y) * refWhtPt.UVdiv; //refWhtPt.Vref

        CIEreturn.Lu = 13.0 * CIEreturn.Labuv * (Upri - refWhtPt.Uref);
        CIEreturn.Lv = 13.0 * CIEreturn.Labuv * (Vpri - refWhtPt.Vref);
    }

		/////  PROCESS LChab AND LChuv  /////
		if ((spaces & 0b0011) == 3){
			var LCh = processLCh(CIEreturn.La,CIEreturn.Lb);
			CIEreturn.Cab = LCh[0];
			CIEreturn.hab = LCh[1];
			}
		
		if ((spaces & 0b0101) == 5){
			var LCh = processLCh(CIEreturn.Lu,CIEreturn.Lv);
			CIEreturn.Cuv = LCh[0];
			CIEreturn.huv = LCh[1];
			}   

    /////  SET VALUES OR RETURN  /////
    
//////////////////////////////////////////
/* SECTION SWITCH  (remove/add first slash to toggle:  /* off   //* on )

	// set RGBcolor object values
    
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    
    this.CIEx = CIEreturn.x;
    this.CIEy = CIEreturn.y;
	
    this.CIELstar = CIEreturn.Lstar;
    
    this.CIELu = CIEreturn.Lu;
    this.CIELv = CIEreturn.Lv;
    this.CIECuv = CIEreturn.Cuv;
    this.CIEhuv = CIEreturn.huv;
    
    this.CIELa = CIEreturn.La;
    this.CIELb = CIEreturn.Lb;
    this.CIECab = CIEreturn.Cab;
    this.CIEhab = CIEreturn.hab;
    
//  */  ////\ End of Switched Section /////
//////////////////////////////////////////

    //  or just return the CIE object.
    return CIEreturn;
    
}

/////\  END CIE MAIN FUNCTION  /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
///// FROM xyY, LAB, LUV, & LCh BACK to XYZ and then sRGB //////////////////////
////////////////////////////////////////////////////////////////////////////////


        // converts LCh back to LAB or LUV cartesian coordinates
        // No checking so it is important to keep track of if LAB or LUV
    function LChToCartesian(Cabuv, habuv) {
    	Cabuv = ( Cabuv > 0.01 ) ? Cabuv : 0.0; // effectively clamps noise to 0
        var au = Cabuv * Math.cos(habuv * pi180);
        var bv = Cabuv * Math.sin(habuv * pi180);
        return [au, bv];
    }
    
    function LstarToY( Lstar ) {
    	return ( Lstar > CIEke ) ?
            Math.pow( (Lstar + 16.0) * CIE116div, 3.0 ) :
            		(Lstar * CIEkdiv);
    }
    
        // Lab back to XYZ
    function LABtoXYZ( Lstar, La, Lb ) {
        var fY = (Lstar + 16.0) * CIE116div;
        var fX = 0.002 * La + fY;
        var fZ = fY - 0.005 * Lb;
        var fX3 = fX * fX * fX;
        var fZ3 = fZ * fZ * fZ;

        this.Y = LstarToY( Lstar );

        var Xr = (fX3 > CIEe) ? fX3 : ( (CIE116 * fX - 16.0) * CIEkdiv );
        var Zr = (fZ3 > CIEe) ? fZ3 : ( (CIE116 * fZ - 16.0) * CIEkdiv );

        this.X = Xr * refWhtPt.X;
        this.Z = Zr * refWhtPt.Z;
    }

        // Luv back to XYZ
    function LUVtoXYZ( Lstar, Lu, Lv ) {
        //var u0 = refWhtPt.Uref;
        //var v0 = refWhtPt.Vref;

        this.Y = LstarToY( Lstar );
        // this.Y = (Lstar > CIEke) ? 
            //Math.pow((Lstar + 16.0) * CIE116div, 3.0) :
            		//(Lstar * CIEkdiv);

        var fA = this.Y * (((39.0 * Lstar) /
        					(Lv + 13.0 * Lstar * refWhtPt.Vref)) - 5.0);
        var fB = this.Y * -5.0;
        var fC = (((52.0 * Lstar) /
        		   (Lu + 13.0 * Lstar * refWhtPt.Uref)) - 1.0) *
        		  0.3333333333333333;
        var fD = -0.3333333333333333;

        this.X = (fA - fB) / (fC - fD);
        this.Z = this.X * fC + fB;
    }

        // xyY back to XYZ
    function xyYtoXYZ( xyx, xyy, Y ) {
        if (xyy > 0.0) {
            this.Y = Math.max(Y,0.0); // sanity check
            this.X = (xyx * this.Y) / xyy;
            this.Z = ((1.0 - xyx - xyy) * this.Y) / xyy;
        } else {
            // WAIT...should we overwrite Y just because little y is neg?
            // was: this.X = this.Y = this.Z = 0.0;
            // ALT: let's keep Y if positive
            this.X = this.Z = 0.0;
            this.Y = Math.max(Y,0.0); // sanity check
        }
    }

            //  Matrix XYZ to linear RGB using sRGB/Rec709 Primaries
    function XYZtoLinRGB() {
			// XYZ to sRGB matrix for D65
        this.linR = this.X * 3.2404542 +
        			this.Y * -1.5371385 +
        			this.Z * -0.4985314;
        this.linG = this.X * -0.9692660 +
        			this.Y * 1.8760108 +
        			this.Z * 0.0415560;
        this.linB = this.X * 0.0556434 +
        			this.Y * -0.2040259 +
        			this.Z * 1.0572252;
    }
            // Linear sRGB to decimal float sRGB using piecewise TRC encode
    function linear2sRGBdec() {
        this.sRdec = piecewiseEncode(this.linR);
        this.sGdec = piecewiseEncode(this.linG);
        this.sBdec = piecewiseEncode(this.linB);
    }
            // Linear sRGB to INT 0-255 sRGB using piecewise
    function linear2sRGB() {
        this.sR = sRGB8bit(this.linR);
        this.sG = sRGB8bit(this.linG);
        this.sB = sRGB8bit(this.linB);
    }

////////////////////////////////////////////////////////////////////////////////
///////////////  CIE TO sRGB HEX STRING FUNCTION  \/////////////////////////////
/////
/////  Similar to using CIE, this function uses spaces bits
/////  to define what kind of data is being passed in the parameters.
/////  This of course requires that you set the correct bits
/////  for the data type you are sending.
/////  The default is 0, which IGNORES all parameters and
/////  just takes XYZ from CIEreturn.X .Y .Z
/////  THIS ALSO MEANS you can call this with no parameters
/////  to set this.X, this.Y, this.Z to CIEreturn.X .Y .Z
/////
/////  Side Note: calling this function uses the following values
/////  this.linR, this.linG, this.linB
/////  this.sR, this.sG, this.sB
/////  this.X, this.Y this.Z
/////
/////  Param 1: spaces bits:
/////  
/////  Use only these in the spaces parameter.
/////  Fallback is CIEreturn.XYZ to sRGB.
/////
/////  0  XYZ only 0000 DEFAULT ignores params, CIEreturn.XYZ to sRGB
/////  1  L* only  0001 Lstar, other params discarded, set X,Z = 0.0, to sRGB
/////  2  Lab      0010 Lab to sRGB
/////  3  LChab    0011 LChab to sRGB
/////  4  Luv      0100 Luv to sRGB
/////  5  LChuv    0101 LChuv to sRGB
/////  8  xyY      1000 xyY to sRGB
/////
/////  9  Y only   1001 Y, other parameters discarded, set X,Z = 0.0, to sRGB
/////  15 XYZ      1111 XYZ (sent through parameters) to sRGB
/////  
/////  Param 2: Lstar (1,2,3,4,5) or Y (8,9,15)
/////  Param 3: a (2)  Cab (3)  u (4)  Cuv (5)  x (8)  X(15)
/////  Param 4: b (2)  hab (3)  v (4)  huv (5)  y (8)  Z(15)
/////
/////  ///// Output options are: 'array' 'string' 'number' 'float'
/////
////////////////////////////////////////////////////////////////////////////////

//this.CIE2sRGB = 

function CIE2sRGBstring( spaces = 0b0000, LstarY, caux, hbvy, outputType = 'array'  ) {
    	
    	spaces &= 0x0F;  // discard all but right 4 bits
    	
    	switch (spaces & 0b1111) {
    	
			case 3:
				var polarTemp = LChToCartesian(caux, hbvy);
				caux = polarTemp[0];
				hbvy = polarTemp[1];
			case 2:
				LABtoXYZ( LstarY, caux, hbvy );
			break;
			
			case 5:
				var polarTemp = LChToCartesian(caux, hbvy);
				caux = polarTemp[0];
				hbvy = polarTemp[1];
			case 4:
				LUVtoXYZ( LstarY, caux, hbvy );
			break;

			case 1:
				this.Y = LstarToY( LstarY );
				this.X = 0.0;
				this.Z = 0.0;
			break;

			case 8:
				xyYtoXYZ( caux, hbvy, LstarY );
			break;

			case 9:
				this.Y = LstarY;
				this.X = 0.0;
				this.Z = 0.0;
			break;
			
			case 15:
				this.X = caux;
				this.Y = LstarY;
				this.Z = hbvy;
			break;
			
			default:
				this.X = CIEreturn.X;
				this.Y = CIEreturn.Y;
				this.Z = CIEreturn.Z;
		}
			
		XYZtoLinRGB();  // uses this.linR, this.linG, this.linB
		linear2sRGB();  // uses this.sR, this.sG, this.sB

		switch (outputType){
			case 'array':  // .......of light......
				return [this.sR,this.sG,this.sB];
			case 'string': // RGB hex string with # included at no additional charge.
				return hexStringNoA(this.sR,this.sG,this.sB);
			case 'number': // RGB as a single numeric value. Sad.
				return this.sR << 16 | this.sG << 8 | this.sB;
			case 'float':  // This is NOT sRGB !!! This is a linear FLOAT return
				return [this.linR, this.linG, this.linB];
		}		
	}

//\
///\
////\                                                  /////////////////////////
/////\  END CIE XYZ, xyY, LAB, and LUV FUNCTIONS END  //////////////////////////
////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////
//* SECTION SWITCH  (remove/add first slash to toggle: /* off   //* on )


//~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/
//~/~  RESEARCH ONLY ITEM: DEBUGS       ~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/
//~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/

/////  DEBUG METHODS  /////

// Reports the luminance of a color as if it is being clamped.
// Note this shows the clamped value even if the color is not the clamped one.
// Returns only string 'Y' when above clamp threshold

    this.toY100clamped = function (places = 4) {
        var clamped = (this.LYP <= blkThrs ) ? this.LYP : 'Y';
        return (isNaN(clamped)) ? clamped :
                'Yc' + (100 * (clamped + Math.pow(blkThrs - clamped,
                blkClmp))).toPrecision(places).substr(0,places + 4);
    }

// Returns array with the difference of the clamp and regular luminance.

    this.toY100clamp = function (type, places = 3) {
        var clamped = (this.LYP <= blkThrs ) ? this.LYP : 'Y';

        return (isNaN(clamped)) ? [ clamped, 'Δ', type, 'ebu' ] :
            ['Y ' + (100 * (clamped + Math.pow(blkThrs - clamped, blkClmp)))
            .toPrecision(places).substr(0,places + 4),
               'Δ ' + (100 * (Math.pow(blkThrs - clamped, blkClmp)))
            .toPrecision(places).substr(0,places + 4),
            type, 'ebu2' ];
    }
    
//  */  ////\ End of Switched Section /////
//////////////////////////////////////////


////\                                                          /////////////////
/////\  END sRGB INPUT FORM AND PROCESSING BLOCK              //////////////////
////////////////////////////////////////////////////////////////////////////////

} // Close RGBcolor() object

//\                                                         ////////////////////
///\                                                       /////////////////////
////\                                                     //////////////////////
/////\  END END   SAPC AND RGBCOLOR V0.98d  END END END  ///////////////////////
//////\  END END RGBcolor() OBJECT AND METHODS END END  ////////////////////////
////////////////////////////////////////////////////////////////////////////////


//  The movie's over, go home...
