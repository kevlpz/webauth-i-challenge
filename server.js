const express = require('express');

const server = express();

server.use(express.json());

const userRouter = require('./data/users/users-router.js');
server.use('/users', userRouter);

module.exports = server;