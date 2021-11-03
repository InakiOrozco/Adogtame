const Database = require('./../models/database');
const path = require('path');

class UsersController {

    static getAllUsers(req, res) {
        const database = new Database('users');

        database.find().toArray((err, results) => {
            if(err) {
                res.status(400).send('database error');
            }

            if(results.length === 0) {
                res.status(400).send('users not found');
            } else {
                res.send(results);
            }
        });

    }

    static getUserByEmail(req, res) {

        const database = new Database('users');

        database.findOne({email: req.query.email})
            .then(results => {
                if(results) {
                    console.log('Resultados: ', results);
                    res.send(results);
    
                } else {
                    console.log('No se encontro el usuario');
                }
            })
            .catch(err => {});
    }

    static profile(req, res) {
        res.sendFile(path.join(__dirname, '..', 'views', 'user-profile.html'))
    }

    static createProfile(req, res) {
        if(req.file) {
            res.send('OK!')
        } else {
            res.status(400).send('wrong file');
        }
    }

}

module.exports = UsersController;