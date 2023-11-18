import { createContext, useState } from "react";

type Tema = 'dark' | '';

type AppContextProps = {
    parameterMap: Map<string, any>
    tema: Tema
    children?: any
    alternarTema: () => void
}

const AppContext = createContext<AppContextProps>({
    parameterMap: new Map<string, any>(),
    tema: '',
    alternarTema: () => {}
});

export function AppProvider(props: any) {

    const [tema, setTema] = useState<Tema>('');
    const [parameterMap, setParameterMap] = useState<Map<string, any>>(new Map<string, any>());

    function alternarTema() {
        setTema(tema === '' ? 'dark' : '')
    }

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