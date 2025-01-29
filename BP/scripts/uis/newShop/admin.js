import { ActionForm, prismarineDb } from "../../lib/prismarinedb";
import config from "../../apis/config";
import uiManager from "../../uiManager";
import shop from "../../apis/shop";
import { ModalForm } from "../../lib/form_func";

uiManager.addUI(config.uiNames.NewShop.Admin, 'new shop admin', (player)=> {
    let form = new ActionForm()
    form.title('Shop Admin')
    
    form.button(`§cBack\n§7Go to previous UI`, "textures/azalea_icons/2.png", (player)=>{
        uiManager.open(player, config.uiNames.NewShop.Root)
    })
    form.button(`§aCreate Category\n§7Create a category`, 'textures/azalea_icons/1.png', (player)=>{
        let form2 = new ModalForm();
        form2.title('Create Category')
        form2.textField(`Name`, 'Name here..', null)
        form2.dropdown("Currency", prismarineDb.economy.getCurrencies().map(_=>{
            return {option:`${_.displayName}`,callback(){}}
        }))
        form2.textField('Description', 'Description here..', null)
        form2.show(player, false, (player,res)=>{
            let [name,i,description] = res.formValues
            if(!name || !description) return player.error('Please enter all fields');
            let currency = prismarineDb.economy.getCurrencies()[i]
            let cat = shop.addCategory(name,currency.scoreboard,description,null)
            if(!cat) return player.error('Something went wrong')
            uiManager.open(player, config.uiNames.NewShop.Admin)
        })
    })
    for (const cat of shop.db.findDocuments({type:'Category'})) {
        form.button(`${cat.data.name}\n§7${cat.data.description ? cat.data.description : ''}`, cat.data.icon ? cat.data.icon : null, (player)=>{
            uiManager.open(player, config.uiNames.NewShop.EditCategory, cat.id)
        })
    }
    form.show(player)
})