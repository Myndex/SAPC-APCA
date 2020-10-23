////////////////////////////////////////////////////////////////////////////////
/////   SAPC — SLuv Advanced Perceptual Contrast Algorithm 0.97h2
/////          *** WITH Low Contrast Extention ***
/////
/////   Functions to parse color values and determine SAPC/APCA contrast
/////   Copyright © 2019-2020 by Andrew Somers. All Rights Reserved.
/////   LICENSE: GNU AGPL v3  https://www.gnu.org/licenses/
/////   CONTACT: For SAPC/APCA Please use the ISSUES tab at:
/////   https://github.com/Myndex/SAPC-APCA/
/////
/////   This version uses Math.pow() instead of ** for better compatibility
/////
/////   SAPC Method and Algorithim
/////   •••• Version 0.97h2 — LowCon by Andrew Somers ••••
/////   https://www.myndex.com/WEB/Perception
/////
/////   Thanks to Stoyan Stefanov for the input parsing object in rgbcolor.js
/////   which was a helpful start for prepping input twitter: @stoyanstefanov
/////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////
/////   *****  SAPC BLOCK  *****
/////
/////   For Evaluations, this is referred to as: SAPC-7
/////   S-LUV Advanced Perceptual Contrast
/////   Copyright © 2019-2020 by Andrew Somers. All Rights Reserved.
/////   SIMPLE VERSION — This Version Is Stripped Of Extensions:
/////       • No Color Vision Module
/////       • No Spatial Frequency Module
/////       • No Light Adaptation Module
/////       • No Dynamics Module
/////       • No Alpha Module
/////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////  CONSTANTS USED IN VERSION 0.97h  ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    const sRGBtrc = 2.218;
        // Transfer Curve (aka "Gamma") for sRGB linearization.
        // 2.223 or other values could be used instead
        // 2.218 sets unity with the piecewise sRGB at #777
        // Simple power curve vs piecewise described in docs

    const Rco = 0.2126;     // sRGB Red Coefficient (standard)
    const Gco = 0.7152;     // sRGB Green Coefficient (standard)
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

    const loConThresh = 0.4;    // Threshold level for the loCon extension
                                // Set to 0.0 to turn off loCon action
    const clipLevel = 0.0095;   // Output clip level. If loCon is not used
                                // This needs to be set to 0.12 at least


/////  locCon Soft Clamp function (Model B)  ///////////////////////////////////

    // The below constants replaced by parameters,
    // left here for documentation purposes.
    //const adaptCos = 2.8; // cosine factor — sets shape/amplitude of curve
    //const adaptCosRev = 2.6; // cosine factor for WoB
    //const adaptOffset = 0.6; // Offset trim
    //const adaptOffsetRev = 0.53;
    //const adaptThresh = 0.4; // Threshold for ramping in
    //const maxAdjust = 0.095; // clamp on maximum adjustment
    //const maxAdjustRev = 0.11;

    // All function parameters require positive values incl. SAPC

function loConRamp(
                SAPC,
                hiY = 1.0,
                adaptThresh = 0.4,
                adaptCos = 2.8,
                adaptOffset = 0.6,
                maxAdjust = 0.095
                ) {

    const adaptLo = 0.1;  // lower limit of input adjustment and scale factor
    const adaptExp = 0.25; // Luminance Adjust
    const adaptInv = 2.0; // Inverts shape of adjustment curve

    return Math.max(0, SAPC -
            Math.min(maxAdjust,
                Math.max(0,
                    (
                    (adaptInv -
                        Math.abs(
                            Math.cos(
                                Math.pow(hiY,adaptExp)
                                * adaptCos
                            )
                        )
                    ) - adaptOffset
                    )
                ) *
                Math.max(0,
                    Math.min(adaptLo,
                        ((adaptThresh - SAPC)/(adaptThresh - adaptLo))
                        * adaptLo
                    )
                )
            )
        );
}

////////////////////////////////////////////////////////////////////////////////
///// Basic SAPC Function with Low Contrast Extension //////////////////////////
////////////////////////////////////////////////////////////////////////////////

// This requires linear luminance Y as a 0-1.0 value, sent as an object.

function SAPCloConExt(BG,txt) {

    var SAPC = 0.0; // For holding raw SAPC values
    var outputContrast = 0.0; // For weighted final values
    var polarity = "";  // for indicating "LOW" polarity

        // Absent the color module, we are only concerned with Y at this point
        // For the color and some other modules, we would need the separate
        // RGB values, opacity value, etc.

    var Ybg = BG.toY();
    var Ytxt = txt.toY();

        /////   INSERT COLOR MODULE HERE    /////
        /////   INSERT ALPHA MODULE HERE    /////

    // Now, determine polarity, soft clamp black, and calculate contrast
    // Finally scale for easy to remember percentages
    // Note that reverse contrast (white text on black)
    // intentionally returns a negative number


    if ( Ybg >= Ytxt ) {    // For normal polarity, black text on white

            // soft clamp darkest input color when near black.
        Ytxt = (Ytxt > blkThrs) ? Ytxt : Ytxt + Math.pow(Math.abs(Ytxt - blkThrs), blkClmp);

        if (Ytxt > Ybg ) {    // Error catch for black colors that reverse
            return "Error"
        } else {
                // Calculate the APCA contrast value and scale
            SAPC = ( Math.pow(Ybg, normBGExp) - Math.pow(Ytxt, normTXTExp) ) * scaleBoW;

                // Apply low contrast ramp-out if under threshold
            outputContrast = (SAPC >= loConThresh) ? SAPC : outputContrast = loConRamp(SAPC,Ybg,loConThresh);
        }
    } else {    // For reverse polarity, white text on black

        Ybg = (Ybg > blkThrs) ? Ybg : Ybg + Math.pow(Math.abs(Ybg - blkThrs), blkClmp);

        if (Ybg > Ytxt ) {
            return "-Error"
        } else {
            SAPC = ( Math.pow(Ybg, revBGExp) - Math.pow(Ytxt, revTXTExp) ) * scaleWoB;
            polarity = "-";  // For reporting polarity of LOW returns

                // Note polarity flip going in and out of loConRamp()
            outputContrast = (SAPC <= -loConThresh) ? SAPC : outputContrast = -loConRamp(-SAPC,Ytxt,loConThresh,2.6,0.53,0.11);
        }
    }
        //  Hard clip output at clipLevel to eliminate noise and return string
    return (outputContrast > clipLevel || outputContrast < -clipLevel) ? (outputContrast * 100).toFixed(2) + "" : polarity + "LOW";
}

////////////////////////////////////////////////////////////////////////////////
/////  END OF APCA BLOCK  //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
/////  sRGB INPUT FORM BLOCK  //////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function RGBColor(color_string) {

    // strip spaces, #, & common junk and make a clean string
    color_string = color_string.replace(/[\s `~!@#$%^&*<>?{}:;"'_+=-]/g,'');

    this.cleaned = color_string = color_string.toLowerCase();   // set lowercase

        // See if name is match
        // and overwrite the input

        var HTMLcolors = {
            aliceblue:'f0f8ff', antiquewhite:'faebd7', aqua:'00ffff', aquamarine:'7fffd4', azure:'f0ffff', beige:'f5f5dc', bisque:'ffe4c4', black:'000000', blanchedalmond:'ffebcd', blue:'0000ff', blueviolet:'8a2be2', brown:'a52a2a', burlywood:'deb887', cadetblue:'5f9ea0', chartreuse:'7fff00', chocolate:'d2691e', coral:'ff7f50', cornflowerblue:'6495ed', cornsilk:'fff8dc', crimson:'dc143c', cyan:'00ffff', darkblue:'00008b', darkcyan:'008b8b', darkgoldenrod:'b8860b', darkgray:'a9a9a9', darkorange:'ff8c00', darksalmon:'e9967a', darkseagreen:'8fbc8f', deepskyblue:'00bfff', dodgerblue:'1e90ff', feldspar:'d19275', darkgreen:'006400', darkkhaki:'bdb76b', darkmagenta:'8b008b', darkolivegreen:'556b2f', darkorchid:'9932cc', darkred:'8b0000', darkslateblue:'483d8b', darkslategray:'2f4f4f', darkturquoise:'00ced1', darkviolet:'9400d3', deeppink:'ff1493', dimgray:'696969', firebrick:'b22222', floralwhite:'fffaf0', forestgreen:'228b22', fuchsia:'ff00ff', gainsboro:'dcdcdc', ghostwhite:'f8f8ff', gold:'ffd700', goldenrod:'daa520', gray:'808080', green:'008000', greenyellow:'adff2f', honeydew:'f0fff0', hotpink:'ff69b4', indianred:'cd5c5c', indigo:'4b0082', ivory:'fffff0', khaki:'f0e68c', lavender:'e6e6fa', lavenderblush:'fff0f5', lawngreen:'7cfc00', lemonchiffon:'fffacd', lightblue:'add8e6', lightcoral:'f08080', lightcyan:'e0ffff', lightgoldenrodyellow:'fafad2', lightgrey:'d3d3d3', lightgreen:'90ee90', lightpink:'ffb6c1', lightsalmon:'ffa07a', lightseagreen:'20b2aa', lightskyblue:'87cefa', lightslateblue:'8470ff', lightslategray:'778899', lightsteelblue:'b0c4de', lightyellow:'ffffe0', lime:'00ff00', limegreen:'32cd32', linen:'faf0e6', magenta:'ff00ff', maroon:'800000', mediumaquamarine:'66cdaa', mediumblue:'0000cd', mediumorchid:'ba55d3', mediumpurple:'9370d8', mediumseagreen:'3cb371', mediumslateblue:'7b68ee', mediumspringgreen:'00fa9a', mediumturquoise:'48d1cc', mediumvioletred:'c71585', midnightblue:'191970', mintcream:'f5fffa', mistyrose:'ffe4e1', moccasin:'ffe4b5', navajowhite:'ffdead', navy:'000080', oldlace:'fdf5e6', olive:'808000', olivedrab:'6b8e23', orange:'ffa500', orangered:'ff4500', orchid:'da70d6', palegoldenrod:'eee8aa', palegreen:'98fb98', paleturquoise:'afeeee', palevioletred:'d87093', papayawhip:'ffefd5', peachpuff:'ffdab9', peru:'cd853f', pink:'ffc0cb', plum:'dda0dd', powderblue:'b0e0e6', purple:'800080', red:'ff0000', rosybrown:'bc8f8f', royalblue:'4169e1', saddlebrown:'8b4513', salmon:'fa8072', sandybrown:'f4a460', seagreen:'2e8b57', seashell:'fff5ee', sienna:'a0522d', silver:'c0c0c0', skyblue:'87ceeb', slateblue:'6a5acd', slategray:'708090', snow:'fffafa', springgreen:'00ff7f', steelblue:'4682b4', tan:'d2b48c', teal:'008080', thistle:'d8bfd8', tomato:'ff6347', turquoise:'40e0d0', violet:'ee82ee', violetred:'d02090', wheat:'f5deb3', white:'ffffff', whitesmoke:'f5f5f5', yellow:'ffff00', yellowgreen:'9acd32'
        };

        for (var key in HTMLcolors) {
            if (color_string == key) {
                color_string = HTMLcolors[key];
            }
        }

    // end of HTML type-in colors

    // array of color definition objects
    // objects with alpha are separated, and immediately follow the
    // non-alpha version. Decimal rgb is not added yet.
    // 
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
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
            re: /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
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
            re: /^([0-9|a-f]{2})$/,
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
            re: /^([0-9|a-f]{1})([0-9|a-f]{1})([0-9|a-f]{1})$/,
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
            re: /^([0-9|a-f]{1})([0-9|a-f]{1})([0-9|a-f]{1})([0-9|a-f]{1})$/,
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
            re: /^([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})$/,
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
            re: /^([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})([0-9|a-f]{2})$/,
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


    // REGEX SEARCHES TO DETERMINE INPUT TYPE
    // NEW: Alpha Inputs and the new "2 Char Hex"
    // Which auto makes grey based on the first
    // two characters typed. (f4 becomes f4f4f4)

    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
			var channel = processor(bits);
            this.r = channel[0];
            this.g = channel[1];
            this.b = channel[2];
            (isNaN(channel[3])) ? this.a = '' : this.a = channel[3];
            this.ok = true;
        }
    }


    // validate & cleanup values. Final alpha cleaning is here

    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
  this.a = (this.a < 0 ) ? 0 : ((this.a > 255 || isNaN(this.a)) ? '' : this.a);


////////////////////////////////////////////////////////////////////////////////
/////   get a variety of things that need to be gotten (getters)   /////////////
////////////////////////////////////////////////////////////////////////////////


    // toHex — returns plain 6 or 8 char hex string no hash # or 0x
    
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        var a = this.a.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        if (a.length == 1) a = '0' + a;
        return r + g + b + a;
    }

    // toHex2 — returns 6 char hex string with hash # and IGNORING the alpha
    
    this.toHex2 = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // toHex3 — returns hex string of 3 or 4 chars if that was entered, adds a #
    
    this.toHex3 = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        var a = this.a.toString(16);
        if ( this.r % 17 == 0 &&
             this.g % 17 == 0 &&
             this.b % 17 == 0 &&
             this.a % 17 == 0 ) {
            return '#' + r.charAt(0) + g.charAt(0) + b.charAt(0) + a.charAt(0);
        } else {
            if (r.length == 1) r = '0' + r;
            if (g.length == 1) g = '0' + g;
            if (b.length == 1) b = '0' + b;
            if (a.length == 1) a = '0' + a;
            return '#' + r + g + b + a;
        }
    }

    // toHEX4 — returns hex string of 3 or 4 chars if that was entered no #
    
    this.toHex4 = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        var a = this.a.toString(16);
        if ( this.r % 17 == 0 &&
             this.g % 17 == 0 &&
             this.b % 17 == 0 &&
             this.a % 17 == 0 ) {
            return r.charAt(0) + g.charAt(0) + b.charAt(0) + a.charAt(0);
        } else {
            if (r.length == 1) r = '0' + r;
            if (g.length == 1) g = '0' + g;
            if (b.length == 1) b = '0' + b;
            if (a.length == 1) a = '0' + a;
            return r + g + b + a;
        }
    }

    // toRGB — returns rgb() value string no spaces
    this.toRGB = function () {
        return ( this.a == '') ?
        'rgb(' + this.r + ',' + this.g + ',' + this.b + ')' :
        'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';

    }

    // toRGB2 — returns rgb() value string with spaces & IGNORES alpha if any
    
    this.toRGB2 = function () {
        return 'rgb( ' + this.r + ', ' + this.g + ', ' + this.b + ' )';
    }

    // toRGB3 — returns rgb() value string using decimal 0.0-1.0
    // Returns rgba only if alpha is present
    
    this.toRGB3 = function (places = 3) {
        return ( this.a == '') ?
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

    // toDec — returns decimal array for R, G, and B
    this.toDec = function () {
        return [this.r/255.0,this.g/255.0,this.b/255.0];
    }

    // toAlpha — returns decimal A
    this.toAlpha = function () {
        return this.a/255.0;
    }

    // toAlphaPow — returns decimal A with sRGB linearizing (experimental)
    this.toAlphaPow = function () {
        return Math.pow(this.a/255.0, sRGBtrc);
    }

    // toAlphaKungPow — returns decimal A with sRGB invert (experimental)
    this.toAlphaKungPow = function () {
        return Math.pow(this.a/255.0, 1 / sRGBtrc);
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

    // RlinCo — returns linearized R, G, B but adjusted with sRGB coefficients

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
        return  (Math.pow(this.r/255.0, sRGBtrc) * Rco
               + Math.pow(this.g/255.0, sRGBtrc) * Gco
               + Math.pow(this.b/255.0, sRGBtrc) * Bco);
    }

    // toY100 — This returns linear Y scaled 0-100

    this.toY100 = function () {
        return  100 * (Math.pow(this.r/255.0, sRGBtrc) * Rco
                     + Math.pow(this.g/255.0, sRGBtrc) * Gco
                     + Math.pow(this.b/255.0, sRGBtrc) * Bco);
    }

    // toY100str — This returns linear Y 100 with Precision and Str trim

    this.toY100str = function (places = 4) {
        return  (100 * (Math.pow(this.r/255.0, sRGBtrc) * Rco
                     + Math.pow(this.g/255.0, sRGBtrc) * Gco
                     + Math.pow(this.b/255.0, sRGBtrc) * Bco))
            .toPrecision(places).substr(0,places + 4);
    }



    // toLstar — This returns Perceptual Lightness L* as in LAB

    this.toLstar = function (refY = 1.0) {
        var Y = (Math.pow(this.r/255.0, sRGBtrc) * Rco
                + Math.pow(this.g/255.0, sRGBtrc) * Gco
                + Math.pow(this.b/255.0, sRGBtrc) * Bco);
        
        Y = Y / refY;
        
        return ( Y > 0.0088564516790356 )
                ? Math.pow(Y, 0.3333333333333333) * 116.0 - 16.0
                : Y * 903.2962962962962963;
    }


    // toLstarStr — Perceptual Lightness with Precision and Str trim
    // IMPORTANT: don't forget that the 'places' is the SECOND parameter

    this.toLstarStr = function (refY = 1.0, places = 4) {
        var Y = (Math.pow(this.r/255.0, sRGBtrc) * Rco
                + Math.pow(this.g/255.0, sRGBtrc) * Gco
                + Math.pow(this.b/255.0, sRGBtrc) * Bco);
        
        Y = Y / refY;
        
        return (( Y > 0.0088564516790356 ) ? 
            Math.pow(Y, 0.3333333333333333) * 116.0 - 16.0 :
            Y * 903.2962962962962963)
            .toPrecision(places).substr(0,places + 4);
    }



////////////////////////////////////////////////////////////////////////////////
///// LIST HTML COLOR NAMES WITH PATCHES & INFO ON REQUEST /////////////////////
////////////////////////////////////////////////////////////////////////////////


    this.getHelpXML = function () {

    var examples = new Array();

// add regexps
//  for (var i = 0; i < color_defs.length; i++) {
//      var example = color_defs[i].example;
//      for (var j = 0; j < example.length; j++) {
//          examples[examples.length] = example[j];
//      }
//  }
//

    // add type-in colors
    for (var hc in HTMLcolors) {
        examples[examples.length] = hc;
    }

    var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var text_color = (list_color.toY100() > 32) ? '000' : 'FFF' ;
                var example_div = document.createElement('div');
                example_div.style.cssText =
                'background-color: #' + list_color.toHex() + '; '
                + 'color: #' + text_color
                ;
                example_div.appendChild(document.createTextNode(examples[i]));
                example_div.appendChild(document.createElement('br'));
                example_div.appendChild(document.createElement('br'));
                var inside_span = example_div.appendChild(document.createElement('span'));
                inside_span.appendChild(document.createTextNode(list_color.toHex2()));
                inside_span.appendChild(document.createElement('br'));
                inside_span.appendChild(document.createTextNode(list_color.toRGB2()));
                inside_span.appendChild(document.createElement('br'));
                inside_span.appendChild(document.createTextNode(
                'Luminance: ' + list_color.toY100().toPrecision(4)  + ' Y'));

                var list_item_value = document.createTextNode(
                ' Channel Luminances: RlinY: ' + list_color.RlinCo().toPrecision(4) + ' GlinY: ' + list_color.GlinCo().toPrecision(4) +
                    ' BlinY: ' + list_color.BlinCo().toPrecision(4)
                );

                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);

                xml.appendChild(list_item);

            } catch(e){}
        }

        return xml;
    }
}

////////////////////////////////////////////////////////////////////////////////
/////  END sRGB INPUT FORM BLOCK  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

