const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const corss = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const calc = require("./src/helpers/calcDay");

console.log(calc(new Date("2020-12-03")));

const app = express();
const server = http.Server(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});


app.use((req, res, next) => {
  req.io = io;
  return next();
});

const PORT = 2222;
const HOST = "0.0.0.0";

app.use(morgan("dev"));
app.use(corss("*"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("./src/routes"));

server.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});
