---
layout: simple
---
# Regarding APC<span class="flipH">A</span> Exponents
#### The TLDR is "For non-HDR displays, the colorspace is simply selected by the three coefficients, and the pre-processing exponent."

## Input Stage Notes

Technically, the input modules do not convert to a traditional calculated CIEXYZ luminance, and it is not intended to. They calculate a unique value "estimated screen luminance" denoted **Ys**. The first stage is a conversion to model of typical monitors in typical environmental settings. Included is consideration of surveys and case studies of monitors in real-world environments, and our own measurements and studies of various devices and displays.

It is useful to point out that the defined peak output in the circa-1998 IEC sRGB spec is 80 cd/m², and today's devices are capable of exceeding 1200 cd/m². The needed gamma setting for a display depends on the ambient lighting, which drives global adaptation, and the screen luminance which drives field and local adaptation. There is a user preference component in here too, resulting in a fairly wide range of gamma settings in use. For example, some calibration software can calibrate to L* which is about 2.35 to 2.4. Higher gammas can be useful, depending on many factors, including the peak white level and the ambient illumination.

This pre-processing stage also includes a soft clamp at black for initial monitor modeling. As an interesting side note, the need for the soft clamp makes using the piecewise _redundant_, as that section near black is completely reshaped by the soft clamp to account for ambient flare and other psychophysical factors.

The contrast calculation stage then applies a different exponent to the background, which drives local adaptation, and another to the stimuli (text).

The piecewise sRGB TRC is not an emulation of actual monitor behavior, having been created to prevent infinite slope at 0 to facilitate digital processing, back in the days before math coprocessors were standard and computers relied on integer math, and RAM and other resources were precious. I.e. the dark ages. But the APCA is not about processing images and lossless round trips, where using the piecewise curve is of benefit. The object is emulating real world monitor behavior. It is useful to note that many ICC profiles (including those that ship with Adobe products) do not use the piecewise, and instead use the simple 2.2 gamma, which the piecewise was intended to emulate, and the IEC standard indicates the physical display EOTF being the simple gamma in four separate places in that document.

The only thing in the APCA input stage that is really different is the exponent set to 2.4. This slightly higher exponent is added as part of pre-processing to relax the exponents in the contrast determination stage, and the aforementioned modeling of real-world monitors and devices. The "extra" could be added separately before the contrast stage, but is combined for simplicity in the current implementation.

That said, APCA is intended only to predict a display, and the perceived supra-threshold contrast for best readability, and to be perceptually uniform when doing so. Any alternate colorspaces therefore must be the destination display colorspace.

For AdobeRGB, Apple Display P3, and sRGB, changing destination colorspace is a matter of swapping out the coefficients.

For Rec2020, there may need to be an additional pre-processing adjustment to the exponent. I have yet to evaluate Rec2020 as I do not have a Rec2020 monitor at my disposal. Rec2020 does have some additional accessibility issues which will entail some separate discussion, largely that the red primary is out of range of someone with protanopia (invisible).

For Rec2100 and other HDR types, a different set of constants and exponents is expected, and probably other modifications.

But for non-HDR displays, the colorspace is simply selected by the three coefficients, and the pre-processing exponent.
