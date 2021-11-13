const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bcrypt = require('bcrypt');
//DB
const { Db } = require('mongodb');
const mongoose = require('mongoose');


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

const uri = "mongodb+srv://" + process.env.DB + "?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db...")
        app.listen(port, () => {
            console.log('App is listening in port: ' + port);
            console.log('http://localhost:' + port);
            console.log('Swagger Docs: ' + 'http://localhost:' + port + '/swagger-ui');
        });
    })
    .catch((err) => console.log(err));
// Schemas
const Users = require('./src/models/Users');
const UsersSessions = require('./src/models/UserSessions');
const Groups = require('./src/models/Groups');
const Posts = require('./src/models/Posts');
const GroupUser = require('./src/models/GroupUser');
const GroupPost = require('./src/models/GroupPost');
const Comments = require('./src/models/Comments');

app.get('/', (req, res) => { res.send('Adogtame API') });

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

app.get('/users', async (req, res) => {
    res.send(await Users.find({}))
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

app.get('/users/:id', async (req, res) => {
    res.send(await Users.findOne({ _id: req.params.id }));
});

/** 
 * @swagger
 * /users/:id/posts:
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


app.get('/users/:id/posts', async (req, res) => {
    res.send(await Posts.find({ IdUser: req.params.id }));
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
 *        name: email,password,name,last_name,phone_number
 *        description: users email
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.post('/users', async (req, res) => {
    const exist = await Users.findOne({ Email: req.body.email });
    console.log(exist)
    if (!exist) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                Users.create({
                    Email: req.body.email,
                    Password: hash,
                    Name: req.body.name,
                    LastName: req.body.last_name,
                    PhoneNumber: req.body.phone_number
                }).then((nose) => {
                    res.send(nose);
                })
            });
        });
    }
    else {
        res.send('Not valid data')
    }
});


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
app.delete('/users/:id', async (req, res) => {
    res.send(await Users.findOneAndDelete({ _id: req.params.id }));
});


/** 
 * @swagger
 * /posts:
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

app.get('/posts', async (req, res) => {
    res.send(await Posts.find({}))
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

app.get('/posts/:id', async (req, res) => { 
    res.send(await Posts.find({ IdPost: req.params.id }));
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
app.post('/posts', async (req, res) => {
    Posts.create({
        IdUser: req.body.IdUser,
        Title: req.body.Title,
        Information: req.body.Information,
        Photo: req.body.Photo,
        Location: req.body.Location,
        ContactInfo: req.body.ContactInfo,
        PetType: req.body.PetType,
        Resolved: false
    }).then((nose) => {
        res.send(nose);
    })
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

});

/** 
 * @swagger
 * /posts/:id:
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

app.delete('/posts/:id', async (req, res) => {
    res.send(await Posts.findOneAndDelete({ _id: req.params.id }));
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

app.get('/groups', async (req, res) => {
    res.send(await Groups.find({}))
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

app.get('/groups/:id', async (req, res) => { 
    res.send(await Groups.find({ IdGroup: req.params.id }));
});
/** 
 * @swagger
 * /groups/:id/posts:
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

app.get('/group/:id/posts', (req, res) => { res.send('/groups/:id/posts endpoint') });


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
app.post('/groups', async (req, res) => {
    const exist = await Groups.findOne({ Name: req.body.Name });
    if (!exist) {
        Groups.create({
            Name: req.body.Name,
            Description: req.body.Description,
        }).then((nose) => {
            res.send(nose);
        })
    }else{
        res.send("Group already exists");
    }
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
app.put('/groups/:id', (req, res) => { });


/** 
 * @swagger
 * /groups/:id:
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

app.delete('/groups/:id', async (req, res) => {
    res.send(await Groups.findOneAndDelete({ _id: req.params.id }));
});