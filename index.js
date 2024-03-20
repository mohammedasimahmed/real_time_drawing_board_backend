// require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
// require("./config/config.js")
const app = express();
const server = http.createServer(app);

app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected with client");

  //   socket.on("send_ans", (data) => {
  //     console.log(data.room);
  //     socket.to(data.room).emit("obtainAns", data.ans);
  //     console.log("sent answer to " + data.room);
  //   });

  socket.on("join_room", (room) => {
    socket.join(room);
    socket.on("send_drawing", (data, mouse, height, width) => {
      socket.to(room).emit("receive_drawing", data, mouse, height, width);
      // console.log(data)
      // console.log("sent drawing")
    });
    socket.on("send_text", (text) => {
      socket.to(room).emit("receive_text", text);
    });
    // console.log("joined room ", room);
  });
  //   socket.on("leave_room", (data) => {
  //     console.log("hi");
  //     socket.leave(data);
  //     console.log("left room " + data);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("disconnected");
  //   });
});

server.listen(5000, () => console.log("Server started at port 5000"));
