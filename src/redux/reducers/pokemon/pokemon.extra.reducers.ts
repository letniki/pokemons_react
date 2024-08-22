import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {pokemonsService} from "../../../services/api.service";


export const loadPokemons=createAsyncThunk(
    'pokemonsSlice/loadPokemon',
    async(_, thunkAPI) => {
        try{
            const pokemons = await pokemonsService.getPokemons();
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