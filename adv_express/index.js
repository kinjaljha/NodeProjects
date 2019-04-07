/* eslint-disable radix */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');

const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();

// Configuration
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail server name: ${config.get('mail.host')}`);
console.log(`Mail server password: ${config.get('mail.password')}`);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // it constains static contents like css, images

app.use(helmet());
app.use('/', home);
app.use('/api/genres', genres);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan Enabled');
}

app.use(logger);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
