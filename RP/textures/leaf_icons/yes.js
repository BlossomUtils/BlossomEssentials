// Leaf icon pack generator. Made for node.js
const fs = require('fs');
let data = [];
fs.readdir('./', (err, files)=>{
    for(const file of files) {
        if(!file.endsWith('.png')) continue;
        let extensionRemoved = file.slice(0,-4);
        data.push([extensionRemoved, `textures/leaf_icons/${extensionRemoved}`])
        let code = `let leafIconPack = new Map([
    ["pack_name", "Leaf"],
    ["pack_icon", "textures/items/diamond_sword"],
    ["pack_namespace", "leaf"],
    ["pack_data", new Map(${JSON.stringify(data, null, 2)})]
]);
export { leafIconPack }`;
        fs.writeFileSync('code.js', code);
    }
})