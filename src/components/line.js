const Line = (char) => {
    const lineElement = document.createElement("div");
    lineElement.className = "line";

    const lineValue = document.createElement("span");
    lineValue.textContent = char;
    lineValue.classList.add("line-value")

    lineElement.appendChild(lineValue);
    return lineElement;
};

export default Line;
