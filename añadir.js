const partida_ing=  document.getElementById('partida')
const destino_ing =document.getElementById('destino')
const asientos_disponibles_ing = document.getElementById('asientos_disponibles')
const precio_ing = document.getElementById('precio')
const fecha_de_salida_ing = document.getElementById('fecha_de_salida')
const hora_de_salida_ing = document.getElementById('hora_de_salida')
const agreagar_vuelos=document.querySelectorAll('.agregar_vuelos')
const btn_agregar_vuelos=document.getElementById('btn_Agregar_vuelos')
const btn1 = document.querySelector(".btn1")
const partida_act=  document.getElementById('partida_act')
const destino_act =document.getElementById('destino_act')
const asientos_disponibles_act = document.getElementById('asientos_disponibles_act')
const precio_act = document.getElementById('precio_act')
const fecha_de_salida_act = document.getElementById('fecha_de_salida_act')
const hora_de_salida_act = document.getElementById('hora_de_salida_act')
const actualizar_vuelos=document.querySelectorAll('.actualizar_vuelos')
const btn_actualizar_vuelos=document.getElementById('btn_Actualizar_vuelos')
const id_eliminar = document.getElementById('id_eliminar')
const eliminar_vuelos = document.querySelector(".eliminar_vuelos")
const btn_eliminar_vuelos=document.getElementById('btn_Eliminar_vuelos')
const btn3 = document.querySelector(".btn3")
const btn2 = document.querySelector(".btn2")
const id = document.getElementById('id')
const tabla = document.getElementById('tabla')
btn_agregar_vuelos.addEventListener("click",function(){
    agreagar_vuelos.forEach(vuelos => {
        if (vuelos.style.display === 'block') {
            vuelos.style.display = 'none'  
            
        } else {
            vuelos.style.display = 'block'

        }})
})


btn1.addEventListener("click",()=>{
    datos={
        "partida":partida_ing.value,
        "destino":destino_ing.value,
        "asientos_disponibles": asientos_disponibles_ing.value,
        "precio":precio_ing.value,
        "fecha_de_salida":fecha_de_salida_ing.value,
        "hora_de_salida":hora_de_salida_ing.value,
    
    }
    fetch('https://api-viajes-77bq.vercel.app/api/vuelos', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos) 
  
    })
})
btn_actualizar_vuelos.addEventListener("click",function(){
    actualizar_vuelos.forEach(vuelo_actualizado => {
        if (vuelo_actualizado.style.display === 'block'  ) {
            vuelo_actualizado.style.display = 'none'
            tabla.style.display ='none'
        } else {
            vuelo_actualizado.style.display = 'block'
            tabla.style.display ='block'
         }})
})
btn2.addEventListener("click",()=>{
    datos={
        "partida":partida_act.value,
        "destino":destino_act.value,
        "asientos_disponibles": asientos_disponibles_act.value,
        "precio":precio_act.value,
        "fecha_de_salida":fecha_de_salida_act.value,
        "hora_de_salida":hora_de_salida_act.value,
    
    }
    let url =`https://api-viajes-77bq.vercel.app/api/vuelos/actualizar/${id.value}`
    fetch(url, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos) 
  
    })
})
btn_eliminar_vuelos.addEventListener("click",function(){
    if (eliminar_vuelos.style.display === 'block'  ) {
        eliminar_vuelos.style.display = 'none'
        tabla.style.display ='none'
    } else {
        eliminar_vuelos.style.display = 'block'
        tabla.style.display ='block'
        }})

btn3.addEventListener("click",()=>{
    let url =`https://api-viajes-77bq.vercel.app/api/vuelos/eliminar/${id_eliminar.value}`
    fetch(url, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
    },
    })
})
fetch('https://api-viajes-77bq.vercel.app/api/vuelos/leer')
    .then(res => {
        if (!res.ok) throw new Error("Error al obtener vuelos");
        return res.json();
    })
    .then(data => mostrarData(data))
    .catch(error => console.error("Error en la petición:", error));

// Función para mostrar los datos
const mostrarData = (data) => {
    if (!Array.isArray(data)) {
        console.error("Los datos recibidos no son una lista:", data);
        return;
    }

    let body = "";
    data.forEach(vuelo => {
        body += `
            <tr>
                <td>${vuelo.id_vuelos}</td>
                <td>${vuelo.partida}</td>
                <td>${vuelo.destino}</td>
                <td>${vuelo.asientos_disponibles}</td>
                <td>${vuelo.precio}</td>
                <td>${vuelo.fecha_de_salida}</td>
                <td>${vuelo.hora_de_salida}</td>
            </tr>`;
    });

    document.getElementById('data').innerHTML = body;
};
