const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const apiRoutes = require('./src/routes');
const Session = require('./src/models/session');
const User = require('./src/models/user');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
var contador = 1;


require('dotenv').config();


//Puerto
const port = process.env.PORT || 3000;

//Swagger
const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "Swagger Test API",
            description: "test api for swagger documentation",
            version: "1.0.0",
            servers: ['http://localhost:' + port],
            contact: {
                name: "ISOG",
                correo: "greenvana14@gmail.com"
            }
        }
    },
    apis: ['app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/assets', express.static(path.join(__dirname, 'public')));

//DB
const { Db } = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://"+ process.env.DB +"@cluster0.hwczx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to db..."))
    .catch((err) => console.log(err));


app.listen(port, () => {
    console.log('App is listening in port: ' + port);
});


/** 
 * @swagger
 * /users:
 *  get:
 *    description: return all users
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        Params: string
 *        description: query params
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      401:
 *        description: invalid token
*/

app.get('/users', (req, res) =>{
    res.send('users endpoint!')
});


/** 
 * @swagger
 * /users/:id:
 *  get:
 *    description: return the user specified
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: user doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/

app.get('/users/:id', (req, res) =>{
    User.findOne({ "email": req.params.email })
        .then((result) => {
            if (result.password === req.body.password) {
                res.send(result)
            } else {
                res.send("Error")
            }
        })
        .catch((err) => console.log(err));
});

/** 
 * @swagger
 * /users/:id/posts:
 *  get:
 *    description: return all the user posts
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: user doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/


app.get('/users/:id/posts', (req, res) =>{
    User.findOne({ "email": req.params.email })
        .then((result) => {
            if (result.password === req.body.password) {
                res.send(result)
            } else {
                res.send("Error")
            }
        })
        .catch((err) => console.log(err));
});

/** 
 * @swagger
 * /users:
 *  post:
 *    description: add an user
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: username
 *        description: email of the user
 *        type: string
 *      - in: body
 *        name: password
 *        description: users password
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.post('/users', (req, res) =>{
    console.log(req.body.email);
    console.log(req.body.password);
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then((result => {
            res.send(result);
        })
        )
        .catch((err) => console.log(err))
})


/** 
 * @swagger
 * /users/:id:
 *  put:
 *    description: update an existing user
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: username
 *        description: email of the user
 *        type: string
 *      - in: body
 *        name: password
 *        description: users password
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.put('/users/:id', (req, res) =>{
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            const array = result.messages;
            array.push(req.body)
            result.messages = array;
            result.url = "http://127.0.0.1:3000/session/" + req.params.id;

            Session.findOneAndUpdate({ "id_session": req.params.id }, result, { upsert: true }, function (err, doc) {
                if (err) return res.send(500, { error: err });
                return res.send('Succesfully saved.');
            });
        })
});

/** 
 * @swagger
 * /posts:
 *  get:
 *    description: return all the posts in the database
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        QueryParams: string
 *        description: query params
 *        type: string
 *    responses:
 *      200:
 *        description: success
 *      204:
 *        description: success response
 *      401:
 *        description: bad data request
*/

app.get('/posts', (req, res) =>{
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
});


/** 
 * @swagger
 * /posts/:id:
 *  get:
 *    description: return the specified post
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: post doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/

app.get('/posts/:id', (req, res) =>{
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
});


/** 
 * @swagger
 * /posts:
 *  post:
 *    description: create post
 *    parameters:
 *      - in: body
 *        name: name
 *        description: post name
 *        type: string  
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/posts', (req, res) => {
    Session.find()
    const session = new Session({
        id_session: contador,
        name: req.body.name
    });
    contador++;
    
    session.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
});


/** 
 * @swagger
 * /posts/:id:
 *  put:
 *    description: update the post
 *    parameters:
 *      - in: body
 *        name: message
 *        description: the content of the message
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.put('/posts/:id', (req, res) => {
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            const array = result.messages;
            array.push(req.body)
            result.messages = array;
            result.url = "http://127.0.0.1:3000/session/" + req.params.id;

            Session.findOneAndUpdate({ "id_session": req.params.id }, result, { upsert: true }, function (err, doc) {
                if (err) return res.send(500, { error: err });
                return res.send('Succesfully saved.');
            });
        })
});

/** 
 * @swagger
 * /groups:
 *  get:
 *    description: return all groups
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        QueryParams: string
 *        description: query params
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      401:
 *        description: invalid token
*/

app.get('/groups', (req, res) =>{
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
});

/** 
 * @swagger
 * /groups/:id:
 *  get:
 *    description: return the specific group
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: user doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/

app.get('/groups/:id', (req, res) =>{
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => console.log(err))
});

/** 
 * @swagger
 * /groups/:id/posts:
 *  get:
 *    description: return all the posts of a specific group
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: user doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/

app.get('/groups/:id/posts', (req, res) =>{});


/** 
 * @swagger
 * /groups:
 *  post:
 *    description: create group
 *    parameters:
 *      - in: body
 *        name: name
 *        description: group name
 *        type: string  
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/groups', (req, res) => {
    Session.find()
    const session = new Session({
        id_session: contador,
        name: req.body.name
    });
    contador++;
    
    session.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err))
});


/** 
 * @swagger
 * /groups/:id:
 *  put:
 *    description: update the group
 *    parameters:
 *      - in: body
 *        name: message
 *        description: the content of the message
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.put('/group/:id', (req, res) => {
    Session.findOne({ "id_session": req.params.id })
        .then((result) => {
            const array = result.messages;
            array.push(req.body)
            result.messages = array;
            result.url = "http://127.0.0.1:3000/session/" + req.params.id;

            Session.findOneAndUpdate({ "id_session": req.params.id }, result, { upsert: true }, function (err, doc) {
                if (err) return res.send(500, { error: err });
                return res.send('Succesfully saved.');
            });
        })
});

app.use(router);
app.use('/api', apiRoutes);