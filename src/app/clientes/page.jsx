"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Clientes.module.css";

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
      reserva: null,
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
          setData({
            clientes: clientes,
            loading: false,
            current: 1,
            pageSize: 5,
          });
        } catch {
          toast.error("Erro ao carregar os clientes");
          setData((d) => ({ ...d, loading: false }));
        }
      };
      fetchClientes();
    }, []);

const openModal = async (cliente) => {
  setModalInfo({ visible: true, cliente, reserva: null, loading: true });

  try {
    const { data: reserva } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/reservas/${cliente.id}`,
      {
        headers: HEADERS,
      }
    );
    setModalInfo((m) => ({ ...m, reserva, loading: false }));
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
  <div>
    <h1>Lista de clientes</h1>

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
        {paginatedClientes().map((clientes) => (
          <Card
            key={clientes.id}
            className={styles.card}
            hoverable
            onClick={() => openModal(clientes)}
            cover={
              <Image
                alt={clientes.name}
                src={clientes.foto ? clientes.foto : "./images/220.svg"}
                width={220}
                height={220}
              />
            }
          >
            <Card.Meta
              title={clientes.name}
            />
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
      ) : modalInfo.reserva ? (
        <div className={styles.reservaInfo}>
          <p>
            <span className={styles.label}>Mês da Reserva:</span>{" "}
            {modalInfo.reserva.mes_reserva}
          </p>
          <p>
            <span className={styles.label}>Tipo da reserva:</span>{" "}
            {modalInfo.reserva.tipo_reserva}
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