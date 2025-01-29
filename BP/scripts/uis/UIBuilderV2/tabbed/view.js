import tabManager from '../../../apis/tabbedUI'
import tabbedUIBuilder from '../../../apis/tabbedUIBuilder'
import { TabUI } from '../../../lib/tabbedUI'
import uiManager from '../../../uiManager'
import UIBuilderV2 from '../../../apis/UIBuilderV2'
import config from '../../../apis/config'
import { ActionForm, ModalForm as ModalFormData } from '../../../lib/form_func'


uiManager.addUI(config.uiNames.UIBuilderV2.Tabbed.View, 'yes', (player, id) => {
    let form = new ActionForm()
    form.title('Edit tab ui')
    form.button('Edit Tabs', null, (player) => {
        let tabbedui = tabManager.getOrCreate('+BLSM:uibuilderv2_view_tabbed')
        let tui = tabbedUIBuilder.db.findFirst({id})
        if(tui.data.tabs.length) {
            for (const tab of tui.data.tabs) {
                let ui = UIBuilderV2.getUIbyID(tab.ui)
                tabbedui.registerTab(tab.title, (player) => {
                    let buttons = [
                        {text: 'Delete Tab', iconPath: 'textures/azalea_icons/Delete', callback(player) {
                            tabbedUIBuilder.delTab(tui.id, ui.id)
                            uiManager.open(player, config.uiNames.UIBuilderV2.Tabbed.View, id)
                        }},
                        {text: 'Create Tab', iconPath: 'textures/azalea_icons/1.png', callback(player) {
                            let form2 = new ModalFormData();
                            let uis = UIBuilderV2.getUIs()
                            let uis2 = uis.filter(_=>{
                                return _.data && _.data.name && _.data.scriptevent
                            }).map(_=>{
                                return {
                                    id: _.id,
                                    title: _.data.name,
                                    scriptevent: _.data.scriptevent
                                }
                            })
                            form2.title(`Create tab`)
                            form2.dropdown("UI", uis2.map(_=>{
                                return {
                                    option: _.title,
                                    callback() {}
                                }
                            }), 0, (player)=>{
                    
                            });
                            form2.textField('Title', 'Tab title', undefined)
                            form2.show(player).then((res) => {
                                let [ uiindex, title ] = res.formValues;
                                if(!title) return tabbedui.open(player, 0, 0);
                                let ui2 = uis[uiindex];
                                if(!ui2) return tabbedui.open(player,0,0);
                                tabbedUIBuilder.addTab(tui.id, ui2.id, title)
                                uiManager.open(player, config.uiNames.UIBuilderV2.Tabbed.View, id)
                            })
                        }}
                    ];
                    return {
                        buttons,
                        body: `UI: ${ui.data.name}`
                    }
                })
            }
            
        } else {
            tabbedui.registerTab('No Tabs', (player) => {
                let buttons = [
                    {text: 'Create Tab', iconPath: 'textures/azalea_icons/1.png', callback(player) {
                        let form2 = new ModalFormData();
                        let uis = UIBuilderV2.getUIs()
                        let uis2 = uis.filter(_=>{
                            return _.data && _.data.name && _.data.scriptevent
                        }).map(_=>{
                            return {
                                id: _.id,
                                title: _.data.name,
                                scriptevent: _.data.scriptevent
                            }
                        })
                        form2.title(`Create tab`)
                        form2.dropdown("UI", uis2.map(_=>{
                            return {
                                option: _.title,
                                callback() {}
                            }
                        }), 0, (player)=>{
                
                        });
                        form2.textField('Title', 'Tab title', undefined)
                        form2.show(player).then((res) => {
                            let [ uiindex, title ] = res.formValues;
                            if(!title) return tabbedui.open(player, 0, 0);
                            let ui2 = uis[uiindex];
                            if(!ui2) return tabbedui.open(player,0,0);
                            tabbedUIBuilder.addTab(tui.id, ui2.id, title)
                            uiManager.open(player, config.uiNames.UIBuilderV2.Tabbed.View, id)
                        })
                    }}
                ]
                return {
                    buttons
                }
            })
        }
        tabbedui.open(player, 0, 0)
        tabManager.delete('+BLSM:uibuilderv2_view_tabbed')
    })
    form.button('Delete UI', null, (player) => {
        tabbedUIBuilder.db.deleteDocumentByID(tabbedUIBuilder.db.findFirst({id}).id)
        uiManager.open(player, config.uiNames.UIBuilderV2.Root)
    })
    form.show(player)
})
