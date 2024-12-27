import shopAPI from "../../api/shopAPI";
import { ModalFormData } from "@minecraft/server-ui";
import uiManager from "../../uiManager";
import * as mc from "@minecraft/server";
import config from "../../apis/config";
import { prismarineDb } from "../../lib/prismarinedb";

uiManager.addUI(config.uiNames.Shop.editCurrency, "Edit an item", (player) => {
    // Get all currencies
    const currencies = prismarineDb.economy.getCurrencies();
    const currentCurrency = mc.world.getDynamicProperty("simple:money");
    
    // Find the index of the current currency
    let index = currencies.findIndex(currency => currency.scoreboard === currentCurrency);
    if (index === -1) index = 0; // Fallback to the first option if not found

    // Create the ModalFormData
    let modalForm = new ModalFormData()
        .title("Edit Currency")
        .dropdown("Currency", currencies.map(currency => currency.displayName), index)
        .submitButton("Send");

    modalForm.show(player).then(res => {
        if (res.canceled) {
            return uiManager.open(player, config.uiNames.Shop.Root); // Return to the shop root UI
        }

        // Get selected currency
        const selectedCurrency = currencies[res.formValues[0]];

        // Validate selection
        if (!selectedCurrency || !selectedCurrency.scoreboard) {
            return player.error("You need to select a valid currency.");
        }

        try {
            // Update the dynamic property
            mc.world.setDynamicProperty("simple:money", selectedCurrency.scoreboard);
            shopAPI.updateMoneyObjective(); // Update the money objective
            player.success("Currency updated successfully!"); // Success feedback
        } catch (err) {
            player.error(`Failed to update currency: ${err.message}`); // Error feedback
        }
    });
});
