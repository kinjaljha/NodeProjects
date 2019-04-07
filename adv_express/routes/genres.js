/* eslint-disable comma-dangle */
/* eslint-disable radix */
const express = require('express');
const Joi = require('joi');

const router = express.Router();

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

router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    // eslint-disable-next-line comma-dangle
    name: req.body.name
  };
  genres.push(genre);
  return res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  return res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  return res.send(genre);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with the given ID was not found.');
  }
  return res.send(genre);
});

module.exports = router;
