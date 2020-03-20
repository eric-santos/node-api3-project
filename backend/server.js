const express = require("express");
const postsRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const cors = require("cors");

const server = express();

//global middleware section
server.use(express.json());
server.use(cors());
server.use(logger);
server.use("/posts", postsRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.send("hello world!");
});

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);
  next();
}

module.exports = server;
