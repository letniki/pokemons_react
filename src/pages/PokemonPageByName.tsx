import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonActions} from "../redux/slices/pokemonsSlice";
import {useParams} from "react-router-dom";


const PokemonPageByName = () => {
    let {name} = useParams();
    const dispatch=useAppDispatch();
    let {pokemon} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        if(name){
            dispatch(pokemonActions.loadPokemonByName(name));
        }

    }, [name]);
    console.log(pokemon);
    return (
        <div>
            {/*{*/}
            {/*   pokemon && <li>{pokemon}</li>*/}
            {/*}*/}
        </div>
    );
};

export default PokemonPageByName;