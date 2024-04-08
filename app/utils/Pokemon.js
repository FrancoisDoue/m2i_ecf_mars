import PokeStat from "./PokeStats"

export default class Pokemon {
    id
    name
    order
    capitalizedName
    upperCaseName
    types
    imageSmall
    imageAnimatedSmall
    imageLarge
    stats

    constructor(pokemon){
        console.log(pokemon.name, pokemon.id, pokemon.order)
        this.id = pokemon.id
        this.name = pokemon.name
        this.order = pokemon.order
        this.capitalizedName = this.#capitalize(pokemon.name)
        this.upperCaseName = pokemon.name.toUpperCase()
        this.types = pokemon.types.map(({type}) => ({name: type.name, img: `https://veekun.com/dex/media/types/en/${type.name}.png`}));
        this.imageSmall = pokemon.sprites.front_default
        this.imageAnimatedSmall = pokemon.sprites.other.showdown.front_default
        this.imageLarge = pokemon.sprites.other['official-artwork'].front_default
        this.stats = pokemon.stats.map((stat) => new PokeStat(stat))
    }

    #capitalize(name) {
        console.log(name.charAt(0).toUpperCase() + name.slice(1))
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}