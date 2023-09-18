const LENGTH_OF_EACH_WORD = 5;
const getRandomWord = async () => {
    const data = await fetch(
        `https://random-word-api.herokuapp.com/word?length=${LENGTH_OF_EACH_WORD}`
    );
    const jsonData = await data.json();
    return jsonData;
};

export default getRandomWord;
