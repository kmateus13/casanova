
"use client"

import AdicionarCategoria from "@/components/AdicionarCategoria/AdicionarCategoria";
import AdicionarProduto from "@/components/AdicionarProduto/AdicionarProduto";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BiCategory } from 'react-icons/bi'
import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


export default function Adicionar() {

    const [item, setItem] = useState('');

    const handleChange = (event) => {
        setItem(event.target.value);
    };

    console.log(item)

    return (
        <main className=" flex flex-col h-screen">
            <Header pagina={"Home"}/>
            <div className=" h-full  relative py-14 flex flex-col items-center bg-slate-50 ">
                <div className="container h-full flex flex-col">
                    <div className="flex items-center gap-4">
                        <BiCategory size={30} />
                        <FormControl className="w-1/3">
                            <InputLabel id="demo-simple-select-label">Selecione um item</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={item}
                                label="Selecione um item"
                                onChange={handleChange}
                            >
                                <MenuItem value={""}>Selecione um item</MenuItem>
                                <MenuItem value={"categoria"}>Categoria</MenuItem>
                                <MenuItem value={"produto"}>Produto</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {item && (
                        <div className="mt-14 border h-auto p-10">
                            {item === "categoria" ? <AdicionarCategoria /> : item === "produto" ? <AdicionarProduto /> : ""}
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </main>
        
    )
}