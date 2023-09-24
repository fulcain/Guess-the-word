/** Import wrongAnswer component from component folder */
import wrongAnswer from "../components/wrongAnswer.js";

/** Array of alphabet characters */
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Sets the wrong characters and updates the UI.
 *
 * @param {string[]} arrayOfWrongCharacters - An array of incorrect characters.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
const setWrongCharacters = (arrayOfWrongCharacters, event) => {
    /**  Selecting the HTML element with the id "wrong-characters" and assigning it to the wrongChars constant */
    const wrongChars = document.querySelector("#wrong-characters");

    const lowerCasedKey = event.key.toLowerCase();

    /**  Checking if the pressed key is not already included in the arrayOfWrongCharacters */
    if (
        alphabet.includes(lowerCasedKey) &&
        !arrayOfWrongCharacters.includes(lowerCasedKey)
    ) {
        /**  Adding the pressed key to the arrayOfWrongCharacters */
        arrayOfWrongCharacters.push(lowerCasedKey);
        /**  Appending the pressed key using wrongAnswer component */
        wrongChars.append(wrongAnswer(lowerCasedKey));
    }
};

export default setWrongCharacters;
