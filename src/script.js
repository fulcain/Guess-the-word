/**  Import getRandomWord helper function that fetches data from an API */
import getRandomWord from "./utils/getRandomWord.js";

/**  Import setWrongCharacters helper function to pass the arrayOfWrong and the pressed key to the function */
import setWrongCharacters from "./utils/setWrongCharacters.js";

/** Import Line component to create a line for each character of the word */
import Line from "./components/line.js";

/** Maximum length required for the word */
const MAXIMUM_LENGTH_OF_WORD = 7;

/** Array to store wrong characters */
const arrayOfWrongCharacters = [];

/** Array of characters to store each character of the word */
let arrayOfCharacters = [];

/** Asynchronous function to set the word */
const setWord = async () => {
    try {
        let word;

        do {
            /** Fetching a random word and extracting the 'word' property from the resolved value */
            const { word: fetchedWord } = await getRandomWord().catch((err) =>
                console.error(err)
            );

            word = fetchedWord;
        } while (word.length >= MAXIMUM_LENGTH_OF_WORD);

        /** Selecting the HTML element with the id "word" */
        const wordEl = document.querySelector("#word");

        /** Clearing the content of the word element */
        wordEl.textContent = "";

        /** Storing the characters of the word in the arrayOfCharacters array */
        arrayOfCharacters = [...word];

        /** Creating an array of Line components */
        const lines = arrayOfCharacters.map((char) => Line(char));

        /** Appending the Line components to the wordEl */
        wordEl.append(...lines);

        /** Adding a keydown event listener to the window object */
        window.addEventListener("keydown", (e) => {
            /** Checking if the pressed key is included in the arrayOfCharacters */
            if (arrayOfCharacters.includes(e.key)) {
                /** Selecting all DOM elements with the class name "line-value" */
                const allLineValues = document.querySelectorAll(".line-value");

                /** Looping through the arrayOfCharacters for applying the show classList */
                for (let i = 0; i < arrayOfCharacters.length; i++) {
                    /** Checking if the current element in the arrayOfCharacters at index i is equal to the pressed key */
                    if (arrayOfCharacters[i] === e.key) {
                        /** Adding the "show" class to the corresponding element at index i in allLineValues */
                        allLineValues[i].classList.add("show");
                    }
                }
            } else {
                /** Calling the setWrongCharacters function with the arrayOfWrongCharacters array and the pressed key */
                setWrongCharacters(arrayOfWrongCharacters, e);
            }
        });
    } catch (error) {
        console.error(error);
    }
};

/** Event listener to initialize the game when the DOM content is loaded */
document.addEventListener("DOMContentLoaded", init);

function init() {
    /** Calling the setWord function to start the game */
    setWord();
}
