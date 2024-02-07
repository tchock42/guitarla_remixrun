import { Outlet, useOutletContext } from '@remix-run/react';
import styles from '../styles/guitarras.css'

//no se borra el link porque los hijos usan styles de guitarra
export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

function Tienda() { 
 
  return (
    <main className='contenedor'>
    
      <Outlet
        context={useOutletContext()}
      />
    </main>
  )
}

export default Tienda