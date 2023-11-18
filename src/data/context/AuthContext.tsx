import { createContext, useState } from "react";
import firebase from "../../firebase/config.firebase";
import Usuario from "@/model/Usuario";
import router from "next/router";

export type AuthContextProps = {
    usuario: Usuario | null
    loginGoogle: () => Promise<void>
    children?: any
}

const AuthContext = createContext<AuthContextProps>({
    usuario: null,
    loginGoogle: () => new Promise<void>(() => {})
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

export function AuthProvider(props: any) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

        if (resp.user?.email) {
            const usuario = await normalizarUsuario(resp.user);
            setUsuario(usuario);
            router.push("/");
        }
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;