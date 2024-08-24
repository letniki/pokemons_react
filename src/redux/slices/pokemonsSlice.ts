import {IPokemon} from "../../models/IPokemon";
import {PayloadAction, createSlice, isRejected} from "@reduxjs/toolkit";
import {loadFormDetails, loadPokemonByName, loadPokemonImage, loadPokemons} from "../reducers/pokemon/pokemon.extra.reducers";
import {IAbility, IForm, IPokemonByName, IStat, IType} from "../../models/IPokemonByName"
import { IFormDetail } from "../../models/IFormDetail";

export type PokemonsState = {
    results:IPokemon[],
    error:string,
    pokemon:IPokemonByName,
    images: {  [key: string]: string  };
    offset: number;
    limit:number;
    abilities:IAbility[];
    favourite: string[];
    next: string | null;
    previous: string | null;
    // statDetails:IStatDetail[];
    stat: IStat[],
    // typeDetails: ITypeDetail[];
    type:IType[];
    formDetails:IFormDetail[];
    form:IForm[];
}

const initialState: PokemonsState = {
    results: [],
    error: '',
    images:{},
    offset: 0,
    limit: 20,
    favourite:[],
    next: null,
    previous:null,
    formDetails:[],
    form:[],
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
    abilities: [],
    // statDetails:[],
    stat:[],
    // typeDetails:[],
    type:[],
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
    )
        .addCase(loadPokemonImage.fulfilled, (state, action) =>{
        const { name, imageUrl } = action.payload as { name: string; imageUrl: string };
        state.images[name] = imageUrl;
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
    loadFormDetails
}