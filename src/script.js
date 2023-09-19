import getRandomWord from "./utils/getRandomWord.js";
import Line from "./components/line.js";
import setWrongCharacters from "./utils/setWrongCharacters.js";

// Maximum length required for the word
const MAXIMUM_LENGTH_OF_WORD = 7;

// Array to store the characters of the word
let arrayOfCharacters = [];

// Array to store wrong characters
const arrayOfWrongCharacters = [];

// Asynchronous function to set the word
const setWord = async () => {
    try {
        // Fetching a random word and extracting the 'word' property from the resolved value
        const { word } = await getRandomWord().catch((err) =>
            console.error(err)
        );

        // Checking if the word length is less than the maximum length required
        if (word.length < MAXIMUM_LENGTH_OF_WORD) {
            // Selecting the HTML element with the id "word"
            const wordEl = document.querySelector("#word");
            // Clearing the content of the word element
            wordEl.textContent = "";

            // Storing the characters of the word in the arrayOfCharacters array
            arrayOfCharacters = [...word];

            // Looping through each character in the arrayOfCharacters array
            arrayOfCharacters.forEach((char) => {
                // Adding a keydown event listener to the window object
                window.addEventListener("keydown", (e) => {
                    // Checking if the pressed key is included in the arrayOfCharacters
                    if (arrayOfCharacters.includes(e.key)) {
                        // Selecting all DOM elements with the class name "line-value"
                        const allLineValues =
                            document.querySelectorAll(".line-value");
                        // Looping through the arrayOfCharacters
                        for (let i = 0; i < arrayOfCharacters.length; i++) {
                            // Checking if the current element in the arrayOfCharacters at index i is equal to the pressed key
                            if (arrayOfCharacters[i] === e.key) {
                                // Adding the "show" class to the corresponding element at index i in allLineValues
                                allLineValues[i].classList.add("show");
                            }
                        }
                    } else {
                        // Calling the setWrongCharacters function with the arrayOfWrongCharacters array and the pressed key
                        setWrongCharacters(arrayOfWrongCharacters, e);
                    }
                });
                // Appending a Line component with the current character to the wordEl
                wordEl.append(Line(char));
            });
        } else {
            // If the word length is greater than or equal to the minimum length, recursively call the setWord function
            setWord();
        }
    } catch (error) {
        console.error(error);
    }
};

// Event listener to initialize the game when the DOM content is loaded
document.addEventListener("DOMContentLoaded", init);

function init() {
    // Calling the setWord function to start the game
    setWord();
}