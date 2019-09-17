const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.use(session({
    name: 'llama',
    secret: process.env.SESSION_SECRERT || 'this is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'knexsessions',
        createtable: true,
        clearInterval: 1000 * 60 * 30
    })
}))

const userRouter = require('./data/users/users-router.js');
server.use('/users', userRouter);

module.exports = server;