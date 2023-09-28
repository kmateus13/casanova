import { useEffect, useState } from "react"

export default function ModalToggle({ dadosProduto }) {


    const [data, setData] = useState()
    const [valor, setValor] = useState()
    const [metodoPagamento, setMetodoPagamento] = useState()
    useEffect(() => {

        if (dadosProduto.dados.data) {

            let e = new Date(dadosProduto.dados.data.seconds * 1000)
            const valorFormatado = dadosProduto.dados.valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL' // Define a moeda para Real Brasileiro (outra moeda, se necessário)
            });

            setData(e.toISOString().split('T')[0])
            setValor(valorFormatado)
            setMetodoPagamento(dadosProduto.dados.pagamento)
        }
    }, [])


    return (
        <div className='border p-4'>
            <div className='flex flex-col gap-3'>
                <span className='flex gap-4'>
                    <label htmlFor="data" className='font-bold text-base'>Data da Compra:</label>
                    <input id='data' type="date" className='border-b border-black h-6' defaultValue={ data} onChange={(event) => setData(event.target.value)} />
                </span>
                <span className='flex gap-4 '>
                    <label htmlFor="valor" className='font-bold text-base'>Valor do Produto:</label>
                    <input type="text" name="" id="valor" value={valor} onChange={(event) => setValor(event.target.value)} className='border-b border-black h-6' />
                </span>
                <span className='flex gap-4'>
                    <label htmlFor="metodoPagamento" className='font-bold text-base'>Meotodo de pagamento:</label>
                    <input type="text" id='metodoPagamento' value={metodoPagamento} onChange={(event) => setMetodoPagamento(event.target.value)} className='border-b border-black h-6' />
                </span>
            </div>

        </div>
    )
}