const express = require("express");
const { db } = require("./db");
const app = express();
const session = require("express-session");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(__dirname + "/public"));
app.use(
  session({
    secret: "a long unguessable string here",
    resave: true,
    saveUninitialized: false
  })
);
app.use("/", require("./routes"));

io.on("connection", socket => {
  // console.log("connected with socket.id = " + socket.id);
  socket.on("send_msg", data => {
    socket.join(data.username);
    data.from = data.username;
    if (data.to != data.from) {
      if (data.to) {
        io.to(data.to).emit("recv_msg", data);
        io.to(socket.id).emit("recv_msg", data);
      } else {
        io.emit("recv_msg", data);
      }
    }
  });
});

db.sync().then(
  server.listen(5665, () => {
    console.log("server started on http://localhost:5665");
  })
);
