const app = require("express")();
const httpServer = require("http").createServer(app);
const { v4: uuid } = require('uuid');
const options = {
  cors: {
    origin: "http://localhost:3000",
  }
};
const io = require("socket.io")(httpServer, options);
const port = 4040;

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const messageStore = [];

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (userId) {
    socket.userId = userId;
    const session = messageStore.find((each) => each.userId === userId);
    if (session) {
      socket.displayName = session.displayName;
    }
  } else {
    socket.userId= uuid();
    socket.displayName = 'guest';
  }
  next();
});

io.on('connection', socket => {
  console.log('success connect!', socket.userId, socket.displayName, socket.handshake.auth.userId);


  socket.emit("session", {
    userId: socket.userId,
    displayName: socket.displayName,
  });

  socket.on('getMessage', messageObj => {
    messageStore.push(messageObj);
    io.emit('newMessage', messageObj)
  })
})



