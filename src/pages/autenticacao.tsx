import AuthInput from "@/components/auth/AuthInput";
import { IconeGoogle, IconeWarnning } from "@/components/icons";
import If from "@/components/simple/If";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react"

export default function Autenticacao() {
    const authContext = useAuth();

    const [modo, setModo] = useState<'login' | 'cadastro'>('login');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState<string | null>(null);

    function exibirErro(msg: string, tempoEmSegundos: number = 5) {
        setErro(msg);
        setTimeout(() => setErro(null), tempoEmSegundos * 1000);
    }

    function submit() {
        if (modo === 'login') {
            console.log('login');
            exibirErro("Ocorreu um erro no login!")
        } else {
            console.log('cadastrar');
            exibirErro("Ocorreu um erro no cadastro!")
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className={`
                hidden md:block
                md:w-1/2 lg:w-2/3
            `}>
                <img className={`
                    h-screen w-full object-cover
                `}
                    src="https://source.unsplash.com/random" />
            </div>
            <div className={`w-full md:w-1/2 lg:w-1/3 m-10`}>
                <h1 className={`
                    text-3xl font-bold mb-5
                `}>
                    {modo === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                <If test={erro != null}>
                    <div className={`
                        flex items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border-2 border-red-700 rounded-lg
                    `}>
                        {IconeWarnning()}
                        <span className="ml-3">{erro}</span>
                    </div>
                </If>

                <AuthInput label="Email:" value={email} onChage={setEmail} type="email" required />
                <AuthInput label="Senha:" value={senha} onChage={setSenha} type="password" required />
                <button onClick={submit} className={`
                                            w-full bg-indigo-500 hover:bg-indigo-400
                                            text-white font-bold rounded-lg px-4 py-3 mt-6
                                        `}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-gray-300 w-full" />

                <button onClick={authContext.loginGoogle} className={`
                                            flex flex-row justify-center items-center
                                            w-full bg-gray-200 hover:bg-gray-300
                                            text-gray-700 font-bold rounded-lg px-4 py-3
                                        `}>
                    {IconeGoogle}
                    <span className={`
                            ml-2
                        `}>
                        Entrar com Google
                    </span>
                </button>

                <If test={modo === 'login'}>
                    <p className="mt-8">
                        Novo por aqui?
                        <a
                            onClick={() => setModo('cadastro')}
                            className={`
                                text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                                `}> Crie uma conta</a>
                    </p>
                </If>
                <If test={modo === 'cadastro'}>
                    <p className="mt-8">
                        Já possui uma conta?
                        <a
                            onClick={() => setModo('login')}
                            className={`
                                text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                            `}> Entre com as suas credenciais</a>
                    </p>
                </If>
            </div>
        </div>
    )
}