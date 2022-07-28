document.addEventListener('DOMContentLoaded', function() {
    //Constantes para pagina inicio
    const mostrarMenu = document.querySelector(".mostrar-menu");
    const menu = document.querySelector(".nav-items");
    mostrarMenu.addEventListener('click',function(){
        menu.classList.toggle("mostrar-nav-items");
    });

    //Constantes para el servicio de Consultar tramite del DNI
    const consultar_contenedor = document.querySelector(".consultar-contenedor");
    const contenedor_tipo_consulta = document.querySelector(".contenedor-tipo-consulta");
    const tipoConsulta = document.querySelectorAll(".tipo-consulta");
    const modal = document.querySelector(".modal");
    const consultarTipos = document.querySelectorAll(".btn-consultar");
    const realizarConsulta = document.querySelectorAll(".realizar-consulta");
    const mensaje_estado = document.querySelector(".mensaje-estado");
    const estado = document.querySelector(".estado");
    const btnsRegresar = document.querySelectorAll(".cancelar");
    const closeModal = document.querySelector(".closeModal");
    const baseDatosDNI = [
        {
            "DNI": "76543210",
            "Estado": "INICIADO"
        },
        {
            "DNI": "78953851",
            "Estado": "EN PROCESO"
        },
        {
            "DNI": "45678910",
            "Estado": "EN AGENCIA"
        },
        {
            "DNI": "43219876",
            "Estado": "ENTREGADO"
        },
        {
            "DNI": "78912345",
            "Estado": "OBSERVADO/ANULADO"
        }
    ];
    const baseDatosFichaSolicitud = [
        {
            "Nro": "76023419",
            "Tipo": "Ficha Registral",
            "Estado": "INICIADO"
        },
        {
            "Nro": "78055671",
            "Tipo": "Ficha Registral",
            "Estado": "EN PROCESO"
        },
        {
            "Nro": "45094103",
            "Tipo": "Ficha Registral",
            "Estado": "EN AGENCIA"
        },
        {
            "Nro": "43011876",
            "Tipo": "Ficha Registral",
            "Estado": "ENTREGADO"
        },
        {
            "Nro": "55667788",
            "Tipo": "Solicitud Web",
            "Estado": "EN PROCESO"
        },
        {
            "Nro": "55993311",
            "Tipo": "Solicitud Web",
            "Estado": "EN AGENCIA"
        }
    ];

    //Constantes del servicio Registrar personas indocumentadas
    const btnContinuar = document.querySelectorAll(".continuar");
    const btnRegistrar = document.querySelector(".registrar");
    const btnRegresar = document.querySelectorAll(".regresar");
    const infopersona = document.querySelector(".info-persona-indoc");
    const dots = document.querySelectorAll(".dot");
    const dotsInfo = document.querySelectorAll(".dot-info");
    const pasosFormulario = document.querySelectorAll(".paso");
    const camposObligatorios = document.querySelectorAll(".obligatorio");
    const mensajeCampoObligatorio = document.querySelectorAll(".campo-oligatorio");
    

    //Funciones del servicio de Consultar tramite del DNI
    consultarTipos.forEach(element => {
        element.addEventListener('click',function(evt){
            consultar_contenedor.classList.toggle("hide");
            contenedor_tipo_consulta.classList.toggle("hide");
            if(evt.target.parentElement.classList.contains("1")){
                tipoConsulta[0].classList.toggle("hide");
            }
            else{
                tipoConsulta[1].classList.toggle("hide");
            }
        });
    });
    const inputDni = document.querySelector("#dni");
    const inputFicha = document.querySelector("#ficha");
    realizarConsulta.forEach(element => {
        element.addEventListener('click',function(evt){
            if(evt.target.parentElement.parentElement.classList.contains("1")){
                if(inputDni.value===""){
                    if(inputDni.nextElementSibling.classList.contains("hide"))
                        inputDni.nextElementSibling.classList.toggle("hide");
                }
                else{
                    let dni = baseDatosDNI.find(dni=>dni.DNI===inputDni.value);
                    if(dni){
                        mensaje_estado.textContent = "El estado del tramite para el DNI " + dni.DNI + " es:";
                        estado.textContent = dni.Estado;
                    }
                    else{
                        mensaje_estado.textContent = "El el DNI " + inputDni.value + ":";
                        estado.textContent = "NO POSEE NINGUN TRAMITE EN PROCESO";
                        estado.classList.add("sin-estado");
                    }
                    modal.classList.toggle("hide");   
                }
            }
            else{
                if(inputFicha.value===""){
                    if(inputFicha.nextElementSibling.classList.contains("hide"))
                        inputFicha.nextElementSibling.classList.toggle("hide");
                }
                else{
                    let ficha = baseDatosFichaSolicitud.find(ficha=>ficha.Nro===inputFicha.value);
                    if(ficha){
                        mensaje_estado.textContent = "El estado del tramite para el Nro. de " + ficha.Tipo + " " + ficha.Nro + " es:";
                        estado.textContent = ficha.Estado;
                    }
                    else{
                        mensaje_estado.textContent = "El Nro. de Ficha Registral / Solicitud Web " + inputFicha.value + ":";
                        estado.textContent = "NO POSEE NINGUN TRAMITE EN PROCESO";
                        estado.classList.add("sin-estado");
                    }
                    modal.classList.toggle("hide");
                }
            }
        });
    });
    btnsRegresar.forEach(element => {
        element.addEventListener('click',function(evt){
            consultar_contenedor.classList.toggle("hide");
            contenedor_tipo_consulta.classList.toggle("hide");
            if(!tipoConsulta[0].classList.contains("hide")){
                tipoConsulta[0].classList.toggle("hide");
            }
            if(!tipoConsulta[1].classList.contains("hide")){
                tipoConsulta[1].classList.toggle("hide");
            }
        });
    });
    closeModal.addEventListener('click',function(){
        modal.classList.toggle("hide");
        window.location="/index.html";
    });

    //Funciones anonimas del servicio Registrar personas indocumentadas
    btnRegresar.forEach(regresar=>{
        regresar.addEventListener('click',function(){
        stepFormulario(getCurrentDot(),getCurrentDot()-1);
        });
    });
    btnRegistrar.addEventListener('click',function(){
        modal.classList.toggle("hide");
    });
    const inputsFormularioPersonaIndo = document.querySelectorAll(".formulario input");
    const datosConfirmacion = document.querySelectorAll(".datos-confirmacion");
    const selectFormularioPersonaIndo = document.querySelectorAll(".formulario .campo select");
    btnContinuar.forEach(btn=>{
        btn.addEventListener('click',function(){
            if(getCurrentDot()===0){
                if(mostrarCamposObligatorios(0,6)===0){
                    stepFormulario(getCurrentDot(),getCurrentDot()+1);
                    if(getCurrentDot()===2){
                        llenarCamposConfirmacion();
                    }
                }
            }
            else{
                if(mostrarCamposObligatorios(6,13)===0){
                    stepFormulario(getCurrentDot(),getCurrentDot()+1);
                    if(getCurrentDot()===2){
                        llenarCamposConfirmacion();
                    }
                }
            }    
        });
    });
    function llenarCamposConfirmacion(){
        let j = -1;
        for(let i=0;i<datosConfirmacion.length;i++){
            if(i===3){
                datosConfirmacion[i].textContent = selectFormularioPersonaIndo[0].value;
                continue;
            }
            else if(i===4){
                datosConfirmacion[i].textContent = selectFormularioPersonaIndo[1].value;
                continue;
            }
            else{
                j++;
            }
            datosConfirmacion[i].textContent = inputsFormularioPersonaIndo[j].value;
        }
    }
    dots.forEach(dot=>{
        dot.addEventListener('click',function(evt){
            let currentDot = getCurrentDot();
            if(!evt.target.classList.contains("active")){
                newCurrentDot = parseInt(evt.target.textContent) - 1;
                if(newCurrentDot>currentDot){
                    if(getCurrentDot()===0){
                        if(mostrarCamposObligatorios(0,6)===0){
                            stepFormulario(currentDot,newCurrentDot);
                            if(getCurrentDot()===2){
                                llenarCamposConfirmacion();
                            }
                        }
                    }
                    else{
                        if(mostrarCamposObligatorios(6,13)===0){
                            stepFormulario(currentDot,newCurrentDot);
                            if(getCurrentDot()===2){
                                llenarCamposConfirmacion();
                            }
                        }
                    }
                }
                else{
                    stepFormulario(currentDot,newCurrentDot);
                    if(getCurrentDot()===2){
                        llenarCamposConfirmacion();
                    }
                }
                    
            }
        });
    });

    camposObligatorios.forEach(input=>{
        input.addEventListener('change',function(){
            if(!input.nextElementSibling.classList.contains("hide")){
                input.nextElementSibling.classList.toggle("hide");
            }
        });
    });
       
    function mostrarCamposObligatorios(inicio,fin){
        let cantidad=0;
        for(let i=inicio;i<fin;i++){
            if(camposObligatorios[i].value===""){
                cantidad++;
                if(mensajeCampoObligatorio[i].classList.contains("hide")){
                    mensajeCampoObligatorio[i].classList.toggle("hide");
                }
            }
        }
        return cantidad;
    }

    //Fucniones de ayuda
    function stepFormulario(current,newCurrent){
        pasosFormulario[current].classList.toggle("hide");
        pasosFormulario[newCurrent].classList.toggle("hide");
        dots[current].classList.toggle("active");
        dots[newCurrent].classList.toggle("active");
        dotsInfo[current].classList.toggle("active");
        dotsInfo[newCurrent].classList.toggle("active");
        if(current===0||newCurrent===0){
            infopersona.classList.toggle("hide");
        }
        if(newCurrent===2||current===2){
            pasosFormulario[2].classList.toggle("final");
            document.querySelector(".help").classList.toggle("hide");
            document.querySelector(".confirmacion").classList.toggle("hide");
        }
    }
    
    function getCurrentDot(){
        let currentDotIs = -1;
        dots.forEach(function(elemento){
            if(elemento.classList.contains("active")){
                currentDotIs = parseInt(elemento.textContent) - 1;
            }
        });
        return currentDotIs;
    }
});

