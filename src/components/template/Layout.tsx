import ForcarAutenticacao from "../auth/ForcarAutenticacao";
import Cabecalho from "./Cabecalho"
import Conteudo from "./Conteudo"
import MenuLateral from "./MenuLateral"
import useAppData from "@/data/hook/useAppData";

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const context = useAppData();
    return (
        <ForcarAutenticacao>
            <div className={`flex h-screen w-screen ${context.tema}`}>
                <MenuLateral />
                <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
            </div>
        </ForcarAutenticacao>
    )
}