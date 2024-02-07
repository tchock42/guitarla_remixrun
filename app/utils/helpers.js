//function para formatear la fecha del blog
export const formatearFecha = fecha => { //toma la fecha y la transforma

    const fechaNueva = new Date(fecha)  //tomando un objeto de fecha

    const opciones = {                  //y unas opciones
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}