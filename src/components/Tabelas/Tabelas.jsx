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

    useEffect(() => {
        const novo = async () => {
            const querySnapshot = await getDocs(collection(db, "dados"));
            const dadosArray = []


            querySnapshot.forEach((doc) => {
                dadosArray.push(doc.id)
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


    return (
        <main className=" min-h-[89vh]   flex items-center justify-center bg-red-400">
            <div className="container h-auto py-6 flex justify-center flex-wrap gap-8">
                {dados.length > 0 ? (
                    dados.map((categoria) => (
                        <Tabela key={categoria} categoria={categoria} childToParent={childToParent} childToParent2={childToParent2} estado={estado}/>
                    ) )
                ): (
                    <p>nenhum dados encontrado...</p>
                )}
            </div>
            {estadoModal && (
                <BasicModal  produto={produto} categ={categoria} onClose={() => setEstadoModal(false)} eventEstado={estadoModal}  />
            )}

        </main>
    )
}