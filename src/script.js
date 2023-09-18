import getRandomWord from "./utils/getRandomWord.js";
import Line from "./utils/components/line.js";
let arrayOfCharacters = [];
const arrayOfWrongCharacters = [];

const setWord = async () => {
    await getRandomWord().then((res) => (arrayOfCharacters = [...res[0]]));

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
            } else {
                const wrongChars = document.querySelector("#wrong-characters");

                if (!arrayOfWrongCharacters.includes(e.key)) {
                    arrayOfWrongCharacters.push(e.key);
                    wrongChars.textContent += e.key + " ";
                }
            }
        });

        wordEl.append(Line(char));
    });
};

setWord();