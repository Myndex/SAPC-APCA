# Matching a Design Font to a Reference Font

The APCA readability guidelines indicate font size and weight. These characteristics are related to a specific reference font such as Helvetica or Arial. In order to ensure that the chosen font for a design meets the same visual properties, it is necessary to do a side-by-side comparison.

## TEST METHOD
Take your desired font and compare it to one of the reference fonts "Helvetica Neue, Helvetica, Fira Sans, Kanit, or Arial."

I. Measure the x-height, and determine the relative size offset. 
II. Visually compare the weight And both a low contrast and high contrast setting, and determine the relative weight offset. 

### Part I a - Setup
1. Using a 400 normal weight font as the example, make a test webpage with two spans, each containing a single <strong>lowercase x</strong>, so they are next to each other horizontally.
2. Set the font-family of one of the spans to the reference (i.e. Helvetica or Arial)
3. Set the other span to the font being evaluated.
4. Set the font-size to **100px.** for both.
### Part I b - Measure
1. Load the test page in a browser.
2. Take a screen shot of both x as rendered.
3. Load the screenshot into a photo editor and measure the height of each lowercase x.
### Part I c - Determine Offset
1. Divide the x-height of the reference font, by the x-height of the test font.
2. This value is the reference ratio.
### _Using the Reference Ratio_
For a given minimum font size, indicated by the font look up table or APCA tool, multiply by the reference ratio to find the appropriate font size for the desired design font.


```html
<!-- Web Page Snippet 1: It's not the size it's how you adjust it -->

<div style="padding: 24px; color: #000; background-color: #ccc; font-size: 100px; font-weight: normal;">

<span style="font-family: Helvetica, cursive;">x</span><span style="font-family: FontyMcFont, cursive;">x</span>

</div>
<!-- the reason the last font in the family fallbacks is cursive is to make it very clear that the desired font did not load as expected -->
```
**_(NOTE: this was captured on a retina display, so I divide the measurements by 2.)_**

<img width="769" alt="Screen Shot 2021-11-08 at 8 52 39 PM" src="https://user-images.githubusercontent.com/42009457/140870281-d6fc40f5-e979-4086-9585-6bd716a7540a.png">

In this case the Helvetica would measure an x-height of about 52px _(on retina it was 105)._ If your font is smaller, you need to determine the difference percentage by dividing the reference by your font (& multiply by 100 for the percentage). If your font is 45px, such as this Times New Roman _(half of the 91 shown)_, then

#### 52/45 = 1.1555 * 100 = 115.5%
So to make your font with the x-height of 45 equal to the reference, instead of 100px, set it to 115.5px 

Of course 100px is too big for a font, but lets say for a pair of colors the APCA lookup indicates a 16px font. Multiply by 1.1556 and you get an 18.5px font.

### Why Cursive?
Make the fallback font after your test and reference fonts something very different such as cursive. This way if the browser is not loading the font properly it is immediately obvious:

<img width="335" alt="Screen Shot 2021-11-08 at 9 10 19 PM" src="https://user-images.githubusercontent.com/42009457/140868635-38b7f926-3687-4e2c-96fe-6407cad350fa.png">

My Helvetica reference didn't load due to a path error on my test page. Finally found a good use for that cursive font... LOL.
### Weight
While size per x-height is fairly straight forward, weight is not so much. There is active research into possible tools, for the time being a visual reference is needed.

 In this case, it is usually best to set up a quick test with the fonts near the eventual size. Let's say we want to set our text at 18px (for reference) this would be about 21px for our FontyMcFont. After adjusting for size, we either need to find the weight of Helvetica that matches our font, or font a weight of our font that matched Helvetica (in this case at weight 400). Because Helvetica is available nine weights from 100 to 900, let's find the relevant Helvetica.

We'll make a few lines to compare different weights, and one with high contrast, and another set with very low contrast to exacerbate the differences.  The test text is` 400 & IcyATOMsizedgap ` indicating the weight (remember to change it based on the style!) `& IcyATOMsizedgap ` is a line of test text I like to use as it's short yet demonstrates most of the common design differences in a font. (Think of "mind the gap" on the London tube in winter).

Below, a test setup for the RALEWAY Google font:

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>font test</title>
<link href="/pathToYourReferenceFont/Helvetica.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap" rel="stylesheet">

</head>
<!-- Web Page Snippet 2: Weighty Decisions -->
<body>
<div style="float:right; padding: 36px 100px 36px 36px; color: #333; background-color: #ddd;">
<h3>Hi Con Compare Lc 78</h3>

<span style="font-size: 18px; font-weight: 200; font-family: HelveticaNeueLT, cursive;">200 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>
<span style="font-size: 18px; font-weight: 300; font-family: HelveticaNeueLT, cursive;">300 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>
<span style="font-size: 18px; font-weight: 400; font-family: HelveticaNeueLT, cursive;">400 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>
<span style="font-size: 18px; font-weight: 500; font-family: HelveticaNeueLT, cursive;">500 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>

</div>
<div style=" padding: 36px 0 36px 100px; color: #999; background-color: #ccc;">
<h3>Lo Con Compare Lc 25</h3>

<span style="font-size: 18px; font-weight: 200; font-family: HelveticaNeueLT, cursive;">200 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>
<span style="font-size: 18px; font-weight: 300; font-family: HelveticaNeueLT, cursive;">300 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>
<span style="font-size: 18px; font-weight: 400; font-family: HelveticaNeueLT, cursive;">400 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>
<span style="font-size: 18px; font-weight: 500; font-family: HelveticaNeueLT, cursive;">500 & IcyATOMsizedgap Helvetica</span><br>
<span style="font-size: 18px; font-weight: 400; font-family: Raleway, cursive;">400 & IcyATOMsizedgap Raleway</span>
<br><hr><br>

</div>
<!-- find the closest matching weight to the reference font--> 
</body>
</html>
```

So here, find the closest visual match in terms of weight. If we look at a screenshot:


<img width="708" alt="weight comparison" src="https://user-images.githubusercontent.com/42009457/140869474-91ec55d9-a3aa-41d3-8582-e323b23cbf99.png">

We see that Raleway is clearly lighter than Helvetica. The 300 Raleway is perhaps slightly heavier than Helvetica 300, and this is clearly closest in this comparison, so we re-rate Raleway 400 as being 300.

Here it is closeup:

<img width="974" alt="weight comparison closeup" src="https://user-images.githubusercontent.com/42009457/140869497-af63cfe9-5f3d-4b7b-80b2-c4c9415d7530.png">

A look to the lo con version on the left really highlights the weight differences.

## TL;DR

Following a simple procedure, compare your design font to a reference font and determine the offset needed for equivalence.
