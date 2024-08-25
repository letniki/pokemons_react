import { useForm } from "react-hook-form";
import { IForm, ISearchByType } from "../../models/IForm";
import {useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { pokemonActions } from "../../redux/slices/pokemonsSlice";
import { Link, useNavigate } from "react-router-dom";
import PokemonImage from "../PokemonImage/PokemonImage";

const SearchByType = () => {
            const [submittedQuery, setSubmittedQuery] = useState<string>('');
            const [query, setQuery] = useState<string>('');
            let {
            register,
            handleSubmit
        } = useForm<ISearchByType>();
            const dispatch = useAppDispatch();
            let {pokemon, type} = useAppSelector(state => state.pokemonStore);

            const onSubmitFormHandler = () => {
            setSubmittedQuery(query.toLowerCase());

        };
            useEffect(() => {
                console.log(submittedQuery);
                if (submittedQuery) {
                    dispatch(pokemonActions.loadPokemonByType(submittedQuery));
                }
        }, [submittedQuery, dispatch]);
            console.log(type);
            return (
            <div>
            <form onSubmit={handleSubmit(onSubmitFormHandler)}>
            <div>
                <input type='text' placeholder='Search Pokemons By Type' {...register('type')} value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>
            <button type='submit'>Search</button>
        </form>
        <div>
            {type && <div>{type.pokemon.map(pokemon=><Link to={`/pokemon/${pokemon.pokemon.name}`}>
               <PokemonImage url={pokemon.pokemon.url}/>
            <h3>{pokemon.pokemon.name}</h3></Link>)}</div>}
        </div>


{/*// {pokemon.name === submittedQuery && (<div>*/}
{/*//         <h1>{pokemon.name}</h1>*/}
{/*//         <img src={`${pokemon.sprites.other.home.front_default}`} alt={pokemon.name}/>*/}
{/*//         <div className="abilities">*/}
{/*//             {*/}
{/*//                 pokemon.abilities.map(poke => {*/}
{/*//                     return (*/}
{/*//                         <>*/}
{/*//                             <div className="group">*/}
{/*//                                 <h3>{poke.ability.name}</h3>*/}
{/*//                             </div>*/}
{/*//                         </>*/}
{/*//                     )*/}
{/*//                 })*/}
{/*//             }*/}
{/*//         </div>*/}
{/*//         <div className="base-stat">*/}
{/*//             {*/}
{/*//                 pokemon.stats.map(poke => {*/}
{/*//                     return (*/}
{/*//                         <>*/}
{/*//                             <h3>{poke.stat.name}:{poke.base_stat}</h3>*/}
{/*//                         </>*/}
{/*//                     )*/}
{/*//                 })*/}
{/*//             }*/}
{/*//         </div>*/}
{/*//         <div>{pokemon.types.map(type => <div>type: {type.type.name}</div>)}</div>*/}
{/*//     </div>)*/}
{/*// }*/}
</div>
);
};

export default SearchByType;