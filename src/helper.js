
const displayAdder = (function() {
    const createDiv = (parentElement, textContent='', divId='', divClass='') => {
        const newDiv = _createElement(parentElement, 'div', textContent, divId, divClass)
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
        const newButton = _createElement(parentElement, 'button', textContent, buttonId, buttonClass);
        newButton.onclick = onclickFunction;
        return newButton;
    }

    const _createElement = (parentElement, elementType, textContent='', elementId='', elementClass='') => {
        const newElement = document.createElement(elementType);
        _addClasses(newElement, elementClass);
        newElement.id = elementId;
        newElement.textContent = textContent;
        parentElement.appendChild(newElement)
        return newElement;
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