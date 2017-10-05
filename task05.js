let fs = require('fs');
if(!fs.existsSync(process.argv[2])){
    console.log("Неправильный путь");
    return;
}
fs.open(process.argv[2]+"\\summary.js", `w+`, 0644, (err, file_handle) => {
    if(!err){
        console.log("ОК");
    }
    else{
        console.log("Ошибка при открытии!");
    }
});