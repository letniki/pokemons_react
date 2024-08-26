import React, {FC, useEffect, useState} from 'react';
import {IChain, IEvolutionForms} from "../../models/IEvolutionForms";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import FormInfoComponent from '../FormInfoComponent/FormInfoComponent';
import PokemonImage from "../PokemonImage/PokemonImage";
import {pokemonActions} from "../../redux/slices/pokemonsSlice";
import styles from './Form.module.css'
interface IProps {
    forms: IEvolutionForms
}

const FormComponent:FC<IProps> = ({forms}) => {

    const dispatch = useAppDispatch()
    let {evolution} = useAppSelector(state => state.pokemonStore)

    const [idForm, setIdForm] = useState<string | null>(null)

    const renderEvolutionChain = (chain: IChain) => {

        const handleButtonClick = (url: string) => {
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];
            setIdForm(id);
        }

        return (
            <div className={styles.BigBlock}>
                    <button className={styles.button} onClick={() => handleButtonClick(chain.species.url)}>
                        <h3 className={styles.h3}>{chain.species.name.toUpperCase()}</h3>
                        <PokemonImage url={chain.species.url}/>
                    </button>
                {chain.evolves_to.length > 0 && (chain.evolves_to.map((evolution, index) => (
                            <div key={index} >
                                 {renderEvolutionChain(evolution)}
                            </div>
                        ))
                )}
            </div>

        );
    };
    useEffect(() => {
        if (idForm)
            dispatch(pokemonActions.loadEvolution(idForm))
    }, [idForm, dispatch]);

    return (
        <>
            {renderEvolutionChain(forms.chain)}
            {idForm && <FormInfoComponent form={evolution} />}
        </>
    );
};

export default FormComponent;