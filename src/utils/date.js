const date = new Date();

export const currentDate = () => {
    return date.toLocaleDateString().replace(/\//g, "-");
}

export const currentTime = () => {
    return date.toLocaleTimeString();
}

export const currentDateTime = () => {
    return currentDate()+' '+currentTime();
}