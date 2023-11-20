import Link from "next/link";
import { IconeBell, IconeExit, IconeHome, IconeSettings } from "../icons";
import { Logo } from "./Logo";
import MenuItem from "./MenuItem";
import useAuth from "@/data/hook/useAuth";

export default function MenuLateral() {
    const authContext = useAuth();
    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-900
            dark:bg-gray-900 dark:text-gray-200
        `}>
            <div className={`
                    h-20 w-20 flex flex-col items-center justify-center
                    bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-500`}>
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <ul className={`flex-grow`}>
                <MenuItem url="/" texto="Home" icone={IconeHome}/>
                <MenuItem url="/configuracoes" texto="Configurações" icone={IconeSettings}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeBell}/>
            </ul>
            <ul>
                <MenuItem onClick={authContext.logout} texto="Sair" icone={IconeExit} 
                    className={`
                    text-red-600 hover:bg-red-400 hover:text-white
                    dark:text-red-400 dark:hover:text-white`}/>
            </ul>
        </aside>
    )
}