let result_str = process.argv.reduce((outRes, value, index)=>{
    return index > 1 ? (outRes += `${value}, `) : outRes;
}, "");

console.log(`Hi param: ${result_str}`);