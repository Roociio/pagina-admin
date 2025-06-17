const partida_ing=  document.getElementById('partida')
const destino_ing =document.getElementById('destino')
const asientos_disponibles_ing = document.getElementById('asientos_disponibles')
const agreagar_vuelos=document.querySelectorAll('.agregar_vuelos')
const btn_agregar_vuelos=document.getElementById('btn_Agregar_vuelos')
const btn1 = document.querySelector(".btn1")
const partida_act=  document.getElementById('partida_act')
const destino_act =document.getElementById('destino_act')
const asientos_disponibles_act = document.getElementById('asientos_disponibles_act')
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
        "tipo_alquiler":partida_ing.value,
        "precio_dia":destino_ing.value,
        "dias_disponibles": asientos_disponibles_ing.value,
    }
    fetch('https://api-viajes-77bq.vercel.app/api/alquileres', {
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
btn2.addEventListener("click",(e)=>{
    e.preventDefault()
    datos={
        
        "tipo_alquiler":partida_act.value,
        "precio_dia":destino_act.value,
        "dias_disponibles": asientos_disponibles_act.value,

    }
    let url =`https://api-viajes-77bq.vercel.app/api/alquileres/actualizar/${id.value}`
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

btn3.addEventListener("click",(e)=>{
    e.preventDefault()
    let url =`https://api-viajes-77bq.vercel.app/api/alquileres/eliminar/${id_eliminar.value}`
    fetch(url, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
    },
    })
})
fetch('https://api-viajes-77bq.vercel.app/api/alquileres/leer')
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
                <td>${vuelo.id_alquileres}</td>
                <td>${vuelo.tipo_alquiler}</td>
                <td>${vuelo.precio_dia}</td>
                <td>${vuelo.dias_disponibles}</td>
            </tr>`;
    });

    document.getElementById('data').innerHTML = body;
};
