


function factorielle (value){
    let n = 1;
    for (let i = 1; i < value+1; i++){
        n = n * i;
    }
    return n;
}

function factorielleOK (value){
    if (value === 0){
        return 1;
    }else {
        return value * factorielleOK(value-1)
    }
}

console.log(factorielle(6))
console.log(factorielleOK(6))



function fibonacci (value){
    if (value === 0){
        return 0;
    }else if (value === 1){
       return 1;
    } else {
        return fibonacci(value-1) + fibonacci(value-2);
    }
}

console.log(fibonacci(6))



function syracuse (valueN, valueI){
    if (valueI === 0){
        return valueN;
    }else if(syracuse(valueN, valueI-1) % 2 === 0){
        return syracuse(valueN, valueI-1)/2;
    }else if (syracuse(valueN, valueI-1) % 2 !== 0){
        return syracuse(valueN, valueI-1)*3+1;
    }
}

console.log(syracuse(15,13))


function pgcd(valueA, valueB){
    if (valueB === 0){
        return valueA;
    } else {
        r = valueA % valueB
        return pgcd(valueB, r)
    }
}

console.log(pgcd(0,30))