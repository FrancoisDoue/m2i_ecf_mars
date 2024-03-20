export const evolveMap = (dumbEvolveObject) => {
    let tempObj = dumbEvolveObject
    const cleanAndBeautifulArray = []
    do{
        if (!!tempObj?.species) {
            cleanAndBeautifulArray.push(tempObj.species)
            tempObj = tempObj.evolves_to[0]
        } else break 
    } while ( true )
    return cleanAndBeautifulArray
}