function capitalize(value) {
    let val = new String(value);
    let firstLetter = val.charAt(0).toUpperCase();
    return firstLetter+val.slice(1)
}

function formPrix(prix) {
    return new Intl.NumberFormat().format(prix);
}


export {
    capitalize,
    formPrix
}