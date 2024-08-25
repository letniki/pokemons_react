import React, { FC, useEffect } from 'react';
import { useAppSelector } from '../../redux/store';
import { IPokemon } from '../../models/IPokemon';
import { pokemonActions } from '../../redux/slices/pokemonsSlice';
import { pokemonsService } from '../../services/api.service';

interface IProps{
    url:string
}
const PokemonImage:FC<IProps> = ({url}) => {
  const id=url.slice(url.lastIndexOf('n')+2, url.lastIndexOf('/'));
  // const id = urlParts[urlParts.length - 2];
  // console.log(urlParts);
    const pokemonImage= pokemonsService.getImageById(id);
    return (
        <div>
            <img src={pokemonImage} alt='poke'/>
        </div>
    );
};

export default PokemonImage;

function dispatch(arg0: any) {
        throw new Error('Function not implemented.');
    }
