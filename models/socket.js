class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
        this.arreglouser = [];
    }

    socketEvents() {
        this.io.on('connection', client => {
            console.log(client.id)
            client.on('msj-input-server', (data) => {
                console.log(data);

                //this.io.emit('msj-output-client', data);
            })
            this.io.emit('recibirMensaje', 'conectado')

            client.on('enviarMensaje', (data)=>{
                this.arreglouser.push({
                    idUser: client.id, 
                    username: data
                })
                console.log(data);
                this.io.emit('recibirDatos',this.arreglouser);
            })

            client.on('mensaje', (data)=>{
                console.log('llega a server')
                console.log(data)
                this.io.emit('mensajeServer', data)
            })

            client.on('enviandoEstatus', (data)=>{
                this.io.emit('recibiendoEstatus',data)
            })
            
        });
    }

}

module.exports = Sockets;