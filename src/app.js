const express = require('express');
const cors = require('cors');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
  // TODO
});

app.post('/repositories', (req, res) => {
  // TODO
});

app.put('/repositories/:id', (req, res) => {
  // TODO
});

app.delete('/repositories/:id', (req, res) => {
  // TODO
});

app.post('/repositories/:id/like', (req, res) => {
  // TODO
});

module.exports = app;
