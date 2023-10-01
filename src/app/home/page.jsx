import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Tabelas from "@/components/Tabelas/Tabelas";

export default function Home() {


    
    return (
        <div className=" flex flex-col h-screen">
            <Header pagina={"Adicionar"}/>
            <Tabelas/>
            <Footer/>
        </div>
    )
}