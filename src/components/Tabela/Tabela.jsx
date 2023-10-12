"use client"

import { collection, getDocs, where, query } from "firebase/firestore"
import { db } from "@/firebase/firestore";
import { useEffect, useState } from "react";

export default function Tabela({ categoria, childToParent, estado, childToParent2, cor, valorCadaCategoria }) {
    const [produtos, setProdutos] = useState([])
    const [produtosComprados, setProdutosComprados] = useState([])
    const [valorGasto, setValorGasto] = useState(0)
    const [valorAnterior, setValorAnterior] = useState(0);

    useEffect(() => {
        const requisicao = async () => {
            const querySnapshot = await getDocs(collection(db, "dados", categoria, "produtos"));
            let produtoArray = []
            querySnapshot.forEach((doc) => {
                let dadosProdutos = {
                    id: doc.id,
                    dados: doc.data()
                }
                produtoArray.push(dadosProdutos)
            });
            setProdutos(produtoArray)
        }
        requisicao()
    }, [])


    const abrirModal = (produto, categoria) => {
        childToParent(produto);
        estado(true);
        childToParent2(categoria)
    };





    useEffect(() => {

        const bdComprado = async () => {
            const bdProdutoComprado = query(collection(db, "dados", categoria, "produtos"), where("pago", "==", true));
            let produtoCompradoArray = []
            const querySnapshot = await getDocs(bdProdutoComprado);
            querySnapshot.forEach((doc) => {
                produtoCompradoArray.push(doc.data())
            });
            setProdutosComprados(produtoCompradoArray)
            const valor = produtosComprados.reduce((total, produto) => total + parseFloat(produto.valor), 0)
            setValorGasto(valor)
        }
        bdComprado()
    }, [produtosComprados])


    useEffect(() => {
        valorCadaCategoria(valorGasto, valorAnterior);
        setValorAnterior(valorGasto);
    }, [valorGasto]);

    








    return (
        <div className="w-96  bg-slate-200 border border-gray-400 rounded-lg overflow-hidden flex flex-col justify-between">
            <div className="py-2 text-center font-bold text-white text-lg " style={{ "backgroundColor": `${cor}` }}>
                <h1>{categoria.toUpperCase()}</h1>
            </div>
            <div>
                <ul className="px-6 py-3 flex flex-col gap-2">
                    {produtos.length > 0 ? (

                        produtos.map((produto) => (
                            <li key={produto.id} value={produto.id} onDoubleClick={() => abrirModal(produto.id, categoria)} className="flex gap-1">
                                <input id={produto.id} defaultChecked={produto.dados.pago === true ? true : false} type="checkbox" />
                                <label>{produto.id}</label>
                            </li>
                        ))

                    ) : (
                        <p>Ainda não possui produto!</p>
                    )}
                </ul>
            </div>
            <div className="flex w-full  py-1 justify-evenly font-semibold text-white" style={{ "backgroundColor": `${cor}55` }}>
                <h1>Total gasto:</h1>
                <span>
                    {valorGasto.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </span>
            </div>
        </div>
    )
}

