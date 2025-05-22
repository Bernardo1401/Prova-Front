import React from 'react';
import Link from 'next/link';
import StyleSheet from '../styles/Button.module.css';

export default function Buttom() {
    return (
        <div>
            <Link href="/clientes" className={StyleSheet.link}>
                <button className={StyleSheet.button}>Ir para API gerenciada via axios</button>
            </Link>
        </div>
    );
}

