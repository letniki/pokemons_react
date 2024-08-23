import React, {FC, useEffect, useState} from 'react';
import {IPokemon} from "../../models/IPokemon";
import {Link} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import styles from './pokemonsComponent.module.css';

interface IProps{
    results:IPokemon[]
}
const PokemonsComponent:FC<IProps> = ({results}) => {
    const dispatch=useAppDispatch();
    const {images, offset, limit, favourite} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        results.forEach(value=>{
            if(!images[value.name]){
            dispatch(pokemonActions.loadPokemonImage(value.name));
            console.log(results);
            console.log(favourite);
            }
        }
    )
    }, [results,images, dispatch]);
    // const nextPage = () => {
    //     dispatch(pokemonActions.setOffset(offset + limit));
    // };
    //
    // const prevPage = () => {
    //     if (offset > 0) {
    //         dispatch(pokemonActions.setOffset(offset - limit));
    //     }
    // };


    return (
        <div className={styles.block}>
            {results.map(pokemon => <div className={styles.smallerBlock}>
                <button onClick={()=>dispatch(pokemonActions.setFavourite(pokemon.name))}></button>
                <Link
                    to={`/pokemon/${pokemon.name}`}>{pokemon.name}
                    <img src={images[pokemon.name]} alt={pokemon.name}/>
                </Link>

            </div>)}
            {/*<div>*/}
            {/*<button onClick={prevPage} disabled={offset === 0}>*/}
            {/*    Prev*/}
            {/*</button>*/}
            {/*<button onClick={nextPage}>*/}
            {/*    Next*/}
            {/*</button>*/}
            {/*</div>*/}
        </div>
    );
};

export default PokemonsComponent;