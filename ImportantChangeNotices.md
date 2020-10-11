### CURRENT VERSION: Beta 0.97f as of Oct 11

**IMPORTANT:** If you are making a tool to predict contrast for the new W3 standards for Visual Contrast, **use only the APCA files.**


## Change Notice October 11, 2020
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
