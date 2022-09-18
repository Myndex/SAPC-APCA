---
layout: simple
---

# APC<span class="flipH">A</span>™ INTEGRATION COMPLIANCE
This brief document defines the minimum integrated features for a tool to be considered either _"APCA™ Compliant"_ or _"APCA™ Compatible"_ and other related issues. This document became necessary due to some unfortunate abuse and improper use of trademarks, code, and importantly in terms of properly presenting the technology. If you have questions, please reach out to legal@myndex.com — we're easy to talk to!

## Compatibility Levels Overview
- **APCA™ Contrast Value:** Requires a correct implementation of the APCA base algorithm only, with disclaimers of use.
- **APCA™ Compatible:** Same as "Contrast", adding in manual font lookup guidelines
- **APCA™ Compliant:** Same as "Compatible" but also including font calculations, and conforms to independent APCA™ design guidelines.
- **APCA™ Certified:** Same as "Compliant" but also requires evaluation and certification by Myndex Research.
- **WCAG&nbsp;3 Compliant: _Does not exist yet._** Until WCAG&nbsp;3 is an official recommendation  there is no such thing.
    - ***Important Notice:*** until WCAG&nbsp;3 is the official recommendation of the W3.org, you cannot conform to the standard, therefore _"WCAG&nbsp;3 Compliant"_ or similar terminology cannot be used.

### _Conformance Failure Remediation_
Unfortunately, due to misuse, tools that are not at least at the APCA minimum level "contrast value", and that make any claims of being APCA™ or SAPC™, be notified and provided a reasonable period of time to remove the statements or update the implementation.

Regrettably, tools that are improperly implementing the technology and/or that are improperly claiming WCAG&nbsp;3 compliance, are causing concerns within the W3-AGWG and in the accessibility community at large. Also, there is sufficient misinformation regarding contrast on the internet today, that there is a significant interest in correcting these issues.

As the APCA™ is designed specifically for use in a standard, it is important that tools are unified regarding their application of the technology. As this is a developing standard, it is further important that tool developers follow changes in the APCA™ code or methods, and keep tools updated to prevent discordant results.

### Use of Trademarks
The terms "APCA", "SAPC", "SACAM", "Advanced Perceptual Contrast Algorithm", "Accessible Perceptual Contrast Algorithm", "APCA™ Contrast", "APCA™ Compatible", "APCA™ Compliant", "APCA™ Certified", are trademarks of Myndex Research and Andrew Somers, All Rights Reserved, use by limited permission only. Trademarks are not included as part of any open-source license, permission to use only per the limited restrictions listed in this document. 

**Permission to use revokable at any time for non-compliance per this document or future versions thereof, revocation made in writing to the email address of record of the trademark user.**

### Regarding WCAG 3.0
The only suitable language at this time is: _"APCA™ is the candidate contrast method for WCAG&nbsp;3, and is currently in public beta. WCAG&nbsp;3 is still in development and subject to changes prior to adoption."_

----
## Compliance Levels Defined
For the purposes of this document: 
- "APCA" and "APCA code" refers to
    - the npm package ` npm i apca-w3 ` and
    - the specific GitHub repo: [/Myndex/apca-w3](https://github.com/Myndex/apca-w3)
    - no other fork or package qualifies unless certified in writing by Myndex Research.
- "Current APCA version" refers to the most current published to npm.
- "Current Base Algorithm" refers to
    - _**APCA Contrast Prediction Equation 0.0.98G-4g-base-W3**_
    - [0.0.98G-4g as LaTeX Math](https://github.com/Myndex/SAPC-APCA/blob/master/documentation/APCA-W3-LaTeX.md#latex-of-the-apca-w3-base-formula)

---
### _ALL LEVELS—MINIMUM APCA COMPLIANCE_
All compliance levels require the following:
- Correct implementation of the current version of the base contrast algorithm (0.0.98G-4g-base-W3).
    - Text and background color inputs clearly defined and maintained.
    - Use of the sRGB colorspace as default.
    - Lc output value must indicate polarity (dark mode or light mode)
    - Polarity must be indicated with one of:
        - A negative value for dark mode (light text on dark) i.e. "-60" OR
        - A text identifier for _BOTH_ light mode and dark mode, example:
             - BoW (meaning black on white, i.e. dark text on a light BG)
             - WoB (meaning white on black, i.e. light text on a dark BG)
        - Failure to correctly indicate polarity is a conformance failure.
    - Lc value may optionally be rounded to the nearest whole number.
- Use of other features or color spaces in the apca-w3 package are correctly implemented per the current APCA version.
- Color space is clearly identified when it is not sRGB.
- Use of own features do not change the correct results of the current APCA version.
- Any view the APCA math or base algorithm is shown in a human readable form, the following disclaimer must be attached:
    - "APCA is a method for predicting text contrast on self-illuminated displays for web-based content. Some use-cases are prohibited by license, including the following: use in medical, clinical evaluation, human safety related, aerospace, transportation, military applications, are strictly prohibited without a specific license in writing granting such use."
- In the associated documentation, and preferably linked on the interface screen near the Lc output, shall be a link to the "Why APCA" document: https://git.apcacontrast.com/documentation/WhyAPCA


### APCA™ Contrast Value _(no guidelines, no examples)_
Use of the term "APCA™ Contrast" requires at a minimum:
- Minimum APCA compliance as listed above
- **MAY NOT** present any example using the tested colors, nor present any font examples.
    - The output of the tool must be _only_ the Lc value, and present no visual example.
- May use the term "APCA Contrast Value" but may not use terms such as "APCA compliant" 
    - May refer to the output as "APCA Lc Value" or "Lc"
    - **MUST present the value alone,** with no examples of the use of the colors or fonts whatsoever.
    - Use of visual font examples shall require adherance to "APCA™ Compatible" or better.
- NO linking to any WCAG&nbsp;3 document at all (neither current nor expired), and no reference of any kind to WCAG&nbsp;3 nor WCAG&nbsp;3 compatibility nor WCAG&nbsp;3 compliance whatsoever.
- If any examples are to be shown, the tool must conform to one of the APCA guideline levels, described below.

---
### APCA™ Compatible _(basic guidelines and basic examples)_
Use of the term "APCA™ Compatible" requires at a minimum:
- Minimum APCA compliance
- If an example is shown, it must show at least the minimum reference font size at normal weight for the fluent text use case, at the present Lc value.
    - Reference font for this purpose is normal weight (400) Arial or Helvetica, normal aspect.
    - Sizes per Lc level as listed, including the title:
        - Fluent Text Minimum Reference Font Sizes at Normal Weight (Arial 400)
        - Lc 90: 14px
        - Lc 75: 16px
        - Lc 60: 24px
        - Lc 45: 42px
        - Lc 30: must have warning saying "non-content text only"
        - Lc 15: must have warning saying "certain non-text only"
- NO linking to any _expired_ WCAG&nbsp;3 document, and no claims of WCAG&nbsp;3 compliance.
    - Any reference to WCAG&nbsp;3 must include the <a href="#Regarding-WCAG-3.0">"permitted language"</a> described earlier.
    - Links to the WCAG&nbsp;3 document shall only be: https://www.w3.org/TR/wcag-3.0/#visual-contrast-of-text
- APCA compatible tools must link to the "Why APCA" page on the same page as the main tool interface:
    - https://git.apcacontrast.com/documentation/WhyAPCA
    - Also, at some reasonable place, provide a link to the discussion page, indicating it as a forum for questions, comments, or issues:
    - https://github.com/Myndex/SAPC-APCA/discussions

- The output of the contrast value includes the term "Lc" such as "Lc 60"
- If polarity is indicated with
    - ...a negative value, there is a space between Lc and the minus: "Lc -60"
    - ...text (BoW), it is immediately after the Lc value: "Lc 60 WoB"
- At a minimum, these basic conformance levels are listed near the output value:
    - Lc 90: Preferred Body Text
    - Lc 75: Minimum Body Text
    - Lc 60: Minimum Fluent text
    - Lc 45: Minimum Large text
    - Lc 30: Minimum Any text
    - Lc 15: Invisibility point
- More complete explanations (or a link to) must be adjacent to the levels list.
- A link to the full font size/weight lookup tables is optional but preferred.

---
### APCA™ Compliant _(more complete guidelines and examples)_
Use of the term "APCA™ Compliant" requires at a minimum:

Everything as recited in "APCA™ Compatible" but further including:
- A link to the font size/weight lookup tables and documentation (required).
    - This should include the Bronze/Silver/Gold level descriptions (optional until WCAG&nbsp;3 is official).
- In addition to the Lc output, additionally a visible output stating the minimum font size for weights 300, 400, and 700.
    - Additional weights may be included.
    - If a user settable variable weight is included, then only weight 400 and the variable weight need to be displayed.
    - A mobile version only needs to display either one variable weight, or both weights 400 & 700.
- Optionally but preferentially, those font outputs include a realtime demonstration using the reference font in the color selected, and the size and weight calculated.

Pending Requirements in development:
- Associated eye dropper tools to pick the native sRGB color.
- Associated non-text guidelines chart.

### APCA™ Certified 
For certification, a site or tool must meet the APCA Compliant standard above, and then have source code and implementation evaluated and certified by Myndex Research. The certification service will be available at the conclusion of the beta period.

Only APCA Certified apps will be permitted to use the trademarked "Powered by APCA" or "APCA" official logos.

### APCA Beta Testers
APCA Beta sites may have different variations on the above requirements, determined on a case by case basis.

To become "officially" involved in the APCA beta program, please send an email to "legal@myndex.com" with "APCA Beta" in the subject line.


## Further Discussion
We are open for comments, questions, and discussion at the [Main APCA Repo Discussions.](https://github.com/Myndex/SAPC-APCA/discussions)



