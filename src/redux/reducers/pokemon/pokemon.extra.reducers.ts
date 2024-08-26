import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {pokemonsService} from "../../../services/api.service";


export const loadPokemons=createAsyncThunk(
    'pokemonsSlice/loadPokemon',
    async({page}:{page:number}, thunkAPI) => {
        try{
            const offset = (page - 1) * 20;
            const pokemons = await pokemonsService.getPokemons(offset);
            return thunkAPI.fulfillWithValue(pokemons);
        }catch (e){
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
)
export const loadPokemonByName = createAsyncThunk(
    'pokemonsSlice/loadPokemonByName',
    async(name:string, thunkAPI) =>{
        try{
            const pokemon = await pokemonsService.getPokemonByName(name);
            return thunkAPI.fulfillWithValue(pokemon);
        }catch (e){
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
)
export const loadPokemonImage=createAsyncThunk(
    'pokemonsSlice/loadPokemonImage',
    async(name:string, thunkAPI) => {
        try{
            const response = await pokemonsService.getPokemonImage(name);
            return thunkAPI.fulfillWithValue({ name, imageUrl: response });
        }catch (e){
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
)
export const loadFormDetails = createAsyncThunk(
    'pokemonFormSlice',
    async (name: string, thunkAPI) => {
        try {
            let form = await pokemonsService.getForms(name);
            let formNames = form.map(value => value.name);
            let formDetails = await pokemonsService.getFormsDetails(formNames);
            return  thunkAPI.fulfillWithValue({formDetails, form});
        } catch (e) {
            let error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
);

export const loadEvolution = createAsyncThunk  (
    'pokemonsSlice/loadEvolution',
    async (id:string, thunkAPI) => {
    try {
        const form = await pokemonsService.getFormInfo(id)
        return thunkAPI.fulfillWithValue(form)
    }catch (e){
        const error = e as AxiosError
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const loadPokemonByAbility = createAsyncThunk(
    'pokemonsSlice/loadPokemonByAbility',
    async (ability: string, thunkAPI) => {
        try{
            const response = await pokemonsService.searchByAbility(ability);
            return thunkAPI.fulfillWithValue(response);
        }catch (e){
           const error = e as AxiosError;
           return thunkAPI.rejectWithValue(error?.response?.data)
        }
    }
)
export const loadPokemonByType = createAsyncThunk(
    'pokemonsSlice/loadPokemonByType',
    async(type:string, thunkAPI)=>{
        try{
            const response = await pokemonsService.searchByType(type);
            return thunkAPI.fulfillWithValue(response);
        }catch(e){
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    }
)