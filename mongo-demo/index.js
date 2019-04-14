const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playgroung')
  .then(() => console.log('Connected  to mongodb'))
  .catch(err => console.error('Could not connect to mongo db', err));

  