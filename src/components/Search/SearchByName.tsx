import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { IForm } from '../../models/IForm';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import styles from "./search.module.css";
import style from './searchPokemon.module.css';
import {Link} from "react-router-dom";

const PokemonSearchPage = () => {
    const [submittedQuery, setSubmittedQuery] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    let {
        register,
        handleSubmit
    } = useForm<IForm>();
    const dispatch = useAppDispatch();
    let {pokemon} = useAppSelector(state => state.pokemonStore);

    const onSubmitFormHandler = () => {
        setSubmittedQuery(query.toLowerCase());

    };
    useEffect(() => {
        console.log(submittedQuery);
        try{
            dispatch(pokemonActions.loadPokemonByName(submittedQuery));
        }catch (e){
            let error = e as AxiosError;
            console.log(error);
        }
    }, [submittedQuery, dispatch]);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitFormHandler)} className={styles.form}>
                <div>
                    <input className={styles.input} placeholder='SEARCH BY NAME' type="text" {...register('name')} value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <button type="submit" className={styles.button}>SEARCH</button>
            </form>
            <div className={style.block}>
            {(pokemon.name === submittedQuery && submittedQuery )&& (<div className={style.smallerBlock}><Link className={styles.Link} to={`/pokemon/${pokemon.name}`}>
                <h1 className={style.button}>MORE INFO ABOUT {pokemon.name.toUpperCase()}</h1></Link>
                <div>
                    {pokemon.sprites.front_default && <img className={style.image} src={`${pokemon.sprites.front_default}`} alt={pokemon.name} />}
                    {pokemon.sprites.back_default && <img className={style.image} src={`${pokemon.sprites.back_default}`} alt={pokemon.name} />}
                    {pokemon.sprites.front_shiny && <img className={style.image} src={`${pokemon.sprites.front_shiny}`} alt={pokemon.name} />}
                    {pokemon.sprites.back_shiny && <img className={style.image} src={`${pokemon.sprites.back_shiny}`} alt={pokemon.name} />}
                </div>
                <div className={style.bigBlock}>
                    <div className={style.detailsBlock}><h2>ABILITIES</h2>
                        {
                            pokemon.abilities.map((poke, index) => <h3 className={style.h3} key={index}>{poke.ability.name}</h3>)
                        }
                    </div>

                    <div className={style.detailsBlock}><h2>STATS</h2>
                        {
                            pokemon.stats.map((poke, index) => <h3 className={style.h3}
                                                                   key={index}>{poke.stat.name}:{poke.base_stat}</h3>)
                        }
                    </div>
                    <div className={style.detailBlock}><h2>TYPES</h2>
                        {
                            pokemon.types.map((type, index) => <h3 className={style.h3} key={index}>{type.type.name}</h3>)
                        }
                    </div>

                </div>
            </div>)
            }</div>
        </div>
    );
};

export default PokemonSearchPage;

