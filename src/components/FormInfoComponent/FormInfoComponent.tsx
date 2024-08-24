import React, {FC} from 'react';
import {IFormInfo} from "../../models/IFormInfo";

interface IProps {
    form: IFormInfo
}

const FormInfoComponent:FC<IProps> = ({form}) => {
    return (
        <div>
            <h3>Form name: {form.name}</h3>
            <div>Default form: {(form.is_default).toString()}</div>
            <div>Only battle: {(form.is_battle_only).toString()}</div>
            <div>Is mega form: {(form.is_mega).toString()}</div>
            version: {form.version_group.name}
            <div>
                <img src={form.sprites.front_shiny} alt="front"/>
                <img src={form.sprites.back_shiny} alt="back"/>
            </div>
        </div>
    );
};

export default FormInfoComponent;