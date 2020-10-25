# Basic SAPC/APCA JS Functions

This is a simple set of JS functions and classes to determine a contrast value for a color pair, using a basic SAPC implementation. 

These are based on iteration SAPC-7, developed through a lengthy series of experiments and investigations. They with a soft black clamp for the darker color, and a basic set of constants for the power curve exponents to predict contrast under common use cases.

## APCAsRGB.js
The APCA version is the version licensed to the W3 for use in accessibility standards.

## APCAsRGBonly.js
Same as above, but does not include the color object class for input parsing.

This APCA function takes sRGB encoded integer values 0-255. Useful if you already have good input parsing.

## LowConSAPCsRGB.js
The SAPC version(s) are AGPL v3, with various added or experimental freatures such as the Low Contrast extension that enables measuring low contrasts down to about 1 or 2 Percent. These versions are not necessarily compliant with the emerging accessibility conformance model.

### PLANNED:
#### Adds for SAPC:
1. Color module
2. Spatial module
3. Screen Adaptation module
4. Impairment Offset module
5. Add support for opacity calculation

## INPUT FORMS
Thanks to Stoyan Stefanov for RGBColor.js which we used as a jumping off point for input data parsing including named colors.
This object was chosen as it handled direct input of 3 or 6 digit Hex, sRGB int, and HTML color names. 

For SAPC we added functionality such as alpha, decimal, linearization, Y, more hex, rgb() variants, "cleaned" input, and adding more. Currently the variables and methods:

### OBJECT VARIABLES:
- this.cleaned is the input string stripped of spaces, #, junk, and set to lowercase.
    - not stripped is (),. as those are needed for rgb(0,0,0)
- Main variables are INT clamped 0-255 as this.r this.g this.b this.a
    - If alpha is not present this.a is set to ''

### INPUT METHODS:
- Alpha channel support with auto detection.
    - Available as this.a (0-255) when exists
    - this.toAlphaPow applies the sRGB inverse power curve (linearize)
    - Note: at the moment Alpha channels are parsed but not calculated or multiplied against image data.
- more different flavors of hex
    - No need for a #, if you have it, it is automatically stripped.
    - Two digit hex: `F7` _immediately_ becomes `F7F7F7` until a third key is pressed.
    - Three & four digit hex — 888 becomes 888888
        - Side note it can return as either 3 or 6
    - Six or eight digit hex

### RETURN METHODS:
- Hex returns
    - this.toHex() — returns plain 6 or 8 char hex string no hash # or 0x
    - this.toHex2() — returns 6 char hex string WITH hash # and ignoring alpha
    - this.toHex3() — returns 3,4,6,8 char hex string WITH hash #
        - if a 3 digit hex is entered, 3 digits is returned ddd not dddddd as the frist two do
    - this.toHex4() — same as toHex3 no hash # added.
- Integer returns
    - this.toRGB() returns a string of 0-255 as rgb(0,0,0)
        - if alpha is present, returns rgba(0,0,0,0)
    - this.toRGB2() ignores the alpha
- Decimal returns
    - this.toRGB3() returns as decimal 0.0-1.0 rgb(0.0,0.0,0.0)
        - if alpha is present, returns rgba(0.0,0.0,0.0,0.0)
    - this.toDec() returns an array of sRGB as 0.0-1.0
        - this.toAlpha return 0.0-1.0
- Linear returns
    - this.toRlin(), toGlin(), toBlin() returns 0.0-1.0, linearized using sRGBtrc
        - this.toAlphaPow returns 0.0-1.0 with sRGBtrc applied
        - this.toAlphaKungPow returns 0.0-1.0 with INVERSE sRGBtrc applied
    - this.toRlinCo(), toGlinCo(), toBlinCo() returns 0.0-1.0, linearized BUT ALSO applying the coefficients
        - Thus .toRlinCo() + .toGlinCo() + .toBlinCo() =  Y  however:
    - this.toY() — This returns linear Y (luminance)
    - this.toY()100 — This returns linear Y (luminance) as 0.0-100.0
    - this.toY(places)100str — This returns linear Y (luminance) as a string toPrecision(places)
- L* returns
    - this.toLstar(refY) — This returns Perceptual Lightness L* as in LAB 
        - Optional refY is whitepoint (default is 1.0)
    - this.toLstarStr(refY,places) — Perceptual Lightness L* as a string toPrecision(places)
        
On the HTML page the input forms use local page JS functions for dynamic auto update, and we've added HTML5 sliders/pickers — some browsers such as Safari support dynamic updates using these. YMMV.

### PLANNED:
#### Adds for the input object:
1. ~~Add support for opacity~~ Done, but now need to add methods for using
2. Add support for LAB or LUV type spaces for input and return

## SAMPLE HTML & CSS
These are a simple running implementation of SAPC in plain vanilla JS and HTML5, close to what is on myndex.com/SAPC/

Please let me know of any problems, ideas, comments, etc. 

Thank you!

Andrew Somers
(User Myndex)

You can see the current working version at https://www.myndex.com/SAPC/

There is more about this project on my main site, https://www.myndex.com/WEB/Perception
