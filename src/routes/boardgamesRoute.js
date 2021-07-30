const express = require('express');
const routes = express.Router();

const { list, getBoardGame, create, edit, dlete } = require('../controllers/BoardGamesController');

routes.get('/boardgame', list);

routes.get('/boardgame/:id', getBoardGame );

routes.post('/boardgame', create);

routes.put('/boardgame/:id', edit);

routes.delete('/boardgame/:id', dlete);

module.exports = routes;