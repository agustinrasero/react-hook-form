const validarCEL = (numero) =>{
    return numero.startsWith('3533')  && numero.length >= 9 && numero.length <= 10 //Devolvera TRUE si es verdad
}

export default validarCEL