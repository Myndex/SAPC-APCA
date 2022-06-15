---
layout: simple
---

## SAPC/APCA CURRENT VERSION: 0.0.98G-4g-lut3 Constants: 4g

### January 11 2022
Font lookup table revised, still for 4G constants. Now available as arrays in the DATA folder.

### January 2 2022
Font lookup table revised, still for 4G constants.

### December 1, 2021
All W3 licensed files moved to their own repository, AND
**A new npm package has been released (of the W3 version) to ease integration!!**

### November 23, 2021
Updated font LUT, and adding a **0.** for semantic versioning (0.0.98G)

### October 1, 2021:
0.0.98G-4g is the current version. A minimal APCA version is in the JS folder.

### As of October 1, 2021 01:00 GMT

# CURRENT VERSION: Beta 0.0.98G_g4

**IMPORTANT:** If you are making a tool to predict contrast for the new W3 standards for Visual Contrast, ***use only the files named APCA.***

## Change Notice October 1, 2021 01:00 GMT
The new version of the basic APCA javascript file is uploaded, and the main directory readme.md has been updated with the lastest maths and code examples. Variable names and values have changed. The key constants (from March 2021) are:

    Exponents:      mainTRC: 2.4    normBG: 0.56     normTXT: 0.57      revTXT: 0.62     revBG: 0.65
    Scalers:        Scale: 1.14     loBoWthresh: 0.035991     loBoWoffset: 0.027         loBoWfactor: 27.7847239587675	
    Clamps:         blkThrs: 0.022  blkClmp: 1.414   loClip: 0.001      deltaYmin: 0.0005

    The sRGB coefficients are:
        Rco = 0.2126729;
        Gco = 0.7151522;
        Bco = 0.0721750;

-----
PREVIOUS

-----

### Change Notice January 28, 2021 02:00 GMT
The new version of the basic APCA javascript file is uploaded, and the main directory readme.md has been updated with the lastest maths and code examples. Variable names and values have changed. The key constants are now:

    Exponents:	mainTRC: 2.4	normBG: 0.55	normTXT: 0.58	revTXT: 0.57	revBG: 0.62
    Scalers:	Scale: 1.25	loConThresh: 0.078	loConOffset: 0.06	loConFactor: 12.82051282051282
    Clamps:  	blkThrs: 0.03	blkClmp: 1.45	loClip: 0.001	deltaYmin: 0.0005
Also changed the R,G,B coefficients to the less rounded matrix versions for better future compatibility.

    Rco = 0.2126729;
    Gco = 0.7151522;
    Bco = 0.0721750;

#### Change Notice January 2021 General
Substantial code changes, including math and scaling. Literally all constants have changed. Typicall the "equevelent colors" will be indicated 20 lower (more or less). The main takeawy here though is what was 100 is now 80, what was 80 is now 60 and what was 60 is now 40.

80: The general target for columns of body text.

60: The general traget for most content text.


#### Change Notice November 18, 2020 08:00 GMT
IMPORTANT: Major reworking of the input objects, adding new methods including a complete CIE suite, piecewise sRGB processing, and much more. This file is _INCOMPATIBLE WITH ALL PREVIOUS VERSIONS_ due to new features, naming, and organizing of properties and methods.

#### Change Notice October 22, 2020  0.0.97h2
Only applies to the JS files with the input parsing.
Fixed the "Zero Hex Bug" thanks to Mitch @mfishma issue #5 for pointing it out! 


#### Change Notice October 21, 2020  0.0.97h
**Changes in the .JS files** mainly centered around adding new methods and also adding new parsing, including for alpha channels.

New input feature: you only need to enter 2 hex digits to get a color, and it auto updates as you add more - 3,4,6,8 - if wen you enter two, such as e9, you are returned #e9e9e9. helpful for quickly toggling through greys.

New color object data returns include L* and methods for returning alpha data.

**Changes in the .HTML files**

Remember there's a lot of useful JS in the HTML documents as well, and the latest in terms of the new multi-level scoring model. The font samples section is subtantially cleaned up and revised to reflect the latest guidlines.

#### Change Notice October 12, 2020  0.0.97g
**Fixed constant** for Green coefficient — should be: `const Gco = 0.7152;` and not 0.7156 (lingering typo does not materially affect results but was nevertheless wrong.)

ALSO: Changed all power functions from the shorthand `**` to the more standard `Math.pow()` for better compatibility.

#### Change Notice October 11, 2020
Added "APCAsRGBonly.js — this is the APCA algorithim only, suitable if you already have color parsing and just want to add the ACPA function. This version takes sRGB encoded 8 bit intergers from 0-255.

Code cleanup in the JS files. The loConRamp moved to a separate function.
HTML files have an improved UX for the manual color entry fields.

#### Change Notice October 10, 2020
Split the "APCA" version from the "SAPC" version. The APCA is intended for the forthcoming W3 accessibility standards (Silver/WCAG 3). The SAPC is the research version, which may not be in conformance due to experimental variations.

#### October 07, 2020
To any “early adopting” developers: 
###### _IMPORTANT: const VALUE CHANGE_
**Priority: HIGH — Affects Results**
If you are not interested in the low-contrast extension, then there is just one change that is important:

Change the `const` **`blkClmp`** from `1.75` to **`1.33`**

This affects the results whenever the darker color is less than `#2c2c28`.

	`const blkClmp = 1.75;	// OLD Exponent for the soft black clamp curve`
	`const blkClmp = 1.33;	// NEW Exponent for the soft black clamp curve`

#### _SAPC -> APCA_
Also just FYI, SAPC is the research name and SAPC is licensed under AGPL v3. 
APCA is the release name in the new Working Draft of Silver/WCAG 3, and licensed to the W3 per their collaborative agreements.

Please feel free post issues or comments.
