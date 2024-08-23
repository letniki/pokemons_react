import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonActions} from "../../redux/slices/pokemonsSlice";
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
            {
               pokemon && (<div>
                    <h1>{pokemon.name}</h1>
                    <img src={`${pokemon.sprites.other.home.front_default}`} alt={pokemon.name}/>
                    <div className="abilities"><h2>Abilities</h2>
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
                    <div className="base-stat"><h2>Stats:</h2>
                        {
                            pokemon.stats.map(poke => {
                                return (
                                    <>
                                        <h3>{poke.stat.name}:{poke.base_stat}</h3>
                                    </>
                                )
                            })
                        }
                    </div><h2>Types:</h2>
                    <div>{pokemon.types.map(type => <div>type: {type.type.name}</div>)}</div>
                <div>{pokemon.forms.map(form=><div>{form.name}-{form.url}</div>)}</div>
                <FormsComponent id={pokemon.id}/>
                </div>)
            }
        </div>
    );
};

export default PokemonPageByName;