// intialized io with the socket.io
const io = require('socket.io')(7003, {cors:
  {origin:"*",}
});

const users= {};

//connecting the sever with the io

io.on('connection', socket=>{
  // If any new users joined. Let other users connected to the server know
  socket.on('new-user-joined', name=>{
    users[socket.id]=name;
    socket.broadcast.emit('user-joined', name);
  });

  //If someone sends the message it broadcasts to other people.
  socket.on('send', message=>{
    socket.broadcast.emit('receive', {message:message, name:users[socket.id]});
  });

  //If someone left the chat it broadcasts the left message to others
  socket.on('disconnect', message=>{
    socket.broadcast.emit('left' , {name:users[socket.id]})
    delete users[socket.id];
  })
});