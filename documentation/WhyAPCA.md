---
layout: simple
---

# Why APC<span class="flipH">A</span> as a New<br> Contrast Method?
Readability is a critically important aspect of web content, affecting 99% of internet users. For years, the WCAG&nbsp;2.x contrast guidelines provided some guidance toward readability but are being replaced for the future WCAG&nbsp;3.0. Here is an overview of the need for this change and discussion of the candidate replacement, the _Accessible Perceptual Contrast Algorithm_ (APCA).

## The Contrast Problem
WCAG&nbsp;2.x contrast and 1.4.3 and the related understandings and guidelines were born in an era before smart phones and iPads, when displays were mostly CRT type and websites used core web fonts. But that was a decade and a half ago. Today the contrast guidelines are in need of a complete overhaul due to the massive changes in computer display technology, web content, CSS functionality, and advances in vision science since 2005/2008, when WCAG&nbsp;2.x was first introduced. For deeper background, see the author's thread circa April 2019 in [WCAG issue 695](https://github.com/w3c/wcag/issues/695).

There are a number of reasons that WCAG&nbsp;2.x contrast is faulty, one of which is the binary pass/fail nature of the SC for a property that does not apply in a binary way across perception nor impairments. Humans are not binary computers, and it is important to understand the non-linear aspects of perception, and to set guidelines that correctly model perception as opposed to "brute forcing" arbitrary values that ultimately do more harm than good.

Let's begin with a general understanding of color and contrast with the summary outlined below. For a deeper dive see the author's whitepaper ["Introduction to Color and Accessibility"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance#introduction_to_color_and_accessibility) and also [the draft APCA white paper](https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup/Whitepaper).


## What Is Readability Contrast?

Like color, contrast is not "real", it is a _perception_ and is more a result of how your brain interprets visual differences. It is not a simple measure of the distance or difference between two colors.

Like all perceptions it is context sensitive, meaning what is around it and its purpose affects how you see it. Contrast is also substantially affected by _"spatial frequency"_ which essentially means font size and weight, and is closely related to our brain's lightness perception (aka luminance contrast). When it comes to _color_ contrast, as in hue/chroma/saturation, the effect is less relevant to readability. High lightness/darkness contrast is required for fluent readability at best speed and comprehension, especially small body text in columns or blocks.

Above a certain amount, _contrast constancy_ may come into effect wherein further increases in a mathmatical contrast value does not have an effect higher perceived contrast for readability. A high "spatial frequency" means smaller and thinner letters. Smaller, thinner letters or graphics lowers the perceived contrast. As a result, the lightness/darkness difference between text and the background color must be increased to compensate for small thin fonts.

- Fluent readability refers to _critical contrast_ which is that needed for best reading speed and comprehension. Dr. Bailey & Lovie-Kitchin's studies showed, along with Dr. Legge and other recent studies, contrast must be at least ten times the contrast _sensitivity threshold_ (CS) which is the point of "just noticeable differences" (JND). Twenty times is preferred for adequate _contrast reserve_ above the critical contrast. 
- Spot readability means being readable without significant effort, though not necessarrly at the best speed or accuracy. In this case the contrast needs to be three times that of the JND.
- Various forms of visual impairment include more than acuity, which is the ability to focus the eyes to a sharp clear image. Contrast sensitivity related impairments involving the eyes or brain may have an even greater effect on overall vision.

These factors define the area of "supra-threshold critical contrast for readability." We refer to this as **"readability contrast"** for simplicity. A similar suprathreshold exists for acuity in terms of font size, which is separate but in addition to the font sizing as related to spatial-frequency-driven contrast.

In otherwords, the size of a font is related to a person's ability to focus (defined by a number like 20/20 or 6/6 on an eye exam chart) and the size and weight of that font also directly affect contrast perception. Contributing factors are white space, letter, and line spacing, the aspect ratie of the letter (tall vs wide), etc...

Spot-reading-contrast has a lower requirement than fluent readability contrast. Non-text object contrast such as for a solid icon may also have a lower lightness contrast requirement. And there are some differences in terms of the importance of color (hue or saturation) for things such as information coding.

No single figure such as 4.5:1 or 3:1 can be used as a blanket target for contrast between two colors, without considering the use case, size, thickness, etc. On this point, it has been demonstrated that WCAG&nbsp;2 contrast can pass colors that should fail as not readable, and sometimes that math fails a color pair that should pass as very readable. Some articles with visual comparisons and examples of this are:

### _Contrasting Concerns_ 

The problems of 4.5:1 as a target for a guideline not only impact accessibility, but impacts standard vision. The inherent problems with the WCAG&nbsp;2 contrast math have been known for some time and [widely critisized](https://macwright.com/2019/03/30/color-contrast-is-a-problem.html). Including studies [by others showing that color insensitive types](https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/) are not well served. The WCAG&nbsp;2 contrast specs often cause enough problems for designers [that it is ignored](https://uxmovement.com/buttons/the-myths-of-color-contrast-accessibility/) and today, some 86% of websites are failing WCAG\_2 contrast—though some failures are not due to actually poor accessibility, but due to the incorrect math of WCAG\_2 contrast.

-----
## The Solution: APCA
The Accessible Perceptual Contrast Algorithm (APCA) is a new method for calculating and predicting readability contrast. APCA is a part of the larger S-Luv Accessible Color Appearance Model known as SACAM (formerly SAPC). These models are specifically related to color appearance on self-illuminated RGB computer displays & devices, and also for modeling accessible user needs, with a focus on readability.

### _Lightness contrast (L<sup>c</sup>)_
The APCA generates a lightness/darkness contrast value based on a minimum font size and color pair, and this value is perceptually based: that is, regardless of how light or dark the two colors are, a contrast value of L<sup>c</sup>&nbsp;60 represents the same _perceived_ readability contrast. This is absolutely not the case with WCAG&nbsp;2.x, which far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable when a color is near black. As a result, WCAG&nbsp;2.x contrast cannot be used for guidance designing "dark mode".

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
These general levels are appropriate for use by themselves, without the need to reference a lookup table. APCA reports contrast as an L<sup>c</sup>&nbsp;value (lightness contrast) from **L<sup>c</sup>&nbsp;0** to **L<sup>c</sup>&nbsp;105+**. For accessibility, consider L<sup>c</sup>&nbsp;15 the point of invisibility for many users, and L<sup>c</sup>&nbsp;90 is preferred for body text.

See [this on ranges](./APCA_in_a_Nutshell.md#use-case-ranges) for a more indepth look.

*   **L<sup>c</sup>&nbsp;90** • Preferred level for fluent text and columns of body text with a font no smaller than 14px/weight 400 (normal).
*   **L<sup>c</sup>&nbsp;75** • The _minimum_ level for columns of body text with a font no smaller than 18px/400. L<sup>c</sup>&nbsp;75 should be considered a minimum for text where readability is important.
*   **L<sup>c</sup>&nbsp;60** • The _minimum_ level recommended for content text that is not body, column, or block text. In other words, text you want people to read. The minimums: 24px normal weight (400) or 16px/700 (bold). These values based on the reference font Helvetica. 
*   **L<sup>c</sup>&nbsp;45** • The _minimum_ for larger, heavier text (36px normal weight or 24px bold) such as headlines. This is also the minimum for pictograms with fine details.
*   **L<sup>c</sup>&nbsp;30** • The _absolute minimum_ for any text not listed above. This includes placeholder text and disabled element text. This is also the minimum for large/solid semantic & understandable non-text elements.
*   **L<sup>c</sup>&nbsp;15** • The _absolute minimum_ for any non-text that needs to be _discernible_ and differentiable, and is no less than 6px in its smallest dimention. This may include disabled large buttons. **Designers should treat anything below this level as invisible**, as it will not be visible for many users. This minimum level should be avoided for any items important to the use, understanding, or interaction of the site.

These define the basic minimum levels, what you might think of as A/AA in the old WCAG&nbsp;2. For the equivelent to AAA, simply increase the contrast values by L<sup>c</sup>&nbsp;15. Maximum: for large fonts, keep contrast less than Lc 90.

### _Range-Based Scoring_
While the candidate for WCAG&nbsp;3 is still in development, it includes a range-based conformance system. While it considers multiple factors, it is simple enough to be fully automated, and does not rely on an arbitrary pass/fail binary scoring.

The overall approach improves design flexibility and readability at the same time. Readability is improved by increasing contrast in blocks of body text where it is most needed, and design flexibility is achieved by relaxing contrast for large non-text elements which do not need brute-force contrast levels due to their larger size (resulting in a lower spatial frequency).

For demonstration purposes, the example tool provides real-time updates of minimum font size and weight vs contrast: https://www.myndex.com/APCA/ click on the color patches to bring up a colorpicker.

We hope this clarifies the useful differences of a perceptually accurate range-based model as the guideline for a future of best readability.


Thank you for reading,


_Andrew Somers_    
_W3 AGWG Invited Expert_     
_Research Lead and Creator of APCA_     
_Senior Color Science Researcher_      
_Myndex PercepTex Research Project_     

### _Study Volunteers Needed_
Would you like to help create a more readable world for all? Please let us know! We have several studies planned for 2022, and it requires minimal time on your part to participate. Please send an email to perceptex@myndex.com with "volunteer" in the subject line.

**_NOTICE: Personal opinions expressed are the author's and may or may not reflect those of the W3 or AGWG._** 

_This document was written in plain language to the extent possible, with a target readability age of about a high school senior. Readability evaluations were made using the https://wooorm.com/readability/ tool. If you found any part of this essay difficult or confusing, please [file an issue or discuss here](https://github.com/Myndex/SAPC-APCA/discussions) so we can improve._

## _THE WORLD IS READING_<sup>™</sup>

 <img src="/images/APCAcolor4.png" width="640" alt="APCA The Revolution Will Be Readable">


### _Appendix: Additional Reading_
- [**Catalog of APCA Resources and Links**](https://git.myndex.com)

### _APCA Discussion Forum Threads_
- [**APCA Use Cases**, Conformance, Research, and Glossary ](https://github.com/Myndex/SAPC-APCA/discussions/39#discussion-3757102) Discussion of use cases for text and non-text elements, and references to the relevant research. Conformance considerations and rational basis for guidelines.
- [**Links To Tools** and Toolmakers ](https://github.com/Myndex/SAPC-APCA/discussions/51#discussion-3776260) Some of the tools that have adopted APCA.
- [**Using APCA with other fonts** ](https://github.com/Myndex/SAPC-APCA/discussions/28#discussioncomment-1610289) Draft method for font weight conformance.

### _Peer reviews of APCA & third party <br>comparisons of APCA vs WCAG&nbsp;2_
- [Does the contrast ratio actually predict the legibility of website text? ](https://www.cedc.tools/article.html) A comparison of WCAG 2 math and APCA, by Sam Waller, a PhD at the Engineering Design Centre, University of Cambridge, UK.
- [Color Contrast Is Not As Black And White As It Seems ](https://medium.com/@think_ui/why-color-contrast-is-not-as-black-and-white-as-it-seems-94197a72b005) by Roger Attrill, a technical analysis of some of the problems with WCAG 2 contrast math, and comparing and analysing APCA.
- [It’s Time For A More Sophisticated Color Contrast Check ](https://blog.datawrapper.de/color-contrast-check-data-vis-wcag-apca/) A review of APCA and comparison to WCAG 2 contrast, in the use case of dataviz, by Lisa Charlotte Muth.
- [Accessible Palette: stop using HSL for color systems ](https://wildbit.com/blog/accessible-palette-stop-using-hsl-for-color-systems) by Eugene Fedorenko, this is mostly a discussion of his new color pallette tool, but APCA figures into that, and he discusses the integration into the tool vs WCAG&nbsp;2 contrast.
- [Adv. Perceptual Contrast Algorithm](https://typefully.com/u/DanHollick/t/sle13GMW2Brp) Don Hollick's review and discussion of APCA vs WCAG 2.
- [Improving accessibility with the new APCA ](https://www.lightflows.co.uk/blog/improving-accessibility-with-apca/) A review of APCA by Nik Bailey.

### _Articles & Gists_
- [**Better reading on the web**](https://uxdesign.cc/better-reading-on-the-web-c943c4cfc91a) Published by _UX Collective_ (uxdesign.cc). This article discusses and demonstrates issues with automated testing and WCAG 2 contrast math, methods, and guidelines.

- **On _Tangled Web_** (TangledWeb.xyz):
    - [**Please Stop Using Grey Text**](https://tangledweb.xyz/please-stop-using-grey-text-3d3e71acfca8) This popular article debunks one of the worst myths regarding design contrast.
    - [**What’s Red & Black & Also Not Read?**](https://tangledweb.xyz/whats-red-black-also-not-read-573b9c0a97ed) on Tangled Web, which examines the nature of color insensitivity and readability.
    - [**A Contrast of Errors**](https://atangledwebweweave.com/a-contrast-of-errors-373c2665d42a) on Tangled Web, which looks at the history and the current international readability crisis.
    - 
- **_GitHub Gists_** on [contrast and color](https://gist.github.com/Myndex)
- **_Gists Specific to APCA_**:
    - Part I: [**Orange You Wondering About Contrast?**](https://gist.github.com/Myndex/1dadb6dcac596f1cd7a5686a076f697f) Answering some contrast questions, and demonstrating a real solution to the infamous orange conundrum.
    - Part II: [**The Lighter Side of Dark Backgrounds**](https://gist.github.com/Myndex/c30dba273aa5eca426ad9f5200917c9d) An article comparing some parts of APCA with the old WCAG&nbsp;2 contrast methods, demonstrating how WCAG&nbsp;2 contrast can cause poor results.
    - Part III: [**WCAG&nbsp;2 vs APCA Contrast Shootout**](https://gist.github.com/Myndex/069a4079b0de2930e72d5401bde9af98#wcag-2-vs-apca-contrast-shootout) Answering some recent questions regarding APCA, with comparisons and examples of the old (WCAG&nbsp;2 1.4.3) and the future WCAG&nbsp;3 / APCA.
