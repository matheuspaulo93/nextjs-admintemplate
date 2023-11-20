import { createContext, useEffect, useState } from "react";

type AppContextProps = {
    parameterMap: Map<string, any>
    tema: string | undefined | null
    children?: any
    alternarTema: () => void
}

const AppContext = createContext<AppContextProps>({
    parameterMap: new Map<string, any>(),
    tema: '',
    alternarTema: () => {}
});

export function AppProvider(props: any) {

    const [tema, setTema] = useState<string | undefined | null>('');
    const [parameterMap, setParameterMap] = useState<Map<string, any>>(new Map<string, any>());

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : '';
        setTema(novoTema)
        localStorage.setItem('tema', novoTema);
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema');
        setTema(temaSalvo);
    },[]);

    return (
        <AppContext.Provider value={{
            parameterMap,
            tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;