/**
 * Checks the number of wrong characters in an array and performs actions based on the count.
 *
 * @param {Array} arrayOfWrongCharacters - An array containing the wrong characters.
 */
const checkWrongAnswers = (arrayOfWrongCharacters) => {
    /** If the length of the arrayOfWrongCharacters is greater than or equal to 10 */
    if (arrayOfWrongCharacters.length >= 10) {
        silverBox({
            timer: 1500,
            theme: "dark",
            alertIcon: "error",
            title: "You Lost!",
            centerContent: true,
            showCloseButton: true,
            /** Reload the page */
            onClose: () => {
                location.reload();
            },
        });
    }
};

export default checkWrongAnswers;
