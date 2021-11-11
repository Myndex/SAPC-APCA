# APCA & SAPC 
## Frequently Asked Questions for the Advanced Perceptual Contrast Algorithm.
_--THIS IS A WORK IN PROGRESS--_

-----
-----
**APCA FAQ post #001**
### Q: What is APCA?
A: It's the Advanced Perceptual Contrast Algorithm, a mini-appearance model, and a way to predict the perceived contrast for best readability. It is tuned specifically for readability of text on self-illuminated displays.


-----
**APCA FAQ post #002**
### Q: How do you use it?
A: Simply send it the text color and the background color, and APCA will calculate a contrast value measured as Lc (perceptual lightness contrast). For more complete design guidance, there is a lookup table for font size and weight.


-----
**APCA FAQ post #003**
### Q: What is the range of values?
A: For beta version 0.98G-4g, the range is -108 to +106, with positive numbers for dark text on a light background, and negative numbers for light text on a dark background.

-----
**APCA FAQ post #004**
### Q: Why is there a lookup table?
A: Visual contrast for readability is affected not only by a pair of colors, but also spatial frequency, in other words the size and weight of the fonts used for the text. The APCA font lookup is part of WCAG 3 conformance for web content. The lookup table can be revised for different languages and character sets.







-----
-----
WIP


 S-Luv Advanced Predictive Color model and the
