import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "../models/guitarras.server"
import { getPosts } from "../models/posts.server"
import { getCurso } from "../models/curso.server"
import ListadoGuitarras from "../components/listado-guitarras"
import Curso from "../components/curso"
import styles from '../styles/guitarras.css'
import ListadoPosts from "../components/listado-posts"
import stylesblog from '../styles/blog.css'
import stylesCurso from '../styles/curso.css'


export function meta(){

}

export function links(){
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'stylesheet',
      href: stylesblog
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader(){

  const [guitarras, posts, curso] = await Promise.all([ //consulta guitarras y posts al mismo tiempo
    getGuitarras(), 
    getPosts(),
    getCurso()
  ])
  // console.log(guitarras)
  // console.log(posts)
  // console.log(curso)

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }
}
function Index() {
  const datos = useLoaderData();
  
  const {guitarras, posts, curso} = datos;
  // console.log(guitarras)
  // console.log(posts)
  // console.log(curso)

  return (

    <>
      <main className="contenedor">
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>

      <Curso
        curso={curso}
      />
        {/**Se agrega los posts */}
      <section className="contenedor">
        <ListadoPosts
          posts={posts}
        />

      </section>
    </>
  )
}
export default Index
