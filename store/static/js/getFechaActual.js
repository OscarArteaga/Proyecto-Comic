export const getFechaActual = () => {

    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    
    // if (mes<10){
    //     mes = `0${mes}`
    // }
    
    mes < 10? mes = `0${mes}`: mes
    
    return `${dia}/${mes}/${anio}`
    
    }