// APCA CONTRAST FONT LOOKUP TABLES
// Copyright © 2022 by Myndex Research and Andrew Somers. All Rights Reserved

// Public Beta 0.1.5b (G) • APRIL 23 2022 (minor cleanup)

// For the following arrays, the Y axis is contrastArrayLen
// The two x axis are weightArrayLen and scoreArrayLen

// Jan 31 2022
const contrastArrayG = [200,120,105,100,95,90,85,80,75,70,65,60,55,50,45,40,35,30,25,20,15,10,0,];
const contrastArrayLenG = contrastArrayG.length; // Y azis

    // APRIL 23  2022
    const contrastArrayAscend = ['lc',0,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,120,];
    const contrastArrayLenAsc = contrastArrayAscend.length; // Y azis


const weightArray = [0,100,200,300,400,500,600,700,800,900];
const weightArrayLen = weightArray.length; // X axis



///////////////////////////////////////////////////////////////////////////////

/////  CONTRAST * FONT WEIGHT & SIZE  //////////////////////////////////////

// Font size interpolations. Here the chart was re-ordered to put
// the main contrast levels each on one line, instead of font size per line.
// First column is LC value, then each following column is font size by weight

// G G G G G G  UPDATED JAN 31 2022 
// ADJUSTED FOR G Interpolation 

// Lc values under 70 should have Lc 15 ADDED if used for body text
// All font sizes are in px and reference font is Barlow

// 999: prohibited - too low contrast
// 777: NON TEXT at this minimum weight stroke
// 666 - this is for spot text, not fluent. Things like copyright or placeholder.
// 5xx - minimum font at this weight for content, 5xx % 500 for font-size
// 4xx - minimum font at this weight for any purpose], 4xx % 400 for font-size

// MAIN FONT SIZE LOOKUP Jan 31 2022  Sorted by Lc Value

const fontMatrixG = [  //  Jan 31 2022
['Lc',100,200,300,400,500,600,700,800,900],
[120,445,427,417,413.5,413.5,413.5,413.5,416,418],
[105,445,427,417,413.5,413.5,413.5,413.5,416,418],
[100,46.5,28,18,14,414,414,414,416,418],
[95,48.5,29,20.5,14.5,14,414,414,416,418],
[90,50,30,21,15,14.5,414,414,416,418],
[85,53.5,32,22,16,15,14,414,416,418],
[80,56.5,34,23,17,16,14.5,414,416,418],
[75,60,36,24,18,17,15,14,416,418],
[70,65,39,27.5,19.5,18,16,14.5,416,418],
[65,71.5,43,30.5,21.5,19.5,17,15,416,418],
[60,80,48,34,24,21,18,16,416,418],
[55,86.5,52,37,26,22,19.5,17,16,418],
[50,96.5,58,41,29,25,20,18,17,418],
[45,120,72,51,36,28,24,20,18,418],
[40,777,96,68,48,34,29,24,20,18],
[35,777,120,93.5,66,46.5,40,33,26.5,20],
[30,999,777,120,96,68,58,48,38.5,29],
[25,999,777,777,120,102,87,72,57.5,43],
[20,999,777,777,777,120,120,110,88,66],
[15,999,999,777,777,777,777,120,120,120],
[10,999,999,999,999,999,999,777,777,777],
[0,999,999,999,999,999,999,999,999,999],
];


// G G G G G G UPDATED JAN 31 2022 
// interpolation G  
  
// MAIN FONT SIZE DELTA PRECALC Jan 31 2022 Sorted by Lc rows higher Jan 31 2022

const fontDeltaG = [ // rows ABOVE Jan 31 2022
['Lc∆h',100,200,300,400,500,600,700,800,900,],
[120,0,0,0,0,0,0,0,0,0,],
[105,0,0,0,0,0,0,0,0,0,],
[100,1.5,1,1,0.5,0.5,0.5,0.5,0,0,],
[95,2,1,2.5,0.5,0,0,0,0,0,],
[90,1.5,1,0.5,0.5,0,0,0,0,0,],
[85,3.5,2,1,1,0.5,0,0,0,0,],
[80,3,2,1,1,1,0.5,0,0,0,],
[75,3.5,2,1,1,1,0.5,0,0,0,],
[70,5,3,3.5,1.5,1,1,0.5,0,0,],
[65,6.5,4,3,2,1.5,1,0.5,0,0,],
[60,8.5,5,3.5,2.5,1.5,1,1,0,0,],
[55,6.5,4,3,2,1,1.5,1,0,0,],
[50,10,6,4,3,3,0.5,1,1,0,],
[45,23.5,14,10,7,3,4,2,1,0,],
[40,0,24,17,12,6,5,4,2,0,],
[35,0,24,25.5,18,12.5,11,9,6.5,2,],
[30,0,0,26.5,30,21.5,18,15,12,9,],
[25,0,0,0,24,34,29,24,19,14,],
[20,0,0,0,0,18,33,38,30.5,23,],
[15,0,0,0,0,0,0,10,32,54,],
[10,0,0,0,0,0,0,0,0,0,],
[0,0,0,0,0,0,0,0,0,0,],
];




    // MAIN FONT SIZE LOOKUP Jan 31 2022  Sorted by Lc Value

//// ASCENDING SORTED  APRIL 23 2022 ////

    const fontMatrixAscend = [  //  Jan 31 2022
    ['Lc',100,200,300,400,500,600,700,800,900],
    [0,999,999,999,999,999,999,999,999,999],
    [10,999,999,999,999,999,999,777,777,777],
    [15,999,999,777,777,777,777,120,120,120],
    [20,999,777,777,777,120,120,110,88,66],
    [25,999,777,777,120,102,87,72,57.5,43],
    [30,999,777,120,96,68,58,48,38.5,29],
    [35,777,120,93.5,66,46.5,40,33,26.5,20],
    [40,777,96,68,48,34,29,24,20,18],
    [45,120,72,51,36,28,24,20,18,418],
    [50,96.5,58,41,29,25,20,18,17,418],
    [55,86.5,52,37,26,22,19.5,17,16,418],
    [60,80,48,34,24,21,18,16,416,418],
    [65,71.5,43,30.5,21.5,19.5,17,15,416,418],
    [70,65,39,27.5,19.5,18,16,14.5,416,418],
    [75,60,36,24,18,17,15,14,416,418],
    [80,56.5,34,23,17,16,14.5,414,416,418],
    [85,53.5,32,22,16,15,14,414,416,418],
    [90,50,30,21,15,14.5,414,414,416,418],
    [95,48.5,29,20.5,14.5,14,414,414,416,418],
    [100,46.5,28,18,14,414,414,414,416,418],
    [105,445,427,417,413.5,413.5,413.5,413.5,416,418],
    [120,445,427,417,413.5,413.5,413.5,413.5,416,418],
    ];


    // G G G G G G UPDATED JAN 31 2022 
    // interpolation G  
  
    // MAIN FONT SIZE DELTA PRECALC Jan 31 2022 Sorted by Lc rows higher Jan 31 2022

//// ASCENDING SORTED  APRIL 23 2022 ////

    const fontDeltaAscend = [ // rows ABOVE Jan 31 2022
    ['Lc∆h',100,200,300,400,500,600,700,800,900,],
    [0,0,0,0,0,0,0,0,0,0,],
    [10,0,0,0,0,0,0,0,0,0,],
    [15,0,0,0,0,0,0,10,32,54,],
    [20,0,0,0,0,18,33,38,30.5,23,],
    [25,0,0,0,24,34,29,24,19,14,],
    [30,0,0,26.5,30,21.5,18,15,12,9,],
    [35,0,24,25.5,18,12.5,11,9,6.5,2,],
    [40,0,24,17,12,6,5,4,2,0,],
    [45,23.5,14,10,7,3,4,2,1,0,],
    [50,10,6,4,3,3,0.5,1,1,0,],
    [55,6.5,4,3,2,1,1.5,1,0,0,],
    [60,8.5,5,3.5,2.5,1.5,1,1,0,0,],
    [65,6.5,4,3,2,1.5,1,0.5,0,0,],
    [70,5,3,3.5,1.5,1,1,0.5,0,0,],
    [75,3.5,2,1,1,1,0.5,0,0,0,],
    [80,3,2,1,1,1,0.5,0,0,0,],
    [85,3.5,2,1,1,0.5,0,0,0,0,],
    [90,1.5,1,0.5,0.5,0,0,0,0,0,],
    [95,2,1,2.5,0.5,0,0,0,0,0,],
    [100,1.5,1,1,0.5,0.5,0.5,0.5,0,0,],
    [105,0,0,0,0,0,0,0,0,0,],
    [120,0,0,0,0,0,0,0,0,0,],
    ];



/////  MINIMUMS ARRAYS  ////////////////////////////////////////////////////
////  Updated Apr 23 2022 ////

////  NOTICE: Score levels will be replaced with use case levels ////
///   SCORE LEVELS ARE DEPRECATED                               ////

    // Minimum font size per score level and weight
    // Weight S 1 2 3 4 5 6 7 8 9
const fontMatrixGmin = [
    ['sc0',32,16,12,10,9,8,8,10,12,],  // score: hard fail level
    ['sc1',36,16,12,10,10,10,10,12,14,], // score 1
    ['sc2',36,16,12,10,10,10,10,16,18,], // score 2
    ['sc3',36,16,12,11,11,11,11,16,18,], // score 3
    ['sc4',42,24,18,14,14,14,14,16,18,], // score 4
    ['sc5',48,28,24,20,18,16,15,16,18,], // score 5
  ];

    // Min/Max font size per use case and score level
    // Score M 1 2 3 4 5
const fontSizeGtype = [
    ['maxBody',36,36,36,36,36,],       // MAX body text (not zoomed)
    ['minBody',12,12,14,16,21,],       // Min body text 
    ['maxContent',140,120,108,96,72,], // MAX content text
    ['minContent',10,11,12,14,18,],    // Min content text
    ['maxAny',144,120,120,108,96,],    // MAX anytext
    ['minAny',8,10,11,12,14,],         // Min spot text (copyright etc)
  ];
  
    // Lc contrast minimums per master level and score level
    // score M 1 2 3 4 5
const fontScoreGmin = [             // CONTRAST LEVELS in Lc
    [90,105.0,99.0,94.0,90.0,85.0,],// 0 MAX Large Headlines (> 36px & 700)
    [75,68.4,71.8,73.4,74.8,90.0,], // 1 Min Cols of Body Text (manually set)
    [60,47.4,52.8,56.4,59.8,75.0,], // 2 Min Content Text 
    [45,33.4,34.8,37.4,44.8,55.0,], // 3 Min Large content text
    [30,22.0,24.0,27.0,29.8,45.0,], // 4 Min non-content text, min large icons
    [15,14.0,15.0,16.0,18.0,22.0,], // 5 Min for all (invisibility level)
  ];

const minScoreG = fontScoreGmin[5][1]; // Hard minimum contrast, all levels.
const nonTextScoreG = fontScoreGmin[4][4];  // level for non text only

/////  END MINIMUMS ARRAYS  ////////////////////////////////////////////////


