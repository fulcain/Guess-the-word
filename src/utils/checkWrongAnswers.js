/**
 * Checks the number of wrong characters in an array and performs actions based on the count.
 *
 * @param {Array} arrayOfWrongCharacters - An array containing the wrong characters.
 */
const checkWrongAnswers = (arrayOfWrongCharacters) => {
    /** If the length of the arrayOfWrongCharacters is greater than or equal to 10 */
    if (arrayOfWrongCharacters.length >= 10) {
        /** Display an alert message indicating loss */
        alert("You Lost!");

        /**  Reload the page using the location.reload() method*/
        location.reload();
    }
};

export default checkWrongAnswers;
