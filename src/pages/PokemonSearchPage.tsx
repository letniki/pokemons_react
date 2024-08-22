import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { pokemonActions } from '../redux/slices/pokemonsSlice';
import { IForm } from '../models/IForm';
import { useNavigate } from 'react-router-dom';

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
    let {pokemon} = useAppSelector(state => state.pokemonStore);
    const onSubmitFormHandler = () => {
        setSubmittedQuery(query);

    };

    useEffect(() => {
        console.log(submittedQuery);
            dispatch(pokemonActions.loadPokemonByName(submittedQuery));
    }, [submittedQuery]);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitFormHandler)}>
                <div>
                    <input type="text" {...register('name')} value={query} onChange={(e) => setQuery(e.target.value)}/>
                </div>
                <button type="submit">send</button>
            </form>
            {pokemon.name===submittedQuery && (<div>
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

