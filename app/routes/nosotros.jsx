import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta(){
  return[
    {
      title: 'GuitarLA - Sobre Nosotros',               //titulo
      description: 'Venta de guitarras, blog de música' //imformacion de seo
    }
  ]
}

export function links(){
  return[
    {
      rel: 'stylesheet',                                //nosotros.css
      href: styles                     
    },
    {
      rel: 'preload',                                   //imagen nosotros.jpg
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros(){

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum semper ex, in dapibus libero rhoncus a. Praesent sed quam vel eros pretium ultrices eu at massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In eget ultrices elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur ac sodales urna. Vivamus egestas ex id lobortis congue.</p>
          <p>Vivamus tristique risus eget porttitor elementum. Sed ut magna id ex volutpat malesuada. Nam blandit sapien nibh, interdum hendrerit mauris sagittis et. Morbi id elementum felis. Mauris pulvinar purus nec erat elementum ultricies. Aliquam commodo felis lorem, eget ultrices dolor cursus et. Donec interdum ac tellus at molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean eget lacinia sapien.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
