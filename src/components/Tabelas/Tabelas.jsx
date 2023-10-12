"use client"

import { doc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/firebase/firestore";
import Tabela from "../Tabela/Tabela";
import { useEffect, useState } from "react";
import BasicModal from "../Modal/Modal";

export default function Tabelas() {
    const [dados, setDados] = useState([])
    const [produto, setProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estadoModal, setEstadoModal] = useState(false)
    const [totalGasto, setTotalGasto] = useState(0);


    useEffect(() => {
        const novo = async () => {
            const querySnapshot = await getDocs(collection(db, "dados"));
            const dadosArray = []


            querySnapshot.forEach((doc) => {
                let arrayCategorias = {
                    nomeCategoria: doc.id,
                    corCategoria: doc.data()
                }
                dadosArray.push(arrayCategorias)
            });

            setDados(dadosArray)
        }

        novo()
    }, [])


    const childToParent = (childdata) => {
        setProduto(childdata)
    }

    const childToParent2 = (categ) => {
        setCategoria(categ)
    }

    const estado = (event) => {
        setEstadoModal(event)
    }

    const valorCadaCategoria = (novoValor, valorAnterior) => {
        setTotalGasto((prevTotal) => prevTotal - valorAnterior + novoValor);
    }

   


    return (
        <main className=" h-full  relative flex items-center justify-center" style={{ "backgroundImage": `url(/textura-de-papel-quadrado.jpg)`, "backgroundSize": "cover" }}>
            <div className="absolute w-1/5 h-12 bg-white flex items-center justify-center bottom-0 right-0 mb-28 gap-1">
                <label>Total Gasto:</label>
                <span>{totalGasto}</span>
            </div>
            <div className="container h-auto py-6 flex justify-center flex-wrap gap-8">
                {dados.length > 0 ? (
                    dados.map((categoria) => (
                        <Tabela  
                        key={categoria.nomeCategoria} categoria={categoria.nomeCategoria} cor={categoria.corCategoria.cor} childToParent={childToParent} childToParent2={childToParent2} estado={estado} valorCadaCategoria={valorCadaCategoria} />
                    ))
                ) : (
                    <p>nenhum dados encontrado...</p>
                )}
            </div>
            {estadoModal && (
                <BasicModal produto={produto} categ={categoria} onClose={() => setEstadoModal(false)} eventEstado={estadoModal} />
            )}

        </main>
    )
}