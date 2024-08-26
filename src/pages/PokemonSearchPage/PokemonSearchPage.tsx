import React from 'react';
import styles from './pokemonSearch.module.css'
import {Link} from "react-router-dom";

const PokemonSearchPage = () => {


    return (
        <div className={styles.block}>
            <Link className={styles.Link} to={'byType'}>Search By Type</Link>
            <Link className={styles.Link} to={'byAbility'}> Search By Ability</Link>
            <Link className={styles.Link} to={'byName'}>Search By Name</Link>
        </div>
    );
};

export default PokemonSearchPage;

