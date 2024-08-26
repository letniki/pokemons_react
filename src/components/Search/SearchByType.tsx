import { useForm } from "react-hook-form";
import { ISearchByType } from "../../models/IForm";
import {useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { pokemonActions } from "../../redux/slices/pokemonsSlice";
import { Link } from "react-router-dom";
import PokemonImage from "../PokemonImage/PokemonImage";
import styles from "./search.module.css";

const SearchByType = () => {
            const [submittedQuery, setSubmittedQuery] = useState<string>('');
            const [query, setQuery] = useState<string>('');
            let {
            register,
            handleSubmit
        } = useForm<ISearchByType>();
            const dispatch = useAppDispatch();
            let {type} = useAppSelector(state => state.pokemonStore);

            const onSubmitFormHandler = () => {
            setSubmittedQuery(query.toLowerCase());
        };
            useEffect(() => {
                console.log(submittedQuery);
                if (submittedQuery) {
                    dispatch(pokemonActions.loadPokemonByType(submittedQuery));
                }
        }, [submittedQuery, dispatch]);
            console.log(type);
            return (
            <div>
            <form onSubmit={handleSubmit(onSubmitFormHandler)} className={styles.form}>
            <div>
                <input className={styles.input} type='text' placeholder='SEARCH BY TYPE' {...register('type')} value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>
            <button type='submit' className={styles.button}>SEARCH</button>
        </form>

                {type.name === submittedQuery && <div className={styles.biggerBlock}>{type.pokemon.map((pokemon,index)=><Link className={styles.Link} key={index} to={`/pokemon/${pokemon.pokemon.name}`}>
                    <div className={styles.block}><PokemonImage url={pokemon.pokemon.url}/>
                        <h3 className={styles.h3}>{pokemon.pokemon.name.toUpperCase()}</h3></div></Link>)}</div>}
            </div>
            );
};

export default SearchByType;