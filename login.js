const usuario=document.getElementById('usuario')
const contraseña=document.getElementById('contraseña')
const login=document.getElementById('login')
const mensaje=document.getElementById('mensaje')
url = "http://api-viajes-77bq.vercel.app/api/administradores"
/*el administrador tiene que guardar los datos de usuario y contraseña
login.addEventListener("click",function(){
    const usuarioValor=usuario.value
    const contraseñaValor=contraseña.value
    const usuarioGuardado= JSON.parse(localStorage.getItem('usuario')) || {}

    if(!usuarioGuardado.nombre){
        const usuarioNuevo={
            nombre:usuarioValor,
            contraseña:contraseñaValor
        }
        localStorage.setItem('usuario',JSON.stringify(usuarioNuevo))
        mensaje.textContent="Usuario y contraseña guardados"
    }else{
        if(usuarioValor ===usuarioGuardado.nombre && contraseñaValor===usuarioGuardado.contraseña){
            mensaje.textContent="Bienvenido"
            window.location.href = "main.html"
    }else{
        mensaje.textContent="Error"
    }
}
})
los datos ya estan guardados*/

login.onclick = (preventDefault) => {
    fetch("http://api-viajes-77bq.vercel.app/api/administradores")
    .then(response => response.json())
    .then(data => traerData(data))
    function traerData(data){
        data.forEach((dta) => {
            console.log(dta)
        
        if(usuario.value === dta.nombre && contraseña.value === dta.contraseña){
            
            window.location.href ="main.html"
            pass
        }else{
            alert("Usuario o contraseña incorrectos");
            pass
        }
        });
    }
    
}


