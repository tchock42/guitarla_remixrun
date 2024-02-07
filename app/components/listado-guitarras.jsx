import Guitarra from "./guitarra"

function ListadoGuitarras({guitarras}) {
  return (
    <>
        <h2 className="heading">Nuestra Colección</h2>
        {/**Se despliegan las guitarras */}
        {guitarras.length && (                    //Si hay guitarras
          <div className='guitarras-grid'>
            {guitarras.map( guitarra => (         //aqui se va a desplagar el componente Guitarra
              <Guitarra
                guitarra = {guitarra?.attributes} //pasa guitarra y sus atributos
                key={guitarra?.id}                //pasa el key unico de guitarra
              />
            ))}
          </div>
        ) }
    </>
  )
}

export default ListadoGuitarras
