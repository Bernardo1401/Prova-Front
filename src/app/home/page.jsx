import styles from "./Home.module.css";
import React from 'react';
import { Spin } from 'antd';
import Buttom from '../../components/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.cardMae}>
            <h1 className={styles.title}>Seja bem vindo(A)</h1>
            <div className={styles.card}>
                <Image className={styles.img}
                    src="/images/bernardo.png"
                    alt="Eu"
                    width={150}
                    height={50}
                    priority
                />
                <div className={styles.lista}>
                    <p>Nome: Bernardo Gabriel De Moraes Marques</p>
                    <p>Turma: 3TDS1</p>
                    <p>Instrutores: Thiago e Marcello</p>
                    <p>Matéria: Front-End</p>
                    <p>Atividade: Prova-Prática</p>
                    <p>Essa é uma atividade para gerenciar e mostrar visualmete uma API sobre clientes e suas reservas em um hotel, o proposito é facilitar e ajudar o cliente a ter uma melhor experiência</p>
                </div>
            </div>
            <div className={styles.button}>
            <Link href="/clientes" className={styles.link}>
                <Buttom title="ir para API"/>
                </Link>
            </div>
            <div className={styles.loading}>
            </div>
            </div>
        </div>
    );
}
