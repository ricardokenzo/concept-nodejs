const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const { request } = require("express");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});


app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repo = {id: uuid(), title, url, techs, likes:0}

  repositories.push(repo);

  return response.json(repo);

});


app.put("/repositories/:id", (request, response) => {
  // title, a url e as techs for same id
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0){
    return response.status(400).send();
  }

  const likes = repositories[repoIndex].likes;
  const repo ={
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repoIndex] = repo;

  return response.json(repo);


});


app.delete("/repositories/:id", (request, response) => {
  const{id} = request.params;

  const repoIndex = repositories.findIndex(repo =>repo.id === id);

  if(repoIndex < 0){
    return response.status(400).send();
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();  
});


app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0){
    return response.status(400).send();
  }

  const likes = repositories[repoIndex].likes += 1;
  const repo ={
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repoIndex] = repo;

  return response.json(repo);

  
});

module.exports = app;
