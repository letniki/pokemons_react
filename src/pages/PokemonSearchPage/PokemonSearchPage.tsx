import React from 'react';
import styles from './pokemonSearch.module.css'
import {Link} from "react-router-dom";

const PokemonSearchPage = () => {


    return (
        <div className={styles.block}>
            <Link to={'byType'}>Search By Type</Link>
            <Link to={'byAbility'}> Search By Ability</Link>
            <Link to={'byName'}>Search By Name</Link>
        </div>
    );
};

export default PokemonSearchPage;

