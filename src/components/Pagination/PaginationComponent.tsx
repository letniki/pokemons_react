import React, {FC} from 'react';
import {useSearchParams} from "react-router-dom";
import styles from './pagination.module.css';

interface IProps {
    prev: string | null,
    next: string | null
}
const PaginationComponent: FC<IProps> = ({prev,next}) => {

    const [query, setQuery] = useSearchParams({page: '1'})

    return (
        <div>
            <div className={styles.pagination}>
                <button className={styles.button} disabled={!prev} onClick={() => {
                    const page = query.get('page')
                    if (page) {
                        let currentPage = +page
                        currentPage--;
                        setQuery({page: currentPage.toString()})
                    }
                }}>
                    PREV
                </button>
                <h3 className={styles.h3}>You are on {query.get('page')} page</h3>
                <button className={styles.button} disabled={!next} onClick={() => {
                    const page = query.get('page')
                    if (page) {
                        let currentPage = +page
                        currentPage++;
                        setQuery({page: currentPage.toString()})
                    }
                }}>
                    NEXT
                </button>
            </div>

        </div>
    );
};

export default PaginationComponent;