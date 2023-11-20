import Image from "next/image"
import loadingGif from "../../../public/images/loading.gif"
import useAuth from "@/data/hook/useAuth"
import { useRouter } from "next/router"

type ForcarAutenticacaoProps = {
    children?: any
}

export default function ForcarAutenticacao(props: ForcarAutenticacaoProps) {

    const authContex = useAuth();

    function renderizarConteudo() {
        return (
            <>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loadingGif} alt="Carregando..." />
            </div>
        )
    }

    function irParaAutenticacao() {
        useRouter().push("/autenticacao");
        return null;
    }

    return (!authContex.carregando && authContex.usuario?.email) ? renderizarConteudo() : (authContex.carregando) ? renderizarCarregando() : irParaAutenticacao();
}