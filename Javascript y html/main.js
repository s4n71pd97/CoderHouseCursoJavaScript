class Personas {
  constructor(Nombre, Apellido, DNI, CUIL, Ciudad, Direccion) {
    this.Nombre = Nombre;
    this.Apellido = Apellido;
    this.DNI = DNI;
    this.CUIL = CUIL
    this.Ciudad = Ciudad;
    this.Direccion = Direccion;

  }

  Mostrar(Personas) {
    return Personas;
  }
}

// creo la funcion el cual me va a cargar las personas a la api
function crearPersona() {
  const p = new Personas(

    (Nombre = document.getElementById("Nombre").value),
    (Apellido = document.getElementById("Apellido").value),
    (DNI = document.getElementById("Documento").value),
    (CUIL = document.getElementById("Cuil").value),
    (Ciudad = document.getElementById("Ciudad").value),
    (Direccion = document.getElementById("Direccion").value)
  );

  console.log(JSON.stringify(p))
  // verifico que los campos no esten vacios
  if (Nombre == "" || Apellido == "" || DNI == "" || CUIL == "" || Ciudad == "" || Direccion == "") {
    Swal.fire("Falta ingresar campo");
  } else {

    fetch('https://coder-house-javascript.herokuapp.com/carga', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(p),
      })
      .then((response) => response.json())
      .then((p) => {
        console.log('Success:', p);
      })
      .catch((error) => {
        console.error('Tenes un error:', error);
      });
  }
}


function Mostrar() {
  
  const valor =  document.getElementById("PersonasSelect").value; 
  const $elemnto = document.querySelector("#cuerpoTabla");
  $elemnto.innerHTML = "";

  fetch(`https://coder-house-javascript.herokuapp.com/traerConId/${valor}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (Personas) {   
      console.log(Personas)  

      const $cuerpoTabla = document.querySelector("#cuerpoTabla"); {
        Personas.map((value) => {
          const $tr = document.createElement("tr");

          let $tdNombre = document.createElement("td");
          $tdNombre.textContent = value.Nombre;
          $tr.appendChild($tdNombre);

          let $tdApellido = document.createElement("td");
          $tdApellido.textContent = value.Apellido;
          $tr.appendChild($tdApellido);

          let $tdDNI = document.createElement("td");
          $tdDNI.textContent = value.DNI;
          $tr.appendChild($tdDNI);

          let $tdCUIL = document.createElement("td");
          $tdCUIL.textContent = value.CUIL;
          $tr.appendChild($tdCUIL);

          let $tdCiudad = document.createElement("td");
          $tdCiudad.textContent = value.Ciudad;
          $tr.appendChild($tdCiudad);

          let $tdDireccion = document.createElement("td");
          $tdDireccion.textContent = value.Direccion;
          $tr.appendChild($tdDireccion);

          $cuerpoTabla.appendChild($tr);
        })
      }
    })

}


document.addEventListener("DOMContentLoaded", () => {

  let $select = document.getElementById("PersonasSelect")
  fetch(`https://coder-house-javascript.herokuapp.com/traer`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      data.map((value) => {
        let option = document.createElement('option');
        option.value = value.id;
        option.text = value.DNI;
        $select.appendChild(option);
        const $cuerpoTabla = document.querySelector("#cuerpoTabla"); {
          const $tr = document.createElement("tr");

          let $tdNombre = document.createElement("td");
          $tdNombre.textContent = value.Nombre;
          $tr.appendChild($tdNombre);

          let $tdApellido = document.createElement("td");
          $tdApellido.textContent = value.Apellido;
          $tr.appendChild($tdApellido);

          let $tdDNI = document.createElement("td");
          $tdDNI.textContent = value.DNI;
          $tr.appendChild($tdDNI);

          let $tdCUIL = document.createElement("td");
          $tdCUIL.textContent = value.CUIL;
          $tr.appendChild($tdCUIL);

          let $tdCiudad = document.createElement("td");
          $tdCiudad.textContent = value.Ciudad;
          $tr.appendChild($tdCiudad);

          let $tdDireccion = document.createElement("td");
          $tdDireccion.textContent = value.Direccion;
          $tr.appendChild($tdDireccion);

          $cuerpoTabla.appendChild($tr);
        }
      })

    })

  document.querySelector("#Guardar").addEventListener("click", crearPersona);
  document.querySelector("#Mostrar").addEventListener("click", Mostrar);
})