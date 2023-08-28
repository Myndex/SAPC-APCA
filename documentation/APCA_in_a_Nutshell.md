---
layout: simple
---

# APC<span class="flipH">A</span> in a Nutshell
Accessible Perceptual Contrast Algorithm is a new method for calculating and predicting readability contrast. APCA is a part of the larger S-Luv Accessible Color Appearance Model known as SACAM (formerly SAPC). These models are specifically optimized for accessible color appearance on self-illuminated RGB computer displays & devices, and also for modeling accessible user needs, with a focus on visual readability.

APCA is the candidate contrast method for the future [WCAG 3](https://www.w3.org/WAI/GL/WCAG3/2021/how-tos/visual-contrast-of-text/#design-button), and is also developing as the [APCA Readability Criterion](https://readtech.org/ARC/), an independent standard hosted by Inclusive Reading Technologies.

## Lightness contrast L<sup>c</sup>
The APCA generates a lightness/darkness contrast value based on a minimum font size and color pair, and this value is perceptually based: that is, regardless of how light or dark the colors are, a contrast value of L<sup>c</sup>&nbsp;60 represents the same _perceived_ readability contrast. This is absolutely not the case with WCAG&nbsp;2.x, which overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable when one of the colors in a pair is near black. As a result, WCAG&nbsp;2.x contrast cannot be used for guidance designing "dark mode".

The APCA contrast value is perceptually uniform, and pivots near the point where the CS curve flattens due to contrast constancy. Halving or doubling the APCA value relates to halving or doubling the perceived contrast. There is a subtle weighting for higher contrasts to smaller, thinner fonts, and a small boost for very dark colors.

### Different Uses, Different Contrasts
The APCA-RC [Bronze Simple Mode](https://readtech.org/ARC/tests/bronze-simple-mode/?tn=intro) has a set of threshold levels related to use cases — for instance, L<sup>c</sup>&nbsp;90 is _preferred_ and L<sup>c</sup>&nbsp;75 is the _minimum_ for body text. This makes for an easy way to use ACPA, very similar to the old WCAG 1.4.3 in terms of ease of use.

The APCA also has **optional** advanced levels [Silver and Gold](https://readtech.org/ARC/tests/visual-readability-contrast/?tn=criterion) which add in lookup tables, to associate font weight/size to the lightness contrast (L<sup>c</sup>&nbsp;value). The lookup tables allow for even greater accuracy and therefore greater flexibility in design.

### Failing Pass/Fail
A key takeaway is that a strict pass/fail with a blanket contrast ratio is not instructive as a guideline, and does not necessarily solve a given user need. In fact, user needs when it comes to contrast are conflicting—what is good for one can be harmful to another. This is even true of font size. 

This points to the importance of real user personalization, an area where the technology is literally missing (and a work in progress). For the guidelines though, we can set ranges for targets and expectations toward making the web readable for all, with the recommendation that the user is able to choose at least one light mode or one dark mode color scheme.


## Use-Case & Size Ranges
These general levels are appropriate for use by themselves, without the need to reference a lookup table. APCA reports contrast as an L<sup>c</sup>&nbsp;value (lightness contrast) from **L<sup>c</sup>&nbsp;0** to **L<sup>c</sup>&nbsp;105+**. For accessibility, consider L<sup>c</sup>&nbsp;15 the point of invisibility for many users, and L<sup>c</sup>&nbsp;90 as preferred for body text.

*   **L<sup>c</sup>&nbsp;90** • Preferred level for fluent text and columns of body text with a font no smaller than 18px/weight 300 or 14px/weight 400 (normal), or non-body text with a font no smaller than 12px/400. Also a recommended minimum for extremely thin fonts with a minimum of 24px at weight 200. Lc&nbsp;90 is a _suggested maximum_ for **very large and bold fonts** (greater than 36px bold), and large areas of color. Small fonts do not have a maximum.
*   **L<sup>c</sup>&nbsp;75** • The _minimum_ level for columns of body text with a font no smaller than 24px/300 weight, 18px/400, 16px/500 and 14px/700. This level may be used with non-body text with a font no smaller than 15px/400. Also, L<sup>c</sup>&nbsp;75 should be considered a minimum for larger for any larger text where readability is important.
*   **L<sup>c</sup>&nbsp;60** • The _minimum_ level recommended for content text that is not body, column, or block text. In other words, text you want people to read. The minimums: no smaller than 48px/200, 36px/300, 24px normal weight (400), 21px/500, 18px/600, 16px/700 (bold). These values based on the reference font Helvetica. To use these sizes as body text, add L<sup>c</sup>&nbsp;15.
*   **L<sup>c</sup>&nbsp;45** • The _minimum_ for larger, heavier text (36px normal weight or 24px bold) such as headlines, and large text that should be fluently readable but is not body text. This is also the minimum for pictograms with fine details, or smaller outline icons.
*   **L<sup>c</sup>&nbsp;30** • The _absolute minimum_ for any text not listed above, including text considered as "spot readable". This includes placeholder text and disabled element text, and some non-content like a copyright bug. This is also the minimum for large/solid semantic & understandable non-text elements such as "mostly solid" icons or pictograms. Generally no less than 5.5px solid in its smallest dimension.
*   **L<sup>c</sup>&nbsp;15** • The _absolute minimum_ for any non-semantic non-text that needs to be _discernible_, and is no less than 5px (solid) in its smallest dimension. This may include dividers, and in _some_ cases large buttons or thick focus-visible outlines, but does _not_ include fine details which have a higher minimum. **Designers should treat anything below this level as invisible**, as it will not be visible for many users. This minimum level should be avoided for any items important to the use, understanding, or interaction of the site.

These define the basic minimum levels, what you might think of as AA in the old WCAG&nbsp;2. For the equivelent to AAA, simply increase the contrast values by L<sup>c</sup>&nbsp;15.

**_NOTES ON FONT SIZE_**
- Font sizes listed above assume an x-height ratio of 0.52.
- Font weight is based on highly standardized reference fonts such as Helvetica or Arial.
- "px" means the CSS reference px, not device pixels.
    - One reference px is defined as 1.278 arc minutes of visual angle.
- When selecting, or testing, a font size, all that needs to be done is to compare the x-height to the reference.
    - For instance Times New Roman has an x-height ratio of 0.45, so it needs to be increased about 16% in size.
- For font weight, simply set a line of test text in the reference Arial or Helvetica at 400 weight and then below that the same text text in the new font. Try different weights to find the closest match.
    - As an example, the font Raleway 400 weight is closest to Helvetica 300.
    - So, increase the weight of Raleway by 100 to be equivalent.
    - Note that some fonts change weight differently, and should be compared at other weights, such as 700, if those weights are to be used.
    - See [this how-to guide](https://readtech.org/ARC/tests/visual-readability-contrast/?tn=methods#size-weight) for more on font matching.
- Consider the font design as well as the basic size and weight, and the potential impact on readability. See [this PDF **"Evaluating Fonts"**](https://www.researchgate.net/publication/338149302_Evaluating_Fonts_Font_Family_Selection_for_Accessibility_Display_Readability) for general guidance and a comparison of a few dozen fonts for accessibility.


### Expanded Range and use cases
Instead of arbitrary pass/fail binary scoring, the APCA Readability Criterion has a sliding scale across the visual range, and is divided among use cases, as different uses have different contrast needs.

The overall approach improves design flexibility and readability at the same time. Readability is improved by increasing contrast in blocks of body text where it is most needed, and design flexibility is achieved by relaxing contrast for large non-text elements which do not need brute-force contrast levels, due to their larger size (i.e. lower spatial frequencies use lower contrasts).

For demonstration purposes, the example tool provides real-time updates of minimum font size and weight vs contrast: https://apcacontrast.com click on the color patches to bring up a color-picker.

## _More Info_
See this Linktree for a short-list of resources for further reading:
[linktr.ee/myndex](https://linktr.ee/myndex)

----
## _THE WORLD IS READING_<sup>™</sup>

### Definitions of Terms Used In This Document
- **Spatial or spatially:** relating to size, weight, or thickness.
- **Hue:** the uniqueness of a given color vs other colors, i.e. blue vs red.
- **Chroma/saturation:** the intensity or purity of a color vs no color.
- **Luminance:** a physical measure of light, disregarding hue.
- **Lightness:** the human perception of a given luminance. Also darkness and brightness.

### Study Volunteers Needed
Would you like to help create a more readable world for all? Please let us know! We have several studies planned for 2023, and it requires minimal time on your part to participate. Please send an email to perceptex@myndex.com with "volunteer" in the subject line.

 <img src="/images/APCAcolor4.png" width="420" alt="APCA The Revolution Will Be Readable">

## APPENDIX: _Additional Reading_
- [**Linktree of Selected Resources**](https://linktr.ee/Myndex) A good place to start.
- [**Main Catalog of APCA Resources and Links**](https://git.myndex.com) For the much deeper divers.

### APCA Readability Criterion
_Maintained by Inclusive Reading Technologies Inc., a California Non-Profit_.
- [**Draft ARC Guidelines**](https://readtech.org/ARC/) for implementing APCA and related technologies.
- [**Bronze Simple Mode**](https://readtech.org/ARC/tests/bronze-simple-mode/?tn=intro)  is designed as an introductory mode that does not require look-up tables or matching to a reference font. Instead it's designed as a simple set of threshold levels, similar to how WCAG&nbsp;2 works but using perceptually uniform math.

### Links To APCA and Related Tools
- [**APCA Calculator**](https://apcacontrast.com), the official technology demonstrator for APCA, includes explainers. 
- Listing of [**Third Party Tools and Systems**](https://git.apcacontrast.com/documentation/thirdpartytools) that have adopted APCA.
- An [**Accurate Colorblind Simulator**](https://myndex.com/CVD/) based on the well respected, peer-reviewed, Brettel et alia model.

### Discussion Forum
- [**Readability Forum**](https://github.com/Myndex/SAPC-APCA/discussions/) questions and comments welcome.
    - [**DISCUSS: Using APCA with other fonts** ](https://github.com/Myndex/SAPC-APCA/discussions/28#discussioncomment-1610289) Draft method for font weight conformance.
    - [**DISCUSS: Inline text links theory and practice** ](https://github.com/Myndex/SAPC-APCA/discussions/65) Draft guidance regarding link identification.
    - [**DISCUSS: Draft Dark Mode Guidance**](https://github.com/Myndex/SAPC-APCA/discussions/74#discussioncomment-6646215) Draft guidance regarding darkmode from light mode, and more.
    - [**DISCUSS: Legal Issues of WCAG2 vs APCA**](https://github.com/Myndex/SAPC-APCA/discussions/68#discussion-3980510) Discussion of current and future legal status and incorporation into legislation.

### Peer Review & Third Party Discussion of APCA 
A listing of [**third party and peer reviews**](https://git.myndex.com/#apca-peer-review--third-party-discussion) of APCA and related technologies. This directory includes journal-published peer-reviews, trade-published evaluations, and less formal comparative analysis, covering the usage, math, efficacy, implementation/integration, workflows, and more.

### Published Articles on Color & Contrast by A.Somers
- [**The Realities And Myths Of Contrast And Color**](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/) Published by _Smashing Magazine_. A brief but comprehensive primer to vision, color, and contrast for design, with an emphasis on typography, readability, and visual accessibility needs. 
- [**Better Reading on the Web**](https://uxdesign.cc/better-reading-on-the-web-c943c4cfc91a) Published by _UX Collective_, this article discusses and demonstrates issues with automated testing and WCAG 2 contrast math, methods, and guidelines.

- **The _Tangled Web_ tech blog** (TangledWeb.xyz):
    - [**Please Stop Using Grey Text**](https://tangledweb.xyz/please-stop-using-grey-text-3d3e71acfca8) This popular article debunks one of the worst myths regarding design contrast.
    - [**What’s Red & Black & Also Not Read?**](https://tangledweb.xyz/whats-red-black-also-not-read-573b9c0a97ed) examines the nature of color insensitivity and readability.
    - [**Busy Background Breaks Bulletin**](https://tangledweb.xyz/busy-background-breaks-bulletin-f4ff4bf67e5a) Examples of how to destroy readability by choosing the wrong image as a background. And also, how to fix it.
    - [**Hats off to ALL CAPS**](https://tangledweb.xyz/hats-off-to-all-caps-c0a43a2c30d4) myth-busting misunderstandings regarding dyslexia, are special dyslexia fonts even useful, and the shift from using ALL UPPERCASE LETTERS for various text elements.
    - [**A Contrast of Errors**](https://atangledwebweweave.com/a-contrast-of-errors-373c2665d42a) looks at the history and the current international readability crisis.
    - [**Contrasting Theories**](https://tangledweb.xyz/hi-roger-f51bde490a56) Background on the first two years of R&D.

<img  width='420' alt='Uncle Sam saying I want you to use high contrast text' src='https://user-images.githubusercontent.com/42009457/161151222-74fb81af-f87b-4d7c-a41c-756e1ee3056f.png'> 



