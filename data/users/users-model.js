const db = require('../db.js');

module.exports = {
    getUsers,
    getById,
    getByUsername,
    insert
}

function getUsers() {
    return db('users');
}

function getById(id) {
    return db('users')
        .where({id: id})
        .first();
}

function getByUsername(username) {
    return db('users')
        .where({username: username})
        .first();
}

function insert(user) {
    return db('users')
        .insert(user)
        .then(([id]) => getById(id));
}