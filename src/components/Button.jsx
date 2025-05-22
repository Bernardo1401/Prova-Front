import React from 'react';
import styles from '../styles/Button.module.css';

export default function Buttom({title}) {
    return (
        <div>
            
                <button className={styles.button}>{title}</button>
        </div>
    );
}

