const ANTI_UPGS = {
    main: {
        temp() {
            for (let x = 1; x <= this.cols; x++) {
                for (let y = 1; y <= this[x].lens; y++) {
                    let u = this[x][y]
                    if (u.effDesc) tmp.anti.upgs.main[x][y] = { effect: u.effect(), effDesc: u.effDesc() }
                }
            }
        },
        ids: [null, 'am', 'dp'],
        cols: 2,
        over(x,y) { player.anti.main_upg_msg = [x,y] },
        reset() { player.anti.main_upg_msg = [0,0] },
        1: {
            title: "Anti-Mass Upgrades",
            res: "of anti-mass",
            mass: true,
            getRes() { return player.anti.mass },
            unl() { return true },
            can(x) { return player.anti.mass.gte(this[x].cost) && !player.anti.mainUpg.am.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.anti.mass = player.anti.mass.sub(this[x].cost)
                    player.anti.mainUpg.am.push(x)
                }
            },
            auto_unl() { return false },
            lens: 12,

            1: {
                desc: "Anti-Mass is boosted by Mass.",
                cost: E(10),
                effect() {
                    let x = player.mass.add(1).log10().add(1).log10().add(1).tetrate(1.5)
                    return x
                },
                effDesc(x=this.effect()) {
                    return x.format()+"x"
                },
                icon: true,
            },
            2: {
                desc: "All Ranks no longer reset anything.",
                cost: E(1e3),
                icon: true,
            },
            3: {
                desc: "Accelerator applies BHC & Cosmic Ray.",
                cost: E(1e4),
                icon: true,
            },
            4: {
                desc: "Anti-mass gain is increased by 10% for every supernovas you become.",
                cost: E(5e4),
                icon: true,
                effect() {
                    let x = Decimal.pow(1.1,player.supernova.times.softcap(100,1/3,0))
                    return x
                },
                effDesc(x=this.effect()) {
                    return x.format()+"x"+softcapHTML(x,1.1**100)
                },
            },
            5: {
                unl: _=>player.dim_shard>=2,
                desc: "Keep free tickspeeds from accelerator on reset, unless entering the Portal.",
                cost: E(1e7),
            },
            6: {
                unl: _=>player.dim_shard>=2,
                desc: "Quantum Supernova tree will be without the requirement.",
                cost: E(1e9),
            },
            7: {
                unl: _=>player.dim_shard>=3,
                desc: "Anti-mass gain is increased by tickspeed's effect.",
                cost: E(1e5),
                effect() {
                    let x = tmp.tickspeedEffect?tmp.tickspeedEffect.eff.add(1).log10().add(1).log10().add(1).pow(2.5):E(1)
                    return x
                },
                effDesc(x=this.effect()) {
                    return x.format()+"x"
                },
            },
            8: {
                unl: _=>player.dim_shard>=3,
                desc: "Gain free Massive Infusions based on Dimensional Shards (they don't affect special infusion requirements).",
                cost: E(1e7),
                effect() {
                    let x = (player.dim_shard+1)**2
                    return x
                },
                effDesc(x=this.effect()) {
                    return "+"+format(x,0)
                },
            },
            9: {
                unl: _=>player.dim_shard>=4,
                desc: "Dimensional Shards boost anti-mass gain.",
                cost: E(1.619e20),
                effect() {
                    let x = player.dim_shard+1
                    return x**x**0.75
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
            10: {
                unl: _=>player.dim_shard>=6,
                desc: "For every 2 each non-bonus infusions adds previous infusion (it doesn't affect special infusion requirements).",
                cost: E(2e16),
            },
            11: {
                unl: _=>player.dim_shard>=6,
                desc: "Prestiges will no longer reset anything.",
                cost: E(1.619e21),
            },
            12: {
                unl: _=>player.dim_shard>=9,
                desc: "Anti-mass gain is affected by pre-quantum global speed at reduced rate.",
                cost: E(1e14),
                effect() {
                    let x = tmp.preQUGlobalSpeed?tmp.preQUGlobalSpeed.max(1).log10().add(1).pow(3):E(1)
                    return x
                },
                effDesc(x=this.effect()) {
                    return format(x)+"x"
                },
            },
        },
        2: {
            title: "Delight Upgrades",
            res: "delight powers",
            getRes() { return player.anti.dp },
            unl() { return player.anti.dp_unl },
            can(x) { return player.anti.dp.gte(this[x].cost) && !player.anti.mainUpg.dp.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.anti.dp = player.anti.dp.sub(this[x].cost)
                    player.anti.mainUpg.dp.push(x)
                }
            },
            auto_unl() { return false },
            lens: 3,

            1: {
                desc: "Delight powers is boosted by rage powers.",
                cost: E(5),
                effect() {
                    let x = player.rp.points.add(1).log10().add(1).log10().add(1).pow(0.5)
                    return x
                },
                effDesc(x=this.effect()) {
                    return x.format()+"x"
                },
            },
            2: {
                desc: "Quantum requirement from dimensional nerf is 50% weaker.",
                cost: E(100),
            },
            3: {
                desc: "Anti-mass boosts pre-quantum global speed at reduced rate.",
                cost: E(10000),
                effect() {
                    let x = player.anti.mass.add(1).root(2)
                    return x
                },
                effDesc(x=this.effect()) {
                    return x.format()+"x"
                },
            },
        },
    },
}

/*
1: {
    desc: "Placeholder.",
    cost: E(1),
    effect() {
        let x = E(1)
        return x
    },
    effDesc(x=this.effect()) {
        return format(x)+"x"
    },
},
*/

function hasAntiUpgrade(id,x) { return player.anti.mainUpg[id].includes(x) }
function antiUpgEffect(id,x,def=E(1)) { return tmp.anti.upgs.main[id][x]?tmp.anti.upgs.main[id][x].effect:def }