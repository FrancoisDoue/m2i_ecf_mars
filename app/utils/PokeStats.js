export default class PokeStat {
    name
    baseStat
    constructor ({stat, base_stat}) {
        this.name = stat.name
        this.baseStat = base_stat
    }
}