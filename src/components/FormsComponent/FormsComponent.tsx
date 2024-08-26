import React, {FC, useEffect, useState} from 'react';
import {IEvolutionForms} from "../../models/IEvolutionForms";
import FormComponent from "../FormComponent/FormComponent";
import { pokemonsService } from '../../services/api.service';
import { IEvolution } from '../../models/IEvolution';
import {AxiosError} from "axios";
import styles from '../FormComponent/Form.module.css';
interface IProps {
    id: string
}

const FormsComponent: FC<IProps> = ({id}) => {

    const [evolutionChain, setEvolutionChain] = useState<IEvolution | null>(null);
    useEffect(() => {
        const fetchEvolutionChain = async () => {
            if(id && id!=='0'){
                try {
                    const response = await pokemonsService.getEvolutionChain(id);
                    setEvolutionChain(response);
                }catch (e){
                   const error = e as AxiosError;
                    console.log(error?.response?.data);
                }
            }
        };
        fetchEvolutionChain();
    }, [id]);

    const [forms, setForms] = useState<IEvolutionForms | null>(null)

    useEffect(() => {
        const fetchForms = async () => {
            if (evolutionChain?.evolution_chain.url) {
                const path = evolutionChain.evolution_chain.url.replace('https://pokeapi.co/api/v2', '');
                try {
                    const response = await pokemonsService.getAllForms(path);
                    setForms(response);
                } catch (e) {
                   const error = e as AxiosError;
                    console.log(error?.response?.data);
                }
            }
        };
        fetchForms();
    }, [evolutionChain]);
    return (
        <>
            {forms && (<div className={styles.Block}>
                <h2>EVOLUTION</h2>
                <FormComponent forms={forms} /></div>)
            }
        </>
    );
}

export default FormsComponent;