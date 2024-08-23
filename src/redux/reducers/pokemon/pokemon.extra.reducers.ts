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
// export const loadAbilitiesDetails = createAsyncThunk(
//     'pokemonsSlice/loadAbilietiesDetails',
//     async(name:string, thunkAPI) =>{
//         try{
//             const abilities = await pokemonsService.getAbilities(name);
//             let abilitiesNames = abilities.map(ability => ability.ability.name);
//             let abilitiesDetails =await pokemonsService.getAbilitiesDetails(abilitiesNames);
//
//             return  thunkAPI.fulfillWithValue({abilitiesDetails, abilities});
//         }catch (e){
//             const error = e as AxiosError;
//             return thunkAPI.rejectWithValue(error?.response?.data);
//         }
//     }
// )
