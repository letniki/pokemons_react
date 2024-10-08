import {IPokemon} from "../../models/IPokemon";
import {createSlice, isRejected} from "@reduxjs/toolkit";
import {
    loadEvolution,
    loadFormDetails,
    loadPokemonByAbility,
    loadPokemonByName,
    loadPokemonByType,
    loadPokemonImage,
    loadPokemons
} from "../reducers/pokemon/pokemon.extra.reducers";
import { IForm, IPokemonByName} from "../../models/IPokemonByName"
import { IFormDetail } from "../../models/IFormDetail";
import { ISearch } from "../../models/ISearch";
import {IFormInfo} from "../../models/IFormInfo";

export type PokemonsState = {
    results:IPokemon[],
    error:string,
    pokemon:IPokemonByName,
    images: {  [key: string]: string  };
    next: string | null;
    previous: string | null;
    formDetails:IFormDetail[];
    form:IForm[];
    ability:ISearch;
    type:ISearch;
    evolution: IFormInfo
}

const initialState: PokemonsState = {
    results: [],
    error: '',
    images:{},
    next: null,
    previous:null,
    formDetails:[],
    form:[],
    evolution: {
        id: 0,
        name: '',
        is_mega: false,
        is_battle_only: false,
        is_default: false,
        sprites: {
            back_shiny: '',
            front_shiny: ''
        },
        version_group: {
            name: ''
        }
    },
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
        species: {
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
                home: {
                    front_default: '',
                    front_shiny: '',
                },
                official_artwork: {
                    front_default: '',
                    front_shiny: ''
                },
                showdown: {
                    back_default: '',
                    back_shiny: '',
                    front_default: '',
                    front_shiny: '',
                }
            },
        },
        stats: [],
        types: [],
        weight: 0
    },
    ability:{
        name:'',
        pokemon:[]
    },
    type:{
        name:'',
        pokemon:[]
    }
}

export const pokemonsSlice = createSlice({
    name: "pokemonsSlice",
    initialState: initialState,
    reducers:{},
    extraReducers: builder => {
        builder
            .addCase(loadPokemons.fulfilled, (state, action) => {
                const {results, next, previous} = action.payload;
                state.results = results;
                state.next = next;
                state.previous = previous;

            }).addCase(loadPokemonByName.fulfilled, (state, action) => {
            state.pokemon = action.payload;
            }).addCase(loadFormDetails.fulfilled, (state, action) => {
                const {formDetails, form} = action.payload as { formDetails: IFormDetail[]; form: IForm[] };
                state.formDetails = formDetails;
                state.form = form;
            }).addCase(loadEvolution.fulfilled, (state, action) => {
            state.evolution = action.payload
            }).addCase(loadPokemonImage.fulfilled, (state, action) => {
                const {name, imageUrl} = action.payload as { name: string; imageUrl: string };
                state.images[name] = imageUrl;
            }).addCase(loadPokemonByType.fulfilled, (state, action) => {
            state.type = action.payload;
            }).addCase(loadPokemonByAbility.fulfilled, (state, action) => {
            state.ability = action.payload;
            })
            .addMatcher(isRejected(loadPokemons, loadPokemonByName, loadFormDetails, loadEvolution, loadPokemonImage, loadPokemonByType, loadPokemonByAbility), (state, action) => {
                state.error = action.payload as string;
            })
    }
});

export const pokemonActions ={
    ...pokemonsSlice.actions,
    loadPokemons,
    loadPokemonByName,
    loadPokemonImage,
    loadFormDetails,
    loadEvolution,
    loadPokemonByAbility,
    loadPokemonByType
}