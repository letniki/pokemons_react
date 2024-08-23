import axios from "axios";
import {urls} from "../constants/urls";
import {IPokemons} from "../models/IPokemons";
import {IAbility, IForm, IPokemonByName, IStat, IType} from "../models/IPokemonByName";
import { IPokemon } from "../models/IPokemon";

const axiosInstance=axios.create({
    baseURL:'https://pokeapi.co/api/v2/',
    headers:{}
});

const pokemonsService={
    getPokemons:async(offset:number): Promise<IPokemons> =>{
      const response=  await axiosInstance.get<IPokemons>(urls.pokemons.base+`/?offset=${offset}&limit=20`);
      return response.data;
    },
    getPokemonImage: async(name:string):Promise<string> =>{
        const response=  await axiosInstance.get(`${urls.pokemons.base}/${name}`);
        return response.data.sprites.front_default;
    },
    getPokemonByName: async (name:string):Promise<IPokemonByName>=>{
        const response = await axiosInstance.get<IPokemonByName>(urls.pokemons.byName(name));
        return response.data;
    },
    getAbilities: async(name:string):Promise<IAbility[]> =>{
        const response=  await axiosInstance.get(`${urls.pokemons.base}/${name}`);
        return response.data.abilities;
    },
    // getAbilitiesDetails: async (names: string[]):Promise<IAbilityDetail[]>=>{
    //     const response=names.map(name=> axiosInstance.get(`ability/${name}`)
    //         .then(value=>value.data));
    //     return response
    // },
    getStats:async (name:string):Promise<IStat> =>{
        const response=  await axiosInstance.get(`${urls.pokemons.base}/${name}`);
        return response.data.stats;
    },
    getType:async (name:string):Promise<IType[]> =>{
        const response=  await axiosInstance.get(`${urls.pokemons.base}/${name}`);
        return response.data.types;
    },
    getForms:async (name:string): Promise<IForm[]> =>{
        const response=  await axiosInstance.get(`${urls.pokemons.base}/${name}`);
        return response.data.forms;
    }
}


export {pokemonsService}