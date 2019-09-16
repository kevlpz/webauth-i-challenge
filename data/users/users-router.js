const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.get('/', auth, (req, res) => {
    Users.getUsers()
        .then(users => res.status(200).json(users))
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not retrieve users"});
        });
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password);

    Users.insert({username, password: hash})
        .then(user => res.status(201).json(user))
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not create user"});
        });
});

router.post('/login', auth, (req, res) => {
    const { username } = req.body;

    Users.getByUsername(username)
        .then(user => {
            res.status(200).json({message: `Welcome, ${user.username}`});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "Could not log in"});
        });
});

// custom middleware
function auth(req, res, next) {
    const {username, password} = req.body;
    if(username && password) {
        Users.getByUsername(username)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({message: "Invalid credentials"});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: "Could not retrieve user"});
            });
    } else {
        res.status(400).json({message: "Must provide credentials"});
    }
}

module.exports = router;