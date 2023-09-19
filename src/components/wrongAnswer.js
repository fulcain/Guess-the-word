const wrongAnswer = (character) => {
    const wrongAnswer = document.createElement('div');
    wrongAnswer.textContent = character;
    wrongAnswer.className = "wrong-character"

    return wrongAnswer;
};

export default wrongAnswer;