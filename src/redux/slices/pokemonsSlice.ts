import {IPokemon} from "../../models/IPokemon";
import {PayloadAction, createSlice, isRejected} from "@reduxjs/toolkit";
import {
    loadEvolution,
    loadFormDetails,
    loadPokemonByAbility,
    loadPokemonByName,
    loadPokemonByType,
    loadPokemonImage,
    loadPokemons
} from "../reducers/pokemon/pokemon.extra.reducers";
import {IAbility, IForm, IPokemonByName, IStat, IType} from "../../models/IPokemonByName"
import { IFormDetail } from "../../models/IFormDetail";
import { ISearch } from "../../models/ISearch";
import {IFormInfo} from "../../models/IFormInfo";

export type PokemonsState = {
    results:IPokemon[],
    error:string,
    pokemon:IPokemonByName,
    images: {  [key: string]: string  };
    offset: number;
    favourite: string[];
    next: string | null;
    previous: string | null;
    // stat: IStat[],
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
    offset: 0,
    favourite:[],
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
        stats: [],
        types: [],
        weight: 0
    },
    ability:{
        name:'',
        pokemon:[]
    },
    // stat:[],
    type:{
        name:'',
        pokemon:[]
    }
}

export const pokemonsSlice = createSlice({
    name: "pokemonsSlice",
    initialState: initialState,
    reducers:{
        setOffset:(state, action:PayloadAction<number>) =>{
            state.offset=action.payload;
        },
        setFavourite:(state, action:PayloadAction<string>) =>{
            state.favourite.push(action.payload);
        }
    },
    extraReducers: builder =>{builder.addCase(loadPokemons.fulfilled, (state, action)=>{
        const {results, next , previous} = action.payload;
        state.results= results;
        state.next = next;
        state.previous = previous;

    }).addCase(loadPokemonByName.fulfilled, (state, action)=>{
        state.pokemon=action.payload;
    }).addCase(
        loadFormDetails.fulfilled, (state, action) => {
            const {formDetails, form} = action.payload as { formDetails: IFormDetail[]; form: IForm[] };
            state.formDetails = formDetails;
            state.form = form;
        }
    ) .addCase(loadEvolution.fulfilled, (state, action) => {
        state.evolution = action.payload
    })
        .addCase(loadPokemonImage.fulfilled, (state, action) =>{
        const { name, imageUrl } = action.payload as { name: string; imageUrl: string };
        state.images[name] = imageUrl;
        }).addCase(loadPokemonByType.fulfilled, (state, action) => {
            state.type = action.payload;
        }).addCase(loadPokemonByAbility.fulfilled, (state, action) => {
            state.ability = action.payload;
        })
        // .addCase(loadAbilitiesDetails.fulfilled, (state, action)=>{
        //     const {abilitiesDetails, abilities} = action.payload as { abilitiesDetails: IAbilityDetail[]; abilities: IAbility[] };
        //     state.abilitiesDetails = abilitiesDetails;
        //     state.abilities = abilities;
        // })
        .addMatcher(isRejected(loadPokemons, loadPokemonByName), (state, action) =>{
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