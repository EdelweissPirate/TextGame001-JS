function weightedRandom(lower, upper, numDice) {
    let num = lower;
    for (let i = 0; i < numDice; i++) {
        num += Math.random() * (upper/numDice);
    };
    return num;
}