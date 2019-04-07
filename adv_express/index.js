/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

const logger = require('./logger');

const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // it constains static contents like css, images
app.use(logger);
app.use(helmet());
app.use(morgan('tiny'));

app.use((req, res, next) => {
  console.log('authenticating......');
  next();
});

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' }
];

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(genre, schema);
}

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  return res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  return res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }
  return res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
