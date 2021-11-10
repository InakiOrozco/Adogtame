const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//DB
const { Db } = require('mongodb');
const mongoose = require('mongoose');
// Schemas
const Users = require('./src/models/Users');
const Groups = require('./src/models/Groups');
const UsersSessions = require('./src/models/UsersSessions');

require('dotenv').config();

//Puerto
const port = process.env.PORT || 3000;

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            title: "Adogtame API",
            description: "Documentation for Adogtame API",
            version: "1.0.0",
            servers: ['http://localhost:' + port],
            contact: {
                name: "ITESO",
                correo: "main@iteso.mx"
            }
        }
    },
    apis: ['app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb+srv://" + process.env.DB + "@cluster0.hwczx.mongodb.net/adogtame_production?retryWrites=true&w=majority"
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

app.get('/users', (req, res) => { });


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

app.get('/users/:id', (req, res) => { });

/** 
 * @swagger
 * /users/:id/post:
 *  get:
 *    description: return all the user post
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


app.get('/users/:id/post', (req, res) => { });

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

app.post('/users', (req, res) => { });


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

app.put('/users/:id', (req, res) => { });


/** 
 * @swagger
 * /users/:id:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.delete('/users/:id', (req, res) => { });


/** 
 * @swagger
 * /post:
 *  get:
 *    description: return all the post in the database
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

app.get('/post', (req, res) => { });


/** 
 * @swagger
 * /post/:id:
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

app.get('/post/:id', (req, res) => { });


/** 
 * @swagger
 * /post:
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
app.post('/post', (req, res) => { });


/** 
 * @swagger
 * /post/:id:
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
app.put('/post/:id', (req, res) => {

});


/** 
 * @swagger
 * /post/:id:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.delete('/post/:id', (req, res) => {

});


/** 
 * @swagger
 * /group:
 *  get:
 *    description: return all group
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

app.get('/group', (req, res) => { });

/** 
 * @swagger
 * /group/:id:
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

app.get('/group/:id', (req, res) => { });

/** 
 * @swagger
 * /group/:id/post:
 *  get:
 *    description: return all the post of a specific group
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

app.get('/group/:id/post', (req, res) => { });


/** 
 * @swagger
 * /group:
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
app.post('/group', (req, res) => { });


/** 
 * @swagger
 * /group/:id:
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
app.put('/group/:id', (req, res) => { });


/** 
 * @swagger
 * /group/:id:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Query
 *        Bearer: token
 *        description: token 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.delete('/group/:id', (req, res) => { });