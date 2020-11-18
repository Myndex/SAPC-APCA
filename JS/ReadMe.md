# Basic SAPC/APCA JS Functions

This is a simple set of JS functions and classes to determine a contrast value for a color pair, using a basic SAPC implementation. 

These are based on iteration SAPC-7, developed through a lengthy series of experiments and investigations. They with a soft black clamp for the darker color, and a basic set of constants for the power curve exponents to predict contrast under common use cases.

## APCAsRGB.98.js
The APCA version is the version licensed to the W3 for use in accessibility standards. Includes the sRGB parsing and CIE processing functions, and lots of comments.

## APCAsRGB.98.min.js
MiniMe version

## APCAsRGBonly.js
Similar to above, but does not include the loCon extension, nor the color object class for input parsing. If you want the bare basics, this is the one for you.

This APCA function takes sRGB encoded integer values 0-255. Useful if you already have good input parsing.

## SAPCsRGB.98.js
The SAPC version(s) are AGPL v3, with various added or experimental freatures such as the Low Contrast extension that enables measuring low contrasts down to about 1 or 2 Percent. These versions are not necessarily compliant with the emerging accessibility conformance model.

The SAPC version also has additional methods and experimental features.

## SAPCsRGB.98.min.js
MiniMe version


## INPUT FORMS

### TOTALLY REVISED for version 0.98 !!!

Some Variables, Properties, and Method names have been changed. Everything reorganized, and optimized. 

Added functionality such as CIE XYZ, xyY, LABm and LUV processing, alpha, decimal, linearization, Y, more hex, rgb() variants, "cleaned" input, and adding more. 

Thanks to Stoyan Stefanov for his input data parsing ideas from RGBColor.js

### SWITCHABLE SECTIONS 
- Allow you to turn off whole sections you might not need before minifying.

### OBJECT VARIABLES:
- this.CIE and others are a complete suite of CIE processing functions.
- this.cleaned is the input string stripped of spaces, #, junk, and set to lowercase.
    - not stripped is (),. as those are needed for rgb(0,0,0)
- If alpha is not present this.a is set to ''
- Fun experimental stuff!

### INPUT METHODS:
- Alpha channel support with auto detection.
    - Available as this.a (0-255) when exists
    - Note: at the moment Alpha channels are parsed but not calculated or multiplied against image data.
- more different flavors of hex
    - No need for a #, if you have it, it is automatically stripped.
    - Two digit hex: `F7` _immediately_ becomes `F7F7F7` until a third key is pressed.
    - Three & four digit hex — 888 becomes 888888
        - Side note it can return as either 3 or 6
    - Six or eight digit hex

### RETURN METHODS:
- CIE returns for XYZ, xyY, LAB, LUV,
- Linear float returns
- both simple sRGB exponent, and piecewise now supported.
- Hex returns
- Integer returns
- Decimal returns
- Linear returns
- L* returns
        
On the HTML page the input forms use local page JS functions for the new font select extension. This will eventually be moved to these JS pages. 

## SAMPLE HTML & CSS
These are a simple running implementation of SAPC in plain vanilla JS and HTML5, close to what is on myndex.com/SAPC/

Please let me know of any problems, ideas, comments, etc. 

Thank you!

Andrew Somers
(User Myndex)

You can see the current working version at https://www.myndex.com/SAPC/

There is more about this project on my main site, https://www.myndex.com/WEB/Perception
