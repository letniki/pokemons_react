import React, { FC } from 'react';
import {useAppDispatch, useAppSelector } from '../../redux/store';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import { Link } from 'react-router-dom';


const FavouriteComponent:FC = () => {
    const {images, favourite} = useAppSelector(state => state.pokemonStore);
    const dispatch=useAppDispatch();
    console.log(favourite);
    return (
        <div>
            {favourite.map(name => <div>
                <Link
                    to={`/pokemon/${name}`}>{name}
                    <img src={images[name]} alt={name}/>
                </Link>

            </div>)}
        </div>
    );
};

export default FavouriteComponent;