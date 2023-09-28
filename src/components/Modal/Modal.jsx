"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/firestore";
import { Button, Switch } from '@mui/material';
import ModalToggle from '../ModalToggle/ModalToggle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ produto, onClose, eventEstado, categ }) {
    const [open, setOpen] = useState(false);
    const [infoProdutos, setInfoProdutos] = useState([])
    const [estadoToggle, setEstadoToggle] = useState(true)



    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason) {
            return
        }
        setOpen(false)
    }


    useEffect(() => {
        const requisicao = async () => {
            const querySnapshot = await getDocs(collection(db, "dados", categ, "produtos"));
            let produtoArray = []

            querySnapshot.forEach((doc) => {

                if (doc.id === produto) {
                    let dadosProdutos = {
                        id: doc.id,
                        dados: doc.data()
                    }
                    produtoArray.push(dadosProdutos)
                }
            });
            setInfoProdutos(produtoArray)
        }

        requisicao()

    }, [produto])


    useEffect(() => {
        setOpen(eventEstado)
    }, [eventEstado])



    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h1" className='text-center'>Informções do produto</Typography>

                    {infoProdutos.map((e) => (

                        <div key={e.id} className='flex flex-col gap-2 mt-4'>
                            <span className='flex gap-4'>
                                <label className='font-bold text-base'>Produto:</label>
                                <label>{e.id}</label>
                            </span>
                            <span className='flex gap-4'>
                                <label className='font-bold text-base'>Adicionado por:</label>
                                <label>{e.dados.usuario}</label>

                            </span>
                            <span className='flex gap-4 items-center'>
                                <label htmlFor={`toggle-${e.id}`} className='font-bold text-base'>Situação:</label>
                                <Switch id={`toggle-${e.id}`} defaultChecked={e.dados.pago} onChange={(i) => setEstadoToggle(i.target.checked)} value={estadoToggle} />
                            </span>

                            {estadoToggle === e.dados.pago ? (
                                <ModalToggle dadosProduto={e} />
                            ) : (
                                ""
                            )}

                        </div>
                    ))}
                    <div>
                        <Button onClick={onClose} variant="contained" className='bg-cyan-600'>Fechar</Button>
                        <Button variant="outlined">Salvar</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}