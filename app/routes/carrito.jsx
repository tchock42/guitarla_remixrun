import { useState, useEffect } from 'react'
import { ClientOnly } from "remix-utils/client-only";
import styles from '../styles/carrito.css'
import { useOutletContext } from '@remix-run/react'

export function links(){
    return[
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta(){
     return[
        {title: 'GuitarLA - Carrito de compras'},
        {description: 'Venta de guitarras, música, blog, carrito de compras, tienda'}
     ]
}

function Carrito() {
    const [total, setTotal] = useState(0)
    const {carrito, actualizarCantidad, eliminarGuitarra} = useOutletContext();                   //carga el hook useOutletContext

    //calcular el total de compras de guitarra
    useEffect(() => {
        const calculoTotal = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0); //calcula la suma de los subtotales
        setTotal(calculoTotal);
    }, [carrito]);                   
    
    return (    //Muestra 'Cargando...' mientras se carga este componente
        <ClientOnly fallback={"Cargando..."}> 
            {() => (                        //El html se muestra como callback
            <main className="contenedor">
                <h1 className="heading">Carrito de Compras</h1>

                <div className="contenido">
                    <div className="carrito">
                        <h2>Artículos</h2>
                        {carrito?.length === 0 ? 'Carrito Vacío' : (         //si no hay articulos imprime Carrito Vacío

                            carrito?.map(producto => (                       //toma un producto del array carrito
                                
                                <div key={producto.id} className="producto">
                                    <div>
                                        <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                                    </div>
                                    <div>
                                        <p className="nombre">{producto.nombre}</p>
                                        <p>Cantidad: </p>
                                        <select 
                                            value={producto.cantidad} 
                                            className='select'
                                            onChange={ e => actualizarCantidad({
                                                cantidad: +e.target.value,       //toma la cantidad seleccionaada
                                                id: producto.id                 //y el id de la guitarra para el objeto
                                            })}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <p className="precio">$<span>{producto.precio}</span></p>
                                        <p className="subtotal">Subtotal: $<span>{producto.cantidad * producto.precio}</span></p>
                                    </div>
                                    <button 
                                        type='button' 
                                        className='btn_eliminar'
                                        onClick={() => eliminarGuitarra(producto.id)}
                                    >X</button>       
                                </div>  /**termina div de producto */
                            ))
                        )}
                    </div>
                    <aside className="resumen">
                        <h3>Resumen del pedido</h3>
                        <p>Total a pagar: $ {total}</p>
                    </aside>
                </div>
            </main>
            )}
        </ClientOnly>
    )
}

export default Carrito
