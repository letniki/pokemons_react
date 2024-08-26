import React, {FC} from 'react';
import {IFormInfo} from "../../models/IFormInfo";
import styles from'./FormInfo.module.css'
interface IProps {
    form: IFormInfo
}

const FormInfoComponent:FC<IProps> = ({form}) => {
    return (
        <div className={styles.block}>
            <h3> {form.name.toUpperCase()}</h3>
            <h4>Default form:</h4> <h5>{(form.is_default).toString()}</h5>
            <h4>Only battle:</h4> <h5>{(form.is_battle_only).toString()}</h5>
            <h4>Is mega form:</h4> <h5>{(form.is_mega).toString()}</h5>
            <h4>version:</h4> <h5>{form.version_group.name}</h5>
            <div>
                <img className={styles.image} src={form.sprites.front_shiny} alt="front"/>
                <img className={styles.image} src={form.sprites.back_shiny} alt="back"/>
            </div>
        </div>
    );
};

export default FormInfoComponent;