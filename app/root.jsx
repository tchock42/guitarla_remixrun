import { useState, useEffect } from "react"
import { //importa los componentes de remix
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from "@remix-run/react"
import styles from './styles/index.css' //importa los estilos 
import Header from './components/header'    //importa el header para renderizarlo en todas las urls
import Footer from "./components/footer"
    
export const meta = ({error}) => {             //funcion del meta con el title, charset y viewport | toma error para evaluar title
    if(error?.status == 404){
        return[
            {
                title: 'GuitarLA - Entrada no encontrada',      
            },
            {
                description: 'Venta de Guitarras, Entrada no encontrada'
            }
        ]
    }
    
    return[
        { title: "GuitarLA - Remix" },
        { description: 'Venta de Guitarras'},
        { charset: 'utf-8' },
        { viewport: "width=device-width,initial-scale=1" }
    ]
}

export function links(){            //funcion de estilos con sus rel
    return[
        {
            rel: 'stylesheet',      //normaliza
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',      //fuentes de google (1)
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect', 
            href: 'https://fonts.gstatic.com', 
            crossOrigin: "true" //como string
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel: 'stylesheet',          //estilos de index.css
            href: styles
        }
    ]
}

export default function App() {         //funcion principal app
    //carga del localstorage
    
    //evalua si window está definido, entonces carga 'carrito' de LocalStorage. Si no, asigna []. Si no hay carrito, carga [] a carritoLS
    const carritoLS = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('carrito')) ?? []) : []; //lee el campo carrito en LS o si no, le asigna []

    const [carrito, setCarrito] = useState(carritoLS);                  // asigna el valor de LS como valor inicial    

    //graba en el localstorage
    useEffect(() => {
        if(carrito?.length === 0){          //si el carrito está vacío sale del useEffect y no carga en LS
            return;
        }
        if(typeof window !== 'undefined'){  //si ya se cargó window y por consiguiente localStorage                 
            localStorage.setItem('carrito', JSON.stringify(carrito)) //convierte un valor de javascript (arreglo) en un string json
        }
    }, [carrito]);
    
    //funcion para agregar una guitarra al carrito
    const agregarCarrito = (guitarra) => {            //toma el objeto de guitarraSelecciona en guitarras.jsx
        if(carrito.some(guitarraIterada => guitarraIterada.id === guitarra.id)){ //si el id dela guitarra iterada en array de carrito es igual al de la guitarra seleccionada
            //Ya existe una guitarra con ese id
            
            const carritoActualizado = carrito.map(guitarraIterada => { //se crea un nuevo arreglo a partir de un map
                if(guitarraIterada.id === guitarra.id){                 //si existe un elemento del carrito que coincida con la nueva guitarra
                    guitarraIterada.cantidad = guitarra.cantidad        //actualiza la cantidad de guitarras
                }
                return guitarraIterada;                                 //retorna guitarra con cantidad actualizado
            })

            setCarrito(carritoActualizado)
        }else{//no coincide ningun id
            //registro nuevo
            setCarrito([...carrito, guitarra])
        }
    }

    //funcion para actualizar el numero de guitarras en carrito
    const actualizarCantidad = (guitarra) => { //toma cantidad del select y id de la guitarra
        const carritoActualizado = carrito.map(guitarraIterada => {
            if(guitarraIterada.id === guitarra.id){ //si la guitarra seleccionada es igual a la guitarra en el array
                guitarraIterada.cantidad = guitarra.cantidad
            }
            return guitarraIterada;
        });
        setCarrito(carritoActualizado)
    }

     //eliminar producto
    const eliminarGuitarra = (id) => {
        const carritoActualizado = carrito.filter(guitarraIterada => guitarraIterada.id !== id);  //crea un array con todos los elementos que tengan un id diferente al seleccionado
        
        setCarrito(carritoActualizado)
    }
    

    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito, 
                    carrito,
                    actualizarCantidad,  //se pasa como context
                    eliminarGuitarra
                }}
            /> 
        </Document>
    )
}

function Document({children}){          //documento principal
    return(
        <html lang="es">
            <head>
                <Meta/>                 
                <Links/>
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    )
}

// /** Manejo de errores */
export function ErrorBoundary() {
    const error = useRouteError();
    // console.error(error);
    if(isRouteErrorResponse(error)){
        return (
            <Document>
                <p className="error">
                    {error.status} 
                    {' '}
                    {error.statusText}
                </p>
                <Link className="error-enlace"
                    to='/'
                >Volver a la página principal</Link>
                
            </Document>
        );
    }
    // return <p className="error">Error desconocido</p>
}