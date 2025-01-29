const fs = require('fs');
let list = [];
fs.readdir('./', {}, (err, files)=>{
    console.log(files)
    for(const file of files) {
        if(!file.endsWith('.png')) continue;
        list.push([`${file.slice(0,-4)}`, `textures/azalea_icons/icontextures/${file.slice(0,-4)}`])
    }
    fs.writeFileSync('./icons.json', JSON.stringify(list, null, 2))
})