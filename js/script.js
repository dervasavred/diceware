import { wordList } from "/assets/wordList.js";

// import wordList  from "./assets/wordList.js";

// DICEWARE PASSWORD GENERATOR
// ==================================================
// AUTHOR: GITHUB.COM/DERVASAVRED/
//
// DESC: GENERATES PASSPHRASES USING STRICT RANDOM ENTRIES FROM EFF'S
//      (ELECTRONIC FRONTIER FOUNDATION) EXTENDED DICEWARE WORD DICTIONARY.
// https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases
//
//          TYPICAL USES WOULD BE FOR USERS TO REQUEST PASSPHRASES VIA
//          FRONT-END SITE. CUSTOM API SUPPORT AVAILABLE AS WELL.
//
// ==================================================
//          VARIABLES
// ==================================================
    // CREDIT TO EMIL BAYES FOR THIS LIST CONVERTED FROM THE EFF DICTIONARY
    // https://github.com/emilbayes/eff-diceware-passphrase

    const dictLength = wordList.length;

    // EFF RECOMMENDS 6 WORDS IN PASSPHRASE BY DEFAULT
    const REC_PASSPHRASE_WORD_COUNT = 6;

    // HTML ELEMENT SELECTORS
    const listDisplay = document.getElementById("phrase-list");

    let results = [];

    const PHRASES_TO_GEN_RANGE = document.getElementById("phrase-count-range");
    const PHRASES_TO_GEN_DISP = document.getElementById("phrase-count-display");

    const WORD_COUNT_RANGE = document.getElementById("word-count-range");
    const WORD_COUNT_DISP = document.getElementById("word-count-display");

    const DELIMITER = document.getElementById("delimiter-select");

    const CAMELCASE = document.getElementById("camel-case");

    // const MAX_CHARS_PER_WORD_RANGE = document.getElementById("max-word-length-range");
    // const MAX_CHARS_PER_WORD_DISP = document.getElementById("max-word-length-display");

    const FORM = document.getElementById("phrase-gen-form");


// ==================================================
//          EVENT LISTENERS
// ==================================================

PHRASES_TO_GEN_RANGE.addEventListener("input", function(e){
    syncDisplay(e,PHRASES_TO_GEN_RANGE,PHRASES_TO_GEN_DISP);
});

WORD_COUNT_RANGE.addEventListener("input", function(e){
    syncDisplay(e,WORD_COUNT_RANGE,WORD_COUNT_DISP);
});

// MAX_CHARS_PER_WORD_RANGE.addEventListener("input", function(e){
//     syncDisplay(e,MAX_CHARS_PER_WORD_RANGE,MAX_CHARS_PER_WORD_DISP);
// });



FORM.addEventListener("submit", e => {
    // THIS PREVENTS THE PAGE FROM REFRESHING ON SUBMITTAL
    e.preventDefault();

    // CALL FINAL FUNCTION TO BUILD PHRASES
    submitForm();
});



// ==================================================
//          FUNCTIONS
// ==================================================

function syncDisplay(e, id1, id2){
    const value = e.target.value;
    id1.value = value;
    id2.innerText = value;
}; // END FUNC

function countOutputs() {
    // DISPLAYS OUTPUTS FROM A FUNCTION AND COUNTS OCCURENCES OF OUTPUTS IN A
    // TABLE. USED TO SPOT-CHECK HOW RANDOM A FUNC IS.

}; // END FUNC

class PassPhrase {
    constructor(
    wordCount = REC_PASSPHRASE_WORD_COUNT,
    delimiter = " "
    ){
        // PROPERTIES
        this.wordCount = wordCount;
        this.delimiter = delimiter;
        this.phraseArr = [];

        // POPULATE ARRAY WITH RANDOM WORDS FROM DICTIONARY
        while( this.phraseArr.length < wordCount ){
            this.phraseArr.push(getRandomWord());
        };

        // LENGTH PROPERTY DOES NOT INCLUDE DELIMITERS
        this.phraseLength =
                    this.phraseArr.reduce((acc,n) => acc + n.length, 0);



    }; // END CONSTRUCTOR

    assembleStr(){
        return this.phraseArr.join(this.delimiter);
    }; // END METHOD

    camelCase() {
        for(let i = 1; i < this.phraseArr.length; i++) {
            this.phraseArr[i] =
                        this.phraseArr[i].charAt(0).toUpperCase()
                        + this.phraseArr[i].substring(1);
        }; // END FOR
    }; // END METHOD
}; // END CLASS



function getRandomNum(min = 0, max = 9) {
    // GENERATES A PSEUDO-RANDOM NUMBER USING IN-BUILT JS FUNCTIONS.
    //
    // TODO: IMPROVE RANDOM CAPABILITIES, SIMILAR TO JAVA'S SECURERANDOM()
    //
    // TODO: RESEARCH ADDING RANDOMIZED SALT, POSSIBLY FROM UTC TIME OR MOUSE
    // COORDINATES OR SOMETHING ELSE FROM THE USER.

    min < 0 ? min = 0 : min = Math.floor(min);
    min < 0 || max > Math.pow(10,12) ? max = dictLength : max = Math.floor(max);

    return Math.floor(
        Math.random(min, max) * (max - min) + min );
}; // END FUNC



function getRandomWord() {
    // RETURNS A SINGLE WORD FROM THE DICTIONARY
    return wordList[getRandomNum( 0, dictLength-1 )];
}; // END FUNC



function getRandomPhrase(
   desiredWordCount = REC_PASSPHRASE_WORD_COUNT,
   delimiter = " ",
   isCamelCase = false,

) {
    // GUARD CLAUSES
    // if(desiredWordCount <= 0) desiredWordCount = REC_PASSPHRASE_WORD_COUNT;
    desiredWordCount <= 0 ? desiredWordCount = REC_PASSPHRASE_WORD_COUNT :
                    desiredWordCount = Math.floor(desiredWordCount);

    // GET PASSPHRASE
    const phrase = new PassPhrase(desiredWordCount, delimiter);

    if(isCamelCase){ phrase.camelCase()};

    // // RETURNS FULL PASS PHRASE
    return phrase;
}; // END FUNC



function submitForm(){

    // RESET DISPLAY AREAS ON EACH CALL
    listDisplay.innerHTML = "";
    results = [];
    PHRASES_TO_GEN_DISP.innerText = PHRASES_TO_GEN_RANGE.value;
    WORD_COUNT_DISP.innerText = WORD_COUNT_RANGE.value;
    const isCamelCase = CAMELCASE.checked;

    // BUILD THE PHRASE ARRAY
    for(let i = 0; i < PHRASES_TO_GEN_RANGE.value; i++){
        results.push(
            getRandomPhrase(
                    WORD_COUNT_RANGE.value,
                    DELIMITER.value, // DELIMITER
                    isCamelCase    // CAMELCASE
        ));
        listDisplay.innerHTML +=
                        `<li>${results[i].assembleStr()}
                        (${results[i].phraseLength} chars)</li>`;
    };
}; // END FUNC


// ==================================================
//          CALLS
// ==================================================

// INITIAL CALL TO POPULATE PAGE BASED ON DEFAULT FORM OPTIONS
submitForm();




// ==================================================
//          DEBUG TRACERS
// ==================================================
// console.log("Length: " + dictLength);

// console.log("Phrase count: " + PHRASES_TO_GEN_RANGE.value);
// console.log("Word count: " + WORD_COUNT_RANGE.value);
