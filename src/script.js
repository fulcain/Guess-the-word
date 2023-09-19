import getRandomWord from "./utils/getRandomWord.js";
import Line from "./components/line.js";
import setWrongCharacters from "./utils/setWrongCharacters.js";

// Declaring an empty array variable to store characters
let arrayOfCharacters = [];

// Declaring an empty array constant to store wrong characters
const arrayOfWrongCharacters = [];

// Declaring an asynchronous function named setWord
const setWord = async () => {
    // Waiting for the getRandomWord promise to resolve and extracting the 'word' property from the resolved value
    await getRandomWord().then(({ word }) => (arrayOfCharacters = [...word]));

    // Selecting an HTML element with the id "word" and assigning it to the wordEl constant
    const wordEl = document.querySelector("#word");

    // Set to empty after we got the data from API
    wordEl.innerHTML = "";

    // Looping through each character in the arrayOfCharacters array
    arrayOfCharacters.forEach((char) => {
        // Adding a keydown event listener to the window object
        window.addEventListener("keydown", (e) => {
            // Checking if the pressed key is included in the arrayOfCharacters
            if (arrayOfCharacters.includes(e.key)) {
                // Selecting all DOM elements with the class name "line-value" and assigning them to the allLineValues constant
                const allLineValues = document.querySelectorAll(".line-value");
                // Looping through the arrayOfCharacters
                for (let i = 0; i < arrayOfCharacters.length; i++) {
                    // Checking if the current element in the arrayOfCharacters at index i is equal to the pressed key
                    if (arrayOfCharacters[i] === e.key) {
                        // Adding the "show" class to the corresponding element at index i in allLineValues
                        allLineValues[i].classList.add("show");
                    }
                }
            } else setWrongCharacters(arrayOfWrongCharacters);
        });

        // Appending a Line component with the current character to the wordEl
        wordEl.append(Line(char));
    });
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    setWord();
}
