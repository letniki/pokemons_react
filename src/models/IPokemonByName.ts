interface IAbility {
    ability: {
        name: string,
        url: string
    },
    is_hidden:boolean,
    slot:number
}
interface IForm{
    name: string,
    url: string
}
interface IIndex{
    game_index: number,
    version: {
        name: string,
        url: string
    }
}
interface IStat{
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}
interface IDetails{
    level_learned_at: number,
    move_learn_method: {
        name: string,
        url: string
    },
    version_group: {
        name: string,
        url: string
    }
};
interface IMove{
    move: {
        name: string,
        url: string
    },
    version_group_details: IDetails[]
}
export interface IPokemonByName{
    abilities: IAbility[],
    base_experience: number,
    cries: {
        latest: string,
        legacy: string
    },
    forms: IForm[],
    game_indices: IIndex[],
    height: number,
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: IMove[],
    name: string,
    order: number,
    "species": {
        name: string,
        url: string
    },
    sprites: {
        back_default: string,
        back_shiny: string,
        front_default: string,
        front_shiny: string,
        other: {
            dream_world: {
                front_default: string
            },
            "home": {
                front_default: string, /*{todo this image}*/
                front_shiny: string,
            },
            official_artwork: {
                front_default: string,
                front_shiny: string
            },
            showdown: {
                back_default: string,
                back_shiny: string,
                front_default: string, //gifs
                front_shiny: string,
            }
        },
    },
    stats: IStat[],
    types: IType[],
    weight: number
}
interface IType{
    slot: number,
    type: {
        name: string,
        url: string
    }
}