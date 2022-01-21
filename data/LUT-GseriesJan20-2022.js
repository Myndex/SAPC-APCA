//APCA CONTRAST LOOKUP TABLE
// Copyright © 2022 by Myndex Research and Andrew Somers. All Rights Reserved


//Public Beta 0.1.2 (G) • January 20 2022
//                         Reference Font Weight
//Font
//Size	100	200	300	400	500	600	700	800	900
//pt	px	              APCA Contrast Value (Lc)



// For the following arrays, the Y axis is contrastArrayLen
// The two x axis are weightArrayLen and scoreArrayLen
// const contrastArrayD = [200,110,100,90,80,70,60,55,50,45,40,35,30,25,20,15,12,11,7,0,];

// Jan 16
const contrastArrayD = [200,105,100,95,90,85,80,75,70,65,60,55,50,45,40,38,36,34,32,30,25,20,15,0];
const contrastArrayLenG = contrastArrayD.length;

const weightArray = [0,100,200,300,400,500,600,700,800,900];
const weightArrayLen = weightArray.length;

const scoreArray = [0,1,2,3,4,5];
const scoreArrayLen = 6;


/*



/////  Font Table — FLUENT text and body text. Indexed by SIZE.

// Body text under 70 should have Lc 15 ADDED.
// 200-300: subtract 200. This indicates fluent text that should NOT be body text.
// 444 - this is for spot text, not fluent. Things like copyright or placeholder.
// 888 and 999: prohibited text

'px'	

//  */



lutG14xFontSize = [
['px'


///////////////////////////////////////////////////////////////////////////////

/////  Font Table — FLUENT text and body text. Indexed by Lc VALUE.

// Body text under 70 should have Lc 15 ADDED.
// 200-300: subtract 200. This indicates fluent text that should NOT be body text.
// 444 - this is for spot text, not fluent. Things like copyright or placeholder.
// 888 and 999: prohibited text

/*

'Lc’	
//  */


///////////////////////////////////////////////////////////////////////////////
///  By Lc DELTA PRE CALC

/*

'Lc∆’	


//  */


///////////////////////////////////////////////////////////////////////////////



// lutG14xLcValue = ['Lc',100,200,300,400,500,600,700,800,900],

// 999: prohibited too low contrast
// 888: replaced with 400s  Ok at previous minimum 
// 777: NON TEXT at this minimum weight stroke
// 5xx - minimum font at this weight for content, 5xx % 500 for font-size
// 4xx - minimum font at this weight for any purpose], 4xx % 400 for font-size


lutG14xLcValue = [
['Lc',


const fontMatrixG = [  ///   Jan 19 2022
[200,	436,	416,	412,	410,	410,	410,	410,	416,	418],
[105,	436,	416,	412,	410,	410,	410,	410,	416,	418],
[100,	436,	419,	415,	413,	412,	411,	410,	416,	418],
[95,	436,	421,	416,	414,	413,	412,	411,	416,	418],
[90,	36,	24,	18,	15,	14,	13,	12,	416,	418],
[85,	40,	27,	20,	16,	15,	13.5,	12.5,	416,	418],
[80,	48,	31,	22,	17,	16,	14.5,	13,	416,	418],
[75,	57,	36,	24,	18,	17,	15,	13.5,	416,	418],
[70,	66,	40,	27,	20,	18,	16,	14.5,	416,	418],
[65,	80,	50,	31,	22,	19.5,	17,	15.5,	416,	418],
[60,	96,	60,	36,	24,	21,	18,	16,	16,	18],
[55,	112,	72,	42,	28,	24,	20,	17,	18,	18],
[50,	777,	82,	49,	31,	26,	22,	19,	19,	19],
[45,	777,	92,	56,	34,	29,	24,	21,	20,	20],
[40,	777,	100,	62,	38,	32,	27,	24,	21,	21],
[38,	777,	112,	70,	42,	36,	30,	27,	24,	24],
[36,	777,	777,	78,	47,	40,	33,	31,	24,	24],
[34,	999,	777,	86,	52,	44,	37,	34,	24,	24],
[32,	999,	777,	96,	58,	49,	41,	38,	27,	27],
[30,	999,	777,	112,	68,	58,	48,	42,	40,	40],
[25,	999,	999,	777,	86,	70,	64,	60,	58,	58],
[20,	999,	999,	777,	108,	96,	90,	76,	76,	76],
[15,	999,	999,	777,	777,	777,	777,	96,	96,	96],
[10,	999,	999,	999,	999,	999,	999,	999,	999,	999],
[0,	999,	999,	999,	999,	999,	999,	999,	999,	999],
];




// lutG14xLcDelta = ['Lc∆',100,200,300,400,500,600,700,800,900],


lutG14xLcDelta = [
['Lc∆',


const fontDeltaG = [ ///Jan 19 2022
[200,	0,	0,	0,	0,	0,	0,	0,	0,	0],
[105,	0,	0,	0,	0,	0,	0,	0,	0,	0],
[100,	0,	3,	3,	3,	2,	1,	0,	0,	0],
[95,	0,	2,	1,	1,	1,	1,	1,	0,	0],
[90,	0,	3,	2,	1,	1,	1,	1,	0,	0],
[85,	4,	3,	2,	1,	1,	0.5,	0.5,	0,	0],
[80,	8,	4,	2,	1,	1,	1,	0.5,	0,	0],
[75,	9,	5,	2,	1,	1,	0.5,	0.5,	0,	0],
[70,	9,	4,	3,	2,	1,	1,	1,	0,	0],
[65,	14,	10,	4,	2,	1.5,	1,	1,	0,	0],
[60,	16,	10,	5,	2,	1.5,	1,	0.5,	0,	0],
[55,	16,	12,	6,	4,	3,	2,	1,	2,	0],
[50,	0,	10,	7,	3,	2,	2,	2,	1,	1],
[45,	0,	10,	7,	3,	3,	2,	2,	1,	1],
[40,	0,	8,	6,	4,	3,	3,	3,	1,	1],
[38,	0,	12,	8,	4,	4,	3,	3,	3,	3],
[36,	0,	0,	8,	5,	4,	3,	4,	0,	0],
[34,	0,	0,	8,	5,	4,	4,	3,	0,	0],
[32,	0,	0,	10,	6,	5,	4,	4,	3,	3],
[30,	0,	0,	16,	10,	9,	7,	4,	13,	13],
[25,	0,	0,	0,	18,	12,	16,	18,	18,	18],
[20,	0,	0,	0,	22,	26,	26,	16,	18,	18],
[15,	0,	0,	0,	0,	0,	0,	20,	20,	20],
[10,	0,	0,	0,	0,	0,	0,	0,	0,	0],
[0,	0,	0,	0,	0,	0,	0,	0,	0,	0],
];




/////  MINIMUMS ARRAYS  ///////////////////////////////////////////////////

    // Minimum font size per score level and weight
    // Weight S 1 2 3 4 5 6 7 8 9
const fontMatrixGmin = [
    ['sc0',32,16,12,10,9,8,8,10,12,],  // score: hard fail level
    ['sc1',36,16,12,10,10,10,10,12,14,], // score 1
    ['sc2',36,16,12,10,10,10,10,16,18,], // score 2
    ['sc3',36,16,12,10,10,10,10,16,18,], // score 3
    ['sc4',36,16,12,10,10,10,10,16,18,], // score 4
    ['sc5',48,28,24,20,18,16,14,16,18,], // score 5
  ];

    // Minimum font size per use case and score level
    // Score M 1 2 3 4 5
const fontSizeGtype = [
    ['maxBody',24,24,24,24,24,],    // MAX body text (not zoomed)
    ['minBody',12,12,14,14,18,],    // Min body text 
    ['maxContent',120,108,96,96,72,], // MAX content text
    ['minContent',10,11,12,13,14,],   // Min content text
    ['maxAny',144,120,120,108,88,],    // MAX anytext
    ['minAny',9,10,11,12,13,],      // Min anytext (copyright etc)
  ];
  
    // Contrast minimums per master level and score level
    // score M 1 2 3 4 5
const fontScoreGmin = [         // CONTRAST LEVELS
    [90,95,95,95,95,90,],   // 0 MAX Large Headlines (> 48px & 500)
    [75,67.4,72.8,76.4,74.6,85.0,], // 1 Min Cols of Body Text (manually set)
    [60,47.4,52.8,56.4,59.6,75.0,], // 2 Min Content Text 
    [45,34.4,36.8,38.4,44.8,55.0,], // 3 Min Large content text
    [30,18.0,19.0,20.0,30.0,45.0,], // 4 Min Any text, large icons (manual)
    [15,15,15,15.0,15.0,22.0,], // 5 Min for all (manually set)
  ];

const minScoreG = fontScoreGmin[5][1]; // Hard minimum contrast, all levels.
const nonTextScoreG = fontScoreGmin[4][4];

let scoreLevel = 0;

let scoreIndex = [0,1,2,3,4,5]; // holds score position

  // holds the calculated minimum font sizes per level
let interpolatedFonts = [ 
    [0,0,0,0,0,0,0,0,0,0,],
    [1,0,0,0,0,0,0,0,0,0,],
    [2,0,0,0,0,0,0,0,0,0,],
    [3,0,0,0,0,0,0,0,0,0,],
    [4,0,0,0,0,0,0,0,0,0,],
    [5,0,0,0,0,0,0,0,0,0,],
  ];
  

