import express from 'express';
const routes = express.Router();

import { getInitialConfig } from './controllers/OAuth';

routes.use('/static', express.static(__dirname + '/static'));
routes.get('/v1.0/initialConfig', getInitialConfig);

module.exports = routes;