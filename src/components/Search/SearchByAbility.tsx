import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ISearchByAbility} from "../../models/IForm";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonActions} from "../../redux/slices/pokemonsSlice";
import {Link} from "react-router-dom";
import PokemonImage from "../PokemonImage/PokemonImage";

const SearchByAbility = () => {
    const [query, setQuery] = useState<string>('');
    const [submittedQuery, setSubmittedQuery] = useState<string>('');
    let {register, handleSubmit} = useForm<ISearchByAbility>();
    let dispatch = useAppDispatch();
    let {ability} = useAppSelector(state => state.pokemonStore);
    const onSubmitHandler=()=>{
        setSubmittedQuery(query.toLowerCase());
    }
    useEffect(() => {
        if(submittedQuery){
            dispatch(pokemonActions.loadPokemonByAbility(submittedQuery));
        }
    }, [submittedQuery, dispatch]);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <input type="text" placeholder='Search Pokemons By Ability'
                       {...register('ability')} value={query}
                       onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                {ability.name === submittedQuery  && <div>{ability.pokemon.map((pokemon,index) => <Link key={index} to={`/pokemon/${pokemon.pokemon.name}`}>
                    <PokemonImage url={pokemon.pokemon.url}/>
                    <h3>{pokemon.pokemon.name}</h3></Link>)}</div>}
            </div>
        </div>
    );
};

export default SearchByAbility;