# SAPC
### SAPC Algorithm _(Somers Advanced Perceptual Contrast)_

This is a set of contrast assessment methods for predicting perceived contrast between sRGB colors on a computer monitor. It is intended as an assessment method for standard relating to content for computer displays and mobile devices.

### FEATURES

* Spectral weighting of luminance based on sRGB coefficients.
* Additional weighting for RED and GREEN to enhnance contrast for accomodating Color Vision Deficiencies, particularly Protanopia and Deuteranopia. 
* Weighting for normal and reverse polarity (dark text on light background vs light text on dark.)
* Estimation and weighting of light adaptation for perceptual uniformity in a common "standard oberver" model.
* Incorporates Spatial Frequency & stimulus size in predictions.
* Considers Bartleson Breneman surround effects, simultaneous contrast, and local adaptation.
* Uses S-LAB, (SomersLAB) an L<sup>s</sup> a<sup>s</sup>b<sup>s</sup>-type colorspace for modeling vision and visual impairment perception of emmissive displays and devices. 
    * S-LAB is built around the concept of a standard-observer/standard-environment model.
        * the standard observers for visual acuity are grouped as: 
            * 20/40 and better (near normal), 
            * 20/40 through 20/80 (transitional impairment) and
            * 20/80 to 20/200 (Low Vision)
        * The standard observers for contrast sensitivity are
            * Pelli Robson 2 (normal, 1% threshold)  
            * Pelli Robson 1.5 (impiared, 3% threshold)  
            * Pelli Robson 1 (Low Vision, 10% threshold)
        * The standard observers for Color Vision Deficiency are
            * A Protanope (no red cones)
            * A Deuteranope (no green cones)
            * Both Protan and Deutan are addressed at the same time.
            * The standard observers for contrast sensitivity are
        * The standard envirnmental model is a desktop sRGB LCD screen calibrated for 
            * Max White (#FFF) Luminance no less than 160cd/m^2 
            * Max White Luminance no more than 240cd/m^2 
            * Black level target of 1 cd/m^2, and no more than 2 cd/m^2
            * Gamma curve of no less than 2.2, and no more than 2.5
            * Preferred gamma target similar to L*, between 2.3 and 2.4
            * Ambient light of approximately 200 lux.
                * The light should not _directly_ shine on the face of the monitor.
                * The light should not shine into the eyes of the user while viewing the monitor.
                * Test level using an 18% photo greycard positioned on top of the monitor.
                * orient the greycard at a 45 degree angle to the primary light source.
                * Measure the greycard with a spot meter.
                * The meter should read approximately 1/5th of the monitor's maximum white.
                * For instance, if the monitor is set to 240cd/m^2 max white, then the lighting should be adjusted so the grey card reading is between 42cd/m^2 and 54cd/m^2.
            * Position monitor toward user in a way that minimizes reflections.
            * Background behind the monitor within the users field of view should be neutral, and about 20% of the monitor's maximum white luminance.

### IMPLEMENTATIONS

The initial code here will be plain vanilla Javascript, PHP 5.5, and OpenOffice Calc spreadsheet, as those cover the most likely use cases. Many of the available inputs to the functions can remain at their defaults, thought these extra inputs can be used in more specialized situations (such as creating content specifcally for daylight/outdoors, or specificaly for dark nights, etc.).

## IMPORTANT: AT this time, this code is not used in any approved or active standard.
It or a version like it will be used in the not too distant future. Nevertheless, the values generated right now will not match the values of other incompatible standards, so do not attempt to use this code for an unapproved or incompatible standard. It is at present to be considered experimental and for research only.

