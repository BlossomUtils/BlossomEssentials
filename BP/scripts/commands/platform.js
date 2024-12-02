import commandManager from "../lib/commands/commandManager";
import platformAPI from "../apis/platformAPI";
import playerAPI from "../apis/playerAPI";

commandManager.addCommand("platform", { description: "Get someone's platform!" }, ({ msg, args }) => {
    if(!args[0]) return msg.sender.error("Message must have arguments.");
    let verified = playerAPI.verify(args.join(" "))
    if(!verified) return msg.sender.error("That isn't an online player!");
    let platform = platformAPI.checkPlatform(verified).toLowerCase();

    if(!msg.sender.hasTag('admin')) return msg.sender.error("You are not admin!");

    msg.sender.info(`${verified.name}'s platform is ${platform}`)
})