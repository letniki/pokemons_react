import { IPokemon } from "./IPokemon"

export interface ISearch {
    name:string,
    pokemon:{ pokemon:IPokemon }[]
}