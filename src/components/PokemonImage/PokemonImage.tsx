import React, { FC} from 'react';
import { pokemonsService } from '../../services/api.service';
import styles from './pokeImage.module.css'
interface IProps{
    url:string
}
const PokemonImage:FC<IProps> = ({url}) => {
    const id= url.split('/')[url.split('/').length - 2];
    const pokemonImage= pokemonsService.getImageById(id);
    return (
        <div>
            <img className={styles.image} src={pokemonImage} alt='poke'/>
        </div>
    );
};

export default PokemonImage;