# Why the New Contrast Method APCA
This is a brief discussion on the need for a new contrast method to guide creators of web content. The old WCAG 2.x method and 1.4.3 contrast is being replaced in WCAG 3.0, here is an overview of the need for this change.

## The Contrast Problem
WCAG 2.x contrast and 1.4.3 and the related understandings and guidelines were born in an era before smart phones and iPads, when displays were mostly CRT type and websites used core web fonts. But that was a decade and a half ago. Today the contrast guidelines are in need of a complete overhaul due to the massive changes in computer display technology, web content, CSS functionality, and advances in vision science since 2005/2008, when WCAG 2.x was first introduced. For deeper background, I am on record with this since April 2019 in [WCAG issue 695](https://github.com/w3c/wcag/issues/695).

There are a number of reasons that WCAG 2.x contrast is faulty, one of which is the binary pass/fail nature of the SC for a property that does not apply in a binary way across perception nor impairments. Humans are not binary computers, and it is important to understand the non-linear aspects of perception, and to set guidelines that correctly model perception as opposed to "brute forcing" arbitrary values that ultimately do more harm than good.

Let's begin with a general understanding of what color and contrast actually is outlined below. See more in my whitepaper ["Introduction to Color and Accessibility"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance#introduction_to_color_and_accessibility) and I also invite you to [read the draft white paper](https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup/Whitepaper).


## Readability Contrast 

Like color, contrast is not real. It is a perception. It is not a simple measure of the distance between two colors.

Like all perceptions it is context sensitive. It is also substantially affected by "spatial frequency" which essentially means font size and weight, and is primarily a function of our brain's lightness perception (aka luminance contrast). When it comes to color contrast (as in hue/chroma/saturation) the effect is less relevant, particularly as related to readability. High lightness/darkness contrast is required for fluent readability at best speed and comprehension, especially small body text in columns or blocks.

Above a certain amount, _contrast constancy_ may come into effect wherein further increases in contrast as far as color distance does not have an effect on perception for readability. The smaller and thinner the letters the lower the perceived contrast. Lightness/darkness difference must be increased to compensate for small thin fonts.

- For fluent readability, Drs Bailey/Lovie-Kitchin demonstrated, and Dr. Legge also showed, that contrast must be at least ten times the contrast sensitivity threshold (CS) of "just noticeable differences" (JND), and twenty times is preferred for adequate contrast reserve above the critical contrast. 

This defines the area of "supra-threshold critical contrast for readability." I refer to this as **"readability contrast"** for simplicity. A similar suprathreshold exists for acuity in terms of font size, which is separate and in addition to the font sizing issues related to spatial frequency driven contrast. Contributing factors are white space, tracker/leading (letter and line spacing) aspect ratio, weight, etc etc...

Spot reading contrast has a lower requirement than fluent readability contrast. Non-lexical object contrast also has a lower luminance contrast requirement. And there are some differences in terms of the importance of color (hue/chroma) for some categories of stimuli, and certainly for information coding.

No single figure such as 4.5:1 can be used as a blanket target for contrast. It has been demonstrated that WCAG 2 contrast can pass colors that should fail. Some articles with visual comparisons and examples of this are:

### _Comparitive Contrast Articles_ 
 
- [A Contrast of Errors](https://medium.com/tangledweb/a-contrast-of-errors-373c2665d42a) on Tangled Web, which looks at the history and the current international readability crisis.
- Part I: [**Orange You Wondering About Contrast?**](https://gist.github.com/Myndex/1dadb6dcac596f1cd7a5686a076f697f) Answering some contrast questions, and demonstrating a real solution to the infamous orange conundrum.
- Part II: [**The Lighter Side of Dark Backgrounds**](https://gist.github.com/Myndex/c30dba273aa5eca426ad9f5200917c9d) An article comparing some parts of APCA with the old WCAG 2 contrast methods, demonstrating how WCAG_2 contrast does not help color vision types, and can cause negative results.
- Part III: [**WCAG 2 vs APCA Contrast Shootout**](https://gist.github.com/Myndex/069a4079b0de2930e72d5401bde9af98#wcag-2-vs-apca-contrast-shootout) Answering some recent questions regarding APCA, with comparisons and examples of the old (WCAG 2 1.4.3) and the future WCAG 3 / APCA.

The problems of 4.5:1 are not only in accessibility, but impacts standard vision. The inherent problems with the WCAG_2 contrast math have been known for some time and [widely critisized](https://macwright.com/2019/03/30/color-contrast-is-a-problem.html). Including studies [by others showing that color insensitive types](https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/) are not well served. The WCAG_2 contrast specs often cause enough problems for designers [that it is ignored](https://uxmovement.com/buttons/the-myths-of-color-contrast-accessibility/) and today, some 86% of websites are failing WCAG\_2 contrast—but some of these failures are not due to poor accessibility but due to the incorrect math of WCAG\_2 contrast.

## The Solution
APCA, the Advanced Perceptual Contrast Algorithm is a part of the larger S-Luv Accessibility/Readability Color Appearance Model (SARCAM, formerly SAPC), which is specifically related to appearance on self-illuminated RGB computer displays, and for modeling impairments, with a focus on readability.

### Lightness contrast
The APCA generates a contrast value based on a color pair, and this value is perceptually based: that is, regardless of how light or dark the colors are, a contrast value of 60 represents the same perceived readability contrast. This is absolutely not the case with WCAG 2.x, which far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable.

The APCA contrast value is perceptually uniform, and based on the point where the CS curve flattens due to contrast constancy. Halving or doubling the APCA value relates to a halving or doubling of the perceived contrast. 

### Different Uses, Different Contrasts
The APCA has a set of levels related to use cases — for instance, Lc 75 is the minimum for body text. This makes for an easy way to use ACPA, very similar to 1.4.3 in terms of ease of use.

The APCA also has an **optional** lookup table to associate font size and weight to the readability contrast (Lc value). The lookup tables allow for even greater accuracy and therefore greater flexibility in design.

### Failing Pass/Fail
A key takeaway is that a strict pass/fail with a blanket contrast ratio is not instructive as a guideline, and does not necessarily solve a given user need. In fact, user needs when it comes to contrast are conflicting—what is good for one can be harmful to another. This is even true of font size. 

This points to the importance of real user personalization, an area where the technology is literally missing (and a work in progress). For the guidelines though, we can set ranges for targets and expectations toward making the web readable for all.

## Use-Case Ranges
These general levels are appropriate for use by themselves, without reference to the lookup table.

*   **90** • Preferred level for fluent text and columns of body text with a font no smaller than 14px, or non-body text with a font no smaller than 12px. Also a recommended minimum for extremely thin fonts (light weight) of any size. Lc 90 is a _suggested maximum_ for **very large and bold fonts** (greater than 36px bold), and large areas of color.
*   **75** • The _minimum_ level for columns of body text with a font no smaller than 18px, or non-body text with a font no smaller than 14px. Also, should be used for any text where readability is important. This level is functionally similar to 6:1 ~ 7:1 relative to WCAG2.
*   **60** • The _minimum_ level recommended for readable content text, that is, text you want people to read, and no smaller than 16px, and not used as body text. This level is functionally similar to the old 4.5:1 in WCAG2.
*   **45** • The _minimum_ for larger text (larger than 24px normal weight or 19px bold) such as headlines, and large text that should be readably fluently. This is also the minimum for pictograms with fine details, or smaller outline icons. This level is functionally similar to the old 3:1 in WCAG2\.
*   **30** • The _absolute minimum_ for any text regardless of size or weight, including text for spot reading such as placeholder text and disabled element text, and the minimum for "understandable" or "uniquely identifiable" non-text elements such as "mostly solid" icons or pictograms.
*   **15** • The _absolute minimum_ for any non-text that needs to be discernible and differentiable, such as dividers, and in some cases large buttons or thick focus visible outlines, but does not include fine details. Designers should treat anything below this level as invisible, as it will not be visible for many users. This minimum level should be avoided for items important to the use or interaction of the site.

**_NOTES ON FONT SIZE_**
- Font sizes listed above assume an x-height ratio of at least 0.52\. Font weight is based on highly standardized reference fonts such as Helvetica or Arial. "px" means the CSS reference px not device pixels. The reference px is defined as 1.278 arc minutes of visual angle.

### Range Based Scoring
While WCAG 3 is still in development, it includes a range-based conformance system. For contrast and fonts it is dependent on multiple factors, yet is simple enough to be fully automated.

The overall approach improves design flexibility and readability at the same time. Readability is improved by increasing contrast in blocks of body text where it is needed, and design flexibility is achieved by relaxing contrast for large non-text elements which do not need brute force contrast due to their larger size.

In reference to the example tool for demonstrations, the contrast value (Lc for Lightness Contrast) is associated with live updates of minimum font size and weight for the target score level: https://www.myndex.com/APCA/

I hope this clarifies the useful differences of a perceptually accurate range-based model as a guideline toward best readability.


Thank you,

Andy


_Andrew Somers_    
_W3 AGWG Invited Expert_    
_Myndex Color Science Researcher_    
_Inventor, SAPC and APCA_    

**_NOTICE: Personal opinions expressed are mine and may or may not reflect those of the W3 or AGWG unless specifically stated so._** 

### _THE REVOLUTION WILL BE READABLE_

 <img src="images/APCAlogo.png" width="640" alt="APCA The Revolution Will Be Readable">


