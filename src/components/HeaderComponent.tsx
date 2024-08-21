import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <ul>
            <li><Link to={'pokemon'}>Pokemons Page</Link></li>
            {/*<li><Link to={'posts'}>Posts Page</Link></li>*/}
            {/*<li><Link to={'comments'}>Comments Page</Link></li>*/}
        </ul>
    );
};

export default HeaderComponent;