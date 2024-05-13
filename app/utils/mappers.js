export const evolveMap = (evolutionChain, currentName = '') => {
    const tempArray = [];
    tempArray.push(evolutionChain.species.name)
    while (!!evolutionChain?.evolves_to.length) {
        const {evolves_to} = evolutionChain
        const pokemonInCurrentIteration = evolves_to.some(e => e.species.name == currentName)
        if (pokemonInCurrentIteration) {
            tempArray.push(currentName)
        } else {
            if (evolves_to.length == 1) {
                tempArray.push(evolves_to[0].species.name)
            } else {
                tempArray.push(evolves_to.map(element => element.species.name))
            }
        }
        evolutionChain = evolutionChain?.evolves_to[0]
    }
    return tempArray
}
