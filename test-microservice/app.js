'use strict';
const express = require('express'),
  morgan = require('morgan'),
  path = require('path');
const app = express();
app.use(morgan('dev'));
const port = process.env.PORT || 8080;

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));

/* eslint-disable no-unused-vars */
// 404
app.use((req, res, next) => res.status(404).send('Not Found'));

// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error: ' + err);
});
/* eslint-enable no-unused-vars */

// Handle shutdown behaviour cleanly
const shutdownSystem = code => process.exit(code);
process.on('exit', code => console.info(`Application about to exit with code: ${code}`));
process.on('SIGINT', () => shutdownSystem('SIGINT'));
process.on('SIGTERM', () => shutdownSystem('SIGTERM'));

app.listen(port, () => console.log('http://localhost:' + port));
