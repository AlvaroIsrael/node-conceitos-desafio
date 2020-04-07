const express = require('express');
const cors = require('cors');
const {uuid} = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

/* An array just to simulate a database persistence. Witch one we yet don't have.*/
const repositories = [];

app.get('/repositories', (req, res) => {
  return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
  const {title, url, techs} = req.body;
  const newRepository = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(newRepository);

  res.status(200).json(newRepository);
});

app.put('/repositories/:id', (req, res) => {
  const {id} = req.params;
  let {title, url, techs, likes} = req.body;

  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({error: 'Respository not found.'});
  }

  const repo = repositories.find(repo => repo.id === id);

  let missingParameter = false;
  const myParameters = [title, url, techs, likes];

  /*I simply did not want an if else statment. Shamefull.*/
  for (let i = 0; i < myParameters.length - 1; i++) {
    if ((typeof (myParameters[i]) == 'undefined')) {
      missingParameter = true;
      break;
    }
  }

  let repository;

  if (missingParameter) {
    repository = {
      id: repo.id,
      title: repo.title,
      url: repo.url,
      techs: repo.techs,
      likes: repo.likes,
    };
  } else {
    repository = {
      id,
      title,
      url,
      techs,
      likes,
    };
  }

  repositories[repositoryIndex] = repository;

  return res.status(200).json(repository);
})
;

app.delete('/repositories/:id', (req, res) => {
  const {id} = req.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({error: 'Respository not found.'});
  }

  repositories.splice(repositoryIndex, 1);
  return res.status(204).send();
});

app.post('/repositories/:id/like', (req, res) => {
  const {id} = req.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({error: 'Respository not found.'});
  }

  const repository = repositories[repositoryIndex];

  repository.likes++;

  return res.status(200).json(repository);
});

module.exports = app;
