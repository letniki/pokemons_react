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
    const {images, offset} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        results.forEach(value=>{
            if(!images[value.name]){
            dispatch(pokemonActions.loadPokemonImage(value.name));
            console.log(results);
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

    const saveToLocalStorage =(pokeName:string)=>{
        if(!localStorage.getItem('favourite')){
        localStorage.setItem('favourite', JSON.stringify([]));
        };
       let oldFavourites = JSON.parse(localStorage['favourite']);
        oldFavourites.push(pokeName);
        console.log(oldFavourites);
        localStorage.setItem('favourite', JSON.stringify(oldFavourites));
    }
    return (
        <div className={styles.block}>
            {results.map((pokemon,index) => <div className={styles.smallerBlock} key={index}>
                <button onClick={()=>saveToLocalStorage(pokemon.name)} >Fav</button>
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