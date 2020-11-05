//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];




cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);



    //Vaciar el carrito

    vaciarCarritoBtn.addEventListener('click', () => {

        articulosCarrito = []; // reseteamos el arreglo
        limpiarHtml(); // eliminamos todo el html
    })

}

//Funciones

function agregarCurso(e) {

    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const cursoSeleccionado = e.target.parentElement.parentElement

        leerDatosCurso(cursoSeleccionado);

    }

}

//  Elimina un curso  del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo por data-id
        articulosCarrito.forEach(curso => {
          if ( curso.id === cursoId) {
              if (curso.cantidad > 1) {
                  curso.cantidad--;

                  carritoHTML()
              }else {
                  articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
              }

          }
        })


        carritoHTML(); // iterar sobre el carrito y mostrar su html

    }
    
}





//Lee el contenido del HTMl al que le dimos click y extrae la información del curso

function leerDatosCurso(curso) {
    //console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito con el .some verifica si existe en el en un objeto

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if (existe) {

        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado

            } else {
                return curso; // retorna los objetos no duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos a la variable
    articulosCarrito = [...articulosCarrito, infoCurso ]
    }



    console.log(articulosCarrito);

    carritoHTML()

   

}




//Muestra el carrito de compras en el html

function carritoHTML() {

    //Limpiar el html
    limpiarHtml()

    //Recorre el html  y lo genera
    articulosCarrito.forEach( curso  => {
        //mejora
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `

            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo}</td>
            <td> ${precio}</td>
            <td> ${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
            
            

        `;

        //Agregar td en  el html del carrito
        contenedorCarrito.appendChild(row);

        
    })
}

//Elimina los cursos del tbody

function limpiarHtml() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    //Forma lenta
    //contenedorCarrito.innerHTML = '';
}
