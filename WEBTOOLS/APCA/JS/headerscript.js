// User Agent Detection — place first in head
// Set body tag: <body id="bodyid" onload="setBrowser()">

let browserName = "";
function setBrowser() {
  if (navigator.vendor.match(/google/i)) {
    browserName = "chrome/blink";
    document.getElementById("bodyid").classList.add("chrome");
  } else if (navigator.vendor.match(/apple/i)) {
    browserName = "safari/webkit";
    document.getElementById("bodyid").classList.add("safari");
  } else if (navigator.userAgent.match(/firefox\//i)) {
    browserName = "firefox/gecko";
    document.getElementById("bodyid").classList.add("firefox");
  } else if (navigator.userAgent.match(/edge?\//i)) {
    browserName = "edge/edgehtml";
    document.getElementById("bodyid").classList.add("edge");
  } else if (navigator.userAgent.match(/trident\//i)) {
    browserName = "ie/trident";
    document.getElementById("bodyid").classList.add("IErecent");
  } else if (navigator.userAgent.match(/MSIE\//i)) {
    browserName = "ie/IE";
    document.getElementById("bodyid").classList.add("IElegacy");
  } else {
    browserName = navigator.userAgent + " by " + navigator.vendor;
    document.getElementById("bodyid").classList.add("unknownAgent");
  }
  //console.log(document.getElementById("bodyid").classList);
}

////////////////////////////////////////////////////////////////////////////////
//////////// PAGE CODE BETA 0.98g //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//////////// PAGE MAIN FUNCTIONS ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// To do: work on reducing the use of globals!

// Declare the two key variables
let BG = new RGBcolor("2F4");
let TXT = new RGBcolor("42F");

function getCSScolor(sRGBstrg, type) {
  // Call to primary color pre-process
  // Returns RGBcolor OBJECT if good
  // Sets page colors

  let thisColor = new RGBcolor(sRGBstrg);

  if (thisColor.ok) {
    switch (type) {
      case "BG":
        BG = thisColor;

        //  Clear Error warning colors
        inputBG.style.backgroundColor = "#DFA";
        BGpickerWrap.style.backgroundColor = "#808080";

        // Set the input element and result element values to match
        inputBG.value = thisColor.cleaned;
        BGpicker.value = thisColor.hexNoA();

        // Set the CSS BG colors
        BGpicker.style.backgroundColor = cssVar(
          "--bgColor",
          thisColor.hexNoA()
        );

        break;

      case "TXT":
        TXT = thisColor;

        //  Clear Error warning colors
        inputTXT.style.backgroundColor = "#DFA";
        TXTpickerWrap.style.backgroundColor = "#808080";

        // Set the input element and result element values to match
        inputTXT.value = thisColor.cleaned;
        TXTpicker.value = thisColor.hexNoA();

        // Set the CSS text colors // Background for result: it is the patch

        TXTpicker.style.backgroundColor = TXTpicker.style.Color = cssVar(
          "--textColor",
          thisColor.hexNoA()
        );

        break;

      case "MID":
        //MID = thisColor;
        //cssVar('--textColorMid',MID.hexNoA());
        //cssVar('--bgColorMid',MID.hexNoA());

        //return thisColor;  // jump out now for MID

        break;
    }

    let colorValid =
      '<code><span class="dib ls0 m0 pt08 fs075 lh10 fwb">' +
      thisColor.hexNoA2() +
      " • " +
      thisColor.RGBAstr();

    // Report results to the results window to show info about the color

    document.getElementById(type + "validText").innerHTML = colorValid;

    return thisColor;
  } else {
    // else when the color is an invalid entry.

    document.getElementById(type + "validText").innerHTML =
      '<code><span class="dib ls02 fs10 lh20 cR fwb"><b>INVALID COLOR</b></span></code>';

    switch (
      type // Set error warning colors
    ) {
      case "BG":
        inputBG.style.backgroundColor = "#F9A";
        BGpickerWrap.style.backgroundColor = "#D00";
        BG.ok = false;
        break;

      case "TXT":
        inputTXT.style.backgroundColor = "#F9A";
        TXTpickerWrap.style.backgroundColor = "#D00";
        TXT.ok = false;
        break;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////  MYNDEX FRAMEWORK FUNCTIONS  /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const cssVar = (name, value) => {
  if (name.substr(0, 2) !== "--") {
    name = "--" + name;
  }
  if (value) {
    document.documentElement.style.setProperty(name, value);
  }
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

const byID = (name, property, value, property2) => {
  let tempObj = document.getElementById(name);

  if (property) {
    tempObj = tempObj[property];
    if (property2) {
      tempObj = tempObj[property];
    }
    if (value != null) {
      tempObj = value;
    }
  }
  return tempObj;
};
// Usage for byID()
// byID('thing'); // returns DOM thing
// byID('thing','innerHTML'); // returns thing's innerHTML
// byID('thing','style',null,'color');    // returns thing's color
// byID('thing','style','#777','color'); // sets thing's color to #777
// byID('thing','style','color: #777'); // replaces thing's style string

const byQuery = (selectors, styleProperty, value) => {
  let tempAry = document.querySelectorAll(selectors).style;

  if (value != null && styleProperty != null) {
    tempAry.forEach(elementStyle => {
      elementStyle[property] = value;
    });
  } else if (value != null) {
    tempAry.forEach(elementStyle => {
      elementStyle = value;
    });
  }

  return tempAry;
};
// Usage for byQuery()
// byQuery('p.thing'); // returns array of "p.thing" elements
// byQuery('p.thing','color','#777'); // sets all p.things color to #777
// byQuery('p.thing',null,'color: #777'); // replaces p.thing's style string

const byClass = (className, property, value, property2) => {
  var theClasses = document.getElementsByClassName(className);

  if (value != null) {
    theClasses.forEach(thisClass => {
      if (property2) {
        thisClass[property][property2] = value;
      } else {
        thisClass[property] = value;
      }
    });

    return theClasses;
  }
};
// Usage for byClass()
// byClass('thing'); // returns array of thing classes
// byClass('thing','innerHTML'); // set all thing classes innerHTML to empty
// byClass('thing','innerHTML','Hollow World');
// sets all thing classes innerHTML to "Hollow World"

// byClass('thing','style','#777','color');
// sets all thing classes color to #777

// byClass('thing','style','color: #777');
// Replaces all thing classes style string with 'color: #777'

////////////////////////////////////////////////////////////////////////////////
/////////  PAGE UTILITY FUNCTIONS  /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function swapColors() {
  let BGtemp = inputBG.value;
  getCSScolor(inputTXT.value, "BG");
  getCSScolor(BGtemp, "TXT");

  testContrast();
}

// getColorURL is the main page initializer

function getColorURL() {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("BG") && urlParams.has("TXT")) {
    BG = getCSScolor(urlParams.get("BG"), "BG");
    TXT = getCSScolor(urlParams.get("TXT"), "TXT");

    document.getElementById("URLresult").value = document.URL;
    document.getElementById("URLresult").select();
  } else {
    BG = getCSScolor("e9e4d0", "BG"); // Default BG Color
    TXT = getCSScolor("1234b0", "TXT"); // Default TXT Color
  }

  //populateLabels();
  testContrast();
}

//getCSScolor(TXT, 'TXT');
//getCSScolor(BG,'BG');

//console.log('1 ' + window.location.pathname); // Returns path only
//console.log('2 ' + window.location.href);
//console.log('3 ' + document.URL);

// Note the TXT param is now uppercase to be consistent with the vars
function createColorURL(elementID, BGstring, TXTstring) {
  if (BGstring && TXTstring) {
    BG = new RGBcolor(BGstring);
    TXT = new RGBcolor(TXTstring);
  }

  if (BG.ok && TXT.ok) {
    let newURL = (document.getElementById(elementID).href =
      "https://www.myndex.com" +
      window.location.pathname +
      "?BG=" +
      BG.hex() +
      "&TXT=" +
      TXT.hex() +
      "&DEV=98G4g" +
      //+ "&RSH=" + researchMode.toString()
      //+ "&SEL=" + researchSelect
      "&BUF=APCA-G");
    navigator.clipboard.writeText(newURL);
  } else {
    document.getElementById("colorWarn").style.display = "block";
  }
}

// Entry Key Cleanup for better UX with auto-enter

function entryKeys(colorString, type, e) {
  if (
    (e.which >= 48 && e.which <= 57 && event.shiftKey == false) || // 0-9
    (e.which >= 65 && e.which <= 90) || // a-z
    (e.which >= 96 && e.which <= 105) || // num keypad
    e.which === 13 || // enter
    e.which === 9 || // tab key
    e.which === 188 || // comma key
    e.which === 194 || // comma num keypad key
    //e.which === 8  || // backspace
    //e.which === 17 || // ctrl
    //e.which === 46 || // delete
    //(e.which >= 91 && e.which <= 93) ||  // OS key
    (e.which === 48 && event.shiftKey == true) // close parenthesis
  ) {
    getCSScolor(colorString, type);
    testContrast();
  }
}

function entryKeysNum(value, e) {
  if (
    /^-?\d\d?\d?$/.test(value) && // constrain input
    ((e.which >= 48 && e.which <= 57 && event.shiftKey == false) ||
    (e.which >= 96 && e.which <= 105) || // num keypad
    e.which === 13 || // enter
    e.which === 9 || // tab key
    e.which === 109 || // subtract
    e.which === 173 || // minus
      e.which === 189) // minus some user agents
  ) {
    setResearchOffset(value);
  }
}
////////////////////////////////////////////////////////////////////////////////
/////////  END HEAD FUNCTIONS  •••  SEE AFTER FOOTER FOR MORE  /////////////////
////////////////////////////////////////////////////////////////////////////////
