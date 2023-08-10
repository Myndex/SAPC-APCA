---
layout: simple
---

# Why APC<span class="flipH">A</span> as a New<br> Contrast Method?
Visual readability is a critically important aspect of web content, affecting 99% of internet users. For years, the WCAG&nbsp;2.x contrast guidelines provided some guidance toward readability but are being replaced for the future WCAG&nbsp;3.0. Here is an overview of the need for this change and discussion of the candidate replacement, the _Accessible Perceptual Contrast Algorithm_ (APCA).

## The Contrast Problem
WCAG&nbsp;2.x contrast, SC 1.4.3, and the related understandings and guidelines, were born in an era before smart phones and iPads, when displays were mostly old-school CRT type and websites used core web fonts. But that was a decade and a half ago. Today the contrast guidelines are in need of a complete overhaul due to the massive changes in computer display technology, web content, CSS functionality, and advances in vision science since 2005/2008, when WCAG&nbsp;2.x was first introduced. 

There are a number of reasons that WCAG&nbsp;2.x contrast is faulty, one of which is the binary pass/fail nature of the SC for a property that does not apply in a binary way across perception nor impairments. Humans are not binary computers, and it is important to understand the non-linear aspects of perception, and to set guidelines that correctly model perception as opposed to "brute forcing" arbitrary values that ultimately do more harm than good.

Let's begin with a general understanding of color and contrast with the summary outlined below. For a deeper dive see the author's whitepaper ["Introduction to Color and Accessibility"](https://AndySomers.com) and also this comprehensive overview ["The Realities And Myths Of Contrast And Color"](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/).


## What Is Readability Contrast?

Like color, contrast is not "real", it is a _perception_ and is more a result of how your brain interprets visual differences. It is not a simple measure of the distance or difference between two colors.

Like all perceptions it is context sensitive, meaning what is around it and its purpose affects how you see it. Contrast is also substantially affected by _"spatial characteristics"_ which for our purposes means font weight or line thickness, and is principal factor in our brain's lightness perception (aka luminance contrast). When it comes to _color_ contrast, as in hue/chroma/saturation, the effect is less relevant to readability. High lightness/darkness contrast is required for fluent readability at best speed and comprehension, especially small body text in columns or blocks.

Above a certain amount, _contrast constancy_ may come into effect wherein further increases in a mathematical contrast value does not result in higher perceived contrast for readability. A high "spatial frequency" means smaller and thinner letters. Smaller, thinner letters or graphics lowers the perceived contrast. As a result, the lightness/darkness difference between text and the background color must be increased to compensate for small thin fonts.

- Fluent readability refers to _critical contrast_ which is that needed for best reading speed and comprehension. Dr. Bailey & Lovie-Kitchin's studies showed, along with Dr. Legge and other recent studies, contrast must be at least ten times the _contrast sensitivity threshold_ (CS) which is the point of "just noticeable differences" (JND). Twenty times is preferred for adequate _contrast reserve_ above the critical contrast. 
- Spot readability means being readable without significant effort, though not necessarily at the best speed or accuracy. In this case the contrast needs to be three times that of the JND.
- Various forms of visual impairment include more than acuity, which is the ability to focus the eyes to a sharp clear image. Contrast sensitivity related impairments involving the eyes or brain may have an even greater effect on overall vision.

These factors define the area of "supra-threshold critical contrast for readability." We refer to this as **"readability contrast"** for simplicity. A similar supra-threshold exists for acuity in terms of font size, which is separate but in addition to the font weight as related to spatially-driven contrast.

In other words, the size of a font is related to a person's ability to focus (defined by a number like 20/20 or 6/6 on an eye exam chart) and the size and weight of that font also directly affect contrast perception. Contributing factors are white space, letter and line spacing, the aspect ratio of the letter (tall vs wide), and other properties.

The following chart is intended to demonstrate the spatially dependent nature of human contrast sensitivity, using text samples to connect the abstract science to practical reality.

<img width="648" alt="This is a chart of the human contrast sensitivity curve. A blue line curves down to the right where the Y axis is contrast sensitivity, and the X access is spatial frequency, increasing toward the right. An increase in spatial frequency means elements are smaller and thinner. On the right of this info graphic are samples of text from very large and bold to very thin and small, with red lead lines indicating approximately where those samples fall on the contrast sensitivity curve. All of the text samples are at the exact same CSS color of #c7c7c7, the top very large and bold headline is legible but as the fonts become thinner and smaller they literally fade out as if becoming lighter gray, even though they are all at the exact same color." src="/images/contrastSensitivityGraph5sameColor.png">

### _Use Cases_
Spot-reading-contrast has a lower requirement than fluent readability contrast. Non-text object contrast such as for a solid icon may also have a lower lightness contrast requirement. And there are some differences in terms of the importance of color (hue or saturation) for things such as information coding.

No single figure such as 4.5:1 or 3:1 can be used as a blanket target for contrast between two colors, without considering the use case, size, thickness, etc. On this point, it has been demonstrated that WCAG&nbsp;2 contrast can pass colors that should fail as not readable, and sometimes the WCAG&nbsp;2 math fails a color pair that _should pass_ as very readable. Some articles with visual comparisons and examples of this are:

### _Contrasting Concerns_ 

The problems of 4.5:1 as a target for a guideline not only impact accessibility, but impacts standard vision. The inherent problems with the WCAG&nbsp;2 contrast math have been known for some time and [widely criticized](https://macwright.com/2019/03/30/color-contrast-is-a-problem.html). Including studies [by others showing that color insensitive types](https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/) are not well served. The WCAG&nbsp;2 contrast specs often cause enough problems for designers [that it is ignored](https://uxmovement.com/buttons/the-myths-of-color-contrast-accessibility/) and today, some 86% of websites are failing WCAG\_2 contrast—though some failures are not due to actually poor accessibility, but due to the incorrect math of WCAG\_2 contrast.

-----
## The Solution: APCA
The Accessible Perceptual Contrast Algorithm (APCA) is a new method for calculating and predicting readability contrast. APCA is a part of the larger S-Luv Accessible Color Appearance Model known as SACAM (formerly SAPC). These models are specifically related to color appearance on self-illuminated RGB computer displays & devices, and also for modeling accessible user needs, with a focus on readability.

### _Lightness contrast (L<sup>c</sup>)_
The APCA generates a lightness/darkness contrast value based on a minimum font weight/size and color pair, and this value is perceptually based: that is, regardless of how light or dark the two colors are, a contrast value of L<sup>c</sup>&nbsp;60 represents the same _perceived_ readability contrast, across the available range of colors.

This is absolutely not the case with WCAG&nbsp;2.x, which far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable when a color is near black. As a result, WCAG&nbsp;2.x contrast cannot be used for guidance designing "dark mode". This also creates problems for color vision deficiency (sometimes called colorblind).

The APCA contrast value is perceptually uniform, and pivots near the point where the CS curve flattens due to contrast constancy. Halving or doubling the APCA value relates to a halving or doubling of the perceived contrast. There is a subtle weighting for higher contrasts to smaller, thinner fonts.

### _Different Uses, Different Contrasts_
The APCA has a set of levels related to use cases — for instance, L<sup>c</sup>&nbsp;90 is _preferred_ and L<sup>c</sup>&nbsp;75 is the _minimum_ for body text. This makes for an easy way to use ACPA, very similar to 1.4.3 in terms of ease of use.

The APCA also has an **optional** lookup table to associate font size and weight to the readability contrast (L<sup>c</sup>&nbsp;value). The lookup tables allow for even greater accuracy and therefore greater flexibility in design.

### _Failing Pass/Fail_
A key takeaway is that a strict pass/fail with a blanket contrast ratio is not instructive as a guideline, and does not necessarily solve a given user need. In fact, user needs when it comes to contrast are conflicting—what is good for one can be harmful to another. This is even true of font size. 

This points to the importance of real user personalization, an area where the technology is literally missing (and a work in progress). For the guidelines though, we can set ranges for targets and expectations toward making the web readable for all.

## Visual Comparisons
In the following chart, we're showing minimum passing contrasts for APCA and for WCAG&nbsp;2. Notice WCAG&nbsp;2 examples become unreadable with dark colors.

<img width="640" alt="chart showing a comparison of minimum passing contrasts for both APCA and WCAG 2. WCAG 2 examples become unreadable in dark colors" src="/images/ColumnCompareAll400.png">

#### _And the problem is particularly severe for "dark mode":_

<img width="520" alt="demonstration showing a comparison of minimum passing contrasts for both APCA and WCAG 2. WCAG 2 is unreadable for dark mode" src="/images/DarkModeComparev2_2022.png">


## Use-Case Ranges
These general levels are appropriate for use by themselves, without the need to reference a lookup table. APCA reports contrast as an L<sup>c</sup>&nbsp;value (lightness contrast) from **L<sup>c</sup>&nbsp;0** to **L<sup>c</sup>&nbsp;105+**. For accessibility, consider L<sup>c</sup>&nbsp;15 the point of invisibility for many users, particularly for thin lines, and L<sup>c</sup>&nbsp;90 is preferred for body text.

See [this on ranges](./APCA_in_a_Nutshell#use-case--size-ranges) for a more in-depth look.

*   **L<sup>c</sup>&nbsp;90** • Preferred level for fluent text and columns of body text with a font no smaller than 14px/weight 400 (normal).
*   **L<sup>c</sup>&nbsp;75** • The _minimum_ level for columns of body text with a font no smaller than 18px/400. L<sup>c</sup>&nbsp;75 should be considered a minimum for text where readability is important.
*   **L<sup>c</sup>&nbsp;60** • The _minimum_ level recommended for content text that is not body, column, or block text. In other words, text you want people to read. The minimums: 24px normal weight (400) or 16px/700 (bold). These values based on the reference font Helvetica. 
*   **L<sup>c</sup>&nbsp;45** • The _minimum_ for larger, heavier text (36px normal weight or 24px bold) such as headlines. This is also the minimum for pictograms with fine details.
*   **L<sup>c</sup>&nbsp;30** • The _absolute minimum_ for any text not listed above. This includes placeholder text and disabled element text. This is also the minimum for large/solid semantic & understandable non-text elements.
*   **L<sup>c</sup>&nbsp;15** • The _absolute minimum_ for any non-text that needs to be _discernible_ and differentiable, and is no less than 5px in its smallest dimension. This may include disabled large buttons. **Designers should treat anything below this level as invisible**, as it will not be visible for many users. This minimum level should be avoided for any items important to the use, understanding, or interaction of the site.

These define the basic minimum levels, what you might think of as A/AA in the old WCAG&nbsp;2. For the equivalent to AAA, simply increase the contrast values by L<sup>c</sup>&nbsp;15. Maximum: for **large** fonts in dark mode, keep contrast less than Lc 90.

### _Range-Based Scoring_
While the candidate for WCAG&nbsp;3 is still in development, it includes a range-based conformance system. While it considers multiple factors, it is simple enough to be fully automated, and does not rely on an arbitrary pass/fail binary scoring.

The overall approach improves design flexibility and readability at the same time. Readability is improved by increasing contrast in blocks of body text where it is most needed, and design flexibility is achieved by relaxing contrast for large non-text elements which do not need brute-force contrast levels due to their larger size (resulting in a lower spatial frequency).

For demonstration purposes, the example tool provides real-time updates of minimum font size and weight vs contrast: [apcacontrast.com](https://apcacontrast.com) click on the color patches to bring up a color-picker.

We hope this clarifies the useful differences of a perceptually accurate range-based model as the guideline for a future of best readability.


Thank you for reading,


_Andrew Somers_    
_W3C AGWG Invited Expert_     
_Research Lead & Creator of APCA_     
_Senior Color Science Researcher_      
_Myndex PercepTex Research Project_     


### _Definitions of Terms Used In This Document_
- **Spatial or spatially:** relating to size or thickness.
- **Hue:** the uniqueness of a given color vs other colors, i.e. blue vs red.
- **Chroma/saturation:** the intensity or purity of a color vs no color.
- **Luminance:** a physical measure of light, disregarding hue.
- **Lightness:** the human perception of a given luminance. Also darkness and brightness.

_This document was written in plain language to the extent possible, with a target readability age of about a high school senior. Readability evaluations were made using the https://wooorm.com/readability/ tool. If you found any part of this essay difficult or confusing, please [file an issue or discuss here](https://github.com/Myndex/SAPC-APCA/discussions) so we can improve._

### _Study Volunteers Needed_
Would you like to help create a more readable world for all? Please let us know! We have several studies planned for 2023, and it requires minimal time on your part to participate. Please send an email to perceptex@myndex.com with "volunteer" in the subject line.

**_NOTICE: Personal opinions expressed are the author's and may or may not reflect those of the W3 or AGWG._** 


## _THE WORLD IS READING_<sup>™</sup>

 <img src="/images/APCAcolor4.png" width="420" alt="APCA The Revolution Will Be Readable">

## Appendix: Additional Reading
- [**Catalog of APCA Resources and Links**](https://git.myndex.com)

### _APCA Readability Criterion_
- [**Draft Guidelines**](https://readtech.org/ARC/) for implementing APCA and related technologies.

### _Links To Tools and Toolmakers_
- [**APCA Demo**](https://apcacontrast.com), the official technology demonstrator of APCA. 
- [**Tools and systems**](https://git.apcacontrast.com/documentation/thirdpartytools) that have adopted APCA.

### _APCA Discussion Forum_
- [**Readability Forum**](https://github.com/Myndex/SAPC-APCA/discussions/)   questions and comments welcome.
    - [**DISCUSS: Using APCA with other fonts** ](https://github.com/Myndex/SAPC-APCA/discussions/28#discussioncomment-1610289) Draft method for font weight conformance.
    - [**DISCUSS: Inline text links theory and practice** ](https://github.com/Myndex/SAPC-APCA/discussions/65) Draft guidance regarding link identification.

### _APCA Peer Review & Third Party Discussion_
Listing of [**third party and peer reviews**](https://git.myndex.com/#apca-peer-review--third-party-discussion) of APCA.

### _Articles on Color and Contrast by A.Somers_
- ["The Realities And Myths Of Contrast And Color"](https://www.smashingmagazine.com/2022/09/realities-myths-contrast-color/) A plain language, in-depth primer to vision, color, and contrast for design, with an emphasis on typography and readability needs. Published in Smashing Magazine.
- [**Better reading on the web**](https://uxdesign.cc/better-reading-on-the-web-c943c4cfc91a) Published by _UX Collective_, this article discusses and demonstrates issues with automated testing and WCAG 2 contrast math, methods, and guidelines.

- **On _Tangled Web_** (TangledWeb.xyz):
    - [**Please Stop Using Grey Text**](https://tangledweb.xyz/please-stop-using-grey-text-3d3e71acfca8) This popular article debunks one of the worst myths regarding design contrast.
    - [**What’s Red & Black & Also Not Read?**](https://tangledweb.xyz/whats-red-black-also-not-read-573b9c0a97ed) examines the nature of color insensitivity and readability.
    - [**A Contrast of Errors**](https://atangledwebweweave.com/a-contrast-of-errors-373c2665d42a) looks at the history and the current international readability crisis.
