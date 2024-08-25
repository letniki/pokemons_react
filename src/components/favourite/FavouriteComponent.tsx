import React, { FC } from 'react';
import {useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import { Link } from 'react-router-dom';


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
        <div>
            {favoriteNames && <div>{favoriteNames.map((name:string, index) => <div key={index}>
                <Link
                    to={`/pokemon/${name}`}>{name}
                    <img src={images[name]} alt={name}/>
                </Link>

             </div>)}</div>}
        </div>
    );
};

export default FavouriteComponent;