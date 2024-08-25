import React from 'react';
import {Link} from "react-router-dom";
import styles from './header.module.css'
const HeaderComponent = () => {
    if(!localStorage.getItem('favorite')){
        localStorage.setItem('favorite', JSON.stringify([]));
    }

    return (
        <div className={styles.block}>
            <Link to={'pokemon'}>Pokemons Page</Link>
            <Link to={'pokemon/favourite'} > Fav</Link>
            <Link to={'pokemon/search'}>Search Pokemon</Link>
            {/*<li><Link to={'comments'}>Comments Page</Link></li>*/}
        </div>
    );
};

export default HeaderComponent;