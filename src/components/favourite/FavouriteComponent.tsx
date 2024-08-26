import React, { FC } from 'react';
import {useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import { Link } from 'react-router-dom';
import styles from './favorite.module.css'

const FavouriteComponent:FC = () => {
    const {images} = useAppSelector(state => state.pokemonStore);
    const dispatch=useAppDispatch();
    let favorite = JSON.parse(localStorage['favorite']);
    console.log(favorite);
    let favoriteNames:string[]=[];
    for (const favoriteElement of favorite) {
        if(!favoriteNames.includes(favoriteElement)){
            favoriteNames.push(favoriteElement);
            console.log(favoriteNames);
            dispatch(pokemonActions.loadPokemonImage(favoriteElement));
        }
    }

    // const pokemonImage= pokemonsService.getImageById();
    return (
        <div >
            {favoriteNames && <div className={styles.biggerBlock} >{favoriteNames.map((name:string, index) =>
                <Link className={styles.Link}
                      key={index}
                      to={`/pokemon/${name}`}>
                    <div className={styles.block}>
                    <h3 className={styles.h3}>{name.toUpperCase()}</h3>
                    <img className={styles.image} src={images[name]} alt={name}/></div>
                </Link>

             )}</div>}
        </div>
    );
};

export default FavouriteComponent;