function randomFromRange(lower, upper){
    let output = min(max(lower, Math.random() * upper), upper);
    return roundTo(output, 2);
};