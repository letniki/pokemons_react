import React, { useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {pokemonActions} from "../../redux/slices/pokemonsSlice";
import {useParams} from "react-router-dom";
import FormsComponent from '../../components/FormsComponent/FormsComponent';
import styles from'./pokemonPage.module.css';

const PokemonPageByName = () => {
    let {name} = useParams();
    const dispatch=useAppDispatch();
    let {pokemon,formDetails} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        if(name){
            dispatch(pokemonActions.loadPokemonByName(name));
            dispatch(pokemonActions.loadFormDetails(name));
        }

    }, [name, dispatch]);
    const [nameForm, setNameForm] = useState<string>('');
    const handleButtonClick = (formName: string)=>{
       return setNameForm(formName);
    }

    return (
        <div className={styles.block}>
            {
               pokemon && (<div className={styles.smallerBlock}>
                    <h1>{pokemon.name.toUpperCase()}</h1>
                   <div>
                       {pokemon.sprites.front_default && <img className={styles.image} src={`${pokemon.sprites.front_default}`} alt={pokemon.name} />}
                       {pokemon.sprites.back_default && <img className={styles.image} src={`${pokemon.sprites.back_default}`} alt={pokemon.name} />}
                       {pokemon.sprites.front_shiny && <img className={styles.image} src={`${pokemon.sprites.front_shiny}`} alt={pokemon.name} />}
                       {pokemon.sprites.back_shiny && <img className={styles.image} src={`${pokemon.sprites.back_shiny}`} alt={pokemon.name} />}
                   </div>
                <div className={styles.bigBlock}>
                    <div className={styles.detailsBlock}><h2>ABILITIES</h2>
                        {
                            pokemon.abilities.map((poke,index) =><h3 className={styles.h3} key={index}>
                                {poke.ability.name}
                            </h3>)
                        }
                    </div>
                    <div className={styles.detailsBlock}><h2>STATS</h2>
                        {
                            pokemon.stats.map((poke,index) =><h3 key={index} className={styles.h3}>{poke.stat.name}:{poke.base_stat}</h3>)
                        }
                    </div>
                    <div className={styles.detailsBlock}><h2>TYPES</h2>
                        {
                            pokemon.types.map((type,index) => <h3 className={styles.h3} key={index}> {type.type.name}</h3>)
                        }

                    </div>
                    <div className={styles.detailsBlock}><h2>FORMS</h2>
                        {
                            pokemon.forms.map((form,index) =>
                                <button className={styles.button} onClick={() => handleButtonClick(form.name)} key={index}>
                                    <h3>
                                        {form.name.toUpperCase()}
                                    </h3>
                                </button>)
                        }

                    </div></div>
                    <FormsComponent id={pokemon.id.toString()}/>

                    {formDetails.map(formDetail => (
                        (nameForm === formDetail.name && <div className={styles.bigBlock} key={formDetail.id}><div className={styles.block}><h1>{formDetail.name.toUpperCase()}</h1><div>
                            {formDetail.sprites.front_default && <img className={styles.img} src={`${formDetail.sprites.front_default}`} alt={formDetail.name}/>}
                            {formDetail.sprites.back_default && <img className={styles.img} src={`${formDetail.sprites.back_default}`} alt={formDetail.name}/>}
                            {formDetail.sprites.front_shiny && <img className={styles.img} src={`${formDetail.sprites.front_shiny}`} alt={formDetail.name}/>}
                            {formDetail.sprites.back_shiny && <img className={styles.img} src={`${formDetail.sprites.back_shiny}`} alt={formDetail.name}/>}</div></div>
                            <div className={styles.bigBlock}>
                                <div className={styles.detailsBlock}><h2>ABILITIES</h2>
                                {
                                    pokemon.abilities.map((poke,index) => <h3 className={styles.h3} key={index}>{poke.ability.name}</h3>)
                                }
                                </div>
                            <div className={styles.detailsBlock}><h2>STATS</h2>
                                {
                                    pokemon.stats.map((poke,index) => <h3 className={styles.h3} key={index}>{poke.stat.name}:{poke.base_stat}</h3>)
                                }
                            </div>
                            <div className={styles.detailsBlock}><h2>TYPES</h2>
                            {
                                formDetail.types.map((type,index) => <h3 className={styles.h3} key={index}>{type.type.name}</h3>)
                            }
                            </div>
                            </div>
                        </div>)
                    ))}
                </div>)
            }
        </div>
    );
};

export default PokemonPageByName;