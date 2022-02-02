////////////////////////////////////////////////////////////////////////////////
/////////  FOOTER FUNCTIONS  ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////////  DEBUG AND COLOR ANALYSIS FUNCTIONS //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/
//~/~  RESEARCH ONLY ITEM: kitchenSink  ~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/
//~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/~/

//*  //  SWITCH A
function kitchenSink(type) {
  return '<div class="tac cW bgN br05 fs20 fw3 ">The Kitchen Sink is Leaking Again</div>';
}
// */ // END SWITCH A

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////  CONFORMANCE SCORING CONSTANTS AND ARRAYS  \//////////////////////////
////////                                              \/////////////////////////
///////                                                \////////////////////////

////////////////////////////////////////////////////////////////////////////
/////////////  NEW D SERIES    \///////////////////////////////////////////

const scoreLevels1GG = [15, 30, 45, 60, 75, 90, 105];
const scoreLevels1GGlen = scoreLevels1GG.length;

const sansIndex = [0, 1, 2, 3, 4, 5, 6];
const sansIndexLen = sansIndex.length;
const serifIndex = [false, 1, 2, 3, 4, 5, 6];

// for the score array needed for the original samples section
function createScoreArray(aLevels, aLength, bLevels, bLength) {
  let tempArray = [[]];
  let xDimLen = bLevels[0].length;
  let xi = 0,
    ai = 0,
    bi = bLength - 1,
    ti = 0;

  for (; xi < aLength; xi++) {
    // instantiate tempArray
    tempArray[xi] = bLevels[xi].slice(0, xDimLen);
  }

  for (; ai < aLength; ai++) {
    // Set tempArray values
    bi = bLength - 1;
    for (; bi > 0; bi--) {
      if (aLevels[ai] == bLevels[bi][0]) {
        ti = 0;
        tempArray[ai][xDimLen - 1] = bLevels[bi][ti];
        for (; ti < xDimLen - 1; ti++) {
          tempArray[ai][ti] = bLevels[bi][ti + 1];
        }
      }
    }
  }
  //console.log(tempArray);
  return tempArray;
}

// For the following arrays, the Y axis is contrastArrayLen
// The two x axis are weightArrayLen and scoreArrayLen
// const contrastArrayG = [200,110,100,90,80,70,60,55,50,45,40,35,30,25,20,15,12,11,7,0,];

// Jan 27 2022
const contrastArrayG = [
  200,
  120,
  105,
  100,
  95,
  90,
  85,
  80,
  75,
  70,
  65,
  60,
  55,
  50,
  45,
  40,
  35,
  30,
  25,
  20,
  15,
  10,
  0
];
const contrastArrayLenG = contrastArrayG.length;

const weightArray = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const weightArrayLen = weightArray.length;

const scoreArray = [0, 1, 2, 3, 4, 5];
const scoreArrayLen = 6;

//////////////////////////////////////////////////////////////////////////
/////  FONT TABLE DIALOGS  \//////////////////////////////////////////////

const scoreColor = ["c00", "b60", "9a7900", "08a", "008d00", "a0e"];

const normalColspan = ""; // colspan="1"
const simpleColspan = 'colspan="2"';
const mobileColspan = 'colspan="2"';

let mode = "simple"; // 'normal' 'simple' 'mobile'
let tableScore4 = document.getElementById("tableScore4");
let modeColspan = normalColspan;

if (mode === "simple") {
  tableScore4.style = "height: 120px; max-height: 120px;";
}

const scoreTextArray = [
  '<span class="fs25">&#x1F6AB</span>',
  'SCORE<br><span class="fs20 fw7">1</span>',
  'SCORE<br><span class="fs20 fw7">2</span>',
  'SCORE<br><span class="fs20 fw7">3</span>',
  'SCORE<br><span class="fs20 fw7">4</span>',
  '<span class="dib fs13 fw5" style="font-family: \'Barlow Condensed\';">PREFERRED<br>(5)</span>',
  '<span class="">SCORE</span>'
];

const scoreTextArraySimple = [
  '<span class="fs35">&#x1F6AB</span>',
  '<span class="fs35 fw6">1</span>',
  '<span class="fs35 fw6">2</span>',
  '<span class="fs35 fw6">3</span>',
  '<span class="fs35 fw6">4</span>',
  '<span class="fs14 fw6">PREF</span>',
  '<span class="fs12">LEVEL</span>'
];

const scoreTextArrayMobile = [
  '<span class="fs20">&#x1F6AB</span>',
  '<span class="fs20 fw7">1</span>',
  '<span class="fs20 fw7">2</span>',
  '<span class="fs20 fw7">3</span>',
  '<span class="fs20 fw7">4</span>',
  '<span class="dib fs11 fw5" style="font-family: \'Barlow Condensed\';">PREF</span>',
  '<span class="fs08 fw05">SCORE</span>'
];
// depreciate
const scoreTextProhibit = '<th><span class="fs20">&#x1F6AB</span></th>';

function ampSampTable9x5partA() {
  return '<td colspan="9" rowspan="5" class="underWeightAll" style="color: var(--textColor, #123); background-color: var(--bgColor, #bad); padding: 12px; max-height: 388px; vertical-align: top;">';
}
function ampSampTable9x5partAResearch() {
  return '<td colspan="9" rowspan="5" class="underWeightAll researchCell" style="color: var(--textColor, #123); background-color: var(--bgColor, #123); padding: 12px; max-height: 388px; vertical-align: top;">';
}

function ampSampTable9x5noSymbol() {
  return '<span class="dib mt0 fs20 pr04 por pot04 lh05"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 120" width="100" height="100"><circle cx="60" cy="60" r="50" stroke=" var(--textColor, #123)" stroke-width="10" fill="none"/><line x1="28" y1="28" x2="92" y2="92" stroke=" var(--textColor, #123)" stroke-width="8"/></svg></span>';
}

let ampSampTable9x5horsey =
  '<span class="dib fs20 pr02 por lh10" style="margin: -32px 24px 0 32px;  float: left;">♞<br>☻<br>⌚︎</span>';

function ampSampTable9x5AmpSamp() {
  return (
    '<div id="ampSamp2" style="vertical-align: middle; font-size: 128px; color: var(--textColor, #123); border-color: var(--textColor, #123);">' +
    '<div class="montFont4 mb0" ><div class="dib por fs12 fw1" style="top:2px; left: -10px; font-family: Montserrat; letter-spacing:-0.16em;"><span class="fw9 ls02">I</span><span class="fw7 ls-04">I</span><span class="fw5 ls-07">I</span><span class="fw4 ls-09">II</span><span class="fw3 ls-11">III</span><span class="fw2 ls-14">IIII</span>IIIII</div>This is a NORMAL 12px Minimum Size TEXT EXAMPLE<div class="dib por fs12 fw1" style="top:2px; left: 12px; font-family: Montserrat; letter-spacing:-0.16em;">IIIII<span class="fw2 ls-14">IIII</span><span class="fw3 ls-11">III</span><span class="fw4 ls-07">II</span><span class="fw5 ls-03">I</span><span class="fw7 ls04">I</span><span class="fw9 ls05">I</span>&nbsp;</div></div>' +
    '<div class="montFont2 mb10" ><div class="dib por fs12 fw1" style="top:2px; left: -10px; font-family: Montserrat; letter-spacing:-0.16em;"><span class="fw9 ls02">I</span><span class="fw7 ls-04">I</span><span class="fw5 ls-07">I</span><span class="fw4 ls-09">II</span><span class="fw3 ls-11">III</span><span class="fw2 ls-14">IIII</span>IIIII</div>This is a THIN TEXT EXAMPLE<div class="dib por fs12 fw1" style="top:2px; left: 12px; font-family: Montserrat; letter-spacing:-0.16em;">IIIII<span class="fw2 ls-14">IIII</span><span class="fw3 ls-11">III</span><span class="fw4 ls-07">II</span><span class="fw5 ls-03">I</span><span class="fw7 ls04">I</span><span class="fw9 ls05">I</span>&nbsp;</div></div>' +
    '<div class="montFont2 m00" ><div class="dib por fs14 fw1 m0a" style="top:-8px; font-family: Montserrat,Jost; letter-spacing:-0.16em;">|||||<span class="fw2 ls-14">||||</span><span class="fw3 ls-11">|||</span><span class="fw4 ls-07">||</span><span class="fw5 ls-03">|</span><span class="fw7 ls04">|</span><span class="fw9 ls05">|</span>&nbsp;<span class="fw9 ls02">|</span><span class="fw7 ls-04">|</span><span class="fw5 ls-07">|</span><span class="fw4 ls-09">||</span><span class="fw3 ls-11">|||</span><span class="fw2 ls-14">||||</span>|||||</div></div>' +
    '<div class="dib por fs07 fw1" style="top: -20px; right: 12px; font-family: Montserrat; letter-spacing: -16px;">III<span class="fw2">II</span><span class="fw3 ls-14">I</span><span class="fw4 ls-10">I</span><span class="fw5 ls-04">I</span><span class="fw7 ls04">I</span><span class="fw9 ls00">I</span>&nbsp;</div>' +
    '&amp; <div class="dib por fs07 fw1" style="top: -20px; left: -14px; font-family: Montserrat; letter-spacing: -16px;"><span class="fw9 ls03">I</span><span class="fw7 ls-05">I</span><span class="fw5 ls-10">I</span><span class="fw4 ls-14">I</span><span class="fw3 ls-16">I</span><span class="fw2">II</span>III</div>' +
    '<div class="helvetiFont mt12">• This is a Small Bold Text Example — 12px at 700 Weight. • </div>' +
    "</div>"
  );
}

let ampSampTable9x5frownyClose =
  '<span class="dib mt0 fs25 pl04 por pot03 lh05">&#9785;</span></span></td>';

let ampSampTable9x5floatRight =
  '<span class="dib fs20 pr02 por lh10" style="margin: -32px 0 0 24px; float: right;">✈<br>☎︎<br>☯︎︎︎</span>';

let ampSampTable9x5Close = "</span></td>";

let loConMessage2Low =
  '<span class="dib mt01 fs09 p01 cR pbgR br05">&nbsp; &#9785; &#x1F6AB; Contrast Too Low for All &#x1F6AB; &#9785; &nbsp; </span>';

let loConMessage2LowSingle =
  ' class=" mt01 mnw100 mnh100 fs25 lh07 p10 cR lbgO br05 tac"> &#x1F6AB; </td>';

let loConMessage2LowRow =
  '<span class="dib p02 cR pbgP br05" style="margin 0; padding:6px; ">&nbsp;&#9785; &#x1F6AB; <span class="dib por pob02 fs07 lh05">Contrast Too Low for This Score Level</span> &#x1F6AB; &#9785;&nbsp; </span>';

let loConMessage2LowSimple =
  '<div style="margin 0; padding:0; position:relative; height: 60px; max-height: 60px;">' +
  '<span class="dib m00 cR pbgP br05" style="margin 0; padding:0px;"> &#x1F6AB;' +
  '<span class="dib por fs08 lh07">Contrast<br>Too Low</span> &#x1F6AB;</span> ' +
  '<div class="dib por fs14 fw1 m00 lh06" style="margin:0; padding:0; font-family: Montserrat,Jost; letter-spacing:-0.16em;">' +
  '|||||<span class="fw2 ls-14">||||</span><span class="fw3 ls-11">|||</span><span class="fw4 ls-07">||</span><span class="fw5 ls-03">|</span><span class="fw7 ls04">|</span><span class="fw9 ls05">|</span><span class="fs160 ampSample">&amp;</span><span class="fw9 ls02">|</span><span class="fw7 ls-04">|</span><span class="fw5 ls-07">|</span><span class="fw4 ls-09">||</span><span class="fw3 ls-11">|||</span><span class="fw2 ls-14">||||</span>|||||' +
  "</div></div>";

let loConMessageBadColor =
  '<span class="dib mt01 fs09 p01 cR pbgO br05">&nbsp;&#9785; &#x1F6AB; Invalid Color Entry &#x1F6AB; &#9785; </span>';

function loConWarning9x5() {
  return (
    ampSampTable9x5partA() +
    loConMessage2Low +
    "<br>" +
    ampSampTable9x5noSymbol() +
    ampSampTable9x5AmpSamp() +
    ampSampTable9x5frownyClose
  );
}

function badColorWarning9x5() {
  return (
    ampSampTable9x5partA() +
    loConMessageBadColor +
    "<br>" +
    ampSampTable9x5noSymbol() +
    ampSampTable9x5AmpSamp() +
    ampSampTable9x5frownyClose
  );
}

function researchModeAlert9x5() {
  return (
    ampSampTable9x5partAResearch() +
    researchModeAlert +
    "<br>" +
    ampSampTable9x5horsey +
    ampSampTable9x5AmpSamp() +
    ampSampTable9x5floatRight +
    ampSampTable9x5Close
  );
}

let loConWarningRow9x1 =
  '<td colspan="9" class="underWeight" style="background-color: #a04;">' +
  loConMessage2LowRow +
  "</td>";

function loConWarningRow8x1() {
  return (
    '<td colspan="8" class="fs22" style="color: #' +
    globalTXTcolor +
    ";background-color: #" +
    globalBGcolor +
    ';">' +
    loConMessage2LowSimple +
    "</td>"
  );
}

function loConWarningRow9x1s() {
  return (
    '<td colspan="9" class="fs22" style="margin 0; padding:0px; color: #' +
    globalTXTcolor +
    ";background-color: #" +
    globalBGcolor +
    ';">' +
    loConMessage2LowSimple +
    "</td>"
  );
}

let loConWarningRow6x1 =
  '<td colspan="6" class="underWeight" style="background-color: #a04;">' +
  loConMessage2LowRow +
  "</td>";

function hiConAlertRow(scoreLev, columns) {
  let useAbove =
    scoreLev == 4
      ? "Use the Preferred Level"
      : "Use Score Level " + (scoreLev + 1);

  return (
    '<td colspan="' +
    columns +
    '" class="notApplicable NA' +
    scoreLev +
    ' fs14 fw6">Above Minimums for Level ' +
    scoreLev +
    ", " +
    useAbove +
    "</td>"
  );
}

////////////////////////////////////////////////////////////////////////////
///// G-Series Arrays from Spreadsheet of Lookup Tables \///////////////////
////   Based on empirical data collected 2019-2022      \//////////////////
///
//  G G G G G G G  UPDATED JAN 27 2022
//  (manual adjust for sc5)
//  SCORE LEVEL:
//  Master   1   2   3   4   5(aka: preferred)

const scoreLevelsPreCalcG = [
  [200, 120, 120, 120, 120, 120],
  [120, 120, 120, 120, 120, 120],
  [105, 105, 105, 105, 105, 105],
  [100, 100, 100, 100, 100, 100],
  [95, 95, 95, 95, 95, 95],
  [90, 90, 90, 90, 90, 90],
  [85, 85, 85, 85, 85, 85],
  [80, 80, 80, 80, 80, 80],
  [75, 75, 75, 75, 75, 75],
  [70, 70, 70, 70, 70, 70],
  [65, 65, 65, 65, 65, 65],
  [60, 60, 60, 60, 60, 60],
  [55, 55, 55, 55, 55, 55],
  [50, 50, 50, 50, 50, 50],
  [45, 45, 45, 45, 45, 45],
  [40, 40, 40, 40, 40, 40],
  [35, 35, 35, 35, 35, 35],
  [30, 30, 30, 30, 30, 30],
  [25, 25, 25, 25, 25, 25],
  [20, 20, 20, 20, 20, 20],
  [15, 15, 15, 15, 16, 15],
  [10, 10, 10, 10, 11, 14],
  [0, 1.0, 1.0, 1.0, 1.0, 1.0]
];

/*
// G G G G G UPDATED JAN 27 2022
// INTERPOLATED
// SCORE LEVEL
//  M 1 2 3 4 5

// */

const scoreDeltaG = [
  [200, 1.0, 1.0, 1.0, 1.0, 1.0],
  [120, 1.0, 1.0, 1.0, 1.0, 1.0],
  [105, 1.0, 1.0, 1.0, 1.0, 1.0],
  [100, 5, 5, 5, 5, 5],
  [95, 5, 5, 5, 5, 5],
  [90, 5, 5, 5, 5, 5],
  [85, 5, 5, 5, 5, 5],
  [80, 5, 5, 5, 5, 5],
  [75, 5, 5, 5, 5, 5],
  [70, 5, 5, 5, 5, 5],
  [65, 5, 5, 5, 5, 5],
  [60, 5, 5, 5, 5, 5],
  [55, 5, 5, 5, 5, 5],
  [50, 5, 5, 5, 5, 5],
  [45, 5, 5, 5, 5, 5],
  [40, 5, 5, 5, 5, 5],
  [35, 5, 5, 5, 5, 5],
  [30, 5, 5, 5, 5, 5],
  [25, 5, 5, 5, 5, 5],
  [20, 5, 5, 5, 5, 5],
  [15, 5, 5, 5, 5, 5],
  [10, 5, 5, 5, 5, 5],
  [0, 1.0, 1.0, 1.0, 1.0, 1.0]
];

///// CONTRAST   FONT WEIGHT & SIZE ///////////////////////////////////

// Font size interpolations. Here the chart was re-ordered to put
// the main contrast levels each on one line, instead of font size per line.

// G G G G G G  UPDATED JAN 31 2022
// ADJUSTED FOR G Interpolation

// 999 = prohibited   888 = 'OK'   777 = nonTextOnly

// FW 100 200 300 400 500 600 700 800 900

/*

// */

// lutG14xLcValue = ['Lc',100,200,300,400,500,600,700,800,900],

// 999: prohibited too low contrast
// 888: replaced with 400s  Ok at previous minimum
// 777: NON TEXT at this minimum weight stroke
// 5xx - minimum font at this weight for content, 5xx % 500 for font-size
// 4xx - minimum font at this weight for any purpose], 4xx % 400 for font-size

// MAIN FONT LOOKUP Jan 31 2022  Sorted by Lc Value

const fontMatrixG = [
  //  Jan 31 2022
  ["Lc", 100, 200, 300, 400, 500, 600, 700, 800, 900],
  [120, 445, 427, 417, 413.5, 413.5, 413.5, 413.5, 416, 418],
  [105, 445, 427, 417, 413.5, 413.5, 413.5, 413.5, 416, 418],
  [100, 46.5, 28, 18, 14, 414, 414, 414, 416, 418],
  [95, 48.5, 29, 20.5, 14.5, 14, 414, 414, 416, 418],
  [90, 50, 30, 21, 15, 14.5, 414, 414, 416, 418],
  [85, 53.5, 32, 22, 16, 15, 14, 414, 416, 418],
  [80, 56.5, 34, 23, 17, 16, 14.5, 414, 416, 418],
  [75, 60, 36, 24, 18, 17, 15, 14, 416, 418],
  [70, 65, 39, 27.5, 19.5, 18, 16, 14.5, 416, 418],
  [65, 71.5, 43, 30.5, 21.5, 19.5, 17, 15, 416, 418],
  [60, 80, 48, 34, 24, 21, 18, 16, 416, 418],
  [55, 86.5, 52, 37, 26, 22, 19.5, 17, 16, 418],
  [50, 96.5, 58, 41, 29, 25, 20, 18, 17, 418],
  [45, 120, 72, 51, 36, 28, 24, 20, 18, 418],
  [40, 777, 96, 68, 48, 34, 29, 24, 20, 18],
  [35, 777, 120, 93.5, 66, 46.5, 40, 33, 26.5, 20],
  [30, 999, 777, 120, 96, 68, 58, 48, 38.5, 29],
  [25, 999, 777, 777, 120, 102, 87, 72, 57.5, 43],
  [20, 999, 777, 777, 777, 120, 120, 110, 88, 66],
  [15, 999, 999, 777, 777, 777, 777, 120, 120, 120],
  [10, 999, 999, 999, 999, 999, 999, 777, 777, 777],
  [0, 999, 999, 999, 999, 999, 999, 999, 999, 999]
];

// G G G G G G UPDATED JAN 31 2022
// interpolation G
// FW 100 200 300 400 500 600 700 800 900

// lutG14xLcDelta = ['Lc∆',100,200,300,400,500,600,700,800,900],

// MAIN FONT DELTA PRECALC Jan 31 2022 Sorted by Lc  rows higher  Jan 31 2022

const fontDeltaG = [
  // rows ABOVE Jan 31 2022
  ["Lc∆h", 100, 200, 300, 400, 500, 600, 700, 800, 900],
  [120, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [105, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [100, 1.5, 1, 1, 0.5, 0.5, 0.5, 0.5, 0, 0],
  [95, 2, 1, 2.5, 0.5, 0, 0, 0, 0, 0],
  [90, 1.5, 1, 0.5, 0.5, 0, 0, 0, 0, 0],
  [85, 3.5, 2, 1, 1, 0.5, 0, 0, 0, 0],
  [80, 3, 2, 1, 1, 1, 0.5, 0, 0, 0],
  [75, 3.5, 2, 1, 1, 1, 0.5, 0, 0, 0],
  [70, 5, 3, 3.5, 1.5, 1, 1, 0.5, 0, 0],
  [65, 6.5, 4, 3, 2, 1.5, 1, 0.5, 0, 0],
  [60, 8.5, 5, 3.5, 2.5, 1.5, 1, 1, 0, 0],
  [55, 6.5, 4, 3, 2, 1, 1.5, 1, 0, 0],
  [50, 10, 6, 4, 3, 3, 0.5, 1, 1, 0],
  [45, 23.5, 14, 10, 7, 3, 4, 2, 1, 0],
  [40, 0, 24, 17, 12, 6, 5, 4, 2, 0],
  [35, 0, 24, 25.5, 18, 12.5, 11, 9, 6.5, 2],
  [30, 0, 0, 26.5, 30, 21.5, 18, 15, 12, 9],
  [25, 0, 0, 0, 24, 34, 29, 24, 19, 14],
  [20, 0, 0, 0, 0, 18, 33, 38, 30.5, 23],
  [15, 0, 0, 0, 0, 0, 0, 10, 32, 54],
  [10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/////  MINIMUMS ARRAYS  ///////////////////////////////////////////////////
// Updated Jan 27 2022

// Minimum font size per score level and weight
// Weight S 1 2 3 4 5 6 7 8 9
const fontMatrixGmin = [
  ["sc0", 32, 16, 12, 10, 9, 8, 8, 10, 12], // score: hard fail level
  ["sc1", 36, 16, 12, 10, 10, 10, 10, 12, 14], // score 1
  ["sc2", 36, 16, 12, 10, 10, 10, 10, 16, 18], // score 2
  ["sc3", 36, 16, 12, 11, 11, 11, 11, 16, 18], // score 3
  ["sc4", 36, 16, 12, 12, 12, 12, 12, 16, 18], // score 4
  ["sc5", 48, 28, 24, 20, 18, 16, 15, 16, 18] // score 5
];
// Minimum font size per use case and score level
// Score M 1 2 3 4 5
const fontSizeGtype = [
  ["maxBody", 24, 24, 24, 24, 24], // MAX body text (not zoomed)
  ["minBody", 12, 12, 14, 14, 18], // Min body text
  ["maxContent", 120, 108, 96, 92, 72], // MAX content text
  ["minContent", 10, 11, 12, 13, 14], // Min content text
  ["maxAny", 144, 120, 120, 108, 96], // MAX anytext
  ["minAny", 9, 10, 11, 12, 13] // Min anytext (copyright etc)
];

// Contrast minimums per master level and score level
// score M 1 2 3 4 5
const fontScoreGmin = [
  // CONTRAST LEVELS
  [90, 95, 95, 92, 90, 85], // 0 MAX Large Headlines (> 48px & 500)
  [75, 68.4, 71.8, 73.4, 74.8, 90.0], // 1 Min Cols of Body Text (manually set)
  [60, 47.4, 52.8, 56.4, 69.8, 75.0], // 2 Min Content Text
  [45, 33.4, 34.8, 37.4, 44.8, 50.0], // 3 Min Large content text
  [30, 22.0, 24.0, 27.0, 29.8, 45.0], // 4 Min Any text, large icons (manual)
  [15, 15, 15, 16.0, 18.0, 22.0] // 5 Min for all (manually set)
];

const minScoreG = fontScoreGmin[5][1]; // Hard minimum contrast, all levels.
const nonTextScoreG = fontScoreGmin[4][4];

let scoreLevel = 0;

let scoreIndex = 4; //[0,1,2,3,4,5]; // holds score position

// holds the calculated minimum font sizes per level
let interpolatedFonts = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//// G series, LUT-X12.

let LUTx12 = [
  ["fs-px", 100, 200, 300, 400, 500, 600, 700, 800, 900],
  [10, "⊘", "⊘", "⊘", "©§™", "©§™", "©§™", "©§™", "⊘", "⊘"],
  [11, "⊘", "⊘", "⊘", "©§™", "©§™", "©§™", "©§™", "⊘", "⊘"],
  [12, "⊘", "⊘", "©§™", "×90", "×85", "×80", "×75", "⊘", "⊘"],
  [14, "⊘", "⊘", "©§™", 90, 85, 80, 75, "⊘", "⊘"],
  [16, "⊘", "©§™", 95, 80, 75, 70, 65, "⊘", "⊘"],
  [18, "⊘", "©§™", 90, 75, 70, 65, 60, "×60", "⊘"],
  [21, "⊘", 95, 85, 70, 65, 60, 55, "×55", "×55"],
  [24, "⊘", 90, 75, 60, 55, 50, 45, "×45", "×45"],
  [28, "⊘", 85, 70, 55, 50, 45, 40, 35, 30],
  [34, 95, 80, 65, 50, 45, 40, 35, 30, 30],
  [42, 90, 75, 60, 45, 40, 35, 30, 30, 30],
  [72, 75, 60, 45, 40, 35, 30, 30, 30, 30],
  [96, 60, 50, 40, 35, 30, 30, 30, 30, 30]
];

///////\                                                        ////////////////
////////\                                                      /////////////////
/////////\  END CONFORMANCE SCORING CONSTANTS AND ARRAYS END  //////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
/////////  DOM ACCESS VARIABLES  \//////////////////////////////////////////////
////////                          \/////////////////////////////////////////////

// Performance Improving Variables for DOM access

let inputBG = document.getElementById("inputBG"),
  BGpicker = document.getElementById("BGpicker"),
  BGpickerWrap = document.getElementById("BGpickerWrap"),
  BGvalidText = document.getElementById("BGvalidText");

let inputTXT = document.getElementById("inputTXT"),
  TXTpicker = document.getElementById("TXTpicker"),
  TXTpickerWrap = document.getElementById("TXTpickerWrap"),
  TXTvalidText = document.getElementById("TXTvalidText");

let tableSamples = document.getElementById("tableSamples");

let contrastResultTable = document.getElementById("contrastResultTable");
let buttonSpecial = document.getElementById("buttonSpecial");

let tableScoreDOMarray = [
  "null",
  document.getElementById("tableScore1"),
  document.getElementById("tableScore2"),
  document.getElementById("tableScore3"),
  document.getElementById("tableScore4"),
  document.getElementById("tableScore5")
];

let tsi = (tableScoreDOMlen = tableScoreDOMarray.length);

let LsNormLabel = Math.round(normBG * 100);
let LsRevLabel = Math.round(revBG * 100);

////////////////////////////////////////////////////////////////////////////////
/////////  PAGE LOAD UTILITIES   \//////////////////////////////////////////////
////////                          \/////////////////////////////////////////////

// For old samples section
function populateLabels() {
  // deprecated
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////  TEST CONTRAST FUNCTION  \////////////////////////////////////////////
////////                            \///////////////////////////////////////////
///////                              \//////////////////////////////////////////

function testContrast(midAdjust = false) {
  let contrast = 0.0;
  //let contrastString = '';

  if (BG.ok && TXT.ok) {
    // Get Contrast. It's kinda like "Get Shorty" but without Danny DiVito

    contrast = SAPCcontrast(TXT.LYP, BG.LYP);
    //contrastString = APCAcontrast(BG,TXT,2);

    let absContrast = isNaN(contrast) ? 0 : Math.abs(parseFloat(contrast));
    let contrastFixed = isNaN(contrast) ? contrast : contrast.toFixed(1);

    contrastResultTable.innerHTML = "L<sup>c</sup>  " + contrastFixed;

    let rowString = "";
    let currentLevel = 0;

    let tempAlertColor = "#F00";

    let modeScoreArrayLen = scoreArrayLen;
    let modeWeightArrayLen = weightArrayLen;

    globalBGcolor = BG.hex();
    globalTXTcolor = TXT.hex();

    if (mode === "simple") {
      researchMode = false;
    }

    let sampleText = "SampleText";
    let sampleBodyText =
      "the lazy grey dog slept as the<br> frisky fox frolicked freely in the<br>field of grass without a care in<br>the world, wondering if the dog<br> would ever wake up so they could play";
    let minimumText = "MINIMUM";
    let fontLevel28 = 28,
      fontLevel39 = 39,
      fontLevel79 = 79,
      fontLevel24 = 24;

    if (absContrast < minScoreG) {
      /////  FOR "ALL UNDER MINIMUM" MESSAGE  /////

      // alt for debug only
      //if (absContrast < 120) {

      if (mode === "simple") {
        tableScoreDOMarray[4].innerHTML =
          '<th style="border-radius: 12px 36px 36px 12px;">' +
          scoreTextArray[0] +
          "</th>" +
          loConWarningRow9x1s();
      } else if (mode === "mobile") {
        tableScoreDOMarray[4].innerHTML =
          "<th>" + scoreTextArray[0] + "</th>" + loConWarningRow6x1;
      }
    } else {
      ///// Interpolate fonts and fill table  /////

      /////  Prep for interpolated fonts  /////

      let si = 4;
      let cl = 0;

      // this loop sets score index
      for (; cl < contrastArrayLenG; ) {
        if (absContrast > scoreLevelsPreCalcG[cl][si]) {
          scoreIndex = cl;
          break;
        } else {
          // console.log('cl '+cl+'  si  ' + scoreIndex)
          cl++;
        }
      }

      ///////////////////////////////////////////////////////////////////////////
      /////////  Font and Score Interpolation  \////////////////////////////////
      ////////                                  \//////////////////////////////

      // Interpolation
      let tempFont = 777;
      let s = si;
      let w = 2;
      let tempScoreAdj = 1.0;
      let minFontTemp = 0.0;
      let nonTextBorder = "";

      // populate interpolatedFonts array with interpolated values

      tempScoreAdj =
        (absContrast - scoreLevelsPreCalcG[scoreIndex][s]) /
        scoreDeltaG[scoreIndex][s];

      for (; w < weightArrayLen; w++) {
        tempFont = fontMatrixG[scoreIndex][w];

        switch (tempFont) {
          case 410:
          case 411:
          case 412:
          case 413:
          case 414:
          case 415:
          case 416:
          case 418:
          case 445:
          case 427:
          case 417:
          case 413.5:

          case 777:
          case 888:
          case 999:
          case 0:
            interpolatedFonts[s][w] = tempFont;

            break;

          default:
            // INTERPOLATION OF FONT SIZE
            // sets level for 0.5 size increments of smaller fonts
            // Note bitwise (n|0) instead of floor
            tempFont > 24
              ? (interpolatedFonts[s][w] = Math.round(
                  tempFont -
                    fontDeltaG[scoreIndex][w] * //scoreIndex - 1 for correct ∆
                      tempScoreAdj
                ))
              : (interpolatedFonts[s][w] =
                  tempFont -
                  ((2.0 * fontDeltaG[scoreIndex][w] * tempScoreAdj) | 0) * 0.5); // (n|0) is bw floor
        }
      }

      ////////\                         ///////////////////////////////////////////
      /////////\  End Interpolation   ////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////
      /////////  Populate Table and Samples   \/////////////////////////////////
      ////////                                 \///////////////////////////////

      s = 4;

      if (mode === "simple") {
        w = 2;
        modeWeightArrayLen = 8;
        rowString =
          '<th style="border-radius: 12px 36px 36px 12px;" >' +
          scoreTextArraySimple[s] +
          "</th>";
      } else if (mode === "mobile") {
        w = 2;
        modeWeightArrayLen = 8;
        rowString = "<th " + normalColspan + " >" + scoreTextArray[s] + "</th>";
      }

      for (; w < modeWeightArrayLen; w++) {
        tempFont = interpolatedFonts[s][w];

        switch (tempFont) {
          case 410:
          case 411:
          case 412:
          case 413:
          case 414:
          case 415:
          case 416:
          case 418:
          case 445:
          case 427:
          case 417:
          case 413.5:
            minFontTemp = tempFont % 400;
          // console.log(minFontTemp + '  x  ' + tempFont);

          default:
            tempFont =
              tempFont <= fontMatrixGmin[s][w]
                ? fontMatrixGmin[s][w]
                : tempFont;

            if (mode === "simple" && (w == 2 || w == 5 || w == 6)) {
              modeColspan = normalColspan;
              fontLevel79 = 82;
              fontLevel39 = 69;
              fontLevel28 = 39;
              sampleText = "SampleText";
              minimumText = "MIN";
            } else if (mode === "simple") {
              modeColspan = simpleColspan;
              fontLevel79 = 112;
              fontLevel39 = 96;
              fontLevel28 = 52;
              sampleText = "Sample Text &amp; ATOMsizedgap";
              minimumText = "MINIMUM SIZE"; //'NO CONTENT TEXT<br> At This Size';
            } else if (mode === "mobile") {
              modeColspan = mobileColspan;
            } else {
              modeColspan = normalColspan;
            }

            nonTextBorder = contrast < 0 ? "box-shadow: 0 0 3px #123;" : "";

            //  LowCon error
            tempFont > 800
              ? (rowString += "<td " + modeColspan + loConMessage2LowSingle)
              : // Non Text
              (nonTextScoreG > absContrast || tempFont > 700) &&
                (w == 2 || w == 5 || w == 6)
              ? (rowString +=
                  '<td style="margin: -10px 0; padding: 0; max-height: 60px; font-size: 96px; font-weight: ' +
                  weightArray[w] +
                  "; font-family: Barlow, Kanit, poppins; line-height:0.9; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  "; border-width:" +
                  w * 2 +
                  "px; border-radius: 24px; border-color:#" +
                  TXT.hex() +
                  "; " +
                  nonTextBorder +
                  '">N</td>')
              : // Non Text
              nonTextScoreG > absContrast || tempFont > 700
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="margin: -10px 0; padding: 0;max-height: 60px; font-size: 100px; font-stretch: ultra-expanded; font-weight: ' +
                  weightArray[w] +
                  "; font-family: Kanit, poppins; line-height:0.9; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  "; border-width:" +
                  w * 2 +
                  "px; border-radius: 36px; border-color:#" +
                  TXT.hex() +
                  "; " +
                  nonTextBorder +
                  '">|N|</td>')
              : // MINIMUM
              tempFont > 400 && w == 2
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="font-size:' +
                  minFontTemp +
                  "px; font-weight:200; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  ';">' +
                  minFontTemp +
                  "px <br>" +
                  minimumText +
                  "</td>")
              : tempFont > 400
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="display:inline-block; padding: 8px 0 0;font-size:' +
                  minFontTemp +
                  "px; font-weight:" +
                  weightArray[w] +
                  "; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  "; line-height:" +
                  (1.0 + w * 0.0456).toString() +
                  ';">' +
                  minFontTemp +
                  "px " +
                  minimumText +
                  "<br>" +
                  sampleBodyText +
                  "</td>")
              : // score colored inset
              tempFont > fontLevel79
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="font-size:' +
                  tempFont +
                  "px; font-weight:" +
                  weightArray[w] +
                  "; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  '; line-height: 0.75; overflow:hidden">&amp;' +
                  '<div style="position:absolute; bottom: 24px; border-radius: 0 4px 4px 6px; margin: -32px auto 0; padding:2px 6px 2px 12px; font-size: 16px; font-weight: 600; color:#' +
                  scoreColor[s] +
                  '; background-color: #eee;">' +
                  tempFont +
                  "px</div></td>")
              : // fs only
              tempFont > fontLevel39
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="font-size:' +
                  tempFont +
                  "px; font-weight:" +
                  weightArray[w] +
                  "; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  '; line-height: 0.75;">' +
                  tempFont +
                  "</td>")
              : // fspx only
              tempFont > fontLevel28
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="font-size:' +
                  tempFont +
                  "px; font-weight:" +
                  weightArray[w] +
                  "; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  '; line-height: 0.75;">' +
                  tempFont +
                  "px</td>")
              : // Sample Text
              tempFont > fontLevel24
              ? (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="font-size:' +
                  tempFont +
                  "px; font-weight:" +
                  weightArray[w] +
                  "; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  '; line-height: 1.0;">' +
                  tempFont +
                  "px<br>" +
                  sampleText +
                  "</td>")
              : // Sample Text Body Sample
                (rowString +=
                  "<td " +
                  modeColspan +
                  ' style="display:inline-block;padding: 6px 0 0; font-size:' +
                  tempFont +
                  "px; font-weight:" +
                  weightArray[w] +
                  "; color:#" +
                  TXT.hex() +
                  "; background-color:#" +
                  BG.hex() +
                  "; line-height:" +
                  (1.0 + w * 0.0456).toString() +
                  ';">' +
                  // + (2.2 - tempFont * 0.04) + ';">'
                  tempFont +
                  "px<br>" +
                  sampleBodyText +
                  "</td>");
        } // end switch
      } // end column for
      document.getElementById("tableScore" + s).innerHTML = rowString;

      ////////
    }
  } else {
    /// !(BG.ok && TXT.ok) ///

    contrast = 0;
    contrastResultTable.innerHTML = '<div class="fs06 cR">IO ERROR</div>';
    //contrastResult.innerHTML = '<div class="fs06 cR">INVALID<br>COLOR</div>';
    //contrastResult2.innerHTML = '<div class="fs06 cR">INVALID<br>COLOR</div>';

    tsi = tableScoreDOMlen - 1;
    tableScoreDOMarray[tsi].innerHTML =
      scoreTextProhibit + badColorWarning9x5();
    tsi--;
    for (; tsi > 0; tsi--) {
      tableScoreDOMarray[tsi].innerHTML = scoreTextProhibit;
    }
  }
} // close testContrast()

////////\                                    ///////////////////////////////////
/////////\  END TEST CONTRAST FUNCTION END  ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
