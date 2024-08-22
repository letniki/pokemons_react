import {IPokemon} from "../../models/IPokemon";
import {createSlice, isRejected} from "@reduxjs/toolkit";
import {loadPokemonByName, loadPokemonImage, loadPokemons} from "../reducers/pokemon/pokemon.extra.reducers";
import {IPokemonByName} from "../../models/IPokemonByName"

export type PokemonsState = {
    results:IPokemon[],
    error:string,
    pokemon:IPokemonByName,
    images: {  [key: string]: string  };
}

const initialState: PokemonsState = {
    results: [],
    error: '',
    images:{},
    pokemon:{
        abilities:[],
        base_experience:0,
        cries: {
            latest: '',
            legacy: ''
        },
        forms:[],
        game_indices:[],
        height: 0,
        id: 0,
        is_default: false,
        location_area_encounters: '',
        moves: [],
        name: '',
        order: 0,
        "species": {
            name: '',
            url: ''
        },
        sprites: {
            back_default: '',
            back_shiny: '',
            front_default: '',
            front_shiny: '',
            other: {
                dream_world: {
                    front_default: ''
                },
                "home": {
                    front_default: '', /*{todo this image}*/
                    front_shiny: '',
                },
                official_artwork: {
                    front_default: '',
                    front_shiny: ''
                },
                showdown: {
                    back_default: '',
                    back_shiny: '',
                    front_default: '', //gifs
                    front_shiny: '',
                }
            },
        },
        "stats": [],
        "types": [],
        weight: 0
    }
}

export const pokemonsSlice = createSlice({
    name: "pokemonsSlice",
    initialState: initialState,
    reducers:{},
    extraReducers: builder =>{builder.addCase(loadPokemons.fulfilled, (state, action)=>{
        state.results= action.payload.results;

    }).addCase(loadPokemonByName.fulfilled, (state, action)=>{
        state.pokemon=action.payload;
    }).addCase(loadPokemonImage.fulfilled, (state, action) =>{
        const { name, imageUrl } = action.payload as { name: string; imageUrl: string };
        state.images[name] = imageUrl;
        }).addMatcher(isRejected(loadPokemons, loadPokemonByName), (state, action) =>{
        state.error = action.payload as string;
    })
    }
});

export const pokemonActions ={
    ...pokemonsSlice.actions,
    loadPokemons,
    loadPokemonByName,
    loadPokemonImage
}