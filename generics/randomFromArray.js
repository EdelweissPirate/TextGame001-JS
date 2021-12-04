function randomFromArray(array){
    let randomNum = randomInteger(0, array.length - 1);
    return array[randomNum];
};