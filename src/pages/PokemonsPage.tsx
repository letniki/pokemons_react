import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonActions} from "../redux/slices/pokemonsSlice";
import PokemonsComponent from '../components/PokemonsComponent/PokemonsComponent';
import PaginationComponent from '../components/Pagination/PaginationComponent';
import { useSearchParams } from 'react-router-dom';

const PokemonsPage = () => {
    const [query] = useSearchParams({page: '1'})
    const dispatch = useAppDispatch();
    let {results, error, limit,previous, next} = useAppSelector(state => state.pokemonStore);
    useEffect(() => {
        const currentPage = query.get('page');
        const page = currentPage ? Number(currentPage) : 1;
        dispatch(pokemonActions.loadPokemons({page}));
    }, [query.get('page'), dispatch]);
    return (
        <div>
            {
                <PokemonsComponent results={results}/>
            }
            <div>
                <PaginationComponent next={next} prev={previous}/>
                {/*<button onClick={prevPage} disabled={offset === 0}>*/}
                {/*    Prev*/}
                {/*</button>*/}
                {/*<button onClick={nextPage}>*/}
                {/*    Next*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default PokemonsPage;