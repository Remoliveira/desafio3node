const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  // const updatedRepository = request.body;
  const { title, url, techs } = request.body;

  // repositoryIndex = repositories.findindex(repository => repository.id === id);
  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  // const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  // repositories[repositoryIndex] = repository;
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.status(202).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  // const repository = repositories.find((repository) => repository.id === id);

  // if (!repository) {
  //   return response.status(404).json({ error: "Repository not found" });
  // }
  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.status(200).json({likes:likes});
});

module.exports = app;
