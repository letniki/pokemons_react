import React from 'react';
import {Link} from "react-router-dom";
import styles from './header.module.css'
const HeaderComponent = () => {
    return (
        <div className={styles.block}>
            <Link to={'pokemon'}>Pokemons Page</Link>
            <Link to={'pokemon/search'}>Search Pokemon</Link>
            {/*<li><Link to={'posts'}>Posts Page</Link></li>*/}
            {/*<li><Link to={'comments'}>Comments Page</Link></li>*/}
        </div>
    );
};

export default HeaderComponent;