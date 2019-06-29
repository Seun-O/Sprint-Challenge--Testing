const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./database");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("The Server is Alive");
});

server.get("/api/games", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = server;
