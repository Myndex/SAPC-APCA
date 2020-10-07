# SAPC/APCA
![](images/Myndex_eye_cielab.jpg)
### SAPC Algorithm _(S-LAB Advanced Perceptual Contrast)_
### APCA _Advanced Perceptual Contrast Algorithm_


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
        * the standard observers for visual acuity (VA) are grouped as: 
            * 20/40 and better (near normal), 
            * 20/40 through 20/80 (transitional impairment) and
            * 20/80 to 20/200 (Low Vision)
        * The standard observers for contrast sensitivity (CSF) are
            * Pelli Robson 2 (normal, 1% threshold)  
            * Pelli Robson 1.5 (impiared, 3% threshold)  
            * Pelli Robson 1 (Low Vision, 10% threshold)
        * The standard observers for Color Vision Deficiency are
            * A Protanope (no red cones)
            * A Deuteranope (no green cones)
            * Both Protan and Deutan are addressed at the same time.
            * The standard observers for contrast sensitivity are (under revision / TBD)
            
        * It is important to remember that VA and CSF are the theshold levels between legible and not legible, but do not specify the idea readability conditions.
        * The standard environmental model is a desktop sRGB LCD screen calibrated for 
            * Max White (#FFF) Luminance no less than 160cd/m^2 
            * Max White Luminance no more than 240cd/m^2 
            * Black level target of 1 cd/m^2, and no more than 2 cd/m^2
            * Gamma curve of no less than 2.2, and no more than 2.5
            * Preferred gamma target similar to L*, between 2.3 and 2.4
            * Ambient light of approximately 200 lux.
                * The light should not _directly_ shine on the face of the monitor.
                * The light should not shine into the eyes of the user while viewing the monitor.
                * The previous 18% greycard method was deleted as being problematic.
                * What is actually important is that the area within view surrounding the monitor be at ~20% luminance of the monitor's max white level. If the monitor is surrounded by 80% white walls then it is those 80% walls that need to be at 20% luminance of the monitor's max white as calibrated.
               * Send the sRGB monitor full screen grey at sRGB value #7C7C7C.
               * The average luminance of the area in view around the monitor should be the same as the monitor grey at #7C7C7C.
               * The monitor at #FFFFFF should measure a luminance approximately five times higher than that measures at #7C7C7C.
            * Position monitor toward user in a way that minimizes reflections.
            * Background behind the monitor within the users field of view should be neutral, and about 20% of the monitor's maximum white luminance.

### IMPLEMENTATIONS

The initial code here will be plain vanilla Javascript, PHP 5.5, and OpenOffice Calc spreadsheet, as those cover the most likely use cases. Many of the available inputs to the functions can remain at their defaults, thought these extra inputs can be used in more specialized situations (such as creating content specifcally for daylight/outdoors, or specificaly for dark nights, etc.).

### THIS IS BETA
Being developed for use with future web standards for accessibility.
