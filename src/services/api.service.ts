import axios from "axios";
import {urls} from "../constants/urls";
import {IPokemons} from "../models/IPokemons";
import {IForm, IPokemonByName} from "../models/IPokemonByName";
import { IEvolution } from "../models/IEvolution";
import { IEvolutionForms } from "../models/IEvolutionForms";
import { IFormInfo } from "../models/IFormInfo";
import { IFormDetail } from "../models/IFormDetail";
import { ISearch } from "../models/ISearch";

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
    getEvolutionChain: async(id:string): Promise<IEvolution> => {
        const response = await axiosInstance.get<IEvolution>(`pokemon-species/${id}`);
        return response.data;
    },
    getAllForms: async(path:string): Promise<IEvolutionForms> => {
        const response = await axiosInstance.get<IEvolutionForms>(`${path}`);
        return response.data;
    },
    getFormInfo:async(id:string):Promise<IFormInfo> =>{
        const response=  await axiosInstance.get<IFormInfo>(`pokemon-form/${id}`);
        return response.data;
    },
    getImageById : (id:string):string =>{
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    },
    searchByType: async (type:string):Promise<ISearch> => {
      const response = await axiosInstance.get<ISearch>(`type/${type}`);
      return response.data;
      },
    searchByAbility: async (ability:string):Promise<ISearch> => {
        const response = await axiosInstance.get<ISearch>(`ability/${ability}`);
        return response.data;
    },
    getForms: async (name: string) : Promise<IForm[]> => {
        const response = await axiosInstance.get(`pokemon/${name}`);
        return response.data.forms;
    },
    getFormsDetails: async (names: string[]): Promise<IFormDetail[]> => {
        const response = names.map((name) => axiosInstance.get(`pokemon-form/${name}`)
            .then(response => response.data));
        return Promise.all(response);
    }
}


export {pokemonsService}