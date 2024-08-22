import axios from "axios";
import {urls} from "../constants/urls";
import {IPokemons} from "../models/IPokemons";
import {IPokemonByName} from "../models/IPokemonByName";

const axiosInstance=axios.create({
    baseURL:'https://pokeapi.co/api/v2/',
    headers:{}
});

const pokemonsService={
    getPokemons:async(): Promise<IPokemons> =>{
      const response=  await axiosInstance.get<IPokemons>(urls.pokemons.base);
      return response.data;
    },
    getPokemonImage: async(name:string):Promise<string> =>{
        const response=  await axiosInstance.get(`${urls.pokemons.base}/${name}`);
        return response.data.sprites.front_default;
    },
    getPokemonByName: async (name:string):Promise<IPokemonByName>=>{
        const response = await axiosInstance.get<IPokemonByName>(urls.pokemons.byName(name));
        return response.data;
    }
}


export {pokemonsService}