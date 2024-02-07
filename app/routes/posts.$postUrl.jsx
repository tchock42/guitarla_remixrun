import { getPost } from '../models/posts.server'
import { useLoaderData, Link } from '@remix-run/react'
import { formatearFecha } from '../utils/helpers'

export function meta({data}){
    console.log(data)
    return[
        {
         title: `GuitarLA - ${data.titulo}`, //acceso al titulo de la entrada de blog
        },
        {
          description: `Guitarras, venta de guitarras, ${data.titulo}`
        }
    ]
}

export async function loader({params}){ //se extrae la url
    const {postUrl} = params
    // console.log(postUrl)

    const post = await getPost(postUrl)
    // console.log(post)
    // console.log(post.data[0].attributes)

    if(post.data.length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'Entrada de blog no encontrada',
            data: {}
        })
    }
    //si sí existe, se retornan los attributes
    return post.data[0].attributes;
}

function Post() {

    const post = useLoaderData();
    // console.log(post)
    const {contenido, imagen, titulo, publishedAt} = post;
    // console.log(contenido)
    
    return (
        <article className="post mt-3">
            <img className="imagen" src={imagen?.data?.attributes?.url} alt='Imagen guitarra' />
            
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>

                {contenido.map((parrafo, index) => (
                    <p key={index}  className="texto">{parrafo?.children[0]?.text}</p>
                ))}

                <Link className='enlace' to='/blog'>Volver</Link>
            </div>
        </article>
    )
}

export default Post
