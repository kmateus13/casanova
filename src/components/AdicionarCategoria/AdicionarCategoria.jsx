import { Button, TextField, Typography } from "@mui/material";
import { BiSitemap } from "react-icons/bi";
import { collection, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase/firestore";
import { useEffect, useState } from "react";
import { MdDeleteForever } from 'react-icons/md'

export default function AdicionarCategoria() {

    const [dados, setDados] = useState([])
    const [nomeCategoria, setNomeCategoria] = useState('')
    const [corCategoria, setCorCategoria] = useState('')


    const listaCategorias = async () => {
        const querySnapshot = await getDocs(collection(db, "dados"));
        const dadosArray = []

        querySnapshot.forEach((doc) => {
            dadosArray.push(doc.id)
        });

        setDados(dadosArray)
    }


    useEffect(() => {
        listaCategorias()
    }, [])


    const enviarDadosCategoria = async () => {

        await setDoc(doc(db, "dados", nomeCategoria), {cor: `${corCategoria}`});

        listaCategorias()
        setNomeCategoria('')
        setCorCategoria('')
    }


    const excluirCategoria = async (categoria) => {
        await deleteDoc(doc(db, "dados", categoria));
        listaCategorias()
    }

    return (
        <>
            <div className="flex gap-4 items-center">
                <div className="flex items-center gap-4">
                    <BiSitemap size={30} />
                    <TextField id="outlined-basic" label="Nova categoria" variant="outlined" value={nomeCategoria} onChange={(e) => setNomeCategoria(e.target.value)} />
                </div>
                <div>
                    <input type="color" value={corCategoria} onChange={(e) => setCorCategoria(e.target.value)} />
                </div>
                <div>
                    <Button variant="contained" className="bg-blue-700" onClick={() => enviarDadosCategoria()}>Salvar</Button>
                </div>
            </div>
            <div className=" flex flex-col container p-8 mt-6 bg-slate-500 items-center">
                <Typography variant="h3" component="h1">
                    Lista de Categorias
                </Typography>
                <div className="flex container items-center bg-slate-100 mt-6" >
                    {dados.length !== 0 ? (
                        <ul className="w-full flex flex-col">
                            {dados.map((categoria) => (
                                <li className="flex justify-between px-8 h-14 items-center font-bold text-lg border" key={categoria}>
                                    {categoria}
                                    <MdDeleteForever onClick={() => excluirCategoria(categoria)} cursor="pointer" size={25} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h1>CARREGANDO...</h1>
                    )}

                </div>
            </div>
        </>
    )
}