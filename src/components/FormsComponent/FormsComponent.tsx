import React, {FC, useEffect, useState} from 'react';
import {IEvolutionForms} from "../../models/IEvolutionForms";
import FormComponent from "../FormComponent/FormComponent";
import { pokemonsService } from '../../services/api.service';
import { IEvolution } from '../../models/IEvolution';
import {AxiosError} from "axios";

interface IProps {
    id: string
}

const FormsComponent: FC<IProps> = ({id}) => {

    const [evolutionChain, setEvolutionChain] = useState<IEvolution | null>(null);
    useEffect(() => {
        const fetchEvolutionChain = async () => {
            if(id!=='0'){
                    const response = await pokemonsService.getEvolutionChain(id);
                    setEvolutionChain(response);
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
                    console.error(error?.response?.data);
                }
            }
        };
        fetchForms();
    }, [evolutionChain]);


    return (
        <div>
            {forms && (
                <FormComponent forms={forms} />)
            }
        </div>
    );
}

export default FormsComponent;