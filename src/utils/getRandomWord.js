const API_KEY = "DpGAZpExXXLbSQntnCgHMQ==oUJaj3lBmPqZHyPS";
const getRandomWord = async () => {
    const data = await fetch("https://api.api-ninjas.com/v1/randomword?type=adverb", {
        headers: { "X-Api-Key": API_KEY },
    });
    const jsonData = await data.json();
    return jsonData;
};

export default getRandomWord;
