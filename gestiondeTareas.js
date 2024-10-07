const prompt  = require("prompt-sync")({ sigint: true});

//Array para almacenar las tareas
let tareas = [];
let categoriasNombres = [
    "Trabajo",
    "Personal",
    //Agregar mas categorias segun sea necesario
];

//funcion que muestra todas las categorias 
function mostrarTodasLasCategorias(){
    console.log("Categorias existentes: ");
    categoriasNombres.forEach(function(categoria, indice){
        console.log(indice + ":" + categoria);
    });
}

//funcion que sirve para cargar nuevas categorias por el usuario
function agregarNuevaCategoriaPorElUsuario(nombreCategoria){
    categoriasNombres.push(nombreCategoria);
    console.log("Categoria " + nombreCategoria + " agregada correctamente!");
}



//Funcion para agregar una nueva tarea al array
function agregarTarea(nombreRecibido, fechaLimiteRecibida = null){
    
    mostrarTodasLasCategorias();

    let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria para la nueva tarea: "));
    
    if(numeroCategoria >= 0 && numeroCategoria < categoriasNombres.length){
        tareas.push({nombre : nombreRecibido , completada : false , fechaLimite : fechaLimiteRecibida, categoria : numeroCategoria});
        console.log("Tarea agregada con exito!");
    }else{
        console.log("Numero de categoria incorrecto!");
    }
    
}

//Eliminar una tarea 
function eliminarTarea(indice){

    if(indice >= 0 && indice < tareas.length){
        tareas.splice(indice, 1);
        console.log("Tarea eliminada correctamente");
    }else 
    console.log("Indice de tarea invalido");
}

//Funcion para marcar tarea como completada 
function completarTarea(indice){

    if(indice >= 0 && indice < tareas.length){
        tareas[indice].completada = true;
        console.log("Tarea marcada como correcta!");
    }else{
        console.log("Indice de tarea invalido");
    }
}

//Funcion para modificar una tarea especifica
function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null, nuevoNumeroCategoria){

    if(indice >= 0 && indice < tareas.length){
        tareas[indice].nombre = nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
        tareas[indice].fechaLimite = nuevaFechaLimite !== undefined ? nuevaFechaLimite : tareas[indice].fechaLimite;
        tareas[indice].categoria = nuevoNumeroCategoria !== undefined ? nuevoNumeroCategoria : tareas[indice].categoria;
        console.log("Modificacion correcta!");
    }else{
        console.log("Indice de tarea invalido");
    }  
}

//funcion que filtra tareas por categoria
function filtrarTareasPorCategoria(numeroCategoria){
    let tareasFiltradas = tareas.filter(function(tarea){
        return tarea.categoria === numeroCategoria;
    });
    return tareasFiltradas;
}


//funcion que muestra cant de tareas completadas
function contarTareasCompletadasPorCategoria(numeroCategoria){

    let tareasCategoria = filtrarTareasPorCategoria(numeroCategoria);
    let tareasCompletadas = tareasCategoria.reduce(function(contador, tarea){
        return tarea.completada ? contador + 1 : contador
    }, 0);

    let tareasEnTotal = tareasCategoria.length;

    console.log("Tareas completadas de la categoria " + numeroCategoria + ":" + tareasCompletadas + " de " + tareasEnTotal + " tareas!");
}

//funcion que muestra todas las tareas no completadas
function mostrarTareasNoCompletadas(){
    console.log("Tareas no completadas:");
    tareas.forEach(function(tarea){
        if(!tarea.completada){
            console.log("- Nombre: " + tarea.nombre + ", Categoria: " + categoriasNombres[tarea.categoria]);
        }
    })
}



//funcion para mostrar el menu de opciones
function mostrarMenu(){
    console.log(" ---Menu--- ");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar tarea");
    console.log("3. Marcar tarea como completada");
    console.log("4. Modificar una tarea");
    console.log("5. Mostrar todas las tareas");
    console.log("6. Ver todas las categorias");
    console.log("7. Agregar una nueva categoria");
    console.log("8. Filtrar tareas por categoria");
    console.log("9. Visualizar cantidad de tareas completadas por categoria");
    console.log("10. Visualizar todas las tareas no completadas");
    console.log("0. Salir");
}

//Funcion para interactuar con el usuario
function interactuarConUsuario(){
    let opcion = -1;

    while(opcion != 0){
        mostrarMenu();
        opcion = parseInt(prompt("Ingrese la opcion seleccionada:"));

        switch (opcion) {
            case 1:
                let nombreTareaNueva = prompt("Ingrese el nombre de la tarea a cargar: ");
                agregarTarea(nombreTareaNueva);
                break;

            case 2:
                let indiceAEliminar = parseInt(prompt("Ingrese el indice de la tarea a eliminar:"));
                eliminarTarea(indiceAEliminar);
                break;

            case 3:
                let indiceACompletar = parseInt(prompt("Ingrese el indice de la tarea a completar"));
                completarTarea(indiceACompletar);
                break;

            case 4:
                let indice = parseInt(prompt("Ingrese el indice a modificar:" ));
                
                if(indice >= 0 && indice < tareas.length){

                    let opcion = parseInt(prompt("Que propiedad desea modificar? 1.Nombre, 2. Fecha limite, 3.Numero de categoria"));
                    
                    switch (opcion) {
                        case 1:
                            let nombreNombre = prompt("Ingrese el nuevo nombre de su tarea:");
                            modificarTarea(indice, nombreNombre);
                            break;

                        case 2:
                            let nuevaFechaLimite = prompt("Ingrese la nueva fecha limite para su tarea: ");
                            modificarTarea(indice, undefined, nuevaFechaLimite);
                            break;

                        case 3:
                            let nuevoNumDeCategoria = parseInt(prompt("Ingrese nuevo numero de categoria "));
                            if(nuevoNumDeCategoria >= 0 && nuevoNumDeCategoria < categoriasNombres.length){
                                modificarTarea(indice, undefined, undefined, nuevoNumDeCategoria);
                            }
                            break;
                            
                        default:
                            break;
                    }

                }else{
                    console.log("Indice de tarea incorrecto!");
                }

                break;

            case 5:
                console.log(" --- LISTA DE TAREAS ---");
                console.log(tareas);
                break;

            case 6:
                mostrarTodasLasCategorias();
                break;

            case 7:
                let nuevaCategoria = prompt("Ingrese el nombre de la nueva categoria a agregar: ");
                agregarNuevaCategoriaPorElUsuario(nuevaCategoria);
                break;

            case 8:
                mostrarTodasLasCategorias();
                let nroCategoria = parseInt(prompt("Ingrese el numero de la categoria a filtrar:"));
                let tareasCategoria = filtrarTareasPorCategoria(nroCategoria);
                
                console.log("Tareas de la categoria seleccionada:");
                console.log(tareasCategoria);
                break;

            case 9:
                mostrarTodasLasCategorias();
                let nroCateg = parseInt(prompt("Ingrese el numero de la categoria a visualizar:"));
                contarTareasCompletadasPorCategoria(nroCategoria);
                break;

            case 10:
                    mostrarTareasNoCompletadas();
                    break;
        
            default:
                console.log("Opcion Invalida!");
                break;
        }
    }
}

interactuarConUsuario();


