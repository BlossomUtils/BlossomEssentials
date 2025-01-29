import { world } from '@minecraft/server';
import { prismarineDb } from '../lib/prismarinedb'
import playerStorage from './playerStorage';

class clanAPI {
    constructor() {
        this.db = prismarineDb.table('clans')
        this.inviteDb = prismarineDb.table('clans_inviteDb')
        this.migrate()
    }
    migrate() {
        for (const doc of this.db.findDocuments()) {
            if(!doc.data.base.dimension) {
                doc.data.base = {loc: doc.data.base.loc, dimension: 'minecraft:overworld'}
                this.db.overwriteDataByID(doc.id, doc.data)
            }
            if(!typeof doc.data.base === 'object') {
                doc.data.base = {loc: doc.data.base, dimension: 'minecraft:overworld'}
                this.db.overwriteDataByID(doc.id, doc.data)
            }
        }
    }
    getClanByID(id) {
        let clan = this.db.getByID(id)
        return clan;
    }
    getClanbyPlayer(player) {
        let clans = this.db.findDocuments()
        for (const clan of clans) {
            for (const plr of clan.data.players) {
                if (plr.id === playerStorage.getID(player)) {
                    return clan;
                }
            }
        }
    }
    kickPlayerFromClan(id, clanID) {
        let clan = this.getClanByID(clanID)
        const playerIndex = clan.data.players.findIndex(plr => plr.id === id);
        for (const plr of clan.data.players) {
            if (plr.id === id) {
                clan.data.players.splice(playerIndex, 1)
                this.db.overwriteDataByID(clan.id, clan.data)
            }
        }
    }
    joinPlayertoClan(player, clanID) {
        let clan = this.getClanByID(clanID)
        clan.data.players.push({ permission: "Member", id: playerStorage.getID(player), name: player.name, joinDate: new Date() })
        this.db.overwriteDataByID(clan.id, clan.data)
    }
    getClanbyName(name) {
        let clan = this.db.findFirst({ name })
        if(!clan) return false;
        return clan;
    }
    createClan(name, owner) {
        let clan = this.db.findFirst({ name })
        if (clan) throw new Error("Could not create clan because clan name already exists");

        this.db.insertDocument({
            name,
            owner: playerStorage.getID(owner),
            players: [{ permission: "Owner", id: playerStorage.getID(owner), name: owner.name, joinDate: Date.now() }],
            settings: [],
            base: "no base lol"
        })
        return true;
    }
    deleteClan(id) {
        let clan = this.getClanByID(id);
        if (!clan) throw new Error("Clan does not exist");
        this.db.deleteDocumentByID(clan.id)
    }
    inviteToClan(player, executingPlayer) {
        if (this.inviteDb.findFirst({ toPlayer: playerStorage.getID(player), fromPlayer: playerStorage.getID(executingPlayer) })) throw new Error("Player tried to double invite another player");
        let clan = this.db.findFirst({ owner: playerStorage.getID(executingPlayer) })
        if (!clan) throw new Error("Player does not have permission to invite players!")
        this.inviteDb.insertDocument({
            toPlayer: playerStorage.getID(player),
            fromPlayer: playerStorage.getID(executingPlayer),
            clan: clan.id
        })
        return true;
    }
    setClanBase(clanID, loc, dimension) {
        let clan = this.getClanByID(clanID)
        clan.data.base = {loc, dimension}
        this.db.overwriteDataByID(clan.id, clan.data)
    }
    teleportToClanBase(clanID, player) {
        let clan = this.getClanByID(clanID)
        let base = clan.data.base
        this.migrate()
        player.teleport(base.loc, {
            dimension: world.getDimension(`${base.dimension}`)
        })
    }
    getInvites(player) {
        let invites = this.inviteDb.findDocuments({ toPlayer: playerStorage.getID(player) })
        return invites;
    }
    getInviteByPlayerandClan(player, clan) {
        let id = playerStorage.getID(player)
        let invs = this.getInvites(player)
        for (const inv of invs) {
            if(id === inv.data.toPlayer) {
                if (inv.data.clan === clan.id) {
                    return inv;
                } else {
                    return false;
                }
            } else {
                return false
            }
        }
    }
    reload() {
        this.db = prismarineDb.table("clans")
        this.inviteDb = prismarineDb.table("clans_inviteDb")
    }
}

export default new clanAPI();