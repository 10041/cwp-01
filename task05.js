let fs = require('fs');
let path = require(`path`);
if(!fs.existsSync(process.argv[2])){
    console.log("Неправильный путь");
    return;
}
if (!fs.existsSync("./config.json")) {
	console.log("Конфига нет!");
	return;
}
let copyrightStr = JSON.parse(fs.readFileSync("./config.json")).copyright;

let scriptStr = "let fs = require(`fs`);\n\
let path = require(`path`);\n\
const ListPath = (inputPath, folder, copyrightParam) => {\n\
    fs.readdir(inputPath, (err, files)=>{\n\
        files.forEach(function(file) {\n\
            if(file != 'Summary'){\n\
                let filePath = `${inputPath}\\\\${file}`;\n\
                fs.stat(filePath, (err, stats)=>{\n\
                    if(stats.isDirectory()){\n\
                        folder == '' ? ListPath(filePath, file, copyrightParam) : ListPath(filePath, `${folder}/${file}`, copyrightParam);\n\
                    }\n\
                    else\n\
                    {\n\
                        if(path.extname(`${folder}\\${file}`) === '.txt')\n\
                        {\n\
                            let newFile = `${summaryPath}\\\\${file}`;\n\
                            fs.writeFileSync(newFile, '');\n\
                            fs.appendFile(newFile, `${copyrightParam}`, (err)=>{\n\
                                if(!err){\n\
                                    fs.readFile(filePath, (err, data) => {\n\
                                        if(!err){\n\
                                            fs.appendFile(newFile, data, (err)=>{\n\
                                                if(!err){\n\
                                                    fs.appendFile(newFile, `${copyrightParam}`, (err) =>{\n\
                                                        if(err){\n\
                                                            console.log('Ошибка записи в файл');\n\
                                                            return;\n\
                                                        }\n\
                                                    })\n\
                                                }\n\
                                            })\n\
                                        }\n\
                                        else{\n\
                                            console.log('Ошибка чтения файла');\n\
                                            return;\n\
                                        }\n\
                                    })\n\
                                }\n\
                                else{\n\
                                    console.log('Ошибка записи в файл');\n\
                                    return;\n\
                                }\n\
                            })\n\
                        }\n\
                    }\n\
                    folder == '' ? console.log(file) : console.log(`${folder}/${file}`);\n\
                })\n\
            }\n\
        }, this);\n\
    })\n\
}\n\
let summaryPath = '"+process.argv[2]+"\\\\Summary';\n\
if(!fs.existsSync(summaryPath))\n\
{\n\
    fs.mkdirSync(summaryPath)\n\
}\n\
\n\
ListPath('"+process.argv[2]+"', '', '"+copyrightStr+"');\n\
setTimeout(()=>{\n\
    fs.watch(summaryPath, (eventType, filename) =>{\n\
        console.log(`${new Date()} ${eventType} - ${filename}`)\n\
    })\n\
}, 1000);"

fs.writeFileSync("summary.js", scriptStr);
