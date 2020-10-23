### As of Oct 22, 2020 04:00 GMT
# CURRENT VERSION: Beta 0.97h (JS 0.97h2 Oct 23)
**IMPORTANT:** If you are making a tool to predict contrast for the new W3 standards for Visual Contrast, **use only the APCA files.**

## Change Notice October 22, 2020  0.97h2
Only applies to the JS files with the input parsing.
Fixed the "Zero Hex Bug" thanks to Mitch @mfishma issue #5 for pointing it out! 


## Change Notice October 21, 2020  0.97h
**Changes in the .JS files** mainly centered around adding new methods and also adding new parsing, including for alpha channels.

New input feature: you only need to enter 2 hex digits to get a color, and it auto updates as you add more - 3,4,6,8 - if wen you enter two, such as e9, you are returned #e9e9e9. helpful for quickly toggling through greys.

New color object data returns include L* and methods for returning alpha data.

**Changes in the .HTML files**

Remember there's a lot of useful JS in the HTML documents as well, and the latest in terms of the new multi-level scoring model. The font samples section is subtantially cleaned up and revised to reflect the latest guidlines.

## Change Notice October 12, 2020  0.97g
**Fixed constant** for Green coefficient — should be: `const Gco = 0.7152;` and not 0.7156 (lingering typo does not materially affect results but was nevertheless wrong.)

ALSO: Changed all power functions from the shorthand `**` to the more standard `Math.pow()` for better compatibility.

## Change Notice October 11, 2020
Added "APCAsRGBonly.js — this is the APCA algorithim only, suitable if you already have color parsing and just want to add the ACPA function. This version takes sRGB encoded 8 bit intergers from 0-255.

Code cleanup in the JS files. The loConRamp moved to a separate function.
HTML files have an improved UX for the manual color entry fields.

## Change Notice October 10, 2020
Split the "APCA" version from the "SAPC" version. The APCA is intended for the forthcoming W3 accessibility standards (Silver/WCAG 3). The SAPC is the research version, which may not be in conformance due to experimental variations.

## October 07, 2020
To any “early adopting” developers: 
### _IMPORTANT: const VALUE CHANGE_
**Priority: HIGH — Affects Results**
If you are not interested in the low-contrast extension, then there is just one change that is important:

Change the `const` **`blkClmp`** from `1.75` to **`1.33`**

This affects the results whenever the darker color is less than `#2c2c28`.

	`const blkClmp = 1.75;	// OLD Exponent for the soft black clamp curve`
	`const blkClmp = 1.33;	// NEW Exponent for the soft black clamp curve`

## _SAPC -> APCA_
Also just FYI, SAPC is the research name and SAPC is licensed under AGPL v3. 
APCA is the release name in the new Working Draft of Silver/WCAG 3, and licensed to the W3 per their collaborative agreements.

Please feel free post issues or comments.
