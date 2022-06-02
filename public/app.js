let usuario = document.getElementById('usuario');
let messageBox = document.getElementById('message');
let chat = document.getElementById('chat');
let enviar =document.getElementById('enviar');

let datBox

let user = document.getElementById('user');
let btnUser = document.getElementById('enviaruser');

let userDest = document.getElementById('destinatario');
let btnPriv = document.getElementById('enviarpriv');

let btnConc = document.getElementById('conectados');

btnUser.addEventListener('click',()=>{
    user.disabled=true;
    let username = {tipo:1, user:user.value}
    socket = new WebSocket("ws://localhost:8080");
    socket.onopen = (e) => {
        console.log("conexión establecida por: " + username.user);
        socket.send(JSON.stringify(username));


        enviar.addEventListener('click',()=>{
            datBox = {tipo:2,remitente:username.user, msg:messageBox.value};
            console.log(datBox)
        
        
            socket.send(JSON.stringify(datBox));
            console.log(`mensaje enviado: ${datBox.msg}`);
        
            messageBox.value = "";
            
        });

        btnPriv.addEventListener('click', ()=>{
            datBox = {tipo:3, remitente: username.user, dest: userDest.value, msg: msgPriv.value}
            console.log(datBox)

            socket.send(JSON.stringify(datBox));
            console.log(`mensaje enviado a: ${datBox.dest} msg: ${datBox.msg}`)

            userDest.value = "";
            msgPriv.value = "";
        });

        btnConc.addEventListener('click', ()=>{
            datBox ={tipo:4}
            socket.send(JSON.stringify(datBox))
        });

        socket.onmessage = (event) => {
            let evento = JSON.parse(event.data)
           console.log(evento)
           if(evento.tipo==1)
           {
               let text =`Bienvenido ${evento.user}<br>`
               nusuario.innerHTML += text

           }
           if(evento.tipo==2)
           {
                console.log(evento.tipo)
                let text = `${evento.remitente}: ${evento.msg}<br>`;
                console.log(text);
                chat.innerHTML += text;
           }
           if(evento.tipo==3)
           {
               let text = `${evento.remitente} te susurra: ${evento.msg}<br>`
               chat.innerHTML += text;
           }
           if(evento.tipo==4)
           {
               let text = `${evento.msg}<br>`
               usuario.innerHTML+= text;
           }
        };

    };

});