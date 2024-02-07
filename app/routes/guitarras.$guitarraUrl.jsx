import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "../models/guitarras.server"

//funcion loader para recuperar informacion de la guitarra
export async function loader({params}){

  const { guitarraUrl } = params
  
  const guitarra = await getGuitarra(guitarraUrl)
  // console.log(guitarra.data[0].attributes.nombre)
  
  //si la consulta está vacía
  // console.log(guitarra)
  if(guitarra.data.length === 0){
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada',
      data: {}    //carga un data vacío a meta
    })
  }
  return guitarra;
}

export function meta({data}){ //informacion meta | meta está disponible cuando loader tiene información
  /**La evaluación del error del meta se define root, ahi si lo detecta */
  //return normal
  return[
    { 
      title: `GuitarLA - ${data.data[0].attributes.nombre}`  
    },
    {
      descripcion: `Guitarra, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
  ]
}

function Guitarra() {
  const {agregarCarrito} = useOutletContext()       //accede a la informacion de context

  const [cantidad, setCantidad] = useState(0);        //state de numero de guitarras

  const guitarra = useLoaderData()        //carga la información del return del loader
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes;
  // console.log(imagen)

  /**funcion para validar el numero de guitarras. */
  const handleSubmit = (e) => {
    e.preventDefault();

    if(cantidad < 1){                           //valida que cantidad sea mayor a 0                  
      alert('Debes seleccionar una cantidad ');
      return;
    }
    const guitarraSeleccionada = {              //crea objeto para almacenarlo en LS
      id: guitarra.data[0].id,                  //id
      imagen: imagen.data.attributes.url,       //url de la imagen
      nombre,                                   
      precio,
      cantidad
    } 
    agregarCarrito(guitarraSeleccionada)

    // console.log(guitarraSeleccionada)

  }

  return (                                      //inserta un handleSubmit() para validar el numero de guitarras
    <div className="guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion[0].children[0].text}</p>
        <p className="precio">$ {precio}</p>
        
        <form onSubmit={handleSubmit} className="formulario">     
          <label htmlFor="cantidad">Cantidad</label>
          <select                                    
            onChange={ e => setCantidad(parseInt(e.target.value))}  //carga en cantidad las guitarras seleccionadas
            id="cantidad"
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input 
            type="submit" 
            value="Agregar al Carrito" 
          />
        </form>

      </div> 
    </div>
  )
}

export default Guitarra
/* Este componente toma su nombre .$guitarraUrl para queremix lo detecte como variable y lo inyecte para formar guitarras/clapton */