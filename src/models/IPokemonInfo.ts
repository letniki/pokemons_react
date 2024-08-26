import { IAbility, IStat, IType } from "./IPokemonByName"

export interface IPokemonInfo{
    id: number,
    name: string,
    abilities: IAbility[],
    stats: IStat[]
    types: IType[]
}