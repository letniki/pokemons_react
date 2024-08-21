import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonActions} from "../redux/slices/pokemonsSlice";
import PokemonsComponent from "../components/PokemonsComponent";

const PokemonsPage = () => {
    const dispatch = useAppDispatch();
    let {results, error} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        dispatch(pokemonActions.loadPokemons())
    }, []);

    return (
        <div>
            <PokemonsComponent results={results} />
        </div>
    );
};

export default PokemonsPage;