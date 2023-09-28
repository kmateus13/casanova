import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Tabelas from "@/components/Tabelas/Tabelas";

export default function Adicionar() {
    return (
        <div className=" h-full relative  bg-slate-500 overflow-hidden">
            <Header/>
            <Tabelas/>
            <Footer />
        </div>
    )
}