import axios from "axios";
import {urls} from "../constants/urls";
import {IPokemons} from "../models/IPokemons";

const axiosInstance=axios.create({
    baseURL:'https://pokeapi.co/api/v2/',
    headers:{}
});

const pokemonsService={
    getPokemons:async(): Promise<IPokemons> =>{
      const response=  await axiosInstance.get<IPokemons>(urls.pokemons.base);
      return response.data;
    },
    getPokemonByName: async (name:string):Promise<any>=>{
        const response = await axiosInstance.get(urls.pokemons.byName(name));
        return response.data;
    }
}


export {pokemonsService}