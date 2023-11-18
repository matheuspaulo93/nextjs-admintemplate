import Layout from "@/components/template/Layout";
import useAppData from "@/data/hook/useAppData";

export default function Home() {
  const context = useAppData();
  return (
    <Layout titulo="Página Inicial" subtitulo="Estamos construindo um template Admin">
      <h3>Conteudo!!!</h3>
    </Layout>
  )
}
