// Añade la función para descargar la imagen utilizando dom-to-image
function descargarEquipos() {
  // Agrega un espacio adicional en el contenedor antes de capturar la imagen
  let contenedor = document.getElementById('tablaContainer');
  contenedor.style.padding = '10px';

  // Captura el contenido del contenedor y lo convierte en una imagen
  domtoimage.toBlob(contenedor)
    .then(function(blob) {
      // Restaura el espacio en el contenedor
      contenedor.style.padding = '';

      // Crea un enlace de descarga con la imagen generada
      let enlace = document.createElement('a');
      enlace.href = URL.createObjectURL(blob);
      enlace.download = 'equipos.png';

      // Simula un clic en el enlace para iniciar la descarga
      enlace.click();
    });
}

// Definición de la función para generar equipos aleatorios
function generarEquiposAleatorios(jugadores) {
  let jugadoresAleatorios = jugadores.slice();

  for (let i = jugadoresAleatorios.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [jugadoresAleatorios[i], jugadoresAleatorios[j]] = [jugadoresAleatorios[j], jugadoresAleatorios[i]];
  }

  let mitad = jugadoresAleatorios.length / 2;
  let equipo1 = jugadoresAleatorios.slice(0, mitad);
  let equipo2 = jugadoresAleatorios.slice(mitad);

  return {
    equipo1: equipo1,
    equipo2: equipo2
  };
}

// Modifica la función generarEquipos
function generarEquipos() {
  let numJugadores = prompt("Ingrese el número de jugadores (mínimo 4 y número par):");

  if (isNaN(numJugadores) || numJugadores < 4 || numJugadores % 2 !== 0) {
    alert("Por favor, ingrese un número par mayor o igual a 4.");
    return;
  }

  let jugadores = [];

  for (let i = 1; i <= numJugadores; i++) {
    let nombre = prompt("Ingrese el nombre del jugador " + i + ":");
    jugadores.push(nombre);
  }

  let equipos = generarEquiposAleatorios(jugadores);

  // Crear una tabla para mostrar los equipos
  let tabla = "<table border='1'><tr><th>Equipo 1</th><th>Equipo 2</th></tr>";

  for (let i = 0; i < equipos.equipo1.length; i++) {
    tabla += "<tr><td>" + equipos.equipo1[i] + "</td><td>" + equipos.equipo2[i] + "</td></tr>";
  }

  tabla += "</table>";

  // Crear un contenedor para la tabla y el botón
  let contenedor = document.createElement('div');
  contenedor.id = 'tablaContainer';
  contenedor.innerHTML = tabla;

  // Mostrar el contenedor en el cuerpo del documento HTML
  document.body.appendChild(contenedor);

  // Hacer visible el botón después de generar los equipos
  let botonDescarga = document.getElementById('descargarEquiposBtn');
  botonDescarga.style.display = 'block';

  botonDescarga.addEventListener('click', descargarEquipos);
}

// Llama a la función generarEquipos al cargar la página
generarEquipos();
