import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import passport from './services/strategy';
import router from './routes';
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const router = require(__dirname + '/routes');
const app = express();

// app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('etag', false);
app.disable('etag');

app.use('/', router);

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send(err.message);
});

const server = app.listen(3000, () => {
  console.log('server run');
});

export default server;
