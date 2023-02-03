
const displayAdder = (function() {
    const createDiv = (parentElement, textContent='', divId='', divClass='') => {
        const newDiv = document.createElement('div');
        newDiv.textContent = textContent;
        _addClasses(newDiv, divClass);
        newDiv.id = divId;
        parentElement.appendChild(newDiv)
        return newDiv;
    }

    const createImage = (parentElement, imageSource, imageId='', imageClass='') => {
        var newImage = new Image();
        newImage.src = imageSource;
        _addClasses(newImage, imageClass);
        newImage.id = imageId;
        parentElement.appendChild(newImage);
        return createImage;
    }

    const createButton = (parentElement, onclickFunction, textContent='', buttonId = '', buttonClass='') => {
        const newButton = document.createElement('button');
        newButton.textContent = textContent;
        _addClasses(newButton, buttonClass);
        newButton.id = buttonId;
        newButton.onclick = onclickFunction;
        parentElement.appendChild(newButton);
        return newButton;
    }

    const _addClasses = (element, classes) => {
        if (classes) {
            const classList = classes.split(',');
            classList.forEach(oneClass => {
                element.classList.add(oneClass);
            });
        }
    }

    return {createDiv, createImage, createButton};
})();

export default displayAdder;