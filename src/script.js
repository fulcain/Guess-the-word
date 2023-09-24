import getRandomWord from "./utils/getRandomWord.js";
import setWrongCharacters from "./utils/setWrongCharacters.js";
import checkCorrectAnswer from "./utils/checkCorrectAnswer.js";
import Line from "./components/line.js";
import checkWrongAnswers from "./utils/checkWrongAnswers.js";

/**
 * An array to store guessed characters by the user.
 *
 * @type {string[]}
 */
const arrayOfGuessedCharacters = [];

/**
 * An array to store possible hints.
 *
 * @type {string[]}
 */
let arrayOfPossibleHints = [];

/**
 * The maximum length allowed for a word.
 *
 * @type {number}
 */
const MAXIMUM_LENGTH_OF_WORD = 7;

/**
 * An array to store incorrect characters.
 *
 * @type {string[]}
 */
let arrayOfWrongCharacters = [];

/**
 * An array to store characters of the word.
 *
 * @type {string[]}
 */
let arrayOfCharacters = [];

/**
 * A reference to the hint button element in the DOM.
 *
 * @type {HTMLElement}
 */
const hintButton = document.querySelector("#hint-button");

/**
 * A flag to track whether the hint button has been clicked.
 *
 * @type {boolean}
 */
let hintButtonClicked = false;

/**
 * Sets a new word for the game.
 *
 * @async
 * @throws {Error} If an error occurs during word retrieval.
 */
const setWord = async () => {
    try {
        hintButton.disabled = true;

        /**
         * @type {string} - The word that user should guess
         */
        let word;

        do {
            /** Get a random word from getRandomWord() function and set it to the word variable*/
            const { word: fetchedWord } = await getRandomWord().catch((err) =>
                console.error(err)
            );

            word = fetchedWord;
        } while (word.length >= MAXIMUM_LENGTH_OF_WORD);

        /**
         * @type {HTMLElement} - Word element in DOM
         */
        const wordEl = document.querySelector("#word");

        /**  Clear the word element's content */
        wordEl.textContent = "";

        /** Convert the word to an array of characters */
        arrayOfCharacters = [...word];

        /**
         * Create line elements for each character and append them to the word element.
         *
         * @type {HTMLElement[]}
         */
        const lines = arrayOfCharacters.map((char) => Line(char.toLowerCase()));
        wordEl.append(...lines);

        // Listen for keydown events to handle user input
        window.addEventListener("keydown", handleKeyDown);
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    setWord();
}

/** Apply event listener for hintButton */
hintButton.addEventListener("click", handleHintButtonClick);

/**
 * Event handler for keydown events.
 *
 * @param {KeyboardEvent} e - The keyboard event object.
 */
const handleKeyDown = (e) => {
    if (!hintButtonClicked) {
        /** Enable the hint button */
        hintButton.disabled = false;
    }

    /** Call the giveHint function and pass the "arrayOfCharacters" and "e.key" arguments. */
    giveHint(arrayOfCharacters, e.key);

    if (arrayOfCharacters.includes(e.key)) {
        /** @type {NodeList} */
        const allLineValues = document.querySelectorAll(".line-value");

        for (let i = 0; i < arrayOfCharacters.length; i++) {
            if (arrayOfCharacters[i] === e.key) {
                /** Call this function to check the correct answers */
                checkCorrectAnswer(arrayOfCharacters, e.key);

                allLineValues[i].classList.add("show");
            }
        }
    } else {
        /** Handle the case when the user's input is incorrect. */

        /** Call this function to set the wrong characters */
        setWrongCharacters(arrayOfWrongCharacters, e);

        /** Call this function to handle the wrong characters and show the result */
        checkWrongAnswers(arrayOfWrongCharacters);
    }
};

/**
 * Event handler for the hint button click event.
 * Disables the hint button, provides a hint to the user, and updates UI.
 */
function handleHintButtonClick() {
    /** Disable the hint button */
    hintButton.disabled = true;
    /** Set the hintButtonClicked flag to true */
    hintButtonClicked = true;

    /** Generate a random index within the range of arrayOfPossibleHints */
    const randomIdx = Math.floor(Math.random() * arrayOfPossibleHints.length);

    /** Retrieve a random character from arrayOfPossibleHints */
    const randomCharacter = arrayOfPossibleHints[randomIdx];

    /** Display a hint to the user using the silverBox function */
    silverBox({
        alertIcon: "info",
        title: `This word contains this character: "${randomCharacter}".`,
        centerContent: true,
    });
}

/**
 * Provide a hint to the user and update hint-related data.
 *
 * @param {string[]} characters - An array of characters in the word.
 * @param {string} pressedKey - The key pressed by the user.
 */
const giveHint = (characters, pressedKey) => {
    try {
        /** Check if the pressedKey is not already guessed */
        if (!arrayOfGuessedCharacters.includes(pressedKey)) {
            /** Add the pressedKey to the list of guessed characters */
            arrayOfGuessedCharacters.push(pressedKey);
        }

        /**
         * Update the arrayOfPossibleHints by filtering out characters
         * that have already been guessed.
         */
        arrayOfPossibleHints = characters.filter(
            (char) => !arrayOfGuessedCharacters.includes(char)
        );
    } catch (error) {
        console.error(error);
    }
};
