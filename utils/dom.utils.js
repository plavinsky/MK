export function createElementWithClass(cName, el='div') {
    const $div = document.createElement(el);
    cName && $div.classList.add(cName);

    return $div;
}

export function getEl(query) {
    return document.querySelector(query);
}



