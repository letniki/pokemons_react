

const urls={
    pokemons:{
        base:'pokemon',
        byId: (id: number):string=> urls.pokemons.base +`/${id}`,
        byName: (name: string):string=> urls.pokemons.base + `/${name}`,
    }
}

export {urls};