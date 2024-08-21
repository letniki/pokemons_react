import {IPokemon} from "../../models/IPokemon";
import {createSlice, isRejected} from "@reduxjs/toolkit";
import {loadPokemonByName, loadPokemons} from "../reducers/pokemon/pokemon.extra.reducers";


export type PokemonsState = {
    results:IPokemon[],
    error:string,
    pokemon:any
}

const initialState: PokemonsState = {
    results: [],
    error: '',
    pokemon:{}
}

export const pokemonsSlice = createSlice({
    name: "pokemonsSlice",
    initialState: initialState,
    reducers:{},
    extraReducers: builder =>{builder.addCase(loadPokemons.fulfilled, (state, action)=>{
        state.results= action.payload.results;

    }).addCase(loadPokemonByName.fulfilled, (state, action)=>{
        state.pokemon=action.payload;
    }).addMatcher(isRejected(loadPokemons, loadPokemonByName), (state, action) =>{
        state.error = action.payload as string;
    })
    }
});

export const pokemonActions ={
    ...pokemonsSlice.actions,
    loadPokemons,
    loadPokemonByName
}