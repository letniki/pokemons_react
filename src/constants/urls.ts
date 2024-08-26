const urls={
    pokemons:{
        base:'pokemon',
        byName: (name: string):string=> urls.pokemons.base + `/${name}`,
    }
}

export {urls};