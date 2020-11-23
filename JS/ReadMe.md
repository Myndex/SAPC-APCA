# APCA/SAPC JS Function Documentation

This is a set of JS functions/objects to determine a contrast value for a color pair, using the SAPC/APCA methods. 

These are based on research iteration SAPC-7c, developed through a lengthy series of experiments and investigations. They all have a soft black clamp for the darker color, and a basic set of constants for the power curve exponents to predict an etimated perceptual contrast under common use case envirnments. These are active beta and are receiving updates and changes regularly.

-----
## APCAsRGBonly.js — SIMPLE QUICK START
The APCA version is the version licensed to the W3/WAI for use in accessibility standards.

If you want to dive in fast, or you want the bare basics, this is the file for you. This does not come with the input parsing and processing functions of the larger files — it is the base APCA algorithim only, with no extensions. Send it two RGB colors and it returns a contrast value.

This APCA function takes two sRGB encoded colors, with each channel a separated integer value 0-255. This assumes you already have input parsing/clamping 0-255.

### API
The API for "APCAonly.98.js" is trivially simple. Send it 8bit integer sRGB values for BACKGROUND and TEXT, and it returns a string with the APCA contrast result.

**`var contrastString = APCAonly(BGr,BGg,BGb,TXTr,TXTg,TXTb)`**

Each parameter input must be 0-255 and sRGB encoded. A string is returned, which will be a value such as **`'89.4 Lc'`** or **`'-102.3 Lc'`** or **`'LOW'`**. Negative values mean light text and a dark background, positive values mean dark text and a light background.

### IMPORTANT: Do Not Mix Up Text and Background inputs.
**APCA is polarity dependent, and correct results require that the BG and TXT are processed via the correct inputs.**

If you don't want a string return, optionally there are some comment switches that can enable returns of numeric values instead of a string - just add a slash to enable:
` ( /* is off   //* is on ) `.
 
If you need input string parsing of hex and HTML named colors, rgb(123,123,123), CIE LAB LCh processing, etc. then use one of the files below, or add the companion project [SeeLab](https://github.com/Myndex/SeeLab).

-----
## APCAsRGB.98.js
This file includes the sRGB string input parsing and CIE processing functions, and lots of comments on usage. _The Font Select extension is not incorporated in this file yet_, at present that exists in the HTML file, but will be moved here soon. 

### Basic API
In this version, the APCAcontrast() algorithm expects to see linear **Y** passed as an RGBcolor() object. For the following example, the background color is hex `#EEA` and the text color is HTML name `"Dark Slate Blue"` and should return a contrast of 101.6 L<sup>c</sup>.

    var BG  = new RGBcolor('#EEA');
    var TXT = new RGBcolor('Dark Slate Blue');
    
    var contrastResult = APCAcontrast(BG,TXT);
    
    console.log(contrastResult) // expected: '101.6 Lc'
### Regarding Results
The expected result is a string **`'101.6 Lc'`** though if desired, comment switches allow setting a numeric only return.
**IMPORTANT:** if you swap the colors so TXT is `'eea'` and BG is `'darkslateblue'` then the reported contrast would be **`'-108.8 Lc'`**. This is because reverse (light text on dark) reports as negative to make it clear and not to be confused with outputs for normal (dark text on light BG.) We perceive light text on a dark BG differently than dark text on light, and APCA accomodates that difference in perception.

### Input Parsing and sRGB Processing
This JS file includes [SeeLab](https://github.com/Myndex/SeeLab) input color string parsing and CIE procesing.

**` RGBcolor() `** strips off #, spaces, junk, sets all to lower case, etc. This is available as ` this.cleaned `, so for the background ` BG.cleaned ` would return ` eea `. To query if the color was correctly parsed, ` this.ok ` is a boolean that only returns true if the color was able to be parsed. 

The RGB tuples are available as INTs ` this.r .g .b ` so for the background, ` BG.r==238, BG.g==238, BG.b==170 ` but are also available via additional methods or properties ` BG.hex ` returns `'eeeeaa'` and ` BG.rgb ` returns `'rgb(238,238,170)'` and there are many more, including CIE spaces like LABLCh. Details in the file comments, and summarized below.

## APCAsRGB.98.min.js
MiniMe version — identical to the above but minimized.

-----
## SAPCsRGB.98.js
The SAPC version(s) are AGPL v3, with various added or experimental features such as the Low Contrast extension that enables measuring low contrasts down to about 1 or 2 Percent. These versions are not necessarily completely compliant with the emerging accessibility conformance model and shold not be used for building conformance tools. There are here for experimental and reearch purposes.

The SAPC version also has additional methods and experimental features.

## SAPCsRGB.98.min.js
MiniMe version.

-----
## SeeLab sRGB Input Parsing and Procesing
Also available separately at [my SeeLab Repoitory](https://github.com/Myndex/SeeLab) 

### TOTALLY REVISED for version 0.98 !

Some Variables, Properties, and Method **names have been changed**. Everything is reorganized and optimized. Added functionality such as CIE XYZ, xyY, LAB, LUV, LCh processing, alpha, decimal, linearization, Y, more hex, rgb() variants, "cleaned" input etc. Thanks to Stoyan Stefanov for his input data parsing idea from his RGBColor.js

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
        
## THE SAMPLE HTML & CSS FILES
These are a simple running implementation of SAPC in plain vanilla JS and HTML5, close to what is on myndex.com/APCA/ On the HTML page the input forms use local page JS functions for the new **Font Select Extension**. This will eventually be moved to these JS pages, but for now the arrays and methods are in the HTML files.


Please let me know of any problems, ideas, comments, etc.

Thank you!

_Andrew Somers
(User Myndex)_

You can see the current working version at https://www.myndex.com/APCA/

There is more about this project on my main site, https://www.myndex.com/WEB/Perception

And there is a Whitepaper-In-Progress deeper dive on our W3 Wiki at https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
