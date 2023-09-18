const getRandomWord = async () => {
    const data = await fetch("https://random-word-api.herokuapp.com/word?length=5");
    const jsonData = await data.json();
    return jsonData;
};

export default getRandomWord;
