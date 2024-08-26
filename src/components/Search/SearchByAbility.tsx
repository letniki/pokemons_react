import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ISearchByAbility} from "../../models/IForm";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonActions} from "../../redux/slices/pokemonsSlice";
import {Link} from "react-router-dom";
import PokemonImage from "../PokemonImage/PokemonImage";
import styles from './search.module.css';
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
            <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
                <div>
                <input className={styles.input} type="text" placeholder='SEARCH BY ABILITY'
                       {...register('ability')} value={query}
                       onChange={(e) => setQuery(e.target.value)}
                /></div>
                <button type="submit" className={styles.button}>Search</button>
            </form>
                {ability.name === submittedQuery  && <div className={styles.biggerBlock}>{ability.pokemon.map((pokemon,index) => <Link className={styles.Link} key={index} to={`/pokemon/${pokemon.pokemon.name}`}>
                    <div className={styles.block}><PokemonImage url={pokemon.pokemon.url}/>
                        <h3 className={styles.h3}>{pokemon.pokemon.name.toUpperCase()}</h3></div></Link>)}</div>}
        </div>
    );
};

export default SearchByAbility;