import React, { FC } from 'react';
import {useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import { Link } from 'react-router-dom';


const FavouriteComponent:FC = () => {
    const {images} = useAppSelector(state => state.pokemonStore);
    const dispatch=useAppDispatch();
    let favourite = JSON.parse(localStorage['favourite']);
    console.log(favourite);
    let favoriteNames:string[]=[];
    for (const favouriteElement of favourite) {
        if(!favoriteNames.includes(favouriteElement)){
            favoriteNames.push(favouriteElement);
            console.log(favoriteNames);
            dispatch(pokemonActions.loadPokemonImage(favouriteElement));
        }
    }

    // const pokemonImage= pokemonsService.getImageById();
    return (
        <div>
            {favoriteNames && <div>{favoriteNames.map((name:string) => <div>
                <Link
                    to={`/pokemon/${name}`}>{name}
                    <img src={images[name]} alt={name}/>
                </Link>

             </div>)}</div>}
        </div>
    );
};

export default FavouriteComponent;