# Basic SAPC JS Tool

This is a simple JS tool to determine a contrast value for a color pair, using the most basic SAPC implementation.

## INPUT FORMS OBJECT
The input forms are based on Stoyan Stefanov's RGBColor.js which you can see here: http://www.phpied.com/rgb-color-parser-in-javascript/
This object was chosen as it handles direct input of 3 digit or 6 digit Hex, sRGB int values, or HTML color names. 

For SAPC we are adding in some functionality to the RGBColor.js object, including returning sRGB values as decimal, 0.0 to 1.0 

### PLANNED:
#### Adds for the RGBColor.js object:
1. Add support for opacity
2. Add support for LAB or LUV type spaces for input and return
3. Add support for sliders/pickers with dynamic feedback

## SAPC.js OBJECT
The SAPC engine is based on iteration SAPC-7, with a soft black clamp for the darker color, and the most basic set of constants for the power curve exponents.

### PLANNED:
#### Adds for the SAPC.js object class:
1. Color module
2. Spatial module
3. Screen Adaptation module
4. Impairment Offset module
5. Add support for opacity calculation

## SAMPLE HTML & CSS
These are a simple cut & pastable iplementation of the JS methods.

As mentioned elsewhere, this should be considered experimental as it is not part of any current standard.

