# Matching a Design Font to a Reference Font

The APCA readability guidelines indicate font size and weight. These characteristics are related to a specific reference font such as Helvetica or Arial. In order to ensure that the chosen font for a design meets the same visual properties, it is necessary to do a side-by-side comparison.

## TEST METHODS
Take your desired font and compare it to one of the reference fonts "Helvetica Neue, Helvetica, Fira Sans, Kanit, or Arial."

1. Measure the x-height, and determine the relative size offset. 
2. Visually compare the weight And both a low contrast and high contrast setting, and determine the relative weight offset. 

## I - Size
### Part I.a - Setup
1. Using a 400 normal weight font as the example, make a test webpage with two spans, each containing a single <strong>lowercase x</strong>, so they are next to each other horizontally.
2. Set the font-family of one of the spans to the reference (i.e. Helvetica or Arial)
3. Set the other span to the font being evaluated.
4. Set the font-size to **100px.** for both.
### Part I.b - Measure
1. Load the test page in a browser.
2. Take a screen shot of both x as rendered.
3. Load the screenshot into a photo editor and measure the height of each lowercase x.
### Part I.c - Determine Offset
1. Divide the x-height of the reference font, by the x-height of the test font.
2. This value is the reference ratio.
### _Using the Reference Ratio_
For a given minimum font size, indicated by the font look up table or APCA tool, multiply by the reference ratio to find the appropriate font size for the desired design font.

### Part I _Example_:
This example compares the reference font Helvetica, to the desired design font Times New Roman.

```html
<!DOCTYPE html>
<html>
<head>

<!-- Web Page Snippet 1: matching size to the reference -->
<style>
/* import test and reference fonts here, or link them above in the <head> */ 


body, section, div, p, span  {margin: 0em;padding:0;}

.xheightMeasure{
  clear:both;
  padding: 24px;
  color: #222; 
  background-color: #eaeaea; 
  font-size: 100px; 
  font-weight: 400;
  }

.referenceFont {font-family: Arial, Helvetica, cursive,fantasy;}
.testFont {font-family: 'Times New Roman', cursive,fantasy;}
/* the reason the last font-family in the fallbacks is cursive Fantasy, is to make it very clear that the desired font did not load as expected */

</style>
</head>
<body>
<!-- Measure the x-height compared to the reference font--> 

<div class="xheightMeasure">
  <span class="referenceFont">x</span><span class="testFont">x</span>
</div>

</body>
</html>

```

**_(NOTE: this image was captured on a retina display, so the indicated sizes are twice what they would be on a standard display.)_**

<img width="769" alt=" and example of a lowercase X of the reference font versus the test font, in this case Helvetica versus times new Roman, showing the times new Roman is much smaller." src="https://user-images.githubusercontent.com/42009457/140870281-d6fc40f5-e979-4086-9585-6bd716a7540a.png">

In this case 100px Helvetica would measure an x-height of about 52px. Determine the reference ratio by dividing the reference size by the font being tested. If the test font is 45px, such as this Times New Roman, then:
### 52/45 = 1.156 
_(round to at least two significant digits, three is shown here)_

So for example, an APCA value of L<sup>C</sup>&nbsp;75 specifies and 18px reference font. To use the example of Times New Roman, multiply 18px by 1.156 to arrive at a minimum font size of 20.8px, or 21px rounded.

### Why List Cursive?
Make the fallback font-family after the test and reference fonts something very different, such as "cursive". This way if the browser does not load the font properly, it is immediately obvious, as in this example:

<img width="335" alt=" an example of why it's useful to use cursive as the last font in a fallback list for testing purposes, if the correct reference or test font does not load properly then cursive makes it very obvious." src="https://user-images.githubusercontent.com/42009457/140868635-38b7f926-3687-4e2c-96fe-6407cad350fa.png">

-----
## II - Weight
While size per x-height is fairly straight forward, weight requires some visual judgment. There is active research into possible automated tools, but for the time being a visual reference is needed.

In this case, set up several lines of test text, with the test and reference fonts near the eventual size, as in the above example that's a reference size of 18px. The test font needs to be adjusted so that it has the same excite as the reference font as render to the screen.

In the example below, were using the common reference font Arial, at the standard normal and bold weights of 400 and 700. Arial is a clone of Helvetica, and either have very similar characteristics.

We'll make a few lines to compare different weights, and one with high contrast, and another set with very low contrast to help exacerbate the differences.  

The test text is `Il 400 & IcyATOMsizedgap`, using an uppercase I & lowercase l as these make it easy to compare the vertical stroke widths. The sample text "&IcyATOMsizedgap" is short yet demonstrates most of the common design differences in a font. 


### Part II.a - Setup
1. Setup a 400 normal weight, and 700 bold weight reference font as the comparison sample.
    - suitable reference fonts are Helvetica or Arial.
2. Make a test webpage with several lines comparing several weight examples of the test font to the 400 and 700 weight reference.
    - The test font's size must be normalized so that the test and reference x Heights are equivalent.
3. Create one test area for high contrast around L<sup>C</sup>&nbsp;90 and a second test area for low contrast around L<sup>C</sup>&nbsp;30.
4. Use a consistent line of sample text for each line, and include the weight that is being tested for each line. 
    - An example is "&IcyATOMsizedgap".
    - Include the weight that is being tested in each line.
    - start and or end each line with a capital I and a lowercase l, to help make find comparisons of vertical stroke width.
### Part II.b - Evaluate
1. Evaluate each sample pair, and determine which test-font weight most closely resembles the reference font's weight.
    - If thr test-font is in between two weights of the reference font, it is best to round up.
    - If the test font is a variable font, as in the example below, find the variable weight that matches the reference.
### Part I.c - Determine Offset
1. Subtract the reference weight from the matching test font weight.
2. This value is the reference weight offset.
3. If there is a different reference weight offset among different reference weights, in-between weights may be interpolated.
### _Using the Reference Weight Offset_
For a given indicated weight, add the reference weight offset to find the actual needed weight for the design font which was tested.

### Weight Example
Below, a test setup for the "RALEWAY" Google font. Raleway has the same ex height as Ariel or  Helvetica, so we can use the same size for both samples.

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>font test</title>

<link rel="preconnect" href="https://fonts.googleapis.com"> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- note that Raleway is a variable font that allows for the in-between font weights shown. But be careful, incorrectly applying weights that don't exist can cause the font import to fail. -->
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;520;600;700;730;800&display=swap" rel="stylesheet">

<style>
body, section, div, p, span  {margin: 0em;padding:0;}

:root {
  --pad:18px; 
  --spacer: calc((var(--pad) * 2) + 2px);
  }

.weightCompare {
  margin: 0em; 
  padding: var(--pad); 
  color: #ffc;
  background-color: #777; 
  border: 2px solid #123;
  }

h2 {
  position:relative;
  margin: 0.5em auto; 
  text-align:center; 
  text-shadow: 0.12em 0.12em 0.18em #000;
  }
  
p.referenceFont {margin: 1em 0 0; font-family:Arial,Helvetica,cursive,fantasy;}
p.testFont {margin: -0.45em 0 0.25em; font-family:Raleway,cursive,fantasy;}

hr{margin: 1em;}

.hiCon {
  float: right; 
  width: calc(50% - var(--spacer));
  padding: var(--pad);
  font-size: 18px; 
  font-weight: 400;  
  color: #222; 
  background-color: #eaeaea;
  }
.loCon {
  float:left;
  text-align: right;
  width: calc(50% - var(--spacer));
  padding: var(--pad);
  font-size: 18px; 
  font-weight: 400;
  color: #999; 
  background-color: #d4d4d4;
  }
  
.clearFix {clear:both}

.weight3 {font-weight: 300;}
.weight4 {font-weight: 400;}
.weight5 {font-weight: 500;}
.weight52 {font-weight: 520;}
.weight6 {font-weight: 600;}
.weight7 {font-weight: 700;}
.weight73 {font-weight: 730;}
.weight8 {font-weight: 800;}

</style>
</head>

<!-- Web Page Snippet 2: Weighty Decisions -->
<body>

<section class="weightCompare">
<!-- find the closest matching weight to the reference font--> 

<h2>Weight Comparison</h2>

  <div class="hiCon">

    <h3>Hi-Con Compare Lc 90</h3>

    <p class="referenceFont weight4">Il 400 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight3">Il 300 & IcyATOMsizedgap Raleway</p>

    <p class="referenceFont weight4">Il 400 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight4">Il 400 & IcyATOMsizedgap Raleway</p>

    <p class="referenceFont weight4">Il 400 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight5">Il 500 & IcyATOMsizedgap Raleway</p>

    <p class="referenceFont weight4">Il 400 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight52">Il 520 & IcyATOMsizedgap Raleway</p>

    <p class="referenceFont weight4">Il 400 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight6">Il 600 & IcyATOMsizedgap Raleway</p>
<hr>
    <p class="referenceFont weight7">Il 700 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight6">Il 600 & IcyATOMsizedgap Raleway</p>

    <p class="referenceFont weight7">Il 700 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight7">Il 700 & IcyATOMsizedgap Raleway</p>
    
    <p class="referenceFont weight7">Il 700 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight73">Il 730 & IcyATOMsizedgap Raleway</p>

    <p class="referenceFont weight7">Il 700 & IcyATOMsizedgap Arial</p>
    <p class="testFont weight8">Il 800 & IcyATOMsizedgap Raleway</p>

  </div>

  <div class="loCon">
  
    <h3>Lo-Con Compare Lc 30</h3>

    <p class="referenceFont weight4">400 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight3">300 & IcyATOMsizedgap Raleway lI</p>

    <p class="referenceFont weight4">400 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight4">400 & IcyATOMsizedgap Raleway lI</p>

    <p class="referenceFont weight4">400 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight5">500 & IcyATOMsizedgap Raleway lI</p>

    <p class="referenceFont weight4">400 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight52">520 & IcyATOMsizedgap Raleway lI</p>
    
    <p class="referenceFont weight4">400 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight6">600 & IcyATOMsizedgap Raleway lI</p>
<hr>
    <p class="referenceFont weight7">700 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight6">600 & IcyATOMsizedgap Raleway lI</p>

    <p class="referenceFont weight7">700 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight7">700 & IcyATOMsizedgap Raleway lI</p>
    
    <p class="referenceFont weight7">700 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight73">730 & IcyATOMsizedgap Raleway lI</p>

    <p class="referenceFont weight7">700 & IcyATOMsizedgap Arial lI</p>
    <p class="testFont weight8">800 & IcyATOMsizedgap Raleway lI</p>

  </div>

<div class="clearFix"> </div>

</section>

</body>
</html>
```

So here, find the closest visual match in terms of weight. If we look at a screenshot:

<img width="735" alt="this is a series of weight test patches design for visual comparison between a reference font and a test font at various weights." src="https://user-images.githubusercontent.com/42009457/222089662-11c221b6-c2fa-4cf0-b9ee-32f599b3650f.png">

We see that Raleway is clearly lighter than Arial 400. Absent a variable font, we would say that Raleway 500 is close to Arial 400. As Raleway is available as a variable font, we can find tune and find that Raleway 520 is a close match to aerial 400. Therefore, the offset for a 400 weight font for Raleway is +120.

Raleway bold is also lighter than Arial 700, but here the difference is not as great. Using the variable, Raleway 730 matches Ariel 700, so the offset for Raleway is +30.

### Here it is closeup:
_Click for larger_        

<img width="400" alt=" ultra close-up, a series of weight test patches design for visual comparison between a reference font and a test font at various weights." src="https://user-images.githubusercontent.com/42009457/222092105-2ff229fb-0434-4ba1-af9a-c5a1dbe08e71.png">

A look to the lo-con version on the left helps to accentuate the weight differences.

## Summary
Following a simple procedure, compare a desired design font to a reference font, and determine the Size and weight offsets needed for equivalence.
