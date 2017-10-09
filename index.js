
let result_str = process.argv.reduce((previousValue, currentValue, index)=>{
    return index > 1 ? (previousValue += `${currentValue}, `) : previousValue;
}, "Hi param: ");

console.log(result_str);