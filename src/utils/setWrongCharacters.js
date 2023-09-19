const setWrongCharacters = (arrayOfWrongCharacters,event) => {
    // Selecting the HTML element with the id "wrong-characters" and assigning it to the wrongChars constant
    const wrongChars = document.querySelector("#wrong-characters");
    // Checking if the pressed key is not already included in the arrayOfWrongCharacters
    if (!arrayOfWrongCharacters.includes(event.key)) {
        // Adding the pressed key to the arrayOfWrongCharacters
        arrayOfWrongCharacters.push(event.key);
        // Appending the pressed key followed by a space to the text content of wrongChars
        wrongChars.textContent += event.key + " ";
    }
};

export default setWrongCharacters;