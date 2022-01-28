// APCA CONTRAST FONT LOOKUP TABLES
// Copyright © 2022 by Myndex Research and Andrew Somers. All Rights Reserved


// Public Beta 0.1.4 (G) • January 27 2022
//                         Reference Font Weight
// Font
// Size	100	200	300	400	500	600	700	800	900
// pt	px	              APCA Contrast Value (Lc)



// For the following arrays, the Y axis is contrastArrayLen
// The two x axis are weightArrayLen and scoreArrayLen

// Jan 27
const contrastArrayG = [200,105,100,95,90,85,80,75,70,65,60,55,50,45,40,35,30,25,20,15,10,0,];
const contrastArrayLenG = contrastArrayG.length;

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


MAIN FONT LOOKUP Jan 27 2022 Sorted by Font Size									
									
									
px	100	200	300	400	500	600	700	800	900
10	⊘	⊘	⊘	⊘	⊘	⊘	⊘	⊘	⊘
12	⊘	⊘	⊘	©§™	©§™	©§™	©§™	⊘	⊘
14	⊘	⊘	©§™	95	90	85	75	⊘	⊘
15	⊘	⊘	©§™	90	85	75	70	⊘	⊘
16	⊘	⊘	©§™	85	80	70	60	55	⊘
17	⊘	⊘	©§™	80	75	65	55	50	45
18	⊘	©§™	95	75	70	60	50	45	40
21	⊘	©§™	90	70	60	50	45	40	35
24	⊘	©§™	75	60	55	45	40	40	35
28	⊘	95	70	55	50	40	40	35	35
32	⊘	85	65	50	45	40	35	35	30
36	⊘	75	60	45	40	35	35	30	30
48	95	60	50	40	35	35	30	30	30
60	75	50	45	40	35	30	30	30	30
72	65	45	40	35	30	30	30	30	30
96	50	40	35	30	30	30	30	30	30


MAIN FONT DELTA PRECALC Jan 27 2022 Sorted by Font Size


px	100	200	300	400	500	600	700	800	900
10	0	0	0	0	0	0	0	0	0
12	0	0	0	0	0	0	0	0	0
14	0	0	0	5	5	10	5	0	0
15	0	0	0	5	5	5	10	0	0
16	0	0	0	5	5	5	5	5	0
17	0	0	0	5	5	5	5	5	5
18	0	0	5	5	10	10	5	5	5
21	0	0	15	10	5	5	5	0	0
24	0	0	5	5	5	5	0	5	0
28	0	10	5	5	5	0	5	0	5
32	0	10	5	5	5	5	0	5	0
36	0	15	10	5	5	0	5	0	0
48	20	10	5	0	0	5	0	0	0
60	10	5	5	5	5	0	0	0	0
72	15	5	5	5	0	0	0	0	0
96	0	0	0	0	0	0	0	0	0
									



//  */



///////////////////////////////////////////////////////////////////////////////

/////  Font Table — FLUENT text and body text. Indexed by Lc VALUE.

// Body text under 70 should have Lc 15 ADDED.
// 200-300: subtract 200. This indicates fluent text that should NOT be body text.
// 444 - this is for spot text, not fluent. Things like copyright or placeholder.
// 888 and 999: prohibited text

/*


									
MAIN FONT LOOKUP Jan 27 2022  Sorted by Lc Value									
									
									
	100	200	300	400	500	600	700	800	900
105	45	27	17	13.5	13.5	13.5	13.5	416	418
100	46.5	28	18	14	414	414	414	416	418
95	48.5	29	20.5	14.5	14	414	414	416	418
90	50	30	21	15	14.5	414	414	416	418
85	53.5	32	22	16	15	14	414	416	418
80	56.5	34	23	17	16	14.5	414	416	418
75	60	36	24	18	17	15	14	416	418
70	65	39	27.5	19.5	18	16	14.5	416	418
65	71.5	43	30.5	21.5	19.5	17	15	416	418
60	80	48	34	24	21	18	16	416	418
55	86.5	52	37	26	22	19.5	17	16	418
50	96.5	58	41	29	25	20	18	17	418
45	120	72	51	36	28	24	20	18	418
40	777	96	68	48	34	29	24	20	18
35	777	120	93.5	66	46.5	40	33	26.5	20
30	777	777	120	96	68	58	48	38.5	29
25	777	777	777	120	102	87	72	57.5	43
20	777	777	777	777	120	120	110	88	66
15	777	777	777	777	777	777	120	120	120
10	777	777	777	777	777	777	777	777	777
0	999	999	999	999	999	999	999	999	999



//  */


///////////////////////////////////////////////////////////////////////////////
///  By Lc DELTA PRE CALC

/*

MAIN FONT DELTA PRECALC Jan 27 2022 Sorted by Lc

									
	100	200	300	400	500	600	700	800	900
105	1.5	1	1	0.5	0	0	0	0	0
100	2	1	2.5	0.5	0	0	0	0	0
95	1.5	1	0.5	0.5	0	0	0	0	0
90	3.5	2	1	1	0.5	0	0	0	0
85	3	2	1	1	1	0.5	0	0	0
80	3.5	2	1	1	1	0.5	0	0	0
75	5	3	3.5	1.5	1	1	0.5	0	0
70	6.5	4	3	2	1.5	1	0.5	0	0
65	8.5	5	3.5	2.5	1.5	1	1	0	0
60	6.5	4	3	2	1	1.5	1	0	0
55	10	6	4	3	3	0.5	1	1	0
50	23.5	14	10	7	3	4	2	1	0
45	0	24	17	12	6	5	4	2	0
40	0	24	25.5	18	12.5	11	9	6.5	2
35	0	0	26.5	30	21.5	18	15	12	9
30	0	0	0	24	34	29	24	19	14
25	0	0	0	0	18	33	38	30.5	23
20	0	0	0	0	0	0	10	32	54
15	0	0	0	0	0	0	0	0	0
10	0	0	0	0	0	0	0	0	0
0	0	0	0	0	0	0	0	0	0



// */
///////////////////////////////////////////////////////////////////////////////



// lutG18xLcValue = ['Lc',100,200,300,400,500,600,700,800,900],

// 999: prohibited too low contrast
// 888: replaced with 400s  Ok at previous minimum 
// 777: NON TEXT at this minimum weight stroke
// 5xx - minimum font at this weight for content, 5xx % 500 for font-size
// 4xx - minimum font at this weight for any purpose], 4xx % 400 for font-size



// MAIN FONT LOOKUP Jan 27 2022  Sorted by Lc Value

const fontMatrixG = [  //  Jan 27 2022
['Lc',100,200,300,400,500,600,700,800,900],
[105,45,27,17,13.5,13.5,13.5,13.5,416,418],
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
[30,777,777,120,96,68,58,48,38.5,29],
[25,777,777,777,120,102,87,72,57.5,43],
[20,777,777,777,777,120,120,110,88,66],
[15,777,777,777,777,777,777,120,120,120],
[10,777,777,777,777,777,777,777,777,777],
[0,999,999,999,999,999,999,999,999,999],
];




// lutG14xLcDelta = ['Lc∆',100,200,300,400,500,600,700,800,900],

// Each delta row is the delta of that row to the next lower Lc value row.
// so row 100  3  is a delta of 3 between row 100 and row 95

// MAIN FONT DELTA PRECALC Jan 27 2022 Sorted by Lc

const fontDeltaG = [ // Jan 27 2022
['Lc∆',100,200,300,400,500,600,700,800,900],
[105,1.5,1,1,0.5,0,0,0,0,0],
[100,2,1,2.5,0.5,0,0,0,0,0],
[95,1.5,1,0.5,0.5,0,0,0,0,0],
[90,3.5,2,1,1,0.5,0,0,0,0],
[85,3,2,1,1,1,0.5,0,0,0],
[80,3.5,2,1,1,1,0.5,0,0,0],
[75,5,3,3.5,1.5,1,1,0.5,0,0],
[70,6.5,4,3,2,1.5,1,0.5,0,0],
[65,8.5,5,3.5,2.5,1.5,1,1,0,0],
[60,6.5,4,3,2,1,1.5,1,0,0],
[55,10,6,4,3,3,0.5,1,1,0],
[50,23.5,14,10,7,3,4,2,1,0],
[45,0,24,17,12,6,5,4,2,0],
[40,0,24,25.5,18,12.5,11,9,6.5,2],
[35,0,0,26.5,30,21.5,18,15,12,9],
[30,0,0,0,24,34,29,24,19,14],
[25,0,0,0,0,18,33,38,30.5,23],
[20,0,0,0,0,0,0,10,32,54],
[15,0,0,0,0,0,0,0,0,0],
[10,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
];







////////////////////////////////////////////////////////////////////////////
/////  MINIMUMS ARRAYS  ///////////////////////////////////////////////////

    // Minimum font size per score level and weight
    // Weight S 1 2 3 4 5 6 7 8 9
const fontMatrixGmin = [
    ['sc0',32,16,12,10,9,8,8,10,12,],  // score: hard fail level
    ['sc1',36,16,12,10,10,10,10,12,14,], // score 1
    ['sc2',36,16,12,10,10,10,10,16,18,], // score 2
    ['sc3',36,16,12,11,11,11,11,16,18,], // score 3
    ['sc4',36,16,12,12,12,12,12,16,18,], // score 4
    ['sc5',48,28,24,20,18,16,15,16,18,], // score 5
  ];

    // Minimum font size per use case and score level
    // Score M 1 2 3 4 5
const fontSizeGtype = [
    ['maxBody',24,24,24,24,24,],    // MAX body text (not zoomed)
    ['minBody',12,12,14,14,18,],    // Min body text 
    ['maxContent',120,108,96,92,72,], // MAX content text
    ['minContent',10,11,12,13,14,],   // Min content text
    ['maxAny',144,120,120,108,96,],    // MAX anytext
    ['minAny',9,10,11,12,13,],      // Min anytext (copyright etc)
  ];
  
    // Contrast minimums per master level and score level
    // score M 1 2 3 4 5
const fontScoreGmin = [         // CONTRAST LEVELS
    [90,95,95,92,90,85,],   // 0 MAX Large Headlines (> 48px & 500)
    [75,68.4,71.8,73.4,74.6,90.0,], // 1 Min Cols of Body Text (manually set)
    [60,47.4,52.8,56.4,59.6,75.0,], // 2 Min Content Text 
    [45,33.4,34.8,37.4,40.0,50.0,], // 3 Min Large content text
    [30,22.0,24.0,27.0,30.0,45.0,], // 4 Min Any text, large icons (manual)
    [15,15,15,16.0,18.0,22.0,], // 5 Min for all (manually set)
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
  

