const functions = require('firebase-functions');
const prpl = require('prpl-server');
const express = require('express');
const rendertron = require('rendertron-middleware');

const app = express();

const rendertronMiddleware = rendertron.makeMiddleware({
//  proxyUrl: 'https://render-tron.appspot.com/render',
  proxyUrl: 'http://google.bazdara.com:3000/render',
  injectShadyDom: true,
});

app.use((req, res, next) => {
  req.headers.host = 'vreme-live.firebaseapp.com';
  return rendertronMiddleware(req, res, next);
});

app.get('/*', prpl.makeHandler('./build', require('./build/polymer.json')));

exports.app = functions.https.onRequest(app);
