import React from 'react';
import {Link} from "react-router-dom";
import styles from './header.module.css'
const HeaderComponent = () => {
    if(!localStorage.getItem('favorite')){
        localStorage.setItem('favorite', JSON.stringify([]));
    }

    return (
        <nav className={styles.block}>
            <Link className={styles.Link} to={'pokemon'}>Pokemons Page</Link>
            <Link className={styles.Link} to={'pokemon/favourite'}><div className={styles.heart}>&#10084;</div></Link>
            <Link className={styles.Link} to={'pokemon/search'}>Search Pokemon</Link>
            <Link className={styles.Link} to={'https://github.com/letniki'}><img src="" alt=""/></Link>
        </nav>
    );
};

export default HeaderComponent;