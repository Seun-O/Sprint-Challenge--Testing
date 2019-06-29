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

server.post("/api/games", async (req, res) => {
  try {
    if (!req.body.title || !req.body.genre) {
      res.status(402).json("Title and Genre Required");
    }
    const data = await db.addGame(req.body);
    res.status(201).json(data);
  } catch (err) {
    // res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.delete("/api/games/:id", async (req, res) => {
  try {
    const data = await db.delGame(req.params.id);
    res.status(204).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.get("/api/games/:id", async (req, res) => {
  try {
    const data = await db.find(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = server;
