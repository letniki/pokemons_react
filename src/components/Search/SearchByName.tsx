import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AxiosError } from 'axios';
import { IForm } from '../../models/IForm';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';

const PokemonSearchPage = () => {
    const [submittedQuery, setSubmittedQuery] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    let {
        register,
        handleSubmit
    } = useForm<IForm>({
        defaultValues: {
            name: 'pikachu'
        }
    });
    const dispatch = useAppDispatch();
    let {pokemon, results} = useAppSelector(state => state.pokemonStore);

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
    }, [submittedQuery]);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitFormHandler)}>
                <div>
                    <input placeholder='Search by Name' type="text" {...register('name')} value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <button type="submit">Search</button>
            </form>
            {pokemon.name === submittedQuery && (<div>
                <h1>{pokemon.name}</h1>
                <img src={`${pokemon.sprites.other.home.front_default}`} alt={pokemon.name}/>
                <div className="abilities">
                    {
                        pokemon.abilities.map(poke => {
                            return (
                                <>
                                    <div className="group">
                                        <h3>{poke.ability.name}</h3>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="base-stat">
                    {
                        pokemon.stats.map(poke => {
                            return (
                                <>
                                    <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                </>
                            )
                        })
                    }
                </div>
                <div>{pokemon.types.map(type => <div>type: {type.type.name}</div>)}</div>
            </div>)
            }
        </div>
    );
};

export default PokemonSearchPage;

