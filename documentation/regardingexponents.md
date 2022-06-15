---
layout: simple
---
# Regarding Exponents
The TLDR is "For non-HDR displays, the colorspace is simply selected by the three coefficients, and the pre-processing exponent."

## Input Stage Notes

Technically, it does not convert to a traditional calculated luminance, and is not intended to. The first stage is a conversion to model of typical monitors in typical environmental settings. Included is consideration of surveys of case studies of monitors in real-world environments. This pre-processing stage also includes a soft clamp at black for initial monitor modeling. (Interestingly earlier today I was looking at the DICOM spec, which happens to model displays similarly.) The need for the soft clamp makes using the piecewise redundant, as that section near black is reshaped by the soft clamp to account for ambient flare.

The contrast calculation stage then applies a different exponent to the BG, which drives local adaptation, and the stimuli (text) that is substantially affected by that adaptation.

The piecewise sRGB TRC is not an emulation of actual monitor behavior, having been created to prevent infinite slope at 0 to facilitate digital processing. The APCA is not about processing images and round trips, where using the piecewise curve is of benefit. It is useful to note that many ICC profiles (including those that ship with Adobe products) do not use the piecewise, and instead use the simple 2.2 gamma, which the piecewise was intended to emulate, and the IEC standard indicates the physical display being the simple gamma.

The only thing in the APCA input stage that is really different is the exponent set to 2.4. This slightly higher exponent is added as part of pre-processing to relax the exponents in the contrast determination stage, and the aforementioned modeling of real-world monitors and devices. The "extra" could be added separately before the contrast stage, but is combined for simplicity in the current implementation.

That said, APCA is intended only to predict a display, and the perceived supra-threshold contrast for best readability, and to be perceptually uniform when doing so. Any alternate colorspaces therefore must be the destination display colorspace.

For AdobeRGB, Apple Display P3, and sRGB, changing destination colorspace is a matter of swapping out the coefficients.

For Rec2020, there may need to be an additional pre-processing adjustment to the exponent. I have yet to evaluate Rec2020 as I do not have a Rec2020 monitor at my disposal. Rec2020 does have some additional accessibility issues which will entail some separate discussion, largely that the red primary is out of range of someone with protanopia (invisible).

For Rec2100 and other HDR types, a different set of constants and exponents is expected, and probably other modifications.

But for non-HDR displays, the colorspace is simply selected by the three coefficients, and the pre-processing exponent.
