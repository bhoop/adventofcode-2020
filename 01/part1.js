const { getInput } = require( '../common' );

let input = getInput(true);

input.sort( (a, b) => a - b );

let result = find(input);

console.log( result );

function find(arr) {
    let z = arr.length;
    for ( let i = 0; i < z; i++ ) {
        let a = arr[i];
        for ( let j = i + 1; j < z; j++ ) {
            let b = arr[ j ];
            let sum = a + b;
            if ( sum === 2020 ) return a * b;
            if ( sum > 2020 ) break;
        }
    }
    
}