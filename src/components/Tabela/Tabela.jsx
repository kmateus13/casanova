"use client"

import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/firestore";
import { useEffect, useState } from "react";

export default function Tabela({ categoria, childToParent, estado, childToParent2 }) {


    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        const requisicao = async () => {
            const querySnapshot = await getDocs(collection(db, "dados", categoria, "produtos"));
            let produtoArray = []


            querySnapshot.forEach((doc) => {
                produtoArray.push(doc.id)
            });
            setProdutos(produtoArray)
        }

        requisicao()

    }, [categoria])


    const abrirModal = (produto, categoria) => {
        childToParent(produto);
        estado(true);
        childToParent2(categoria)
    };




    return (
        <div className="w-96  bg-slate-200 border border-slate-800 rounded-lg overflow-hidden">


            <h1 className="py-3 text-center bg-slate-800 font-bold text-white ">{categoria}</h1>
            <ul className="px-6 py-3 flex flex-col gap-2">

                {produtos.length > 0 ? (

                    produtos.map((produto) => (
                        <li key={produto} value={produto} onDoubleClick={() => abrirModal(produto, categoria)} className="flex gap-1">
                            <input id={produto} type="checkbox" />
                            <label>{produto}</label>
                        </li>
                    ))

                ) : (
                    <p>Ainda não possui produto!</p>
                )}



            </ul>

        </div>
    )
}

