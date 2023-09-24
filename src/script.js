import getRandomWord from "./utils/getRandomWord.js";
import setWrongCharacters from "./utils/setWrongCharacters.js";
import checkCorrectAnswer from "./utils/checkCorrectAnswer.js";
import Line from "./components/line.js";
import checkWrongAnswers from "./utils/checkWrongAnswers.js";

const arrayOfGuessedCharacters = [];
let arrayOfPossibleHints = [];
const MAXIMUM_LENGTH_OF_WORD = 7;
let arrayOfWrongCharacters = [];
let arrayOfCharacters = [];
const hintButton = document.querySelector("#hint-button");
let hintButtonClicked = false;

const setWord = async () => {
    try {
        hintButton.disabled = true;
        let word;

        do {
            const { word: fetchedWord } = await getRandomWord().catch((err) =>
                console.error(err)
            );

            word = fetchedWord;
        } while (word.length >= MAXIMUM_LENGTH_OF_WORD);

        const wordEl = document.querySelector("#word");

        wordEl.textContent = "";

        arrayOfCharacters = [...word];

        const lines = arrayOfCharacters.map((char) => Line(char.toLowerCase()));

        wordEl.append(...lines);

        window.addEventListener("keydown", handleKeyDown);
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    setWord();
}

hintButton.addEventListener("click", handleHintButtonClick);

const handleKeyDown = (e) => {
    if (!hintButtonClicked) {
        hintButton.disabled = false;
    }

    giveHint(arrayOfCharacters, e.key);

    if (arrayOfCharacters.includes(e.key)) {
        const allLineValues = document.querySelectorAll(".line-value");

        for (let i = 0; i < arrayOfCharacters.length; i++) {
            if (arrayOfCharacters[i] === e.key) {
                checkCorrectAnswer(arrayOfCharacters, e.key);

                allLineValues[i].classList.add("show");
            }
        }
    } else {
        setWrongCharacters(arrayOfWrongCharacters, e);
        checkWrongAnswers(arrayOfWrongCharacters);
    }
};

function handleHintButtonClick() {
    hintButton.disabled = true;
    hintButtonClicked = true;

    const randomIdx = Math.floor(Math.random() * arrayOfPossibleHints.length);

    const randomCharacter = arrayOfPossibleHints[randomIdx];

    silverBox({
        alertIcon: "info",
        title: `This word contains this character: "${randomCharacter}".`,
        centerContent: true,
    });
}

const giveHint = (characters, pressedKey) => {
    try {
        if (!arrayOfGuessedCharacters.includes(pressedKey)) {
            arrayOfGuessedCharacters.push(pressedKey);
        }

        arrayOfPossibleHints = characters.filter(
            (char) => !arrayOfGuessedCharacters.includes(char)
        );
    } catch (error) {
        console.error(error);
    }
};

export default giveHint;
