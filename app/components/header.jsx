import { Link } from "@remix-run/react"
import logo from '../../public/img/logo.svg'  //carga el logo
import Navegacion from "./navegacion"

function Header() {

  return (              //establece logo y en css se agrega el fondo al logo
    <header className="header">
        <div className="contenedor barra">
            <Link to="/">
                <img className="logo" src={logo} alt="imagen logo"></img> 
            </Link>
            
            <Navegacion/>
        </div>
    </header>
  )
}

export default Header
