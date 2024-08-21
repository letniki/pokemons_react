import React, {FC} from 'react';
import {IPokemon} from "../models/IPokemon";
import PokemonComponent from "./PokemonComponent";
import PokemonsPageByName from "../pages/PokemonPageByName";
import PokemonPageByName from "../pages/PokemonPageByName";
import {Link} from "react-router-dom";

interface IProps{
    results:IPokemon[]
}
const PokemonsComponent:FC<IProps> = ({results}) => {
    console.log(results);
    return (
        <ul>
            {results.map((pokemon,index)=><li key={index} ><Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link></li>)}
        </ul>
    );
};

export default PokemonsComponent;