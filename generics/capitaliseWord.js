function capitaliseWord(passedString){
    let twoWords = false;
    let mixedRace = false;
    let location = false;

    let str = passedString.split('');

    for(let i = 0; i <= str.length - 1; i++){
        let char = str[i];
        if(char == '_'){
            twoWords = true;
        };
        if(char == ':'){
            twoWords = false;
            mixedRace = true;
            break;
        };
        if(char == ','){
            twoWords = false;
            mixedRace = false;
            location = true;
            break;
        };
    };

    if(twoWords){

        str = passedString.split('_');
        let wordOne = str[0];
        let wordTwo = str[1];
        
        let lowerOne = wordOne//.toLowerCase();
        let firstOne = wordOne.charAt(0);
        let upperOne = firstOne.toUpperCase();

        let lowerTwo = wordTwo//.toLowerCase();
        let firstTwo = wordTwo.charAt(0);
        let upperTwo = firstTwo.toUpperCase();

        if(str.length == 3){
            let wordThree = str[2];
            let lowerThree = wordThree//.toLowerCase();
            let firstThree = wordThree.charAt(0);
            let upperThree = firstThree.toUpperCase();

            wordOne = upperOne + lowerOne.slice(1);
            wordTwo = upperTwo + lowerTwo.slice(1);
            wordThree = upperThree + lowerThree.slice(1);
            
            return wordOne + ' ' + wordTwo + ' ' + wordThree
        } else {
            wordOne = upperOne + lowerOne.slice(1);
            wordTwo = upperTwo + lowerTwo.slice(1);
            
            return wordOne + ' ' + wordTwo
        };

    } else if(mixedRace){
        str = passedString.split(':');
        let strA = str[0].split('_');
        let strB = str[1].split('_');

        let wordOneA = strA[0];
        let wordOneB = strA[1];
        
        let lowerOne = wordOneA.toLowerCase();
        let firstOne = wordOneA.charAt(0);
        let upperOne = firstOne.toUpperCase();

        let wordOne = upperOne + lowerOne.slice(1);
        let wordTwo;

        if(wordOneB != undefined){
            let lowerTwo = wordOneB.toLowerCase();
            let firstTwo = wordOneB.charAt(0);
            let upperTwo = firstTwo.toUpperCase();

            wordTwo = upperTwo + lowerTwo.slice(1);
        } else {
            wordTwo = '';
        };

        let wordTwoA = strB[0];
        
        let lowerThree = wordTwoA.toLowerCase();
        let firstThree = wordTwoA.charAt(0);
        let upperThree = firstThree.toUpperCase();

        let wordThree = upperThree + lowerThree.slice(1);

        if(strB[1]){
            let wordTwoB = strB[1];

            let lowerFour = wordTwoB.toLowerCase();
            let firstFour = wordTwoB.charAt(0);
            let upperFour = firstFour.toUpperCase();

            let wordFour = upperFour + lowerFour.slice(1);

            if(wordTwo != ''){
                return wordOne + ' ' + wordTwo + ':' + wordThree + ' ' + wordFour
            } else {
                return wordOne + ':' + wordThree + ' ' + wordFour
            };
        } else {
            if(wordTwo != ''){
                return wordOne + ' ' + wordTwo + ':' + wordThree
            } else {
                return wordOne + ':' + wordThree
            };
        };

    } else if(location){

        str = passedString.split(', ');
        
        let wordTwo = str[1];

        let lower = wordTwo//.toLowerCase();
        let first = wordTwo.charAt(0);
        let upper = first.toUpperCase();

        return str[0] + ', ' + upper + lower.slice(1);

    } else {

        let lower = passedString//.toLowerCase();
        let first = passedString.charAt(0);
        let upper = first.toUpperCase();

        return upper + lower.slice(1);

    };
};