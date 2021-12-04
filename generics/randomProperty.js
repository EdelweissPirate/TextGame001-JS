function randomProperty (obj){
    let keys = Object.keys(obj);
    let val = obj[keys[ keys.length * Math.random() << 0]]
    return val
};