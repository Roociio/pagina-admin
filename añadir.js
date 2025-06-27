
// Inputs y secciones
const partida_ing = document.getElementById('partida');
const destino_ing = document.getElementById('destino');
const asientos_disponibles_ing = document.getElementById('asientos_disponibles');
const precio_ing = document.getElementById('precio');
const fecha_de_salida_ing = document.getElementById('fecha_de_salida');
const hora_de_salida_ing = document.getElementById('hora_de_salida');

const partida_act = document.getElementById('partida_act');
const destino_act = document.getElementById('destino_act');
const asientos_disponibles_act = document.getElementById('asientos_disponibles_act');
const precio_act = document.getElementById('precio_act');
const fecha_de_salida_act = document.getElementById('fecha_de_salida_act');
const hora_de_salida_act = document.getElementById('hora_de_salida_act');

const id_eliminar = document.getElementById('id_eliminar');
const id = document.getElementById('id');

const tabla = document.getElementById('tabla');

// Botones y secciones de UI
const agreagar_vuelos = document.querySelectorAll('.agregar_vuelos');
const actualizar_vuelos = document.querySelectorAll('.actualizar_vuelos');
const eliminar_vuelos = document.querySelector(".eliminar_vuelos");

const btn_agregar_vuelos = document.getElementById('btn_Agregar_vuelos');
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn_actualizar_vuelos = document.getElementById('btn_Actualizar_vuelos');
const btn_eliminar_vuelos = document.getElementById('btn_Eliminar_vuelos');
const btn3 = document.querySelector(".btn3");

// Mostrar/Ocultar sección de agregar vuelos
btn_agregar_vuelos.addEventListener("click", () => {
    agreagar_vuelos.forEach(v => {
        v.style.display = v.style.display === 'block' ? 'none' : 'block';
    });
});

// Agregar vuelo (POST)
btn1.addEventListener("click", () => {
    const datos = {
        partida: partida_ing.value,
        destino: destino_ing.value,
        asientos_disponibles: asientos_disponibles_ing.value,
        precio: precio_ing.value,
        fecha_de_salida: fecha_de_salida_ing.value,
        hora_de_salida: hora_de_salida_ing.value,
    };

    fetch('https://api-viajes-77bq.vercel.app/api/vuelos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al agregar vuelo");
        alert("Vuelo agregado exitosamente");
        return fetchVuelos();
    })
    .catch(err => console.error("Error al agregar vuelo:", err));
});

// Mostrar/Ocultar sección de actualizar vuelos
btn_actualizar_vuelos.addEventListener("click", () => {
    actualizar_vuelos.forEach(v => {
        v.style.display = v.style.display === 'block' ? 'none' : 'block';
    });
    tabla.style.display = tabla.style.display === 'block' ? 'none' : 'block';
});

// Actualizar vuelo (PUT)
btn2.addEventListener("click", () => {
    const datos = {
        partida: partida_act.value,
        destino: destino_act.value,
        asientos_disponibles: asientos_disponibles_act.value,
        precio: precio_act.value,
        fecha_de_salida: fecha_de_salida_act.value,
        hora_de_salida: hora_de_salida_act.value,
    };

    const idVuelo = id.value.trim();
    if (!idVuelo) return alert("Por favor ingresa un ID válido.");

    const url = `https://api-viajes-77bq.vercel.app/api/vuelos/actualizar/${idVuelo}`;

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al actualizar vuelo");
        alert("Vuelo actualizado correctamente");
        return fetchVuelos();
    })
    .catch(err => console.error("Error al actualizar:", err));
});

// Mostrar/Ocultar sección eliminar vuelos
btn_eliminar_vuelos.addEventListener("click", () => {
    eliminar_vuelos.style.display = eliminar_vuelos.style.display === 'block' ? 'none' : 'block';
    tabla.style.display = tabla.style.display === 'block' ? 'none' : 'block';
});

// Eliminar vuelo (DELETE)
btn3.addEventListener("click", () => {
    const idVuelo = id_eliminar.value.trim();
    if (!idVuelo) return alert("Por favor ingresa un ID para eliminar.");

    const url = `https://api-viajes-77bq.vercel.app/api/vuelos/eliminar/${idVuelo}`;

    fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al eliminar vuelo");
        alert("Vuelo eliminado correctamente");
        return fetchVuelos();
    })
    .catch(err => console.error("Error al eliminar vuelo:", err));
});

// Leer y mostrar vuelos al cargar
function fetchVuelos() {
    return fetch('https://api-viajes-77bq.vercel.app/api/vuelos/leer')
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener vuelos");
            return res.json();
        })
        .then(data => mostrarData(data))
        .catch(error => console.error("Error en la petición:", error));
}

fetchVuelos();

// Mostrar datos en la tabla
const mostrarData = (data) => {
    if (!Array.isArray(data)) {
        console.error("Los datos recibidos no son una lista:", data);
        return;
    }

    const body = data.map(vuelo => `
        <tr>
            <td>${vuelo.id_vuelos}</td>
            <td>${vuelo.partida}</td>
            <td>${vuelo.destino}</td>
            <td>${vuelo.asientos_disponibles}</td>
            <td>${vuelo.precio}</td>
            <td>${vuelo.fecha_de_salida}</td>
            <td>${vuelo.hora_de_salida}</td>
        </tr>
    `).join('');

    document.getElementById('data').innerHTML = body;
};
