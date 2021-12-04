function boldString(str, substr) {
    //TODO - doesnt work
    let strRegExp = new RegExp(substr, 'g');
    return str//str.replace(strRegExp, '<b>'+substr+'</b>');
}