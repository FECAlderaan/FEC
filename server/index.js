/* eslint-disable no-console */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

const app = express();
const port = 8080;
app.use(express.static('client/dist'));
app.use(express.json());

const API_SERVICE_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/';
dotenv.config();

app.use('/atelier', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    atelier: '',
  },
  onProxyReq: function onProxyReq(proxyReq, req) {
    proxyReq.setHeader('Authorization', process.env.API_KEY);
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

app.listen(port, () => {
  console.log(`Catwalk is listening at http://localhost:${port}`);
});
