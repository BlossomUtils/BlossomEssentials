import * as mc from '@minecraft/server'
import { prismarineDb } from './lib/prismarinedb'
import customCommands from './apis/customCommands';
import homeAPI from './apis/homeAPI';
import { bapi } from './apis/blossom';


let developer = true;
function betterArgs(myString) {
    var myRegexp = /[^\s"]+|"([^"]*)"/gi;
    var myArray = [];

    do {
        var match = myRegexp.exec(myString);
        if (match != null) {
            myArray.push(match[1] ? match[1] : match[0]);
        }
    } while (match != null);

    return myArray;
}


mc.system.afterEvents.scriptEventReceive.subscribe((e) =>{
    if(developer == true) {
        console.log(`Event Received: ID=${e.id}, Message=${e.message}`);
    }
    if(e.id === "blossom:findFirst") {
        let args = betterArgs(e.message);
        let table = prismarineDb.table(args[0])
        
        let data = JSON.stringify(table.findFirst(args.slice(1)))
        mc.world.getDimension("overworld").runCommandAsync(`scriptevent blossomfoundFromTable:${table} ✓${data}`)
    }
    if(e.id === "blossom:findDocuments") {
        let args = betterArgs(e.message);
        let table = prismarineDb.table(args[0])
        console.log(JSON.stringify(table.findDocuments()))
        
        let data = JSON.stringify(table.findDocuments())
        mc.world.getDimension("overworld")
  .runCommandAsync(`scriptevent blossomFoundDocumentsFrom:${args[0]} ✓${data}`)
  .then(() => console.log("Command executed successfully"))
  .catch((err) => console.error("Command execution error:", err));
    }
    if(e.id === "blossom:insertDoc") {
        let args = betterArgs(e.message)
        let table = prismarineDb.table(args[0])
        let data = args.slice(1).join(`"`).replaceAll('\\', '').replace(/""""/g, '""')

        console.log(data)

        table.insertDocument(JSON.parse(data))
        bapi.reload()
    }
    if (e.id === "blossom:overwriteData") {
        let args = betterArgs(e.message);
    
        let table = prismarineDb.table(args[0]);
        console.log("Arguments for overwrite:", args.slice(1));
    
        try {
            let data = JSON.parse(args.slice(1).join(`"`));
    
            console.log("Parsed Data:", data.id);
            
            // Overwrite the data in the table by ID
            table.overwriteDataByID(data.id, data.data);
            console.log("Data overwritten successfully");
            bapi.reload()
        } catch (err) {
            console.error("Error parsing JSON:", err);
        }
    }
    
    if(e.id === "blossom:deleteDocument") {
        let args = betterArgs(e.message)
        let table = prismarineDb.table(args[0])

        bapi.reload()
        table.deleteDocumentByID(args[1])
    }
})
