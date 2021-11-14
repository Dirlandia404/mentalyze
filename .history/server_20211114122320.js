const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/chat", (req, res) => {
  res.render("chat.html");
});
app.use("/atendimento", (req, res) => {
  res.render("atendimento.html");
});
app.use("/finalizar", (req, res) => {
  res.render("fim.html");
});
let messages = [];
io.on("connection", (socket) => {
  socket.emit("previousMessages", messages);

  socket.on("sendMessage", (data) => {
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});
server.listen(3000);
