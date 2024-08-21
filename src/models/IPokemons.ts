import {IPokemon} from "./IPokemon";

export interface IPokemons{
    count: number;
    next: string | null;
    previous: string | null;
    results:IPokemon[]
}