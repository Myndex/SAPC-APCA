# Basic SAPC/APCA JS Functions

This is a simple set of JS functions and classes to determine a contrast value for a color pair, using a basic SAPC implementation. 

These are based on iteration SAPC-7, developed through a lengthy series of experiments and investigations. They with a soft black clamp for the darker color, and a basic set of constants for the power curve exponents to predict contrast under common use cases.

## APCAsRGB.js
The APCA version is the version licensed to the W3 for use in accessibility standards.

## LowConSAPCsRGB.js
The SAPC version(s) are AGPL v3, with various such as the Low Contrast extention that enables measuring low contrasts down to about 1 or 2 Percent.

### PLANNED:
#### Adds for SAPC:
1. Color module
2. Spatial module
3. Screen Adaptation module
4. Impairment Offset module
5. Add support for opacity calculation

## INPUT FORMS
The input forms are based in part on Stoyan Stefanov's RGBColor.js which you can see here: http://www.phpied.com/rgb-color-parser-in-javascript/
This object was chosen as it handles direct input of 3 digit or 6 digit Hex, sRGB int values, or HTML color names. 

For SAPC we adding in functionality including returning sRGB values as decimal 0.0 to 1.0, different flavors of hex, "cleaned" input for user covienience, adding in methods to return Y, as well as various other linearized values. In the HTML form, we've added sliders/pickers with dynamic feedback (if supported by the browser/system).

### PLANNED:
#### Adds for the input object:
1. Add support for opacity
2. Add support for LAB or LUV type spaces for input and return

## SAMPLE HTML & CSS
These are a simple running iplementation of SAPC in plain vanilla JS and HTML5.

Please let me know of any problems, ideas, comments, etc. 

Thank you!

Andrew Somers
(User Myndex)

You can see the current working version at https://www.myndex.com/SAPC/

There is more about this project on my main site, https://www.myndex.com/WEB/Perception
