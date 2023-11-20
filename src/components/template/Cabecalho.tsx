import useAppData from "@/data/hook/useAppData"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"
import AvatarUsuario from "./AvatarUsuario"

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
    const context = useAppData();
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <BotaoAlternarTema tema={context.tema} alternarTema={context.alternarTema}/>
                <AvatarUsuario className="ml-3"/>
            </div>
        </div>
    )
}