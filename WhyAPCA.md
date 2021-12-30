# Why the New Contrast Method APCA
This is a brief discussion on the need for a new contrast method to guide designers of web content. 

The old WCAG 2.x method and 1.4.3 contrast is being replaced in WCAG 3.0, and as I am the author of the WCAG 3.0 contrast, and leading the ongoing research in this area, I wanted to discuss how the new contrast method fits into the conformance model in a non binary way.

### The 1.4.3 Problem
First of all, WCAG 2.x contrast and 1.4.3 and the related understandings and guidelines are the single "most wrong" part of WCAG 2.x, and the part that was most in need of updates due to the massive related changes in coputer display technology, web content, CSS functionality, and advanved in vision science since 2005/2008, when that standard was first introduced. I am on record with this since April 2019 in [WCAG issue 695](https://github.com/w3c/wcag/issues/695).

There are a number of reasons that 1.4.3 and related are faulty, one of which is the binary nature of the SC for a property that does not apply in a binary way across perception nor impairments. It is a prime example of why "binary" is a fail for conformance models for properties relating to human perception. Humans are not binary computers, and it is important to understand the non-linear and non-binary aspects of perception, and to set guidelines that correctly model perception as opposed to "brute forcing" arbitrary values that ultimately do more harm than good.

Let's begin with a general understanding of what color and contrast actually is outlined below. See more in my whitepaper ["Introduction to Color and Accessibility"](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_Colors_and_Luminance#introduction_to_color_and_accessibility) and I also invite you to [read the draft white paper](https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup/Whitepaper) see the more in-depth discussions of Visual Contrast conformance at the [W3 Wiki for Visual Contrast](https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup/Conformance)


## Readability Contrast 

First, like color, contrast is not real. It is a perception. It is not a measure of the distance between two colors.

Like all perceptions it is context sensitive. It is also substantially affected by spatial frequency, and is primarily a function of the luminance channel, while hue/chroma are far distant in effect, particularly as related to readability. High luminance contrast is required for fluent readability, especially small body text, such that the text's words and letter-pairs are properly directed to and filtered by the Visual Word Form Area (VFWA) of the brain, leading into lexical processing.

Above a certain amount, contrast constancy may come into effect wherein further increases in contrast as far as color distances does not have an effect on perception for readability. However, as spatial frequency increases (meaning smaller and thinner letters) perceived contrast drops rapidly, such that lightness distance must be increased to compensate for small thin fonts.

For fluent readability, Drs Bailey/Lovie-Kitchin demonstrated, and Dr. Legge also showed, that contrast must be at least ten times the contrast sensitivity threshold (CS) of just noticeable differences (JND), and twenty times is preferred for adequate contrast reserve above the critical contrast. 

This defines the area of "suprathreshold critical contrast for readability." I refer to this as **"readability contrast"** for simplicity. A similar suprathreshold exists for acuity in terms of font size, which is separate and in addition to the font sizing issues related to contrast spatial frequency. Contributing factors are white space, tracker/leading (letter and line spacing) aspect ratio, weight, etc etc...

Spot reading contrast has a lower requirement than fluent readability contrast. Non-lexical object contrast also has a lower luminance contrast requirement. And there are some differences in terms of the importance of color (hue/chroma) for some categories of stimuli, and certainly for information coding.

No single figure such as 4.5:1 is even remotely useful as a blanket statement, and I have demonstrated that it can even be harmful. Some articles with visual comparisons and examples of this are:

### _Comparitive Contrast Articles_ 
 
- Part I: [**Orange You Wondering About Contrast?**](https://gist.github.com/Myndex/1dadb6dcac596f1cd7a5686a076f697f) Answering some contrast questions, and demonstrating a real solution to the infamous orange conundrum.
- Part II: [**The Lighter Side of Dark Backgrounds**](https://gist.github.com/Myndex/c30dba273aa5eca426ad9f5200917c9d) An article comparing some parts of APCA with the old WCAG 2 contrast methods, demonstrating how WCAG_2 contrast does not help color vision types, and can cause negative results.
- Part III: [**WCAG 2 vs APCA Contrast Shootout**](https://gist.github.com/Myndex/069a4079b0de2930e72d5401bde9af98#wcag-2-vs-apca-contrast-shootout)
 Answering some recent questions regarding APCA, with comparisons and examples of the old (WCAG 2 1.4.3) and the future WCAG 3 / APCA.

The problems of 4.5:1 are not only in accessibility, but fails for normal vision. The inherent problems with the WCAG_2 contrast math have been known for some time and [widely critisized](https://macwright.com/2019/03/30/color-contrast-is-a-problem.html). Including studies [by others showing color insensitive types](https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/) are not well served. The WCAG_2 contrast specs often cause such problems for designers [that it is ignored](https://uxmovement.com/buttons/the-myths-of-color-contrast-accessibility/). 1.4.3 is in fact sometimes ignored even by those who claim to be A11y supporters — we've found aiiy sites that promotes WCAG_2 contrast and yet fail 1.4.3.


## The Solution
APCA, the Advanced Perceptual Contrast Algorithm is a part of the larger S-Luv Accessibility/Readability Color Appearance Model (SARCAM, formerly SAPC), which is specifically related to appearance on self-illuminated RGB computer displays, and for modeling impairments, with a focus on readability.

### Lightness contrast
The APCA generates a contrast value based on a color pair, and this value is perceptually based: that is, regardless of how light or dark the colors are, a contrast value of 60 represents the same perceived readability contrast. This is absolutely not the case with WCAG 2.x, which far overstates contrast for dark colors to the point that 4.5:1 can be functionally unreadable.

The APCA contrast value is perceptually uniform, and based on the point where the CS curve flattens due to contrast constancy. Halving or doubling the APCA value relates to a halving or doubling of the perceived contrast. 

### Spatial contrast
The APCA then uses a lookup table to associate font size and weight to the readability contrast. The lookup tables shown thus far are for latin fonts. Different languages may want to have their own modified lookup tables specific to their needs. After some further studies, we expect the lookup table will be replaced with a set of parametric curves.

### Pass/Fail
A principal point here is that a strict pass/fail is not instructive, is arbitrary, and not necessarily solving a given user need. In fact user needs when it comes to contrast are conflicting in that what is good for one can be harmful to another. This is even true of font size. 

More than anything this points to the importance of real user personalization, an area where the technology is literally missing (and a work in progress). For the guidelines though we can set ranges for targets and expectations toward making the web readable for all. Developing personalization capabilities is ongoing.

### Multilevel conformance
Because of the wide and variable nature of user needs vs use cases in visual contrast, we've divided the scoring into ranges.
- Preferred: this is the optional level 5 — it is not a 5 in terms of score, the score is still 4 — but it is a target to encourage designers to work toward when possible. It suggests some practices that are hard to acheive as a group, so it not appropriate for a standard, but as a "should/may" form of guideline.
- Score 4 is the level for fluent readability best practices, and intended to accommodate sighted users including those with impairments that do not otherwise need assistive technology. 
- Score 3 is a "safety catch" for well designed sites that in testing had a flaw that should not fail the site, but provide guidance for future improvement.
- Score 2 and 1 are "deficient" and "poor", intended to help sites that currently pass WCAG 2.x but have readability problems still "pass" while providing guidance for improvement. This recognizes that there may be questions in transitioning from WCAG_2 to a perceptually accurate guideline.
- Score 0 is a fail, and fails the site. If a site scores 0 it was likely not passing WCAG 2.x either, though there may be edge cases there.

### Non Binary
The method for predicting readability contrast is not binary, and the scoring of results is also not binary. It is range based, and dependent on multiple factors, yet is simple enough to be fully automated. So I don't think using the term "binary" is descriptive of this scoring methodology. It is clearly not "pass/fail" except at the extreme edge cases, and demonstrates the value of a range-based approach.

The overall approach improves design flexibility and readability at the same time. Readability is improved by increasing contrast in blocks of body text where it is needed, and relaxing contrast for large non-text elements which do not need brute force contrast due to their larger size.

In reference to the example tool for demonstrations, the contrast value (Lc for Lightness Contrast) is associated with live updates of minimum font size and weight for score level 4: https://www.myndex.com/APCA/


I hope this clarifies the useful differences of a perceptually accurate range-based model with a multi-level score versus WCAG_2's simplistic pass/fail approach which unfortunately is not accurate relative to human perception.


Thank you,

Andy


_Andrew Somers_    
_W3 AGWG Invited Expert_    
_Myndex Color Science Researcher_    
_Inventor, SAPC and APCA_    

### _THE REVOLUTION WILL BE READABLE_

**_NOTICE: Personal opinions expressed are mine and may or may not reflect those of the W3 or AGWG unless specifically stated so._** 

 <img src="images/APCAlogo.png" width="640" alt="APCA The Revolution Will Be Readable"><


