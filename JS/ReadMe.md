# Basic SAPC JS Tool

This is a simple JS tool to determine a contrast value for a color pair, using the most basic SAPC implementation.

## INPUT FORMS
The input forms are based on Stoyan Stefanov's RGBColor.js which you can see here: http://www.phpied.com/rgb-color-parser-in-javascript/
This object was chosen as it handles direct input of 3 digit or 6 digit Hex, sRGB int values, or HTML color names. 

For SAPC we are adding in some functionality to the input object including returning sRGB values as decimal 0.0 to 1.0, adding in methods to return Y and linearized values.

### PLANNED:
#### Adds for the input object:
1. Add support for opacity
2. Add support for LAB or LUV type spaces for input and return
3. Add support for sliders/pickers with dynamic feedback

## SAPCsRGB.js
The SAPC engine is based on iteration SAPC-7, with a soft black clamp for the darker color, and the most basic set of constants for the power curve exponents.

### PLANNED:
#### Adds for SAPC:
1. Color module
2. Spatial module
3. Screen Adaptation module
4. Impairment Offset module
5. Add support for opacity calculation

## SAMPLE HTML & CSS
These are a simple running iplementation of SAPC in plain vanilla JS and HTML5.

As mentioned elsewhere, this should be considered experimental as it is not part of any *current* standard.

Please let me know of any problems, ideas, comments, etc. 

Thank you!

Andrew Somers
(User Myndex)

There is more about this project on my main site, https://www.myndex.com/WEB/Perception
