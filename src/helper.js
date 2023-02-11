
const displayAdder = (function() {
    const createDiv = (parentElement, textContent='', divId='', divClass='') => {
        return _createElement(parentElement, 'div', textContent, divId, divClass);
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

    const createForm = (parentElement, textContent='', formId='', formClass='') => {
        return _createElement(parentElement, 'form', textContent, formId, formClass);
    }

    const createInput = (parentElement, inputType, inputName, textContent='', inputId='', inputClass='') => {
        const newInput = _createElement(parentElement, 'input', textContent, inputId, inputClass);
        newInput.type = inputType;
        newInput.name = inputName;
        return newInput;
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

    return {createDiv, createImage, createButton, createForm, createInput};
})();

export default displayAdder;