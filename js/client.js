const socket =io('http://localhost:7003');

const form = document.getElementById('send-container');
const messageInp= document.getElementById('messageInp');
const messageContainer = document.querySelector('.message-container');
const audio = new Audio('ringtone.mp3');

const append = (message, position)=>{
    const newElement = document.createElement('div');
    newElement.classList.add('message');
    newElement.classList.add(position);
    newElement.innerHTML= message;
    messageContainer.append(newElement);
    if (position=='left'){
        audio.play();
    }
}


const namee = prompt('enter your name to join');
socket.emit('new-user-joined', namee);

socket.on( 'user-joined', namee=>{
    append(`${namee} joined the chat`, 'left');
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, "right");
    socket.emit('send', message);
    messageInp.value=""
})

socket.on('receive', data=>{
    append(`${data.name}:${data.message}`, 'left');
})

socket.on('left', data=>{
    append(`${data.name} left the chat`, 'left')
})