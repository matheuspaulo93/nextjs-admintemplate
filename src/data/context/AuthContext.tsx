import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config.firebase";
import Usuario from "@/model/Usuario";
import router from "next/router";
import Cookies from 'js-cookie';

export type AuthContextProps = {
    usuario: Usuario | null
    carregando?: boolean
    loginGoogle: () => Promise<void>
    login: (email: string, senha: string) => Promise<void>
    cadastrar: (email: string, senha: string) => Promise<void>
    logout: () => Promise<void>
    children?: any
}

const AuthContext = createContext<AuthContextProps>({
    usuario: null,
    loginGoogle: () => new Promise<void>(() => {}),
    login: (email: string, senha: string) => new Promise<void>(() => {}),
    cadastrar: (email: string, senha: string) => new Promise<void>(() => {}),
    logout: () => new Promise<void>(() => {})
});

async function normalizarUsuario(usuarioFirebase: firebase.User | null): Promise<Usuario> {
    const token = await usuarioFirebase?.getIdToken();
    return {
        uid: usuarioFirebase?.uid,
        nome: usuarioFirebase?.displayName,
        email: usuarioFirebase?.email,
        token,
        provedor: usuarioFirebase?.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase?.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-silvamap-auth', String(logado), {
            expires: 7
        });
    } else {
        Cookies.remove('admin-template-silvamap-auth');
    }
}

export function AuthProvider(props: any) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);

    async function configurarSessao(usuarioFirebase: firebase.User | null) {
        if (usuarioFirebase?.email) {
            const usuario: Usuario = await normalizarUsuario(usuarioFirebase);
            setUsuario(usuario);
            gerenciarCookie(true);
            setCarregando(false);
            return usuario.email;
        } else {
            setUsuario(null);
            gerenciarCookie(false);
            setCarregando(false);
            return false;
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true);
            const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
            configurarSessao(resp.user);
            router.push("/");
        } finally {
            setCarregando(false);
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true);
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha);
            configurarSessao(resp.user);
            router.push("/");
        } finally {
            setCarregando(false);
        }
    }

    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true);
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha);
            configurarSessao(resp.user);
            router.push("/");
        } finally {
            setCarregando(false);
        }
    }
    
    async function logout() {
        try {
            setCarregando(true);
            await firebase.auth().signOut();
            await configurarSessao(null);
        } finally {
            setCarregando(false);
        }
    }
    
    useEffect(() => {
        if(Cookies.get('admin-template-silvamap-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao);
            return () => cancelar();
        } else {
            setCarregando(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            login,
            cadastrar,
            logout,
            carregando
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;