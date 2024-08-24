import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonActions} from "../../redux/slices/pokemonsSlice";
import {Link, useParams} from "react-router-dom";
import FormsComponent from '../../components/FormsComponent/FormsComponent';


const PokemonPageByName = () => {
    let {name} = useParams();
    const dispatch=useAppDispatch();
    let {pokemon,formDetails} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        if(name){
            dispatch(pokemonActions.loadPokemonByName(name));
            dispatch(pokemonActions.loadFormDetails(name));
        }

    }, [name]);
    console.log(pokemon);
    const [nameForm, setNameForm] = useState<string>('');
    const handleButtonClick = (formName: string)=>{
       return setNameForm(formName);
    }

    return (
        <div>
            {
               pokemon && (<div>
                    <h1>{pokemon.name}</h1>
                    <img src={`${pokemon.sprites.other.home.front_default}`} alt={pokemon.name} key={pokemon.id}/>
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
                    </div>
                    <h2>Types:</h2>
                    <div>{pokemon.types.map(type => <div>type: {type.type.name}</div>)}</div>
                    <div>{pokemon.forms.map(form => <button onClick={()=> handleButtonClick(form.name)}>{form.name}
                       </button>)}</div>
                <h4>Evolution</h4>
                    <FormsComponent id={pokemon.id.toString()}/>


                    {formDetails.map(formDetail => (
                        (nameForm == formDetail.name && <div><h2>{formDetail.name}</h2>
                            <img src={`${formDetail.sprites.front_default}`} alt={formDetail.name}/>
                            <img src={`${formDetail.sprites.back_default}`} alt={formDetail.name}/>
                            <img src={`${formDetail.sprites.front_shiny}`} alt={formDetail.name}/>
                            <img src={`${formDetail.sprites.back_shiny}`} alt={formDetail.name}/>
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
                            </div>
                            <h2>Types:</h2>
                            <div>{formDetail.types.map(type => <div>type: {type.type.name}</div>)}</div>
                        </div>)
                        ))}
                </div>)
            }
        </div>
    );
};

export default PokemonPageByName;