const app = require("express")();
const httpServer = require("http").createServer(app);
const { v4: uuid } = require("uuid");
const options = {
  cors: {
    origin: "http://localhost:3000",
  },
};
const io = require("socket.io")(httpServer, options);
const port = 4040;

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const messageStore = [];
const sessionStore = new Map();

io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (userId) {
    socket.userId = userId;
    const session = sessionStore.get(userId);
    if (session) {
      socket.displayName = session.displayName;
    }
    return next();
  } else {
    socket.userId = uuid();
    socket.displayName = socket.handshake.auth.displayName || "guest";
  }
  next();
});

io.on("connection", (socket) => {
  sessionStore.set(socket.userId, {
    userId: socket.userId,
    displayName: socket.displayName,
  });

  socket.emit("session", {
    userId: socket.userId,
    displayName: socket.displayName,
  });

  socket.on("summitMessage", (messageObj) => {
    messageStore.push(messageObj);
    io.emit("newMessage", messageObj);
  });

  socket.on("getSessionMessages", (Obj) => {
    const sessionIndex = messageStore.findIndex(
      (aMessage) => aMessage.userId === Obj.userId
    );
    const sessionMessages = messageStore.slice(sessionIndex);

    if (sessionMessages) {
      socket.emit("receiveSessionMessages", sessionMessages);
    }
  });
});
