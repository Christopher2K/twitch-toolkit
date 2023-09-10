import Ws from 'App/Services/Ws';
Ws.boot();

Ws.io.on('connection', (socket) => {
  socket.emit('meta', { status: 'connected' });
});
