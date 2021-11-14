const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ajs").renderFile);
app.set("view engine", "html");

app.use("/chat", (req, res) => {
  res.render("chat.html");
});

io.on("connection", (Socket) => {
  console.log(`Socket conectado: ${Socket.id}`);
});
server.listen(3000);
