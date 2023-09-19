import getRandomWord from "./utils/getRandomWord.js";
import Line from "./utils/components/line.js";
import setWrongCharacters from "./utils/setWrongCharacters.js";
let arrayOfCharacters = [];
const arrayOfWrongCharacters = [];

const setWord = async () => {
    await getRandomWord().then(({ word }) => (arrayOfCharacters = [...word]));

    const wordEl = document.querySelector("#word");

    arrayOfCharacters.forEach((char) => {
        window.addEventListener("keydown", (e) => {
            if (arrayOfCharacters.includes(e.key)) {
                const allLineValues = document.querySelectorAll(".line-value");

                for (let i = 0; i < arrayOfCharacters.length; i++) {
                    if (arrayOfCharacters[i] === e.key) {
                        allLineValues[i].classList.add("show");
                    }
                }
            } else setWrongCharacters(arrayOfWrongCharacters);
        });

        wordEl.append(Line(char));
    });
};

setWord();
