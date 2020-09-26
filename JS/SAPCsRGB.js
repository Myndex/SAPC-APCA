////////////////////////////////////////////////////////////////////////////////
/////	Functions to parse color values and determine SAPC contrast
/////	REQUIREMENTS: ECMAScript 6 - ECMAScript 2015
/////	
/////	SAPC (Advanced Perceotual Contrast) tool 
/////	•••• Version 0.97b by Andrew Somers ••••
/////	https://www.myndex.com/WEB/Perception
/////	
/////	Input Form Parsing:
/////	Color value input parsing based on rgbcolor.js by
/////	Stoyan Stefanov <sstoo@gmail.com>
/////	His site: http://www.phpied.com/rgb-color-parser-in-javascript/
/////	rgbcolor.js is MIT license
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////
/////	*****  SAPC BLOCK  *****
/////
/////	For Evaluations, this is referred to as: SAPC-7
/////	Somers S-LUV Advanced Perceptual Contrast v0.97b beta
/////	Copyright © 2019-2020 by Andrew Somers. All Rights Reserved.
/////	SAPC/APCA is Licensed to the W3C Per Collaborator Agreement
/////	SIMPLE VERSION — This Version Is Stripped Of Extensions:
/////		• No Color Vision Module
/////		• No Spatial Frequency Module
/////		• No Light Adaptation Module
/////		• No Dynamics Module
/////		• No Alpha Module
/////
////////////////////////////////////////////////////////////////////////////////


///// CONSTANTS USED IN VERSION 0.97b //////////////////////////////////////////

	const sRGBtrc = 2.218;	// Gamma for sRGB linearization. 2.223 could be used instead
				// 2.218 sets unity with the piecewise sRGB at #777
                                // Sept 2020 note: a higher gamma of 2.4 or 2.5 may provide
                                // a more accurate model of real world environments

	const Rco = 0.2126;		// sRGB Red Coefficient
	const Gco = 0.7156;		// sRGB Green Coefficient
	const Bco = 0.0722;		// sRGB Blue Coefficient

	const scaleBoW = 161.8;         // Scaling for dark text on light (phi * 100)
	const scaleWoB = 161.8;         // Scaling for light text on dark — same as BoW, but
					// this is separate for possible future use.

	const normBGExp = 0.38;		// Constants for Power Curve Exponents.
	const normTXTExp = 0.43;	// One pair for normal text,and one for REVERSE
	const revBGExp = 0.5;		// FUTURE: These will eventually be dynamic
	const revTXTExp = 0.43;		// as a function of light adaptation and context

	const blkThrs = 0.02;	// Level that triggers the soft black clamp
	const blkClmp = 1.75;	// Exponent for the soft black clamp curve

///// Ultra Simple Basic Bare Bones SAPC Function //////////////////////////////

	// This REQUIRES linearized R,G,B values of 0.0-1.0

function SAPCbasic(Rbg,Gbg,Bbg,Rtxt,Gtxt,Btxt) {

	var	SAPC = 0.0;

	// Find Y by applying coefficients and sum.
	// This REQUIRES linearized R,G,B 0.0-1.0
	
	var	Ybg = Rbg*Rco + Gbg*Gco + Bbg*Bco;
	var	Ytxt = Rtxt*Rco + Gtxt*Gco + Btxt*Bco;

		/////	INSERT COLOR MODULE HERE	/////

	// Now, determine polarity, soft clamp black, and calculate contrast
	// Finally scale for easy to remember percentages
	// Note that reverse (white text on black) intentionally
	// returns a negative number

	if ( Ybg > Ytxt ) {	///// For normal polarity, black text on white

			// soft clamp darkest color if near black.
		Ytxt = (Ytxt > blkThrs) ? Ytxt : Ytxt + Math.abs(Ytxt - blkThrs) ** blkClmp;
		SAPC = ( Ybg ** normBGExp - Ytxt ** normTXTExp ) * scaleBoW;
		
		return (SAPC < 15 ) ? "0%" : SAPC.toPrecision(3) + "%";
		
	} else {			///// For reverse polarity, white text on black

		Ybg = (Ybg > blkThrs) ? Ybg : Ybg + Math.abs(Ybg - blkThrs) ** blkClmp;
		SAPC = ( Ybg ** revBGExp - Ytxt ** revTXTExp ) * scaleWoB;

		return (SAPC > -15 ) ? "0%" : SAPC.toPrecision(3) + "%";
	}

	// If SAPC's more than 15%, return that value, otherwise clamp to zero
	// this is to remove noise and unusual behavior if the user inputs
	// colors too close to each other.
	// This will be more important with future modules. Nevertheless
	// In order to simplify code, SAPC will not report accurate contrasts
	// of less than approximately 15%, so those are clamped. 
	// 25% is the "point of invisibility" for many people.

}

//////////////////////////////////////////////////////////////
///// END OF SAPC BLOCK             //////////////////////////
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
///// sRGB INPUT FORM BLOCK (Based on rgbcolor.js)  //////////
//////////////////////////////////////////////////////////////


function RGBColor(color_string) {
	
	this.ok = false;

	// strip any leading #
	if (color_string.charAt(0) == '#') {	// remove # if any
		color_string = color_string.substr(1,6);
	}
	color_string = color_string.replace(/ /g,'');	// strip spaces
	color_string = color_string.toLowerCase();		// set lowercase

	// before getting into regexps, try simple matches
	// and overwrite the input

	var simple_colors = {
		aliceblue: 'f0f8ff',
		antiquewhite: 'faebd7',
		aqua: '00ffff',
		aquamarine: '7fffd4',
		azure: 'f0ffff',
		beige: 'f5f5dc',
		bisque: 'ffe4c4',
		black: '000000',
		blanchedalmond: 'ffebcd',
		blue: '0000ff',
		blueviolet: '8a2be2',
		brown: 'a52a2a',
		burlywood: 'deb887',
		cadetblue: '5f9ea0',
		chartreuse: '7fff00',
		chocolate: 'd2691e',
		coral: 'ff7f50',
		cornflowerblue: '6495ed',
		cornsilk: 'fff8dc',
		crimson: 'dc143c',
		cyan: '00ffff',
		darkblue: '00008b',
		darkcyan: '008b8b',
		darkgoldenrod: 'b8860b',
		darkgray: 'a9a9a9',
		darkgreen: '006400',
		darkkhaki: 'bdb76b',
		darkmagenta: '8b008b',
		darkolivegreen: '556b2f',
		darkorange: 'ff8c00',
		darkorchid: '9932cc',
		darkred: '8b0000',
		darksalmon: 'e9967a',
		darkseagreen: '8fbc8f',
		darkslateblue: '483d8b',
		darkslategray: '2f4f4f',
		darkturquoise: '00ced1',
		darkviolet: '9400d3',
		deeppink: 'ff1493',
		deepskyblue: '00bfff',
		dimgray: '696969',
		dodgerblue: '1e90ff',
		feldspar: 'd19275',
		firebrick: 'b22222',
		floralwhite: 'fffaf0',
		forestgreen: '228b22',
		fuchsia: 'ff00ff',
		gainsboro: 'dcdcdc',
		ghostwhite: 'f8f8ff',
		gold: 'ffd700',
		goldenrod: 'daa520',
		gray: '808080',
		green: '008000',
		greenyellow: 'adff2f',
		honeydew: 'f0fff0',
		hotpink: 'ff69b4',
		indianred : 'cd5c5c',
		indigo : '4b0082',
		ivory: 'fffff0',
		khaki: 'f0e68c',
		lavender: 'e6e6fa',
		lavenderblush: 'fff0f5',
		lawngreen: '7cfc00',
		lemonchiffon: 'fffacd',
		lightblue: 'add8e6',
		lightcoral: 'f08080',
		lightcyan: 'e0ffff',
		lightgoldenrodyellow: 'fafad2',
		lightgrey: 'd3d3d3',
		lightgreen: '90ee90',
		lightpink: 'ffb6c1',
		lightsalmon: 'ffa07a',
		lightseagreen: '20b2aa',
		lightskyblue: '87cefa',
		lightslateblue: '8470ff',
		lightslategray: '778899',
		lightsteelblue: 'b0c4de',
		lightyellow: 'ffffe0',
		lime: '00ff00',
		limegreen: '32cd32',
		linen: 'faf0e6',
		magenta: 'ff00ff',
		maroon: '800000',
		mediumaquamarine: '66cdaa',
		mediumblue: '0000cd',
		mediumorchid: 'ba55d3',
		mediumpurple: '9370d8',
		mediumseagreen: '3cb371',
		mediumslateblue: '7b68ee',
		mediumspringgreen: '00fa9a',
		mediumturquoise: '48d1cc',
		mediumvioletred: 'c71585',
		midnightblue: '191970',
		mintcream: 'f5fffa',
		mistyrose: 'ffe4e1',
		moccasin: 'ffe4b5',
		navajowhite: 'ffdead',
		navy: '000080',
		oldlace: 'fdf5e6',
		olive: '808000',
		olivedrab: '6b8e23',
		orange: 'ffa500',
		orangered: 'ff4500',
		orchid: 'da70d6',
		palegoldenrod: 'eee8aa',
		palegreen: '98fb98',
		paleturquoise: 'afeeee',
		palevioletred: 'd87093',
		papayawhip: 'ffefd5',
		peachpuff: 'ffdab9',
		peru: 'cd853f',
		pink: 'ffc0cb',
		plum: 'dda0dd',
		powderblue: 'b0e0e6',
		purple: '800080',
		red: 'ff0000',
		rosybrown: 'bc8f8f',
		royalblue: '4169e1',
		saddlebrown: '8b4513',
		salmon: 'fa8072',
		sandybrown: 'f4a460',
		seagreen: '2e8b57',
		seashell: 'fff5ee',
		sienna: 'a0522d',
		silver: 'c0c0c0',
		skyblue: '87ceeb',
		slateblue: '6a5acd',
		slategray: '708090',
		snow: 'fffafa',
		springgreen: '00ff7f',
		steelblue: '4682b4',
		tan: 'd2b48c',
		teal: '008080',
		thistle: 'd8bfd8',
		tomato: 'ff6347',
		turquoise: '40e0d0',
		violet: 'ee82ee',
		violetred: 'd02090',
		wheat: 'f5deb3',
		white: 'ffffff',
		whitesmoke: 'f5f5f5',
		yellow: 'ffff00',
		yellowgreen: '9acd32'
	};

	for (var key in simple_colors) {
		if (color_string == key) {
			color_string = simple_colors[key];
		}
	}
	// end of simple type-in colors



	// array of color definition objects
	var color_defs = [
		{
			re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
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
			re: /^(\w{2})(\w{2})(\w{2})$/,
			example: ['#0F0', '369'],
			process: function (bits){
				return [
					parseInt(bits[1], 16),
					parseInt(bits[2], 16),
					parseInt(bits[3], 16)
				];
			}
		},
		{
			re: /^(\w{1})(\w{1})(\w{1})$/,
			example: ['#FB0', 'F0F'],
			process: function (bits){
				return [
					parseInt(bits[1] + bits[1], 16),
					parseInt(bits[2] + bits[2], 16),
					parseInt(bits[3] + bits[3], 16)
				];
			}
		}
	];



	// search through the definitions to find a match
	for (var i = 0; i < color_defs.length; i++) {
		var re = color_defs[i].re;
		var processor = color_defs[i].process;
		var bits = re.exec(color_string);
		if (bits) {
			channels = processor(bits);
			this.r = channels[0];
			this.g = channels[1];
			this.b = channels[2];
			this.ok = true;
		}
	}


	// validate & cleanup values
	this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
	this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
	this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);


	// get a variety of things that need to be gotten

	// toRGB — returns rgb() value string
	this.toRGB = function () {
		return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
	}

	// toRGB2 — returns rgb() value string
	this.toRGB2 = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';

	// toHEX — returns hex string
	this.toHex = function () {
		var r = this.r.toString(16);
		var g = this.g.toString(16);
		var b = this.b.toString(16);
		if (r.length == 1) r = '0' + r;
		if (g.length == 1) g = '0' + g;
		if (b.length == 1) b = '0' + b;
		return '#' + r + g + b;
	}

	// toDec — returns decimal array for R, G, and B
	this.toDec = function () {
		return [this.r/255.0,this.g/255.0,this.b/255.0];
	}


	// Rlin — these return linearized R, G, or B

	this.Rlin = function () {
		return Math.pow(this.r/255.0, sRGBtrc);
	}
	this.Glin = function () {
		return Math.pow(this.g/255.0, sRGBtrc);
	}
	this.Blin = function () {
		return Math.pow(this.b/255.0, sRGBtrc);
	}


	// RlinCo — these return linearized R, G, or B but adjusted with sRGB coefficients

	this.RlinCo = function () {
		return Rco * Math.pow(this.r/255.0, sRGBtrc);
	}
	this.GlinCo = function () {
		return Gco * Math.pow(this.g/255.0, sRGBtrc);
	}
	this.BlinCo = function () {
		return Bco * Math.pow(this.b/255.0, sRGBtrc);
	}


	// toY — This returns linear Y (luminance)

	this.toY = function () {
		return 	Math.pow(this.r/255.0, sRGBtrc) * Rco + Math.pow(this.g/255.0, sRGBtrc) * Gco + Math.pow(this.b/255.0, sRGBtrc) * Bco;
	}

	
	// help and test

	this.getHelpXML = function () {

	var examples = new Array();

// add regexps
//	for (var i = 0; i < color_defs.length; i++) {
//		var example = color_defs[i].example;
//		for (var j = 0; j < example.length; j++) {
//			examples[examples.length] = example[j];
//		}
//	}
//

	// add type-in colors
	for (var sc in simple_colors) {
		examples[examples.length] = sc;
	}

	var xml = document.createElement('ul');
		xml.setAttribute('id', 'rgbcolor-examples');
		for (var i = 0; i < examples.length; i++) {
			try {
				var list_item = document.createElement('li');
				var list_color = new RGBColor(examples[i]);
				var example_div = document.createElement('div');
				example_div.style.cssText =
				'margin: 3px; '
				+ 'border: 1px solid #777; '
				+ 'background:' + list_color.toHex() + '; '
				+ 'color:' + list_color.toHex()
				;
				example_div.appendChild(document.createTextNode('test'));
				var list_item_value = document.createTextNode(
					' ' + examples[i] + '  ⇨  ' + list_color.toY().toPrecision(2)  + ' Y  ⇨  ' + list_color.toHex() + ' ⇨ ' + list_color.toRGB() +
					' ⇨ Rlin:' + list_color.Rlin().toPrecision(3) + ' Glin:' + list_color.Glin().toPrecision(3) + 
					' Blin:' + list_color.Blin().toPrecision(3)
				);
				list_item.appendChild(example_div);
				list_item.appendChild(list_item_value);
				xml.appendChild(list_item);

			} catch(e){}
		}
		
		return xml;
	}
}

//////////////////////////////////////////////////////////////
///// END sRGB INPUT FORM BLOCK         //////////////////////
//////////////////////////////////////////////////////////////

