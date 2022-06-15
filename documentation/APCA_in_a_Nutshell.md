---
layout: simple
---

# The Accessible Perceptual Contrast Algorithm
APCA is a new method for calculating and predicting readability contrast. APCA is a part of the larger S-Luv Accessible Readability Color Appearance Model known as SARCAM (formerly SAPC). These models are specifically related to color appearance on self-illuminated RGB computer displays & devices, and also for modeling accessible user needs, with a focus on readability.

## Lightness contrast L<sup>c</sup>
The APCA generates a lightness/darkness contrast value based on a minimum font size and color pair, and this value is perceptually based: that is, regardless of how light or dark the colors are, a contrast value of L<sup>c</sup>&nbsp;60 represents the same _perceived_ readability contrast. This is absolutely not the case with WCAG&nbsp;2.x, which far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable when a color is near black. As a result, WCAG&nbsp;2.x contrast cannot be used for guidance designing "dark mode".

The APCA contrast value is perceptually uniform, and pivots near the point where the CS curve flattens due to contrast constancy. Halving or doubling the APCA value relates to a halving or doubling of the perceived contrast. There is a subtle weighting for higher contrasts to smaller, thinner fonts.

### Different Uses, Different Contrasts
The APCA has a set of levels related to use cases — for instance, L<sup>c</sup>&nbsp;90 is _preferred_ and L<sup>c</sup>&nbsp;75 is the _minimum_ for body text. This makes for an easy way to use ACPA, very similar to 1.4.3 in terms of ease of use.

The APCA also has an **optional** lookup table to associate font size and weight to the readability contrast (L<sup>c</sup>&nbsp;value). The lookup tables allow for even greater accuracy and therefore greater flexibility in design.

### Failing Pass/Fail
A key takeaway is that a strict pass/fail with a blanket contrast ratio is not instructive as a guideline, and does not necessarily solve a given user need. In fact, user needs when it comes to contrast are conflicting—what is good for one can be harmful to another. This is even true of font size. 

This points to the importance of real user personalization, an area where the technology is literally missing (and a work in progress). For the guidelines though, we can set ranges for targets and expectations toward making the web readable for all.


## Use-Case & Size Ranges
These general levels are appropriate for use by themselves, without the need to reference a lookup table. APCA reports contrast as an L<sup>c</sup>&nbsp;value (lightness contrast) from **L<sup>c</sup>&nbsp;0** to **L<sup>c</sup>&nbsp;105+**. For accessibility, consider L<sup>c</sup>&nbsp;15 the point of invisibility for many users, and L<sup>c</sup>&nbsp;90 is preferred for body text.

*   **L<sup>c</sup>&nbsp;90** • Preferred level for fluent text and columns of body text with a font no smaller than 18px/weight 300 or 14px/weight 400 (normal), or non-body text with a font no smaller than 12px/400. Also a recommended minimum for extremely thin fonts with a minimum of 24px at weight 200. Lc&nbsp;90 is a _suggested maximum_ for **very large and bold fonts** (greater than 36px bold), and large areas of color. Small fonts do not have a maximum.
*   **L<sup>c</sup>&nbsp;75** • The _minimum_ level for columns of body text with a font no smaller than 24px/300 weight, 18px/400, 16px/500 and 14px/700. This level may be used with non-body text with a font no smaller than 15px/400. Also, L<sup>c</sup>&nbsp;75 should be considered a minimum for larger for any larger text where readability is important.
*   **L<sup>c</sup>&nbsp;60** • The _minimum_ level recommended for content text that is not body, column, or block text. In other words, text you want people to read. The minimums: no smaller than 48px/200, 36px/300, 24px normal weight (400), 21px/500, 18px/600, 16px/700 (bold). These values based on the reference font Helvetica. To use these sizes as body text, add L<sup>c</sup>&nbsp;15.
*   **L<sup>c</sup>&nbsp;45** • The _minimum_ for larger, heavier text (36px normal weight or 24px bold) such as headlines, and large text that should be fluently readabile but is not body text. This is also the minimum for pictograms with fine details, or smaller outline icons.
*   **L<sup>c</sup>&nbsp;30** • The _absolute minimum_ for any text not listed above, including text considered as "spot readable". This includes placeholder text and disabled element text, and some non-content like a copyright bug. This is also the minimum for large/solid semantic & understandable non-text elements such as "mostly solid" icons or pictograms. Generally no less than 4px solid in its smallest dimension.
*   **L<sup>c</sup>&nbsp;15** • The _absolute minimum_ for any non-text that needs to be _discernible_, and is no less than 6px (solid) in its smallest dimention. This may include dividers, and in _some_ cases large buttons or thick focus visible outlines, but does _not_ include fine details which have a higher minimum. **Designers should treat anything below this level as invisible**, as it will not be visible for many users. This minimum level should be avoided for any items important to the use, understanding, or interaction of the site.

These define the basic minimum levels, what you might think of as AA in the old WCAG&nbsp;2. For the equivelent to AAA, simply increase the contrast values by L<sup>c</sup>&nbsp;15.

**_NOTES ON FONT SIZE_**
- Font sizes listed above assume an x-height ratio of 0.5. Font weight is based on highly standardized reference fonts such as Helvetica or Arial. "px" means the CSS reference px, not device pixels. One reference px is defined as 1.278 arc minutes of visual angle.
- When selecting, or testing, a font size, all that needs to be done is to compare the x-height to the reference.
    - For instance Times New Roman has an x-height ratio of 0.45, so it needs to be increased about 16% in size.
- For font weight, simply set a line of test text in the reference Arial or Helvetical at 400 weight and then below that the same text text in the new font. Try different weights to find the closest match.
    - As an example, the font Raleway 400 weight is closest to Helvetica 300.
    - So, add 100 in weight to Raleway to be equivelent.
    - Note that some fonts change weight differently, and should be compared at other weights, such as 700, if those weights are to be used.
    - See [this discussion answer](https://github.com/Myndex/SAPC-APCA/discussions/28#discussioncomment-1610289) for more.
- Consider the font design as well as the basic size and weight, and the potential impact on readability. See [this PDF **"Evaluating Fonts"**](https://www.researchgate.net/publication/338149302_Evaluating_Fonts_Font_Family_Selection_for_Accessibility_Display_Readability) for general guidance and a comparison of a few dozen fonts for accessibility.


### Range Based Scoring
While WCAG&nbsp;3 is still in development, it includes a range-based conformance system. While it considers on multiple factors, it is simple enough to be fully automated, and does not rely on an arbitrary pass/fail binary scoring.

The overall approach improves design flexibility and readability at the same time. Readability is improved by increasing contrast in blocks of body text where it is most needed, and design flexibility is achieved by relaxing contrast for large non-text elements which do not need brute-force contrast levels due to their larger size (resulting in a lower spatial frequency).

For demonstration purposes, the example tool provides real-time updates of minimum font size and weight vs contrast: https://www.myndex.com/APCA/ click on the color patches to bring up a colorpicker.

