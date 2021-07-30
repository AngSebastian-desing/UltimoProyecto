const express = require('express');
const routes = express.Router();

const { list, create,  dlete } = require('../controllers/FavoritesController');

routes.get('/favorites', list);

routes.post('/favorites', create);

routes.delete('/favorites/:id', dlete);

module.exports = routes;