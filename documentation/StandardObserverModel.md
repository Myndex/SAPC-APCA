---
layout: simple
---

# S-Luv Accessible Readable Color Appearance Model (SARCAM)
_(Formerly known as SAPC)_

## Standard Observer (Draft)

* S-Luv, is a L<sup>s</sup> u<sup>s</sup>v<sup>s</sup>-type colorspace for modeling vision and visual impairment perception of emissive displays and devices. 
    * S-Luv is built around the concept of a standard-observer/standard-environment model.
        * the standard observers for visual acuity (VA) with best correction, are grouped as: 
            * 20/12 to 20/20: near-perfect human acuity 
            * 20/20 to 20/40: normal impairment (can drive non-commercial)
            * 20/40 to 20/63: substantial impairment (cannot drive)
            * 20/70 to 20/125+1: Low Vision / disabling impairment
            * Unable to descern ANY character on the 20/100 line: legal definition of blind
                * Note the US SSA allows for acuity testing on log charts which unlike Snellen, have lines between 20/100 and 20/200. The SSA defines statutory blind as unable to descern any character on the 20/100 line, so 20/125+1 (able to see one character on the 20/100 line) does not qualify as statuory blind.
        * The standard observers for visual field (VF) using a III4e stimulus are
            * Greater than 55° temporal and 35° nasal perimeter both eyes (near normal field)
            * Less than 55° temporal and 35° nasal perimeter in either eye (reduced field)
            * Less than 20° perimeter in both eyes, or a -22 dB MD (statutory blind)
        * The standard observers for contrast sensitivity (CSF) are
            * Pelli Robson 2 (normal, 1% threshold)  
            * Pelli Robson 1.5 (impaired, 3% threshold)  
            * Pelli Robson 1 (Low Vision, 10% threshold)
        * The standard observers for Color Vision Deficiency (CVD) are
            * A Protanope (no "red" L cones) is the primary CVD standard observer.
                * Both Protan and Deutan are considered at the same time by using the Protan standard observer, this is because both have similar discrimination issues, but only protan has a significant spectral deficit toward red.
            * Optional additional CVD obervers:
                * A Deuteranope (no "green" M cones)
                * A Tritanope (no "blue" S cones)
                * Blue Cone Monochrmacy is evaluated as low vision / disabling impairment with photophobia and no color discrimination.
* Readability Standard Observer
    * It is important to remember that the listed VA, CSF, & CVD specify the threshold levels between legible and not legible
    * Threshold legibility does not quantify the ideal readability conditions.
        * The critical readability for VA is a stimulus that is 2.4 times larger than threshold acuity.
        * The critical readability for CSF is a stimulus that has 10 times higher contrast than threshold.
        * The critical readability for CVD is a stimulus that has 10 times higher contrast than achromatic threshold, ***after*** adjusting for loss of color discrimination.


### SAPC Standard Observer Monitor and Environment
This is the SAPC standard observer model. This is based on the currently available research and data. We are developing studies to collect additional data, in particular, sampling user settings of their monitor's brightness/contrast and the effect on the resultant display characteristics, and differences in manufacturer implementation of ambient light compensation.

_**The standard environmental model shall comprise**_
* A desktop sRGB LCD screen that is
  * A non-retina display in the sRGB colorspace
  * IPS or equivelent technology such that off-axis viewing is not impacted. 
* Monitor shall be calibrated using a hardware calibrator to:
  * Max White (#FFF) Luminance no less than 160cd/m^2 
  * Max White Luminance no more than 240cd/m^2 
  * Black level (#000) target of 1 cd/m^2 or less, and no more than 2 cd/m^2
  * Preferred gamma target of 2.2, or the sRGB/displayP3 piecewise TRC
     * This is for an actualphysical display. Math models may have a gamma add to compensate for the HVS gamma.
     * This gamma based and the white level to be adjusted in accordance with the ambient levels shown below.
     * An alternate gamma curve may be used for specific testing provided all results so specify.
     * HDR displays are not included in this specification.
* Monitor's surrounding environmental conditions
  * Background behind the monitor and within the users field of view should be neutral grey or white, at a luminance that is 20% of the monitor's maximum white.
  * Ambient light of approximately 200 lux.
    * The light should not _directly_ shine on the face of the monitor.
    * The light should not shine into the eyes of the user while viewing the monitor.
    * What is actually important is that the area within view surrounding the monitor be at 20% luminance of the monitor's max white level. _(If the monitor is surrounded by 80% white walls then it is those 80% walls that need to be at 20% luminance of the monitor's max white as calibrated.)_
  * Ambient evaluation proceedure:  
    * Send the sRGB monitor full screen grey at sRGB value #7C7C7C.
    * The average luminance of the area in view around the monitor should be the same as the monitor grey at #7C7C7C.
    * The monitor at #FFFFFF should measure a luminance approximately five times higher than that measures at #7C7C7C.
  * Position monitor toward user in a way that minimizes reflections.
* Standard observer positioning and desktop monitor resolution.
  * Monitor resolution in ppi shall provide that at the observers view position that:
    * a stimulus that is 18.8px high (CSS reference px) shall subtend 24' (minutes of arc) or 0.4° on the obverver's retina.
      * One CSS reference px is 1.278 minutes of arc or 0.0213°
      * An 18.8px stimulus means the actual size as measured and rendered on the display face.
        * For instance, the glyphs in a font set to  ` font-size: 18.8px; ` does not render as 18px on screen. If the x-height ratio is 0.5, then that means the lower case letters render as only 9px on the display.
        * If the x-height ratio of a font is 0.5875, then setting that font to 32px will result in lower case letters rendering as 18.8px on screen.
      * 24' arc-min is the critical size for a viewer with 20/40 vision for best readability.
      * To determine the critical reading size in arc-min for a given acuity, multiply the lower Snellen number by 0.6.
        * For instance, for 20/70 vision, multiply 70 * 0.6 = 42' arc-min.
      * To determine the actual font size based on acuity, if the font haas an x-height ratio of 0.5875, then multiply the lower Snellen number by 0.8
        * For instance, for 20/60 vision, multiply 60 * 0.8 = 48px font.
          * This isonly if that font has an x-height ratio of 0.5875,
          * The lowercase letters of that 48px font then render to screen at about ~28px.
    * As a quick rule of thumb: **a 16px standard font with an x-height ratio of 0.59 is the critical size for normal vision.**
  * Observer is positioned based on the monitor resolution.
    * For a mobile device, the observer is positioned such that the 1px = 1.278' arc-min relationship is maintained.
    * For a 96ppi monitor, the observer shall be 28" away.
  * For desktop, the monitor should be chosen such that the ppi allows:
    * The observer to be no closer than 24" (60cm)
    * The observer to be no farther than 36" (90cm)

