import { getPosts } from '../models/posts.server'
import { useLoaderData} from '@remix-run/react'
import ListadoPosts from '../components/listado-posts'

export function meta(){
  return[
    {
      title: 'GuitarLA - Nuestro Blog',
    },
    {
      description: 'GuitarLA - Blog de música y venta'
    }
  ]
}

export async function loader(){
  const posts = await getPosts()
  console.log(posts)
  return posts.data;
}

function Blog() {
  const posts= useLoaderData();

  return (
    
    <ListadoPosts 
        posts={posts}
    />
      
  
  )
}

export default Blog
