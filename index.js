let app = require('express')();
var cors = require('cors')
let server = require('http').createServer(app);
const bodyParser = require('body-parser');
const { Mensaje } = require('./db');

let io = require('socket.io')(server, {
     cors: {
        methods: ['GET', 'PATCH', 'POST', 'PUT'],
        origin: "http://localhost:8100",
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    } });

require('./db');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  getUsers,
  getUserRooms
} = require('./utils/users');

app.use(cors())
const apiRouter = require('./routes/api');

io.on('connection', (socket)=> {

    socket.on('disconnect', function(){
        //falta que al abandonar el usuario, abandone todas las salas
        const userEliminados = userLeave(socket.id);
        console.log(userEliminados)
        if (userEliminados) {
            userEliminados.forEach(user => {

                io.to(user.room).emit('users-changed', {user: socket.username, event: 'left'});
                // Send users and room info
                io.emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room),
                    usersFull: getUsers()
                });

            });
        }
    });

    socket.on('set-name', (data) => {
        
        roomName = 'room_' + data.name;
        if (data.room !== null && data.room !== '') {
            roomName = data.room; 
            console.log('seteo sala '+ roomName)
        }
        //check if user is already in room?
        if(io.sockets.adapter.sids[socket.id][roomName]){
            console.log('el user '+ data.name + ' ya estaba en la habitacion ' + roomName)
        }else{
            socket.join(roomName);
            // room++;
            socket.username = data.name;
            io.to(roomName).emit('users-changed', {user: data.name, event: 'joined'});
            const user = userJoin(socket.id, socket.username, roomName);
            console.log(user);
            // Send users and room info
            io.emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room),
                usersFull: getUsers()
            });
        }
    });

    socket.on('send-message', async (message) => {
        const user = getCurrentUser(socket.id);
        console.log(user)
        roomToSend = message.room != undefined ? message.room : user.room;

        io.to(roomToSend).emit('message', {msg: message.text, user: socket.username, room: roomToSend, createdAt: new Date()});
        var id = socket.username.split("-")[1];
        await Mensaje.create({msg: message.text, user_id: id, room: roomToSend});

    });
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Anda el raiz')
});

app.use('/api', apiRouter);

var port = process.env.PORT || 3001;

server.listen(port, function(){
    console.log('escuchando en http://localhost:' + port)
});