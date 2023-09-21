/**
 * Checks if correctVariable is greater than or equal to the length of arrayOfCharacters.
 *
 * @param {number} correctVariable - The value that needs to be checked.
 * @param {Array} arrayOfCharacters - An array of characters whose length will be compared to correctVariable.
 * @returns {boolean} true
 */
let correctCharacterAnswers = 0;
let arrayOfGuessedCorrectCharacters = [];

const checkCorrectAnswer = (arrayOfCharacters, correctKey) => {
    /**  If correctKey is not already included in arrayOfGuessedCorrectCharacters */
    if (!arrayOfGuessedCorrectCharacters.includes(correctKey)) {
        correctCharacterAnswers++;
        arrayOfGuessedCorrectCharacters.push(correctKey);
    }

    /** If correctCharacterAnswers is greater than or equal to the length of arrayOfCharacters */
    if (correctCharacterAnswers >= arrayOfCharacters.length) {
        alert("You won");

        /** Reload the page */
        location.reload();
    }

    return true;
};

export default checkCorrectAnswer;