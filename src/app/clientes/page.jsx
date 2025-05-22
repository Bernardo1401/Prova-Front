"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Clientes.module.css";
import Link from 'next/link';
import Buttom from "../../components/Button";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Clientes() {
  const [data, setData] = useState({
    clientes: [],
    loading: true,
    current: 1,
    pageSize: 0,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    cliente: null,
    reservas: null,
    loading: false,
  });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const { data: clientes } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clientes`,
          {
            headers: HEADERS,
          }
        );
        setData({ clientes, loading: false, current: 1, pageSize: 5 });
      } catch {
        toast.error("Erro ao carregar clientes");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchClientes();
  }, []);

  const openModal = async (cliente) => {
    setModalInfo({ visible: true, cliente, reservas: null, loading: true });
    try { 
      const { data: reservas } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reservas`,
        {
          headers: HEADERS,
        }
      );
      setModalInfo((m) => ({ ...m, reservas, loading: false }));
    } catch {
      toast.error("Erro ao carregar reserva.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedClientes = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.clientes.slice(start, start + data.pageSize);
  };

  return (
    <div className={styles.container}>
      <Link href="/home" className={styles.link}>
                <Buttom title="ir para o peril" />
                </Link>
      <div className={styles.title}>
        <h1>Lista de Clientes</h1>
      </div>

      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.clientes.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "50"]}
      />

      {data.loading ? (
        <Image
          src="/images/loading.gif"
          width={300}
          height={200}
          alt="Loading"
        />
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedClientes().map((cliente) => (
            <Card
              key={cliente.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(cliente)}
              cover={
                <Image
                  alt={cliente.name}
                  src={
                    cliente.foto && cliente.foto.trim() !== ""
                      ? cliente.foto
                      : "/images/default-avatar.png"
                  }
                  width={220}
                  height={220}
                />
              }
            >
              <Card.Meta title={cliente.name} description={`Idade: ${cliente.idade}`} />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Reserva de ${modalInfo.cliente?.name}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            cliente: null,
            reserva: null,
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            cliente: null,
            reserva: null,
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.reservas ? (
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>Mês da reserva:</span>{" "}
              {modalInfo.reservas.mes_reserva}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Tipo de reserva:</span>{" "}
              {modalInfo.reservas.tipo_reserva}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Reserva não encontrada.</p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}