
const displayAdder = (function() {
    const createDiv = (parentElement, textContent='', divId='', divClass='') => {
        const newDiv = document.createElement('div');
        newDiv.textContent = textContent;
        if (divClass) {
            const divClassList = divClass.split(',');
            divClassList.forEach(element => {
                newDiv.classList.add(element);
            });
        }
        newDiv.id = divId;
        parentElement.appendChild(newDiv)
        return newDiv;
    }

    const createImage = (parentElement, imageSource, imageId='', imageClass='') => {
        var newImage = new Image();
        newImage.src = imageSource;
        if (imageClass) {
            const imageClassList = imageClass.split(',');
            imageClassList.forEach(element => {
                newImage.classList.add(element);
            });
        }
        newImage.id = imageId;
        parentElement.appendChild(newImage);
        return createImage;
    }

    return {createDiv, createImage};
})();

export default displayAdder;