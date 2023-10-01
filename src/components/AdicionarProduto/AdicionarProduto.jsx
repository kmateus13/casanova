import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase/firestore";
import { BiSitemap } from "react-icons/bi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { auth } from "@/firebase/authentication"

export default function AdicionarProduto() {
    const [dados, setDados] = useState([])
    const [item, setItem] = useState('')
    const [produtos, setProdutos] = useState([])
    const [nomeProduto, setNomeProduto] = useState('')
    const [nomeUsuario, setNomeUsuario] = useState()

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


    const listaProdutos = async () => {
        if (item !== "") {
            const querySnapshot = await getDocs(collection(db, "dados", item, "produtos"));
            let produtoArray = []


            querySnapshot.forEach((doc) => {
                produtoArray.push(doc.id)
            });
            setProdutos(produtoArray)
        }
    }

    useEffect(() => {
        listaProdutos()
    }, [item])

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                setNomeUsuario(user.displayName)
            }
        })
    }, [])



    const handleChange = (event) => {
        setItem(event.target.value);
    };



    const enviarDadosProduto = async () => {
        await setDoc(doc(db, "dados", item, "produtos", nomeProduto), {
            usuario: nomeUsuario,
            pago: false
        });
        listaProdutos()
        setNomeProduto('')
    }



    const excluirProduto = async (produto) => {
        await deleteDoc(doc(db, "dados", item, "produtos", produto ));
        listaProdutos()
    }

    return (
        <>
            <div className="flex flex-wrap gap-4 items-center justify-around">
                <div className="flex items-center gap-4">
                    <BiSitemap size={30} />
                    <FormControl className="w-72">
                        <InputLabel id="demo-simple-select-label">Selecione uma categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={item}
                            label="Selecione uma categoria"
                            onChange={handleChange}
                        >
                            <MenuItem value={""}>Selecione uma categoria</MenuItem>
                            {dados.map((categoria) => (
                                <MenuItem key={categoria} value={categoria}>{categoria}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex items-center gap-4">
                    <BsFillCartPlusFill size={30} />
                    <TextField id="outlined-basic" label="Nome do Produto" disabled={item !== "" ? false : true} variant="outlined" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} />
                </div>
                <div>
                    <Button variant="contained" className="bg-blue-700" onClick={() => enviarDadosProduto()}>Salvar</Button>
                </div>
            </div>
            {item !== '' && (
                <div className=" flex flex-col container p-8 mt-6 bg-slate-500 items-center">
                    <Typography variant="h3" component="h1">
                        Lista de Produtos
                    </Typography>
                    <div className="flex container items-center bg-slate-100 mt-6" >
                        {produtos.length > 0 ? (
                            <ul className="w-full flex flex-col">
                                {produtos.map((produto) => (
                                    <li className="flex justify-between px-8 h-14 items-center font-bold text-lg border" key={produto}>
                                        {produto}
                                        <MdDeleteForever onClick={() => excluirProduto(produto)} cursor="pointer" size={25} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Ainda não possui produto!</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}