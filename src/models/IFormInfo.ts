export interface IVersionGroup {
    name: string
}

export interface IFormSprites {
    front_shiny: string,
    back_shiny: string
}

export interface IFormInfo{
    id: number,
    name: string,
    is_battle_only: boolean,
    is_default: boolean,
    is_mega: boolean,
    version_group: IVersionGroup
    sprites: IFormSprites
}