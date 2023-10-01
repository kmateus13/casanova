import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { setDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/firestore";

export default function ModalToggle({ dadosProduto, categoriaAcessada }) {


    const [data, setData] = useState()
    const [valor, setValor] = useState()
    const [metodoPagamento, setMetodoPagamento] = useState()


    useEffect(() => {
        if (dadosProduto.dados.data) {
            // let e = new Date(dadosProduto.dados.data.seconds * 1000)
            const valorFormatado = dadosProduto.dados.valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL' // Define a moeda para Real Brasileiro (outra moeda, se necessário)
            });
            console.log(dadosProduto.dados.data)
            setData(dadosProduto.dados.data)
            setValor(valorFormatado)
            setMetodoPagamento(dadosProduto.dados.pagamento)
        }
    }, [])



    const enviarAtributosProduto = async () => {
        await setDoc(doc(db, "dados", categoriaAcessada, "produtos", dadosProduto.id), {
            data: data,
            valor: valor,
            pago: true,
            pagamento: metodoPagamento
        });
        
    }



    return (
        <div className='border p-4'>
            <div className='flex flex-col gap-3'>
                <span className='flex gap-4'>
                    <label htmlFor="data" className='font-bold text-base'>Data da Compra:</label>
                    <input id='data' type="date" className='border-b border-black h-6 outline-none' defaultValue={data} onChange={(event) => setData(event.target.value)} />
                </span>
                <span className='flex gap-4 '>
                    <label htmlFor="valor" className='font-bold text-base'>Valor do Produto:</label>
                    <input type="text" name="" id="valor" value={valor} onChange={(event) => setValor(event.target.value)} className='border-b border-black h-6 outline-none' />
                </span>
                <span className='flex gap-4'>
                    <label htmlFor="metodoPagamento" className='font-bold text-base'>Meotodo de pagamento:</label>
                    <input type="text" id='metodoPagamento' value={metodoPagamento} onChange={(event) => setMetodoPagamento(event.target.value)} className='border-b border-black h-6 outline-none' />
                </span>
            </div>
            <div className='flex gap-6 mt-3'>
                <Button variant="outlined" onClick={() => enviarAtributosProduto()}>Salvar</Button>
            </div>

        </div>
    )
}