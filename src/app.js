const express = require('express');
const cors = require('cors');
const {uuid} = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

/* An array just to simulate a database persistence. Witch one we yet don't have.*/
const repositories = [];

app.get('/repositories', (req, res) => {
  return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
  const {title, url, techs} = req.body;
  const newRepository = {repo_id: uuid(), title, url, techs, likes: 0};

  repositories.push(newRepository);

  res.status(200).json(newRepository);
});

app.put('/repositories/:repo_id', (req, res) => {
  const {repo_id} = req.params;
  const {title, url, techs} = req.body;
  const repositoryIndex = repositories.findIndex(repo => repo.repo_id === repo_id);

  if (repositoryIndex < 0) {
    return res.status(400).json({error: 'Respository not found.'});
  }

  const repository = {
    repo_id,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = repository;

  return res.status(200).json(repository);
});

app.delete('/repositories/:repo_id', (req, res) => {
  // TODO
});

app.post('/repositories/:repo_id/like', (req, res) => {
  // TODO
});

module.exports = app;
