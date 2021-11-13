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
const Comments = require('./src/models/Comments');

app.get('/', (req, res) => { res.send('Adogtame API') });


/** 
 * @swagger
 * /users:
 *  get:
 *    description: return all users
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
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
 *      - in: Query
 *        _id: id
 *        description: user id 
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
    res.send(await Posts.find({ id_user: req.params.id }));
});


/** 
 * @swagger
 * /users:
 *  post:
 *    description: add an user
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: user email, user password, user name, user last name and user phone number
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password: 
 *            type: string
 *          name: 
 *            type: string
 *          last_name:
 *            type: string
 *          phone_number:
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/users', async (req, res) => {
    const exist = await Users.findOne({ Email: req.body.email });
    if (!exist) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                Users.create({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    last_name: req.body.last_name,
                    date_birth: req.body.date_birth,
                    tags: req.body.tags,
                    phone_number: req.body.phone_number,
                    profile_picture: req.body.profile_picture
                }).then((createdUser) => {
                    res.send(createdUser);
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
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: (optional) user email, (optional) user password, (optional) user name, (optional) user last name and (optional) user phone number
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password: 
 *            type: string
 *          name: 
 *            type: string
 *          last_name:
 *            type: string
 *          phone_number:
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.put('/users/:id', (req, res) => {
    Users.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, userUpdated) => {
            if (err) return res.status(500).send(err);
            return res.send(userUpdated);
        }
    )
});


/** 
 * @swagger
 * /users/:id:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        _id: id
 *        description: user id 
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
 *      - in: Header
 *        Bearer: token
 *        description: token 
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
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        _id: id
 *        description: posts id 
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
    res.send(await Posts.find({ _id: req.params.id }));
});

/** 
 * @swagger
 * /posts:
 *  post:
 *    description: create post
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: user id, group id, post title, post information, post photo, post location, post contact info, post pet type
 *        type: object
 *        properties:
 *          id_user:
 *            type: string
 *          id_group: 
 *            type: string
 *          title: 
 *            type: string
 *          information:
 *            type: string
 *          photo:
 *            type: string
 *          location:
 *            type: string
 *          contact_info:
 *            type: string
 *          pet_type:
 *            type: string 
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/posts', async (req, res) => {
    Posts.create({
        id_user: req.body.id_user,
        id_group: req.body.id_group,
        title: req.body.title,
        information: req.body.information,
        photo: req.body.photo,
        location: req.body.location,
        contact_info: req.body.contact_info,
        pet_type: req.body.pet_type,
        resolved: false
    }).then((createdPost) => {
        res.send(createdPost);
    })
});

/** 
 * @swagger
 * /posts/:id:
 *  put:
 *    description: update the post
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: (optional) user id, (optional) group id, (optional) post title, (optional) post information, (optional) post photo, (optional) post location, (optional) post contact info, (optional) post pet type
 *        type: object
 *        properties:
 *          id_user:
 *            type: string
 *          id_group: 
 *            type: string
 *          title: 
 *            type: string
 *          information:
 *            type: string
 *          photo:
 *            type: string
 *          location:
 *            type: string
 *          contact_info:
 *            type: string
 *          pet_type:
 *            type: string 
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.put('/posts/:id', (req, res) => {
    Posts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedPost) => {
            if (err) return res.status(500).send(err);
            return res.send(updatedPost);
        }
    )
});

/** 
 * @swagger
 * /posts/:id:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Header
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
    await Comments.deleteMany({ id_post: req.params.id });
    await Posts.findOneAndDelete({ _id: req.params.id });
    res.send('Deleted')
});

/** 
 * @swagger
 * /groups:
 *  get:
 *    description: return all groups
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
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
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        _id: id
 *        description: group id 
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
    res.send(await Groups.find({ _id: req.params.id }));
});

/** 
 * @swagger
 * /groups/:id/posts:
 *  get:
 *    description: return all the post of a specific group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: Query
 *        _id: id
 *        description: group id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: user doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/
app.get('/groups/:id/posts', async (req, res) => {
    res.send(await Posts.find({ id_group: req.params.id }));
});


/** 
 * @swagger
 * /groups:
 *  post:
 *    description: create group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: group name, group description
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description: 
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/groups', async (req, res) => {
    const exist = await Groups.findOne({ name: req.body.name });
    if (!exist) {
        Groups.create({
            name: req.body.name,
            description: req.body.description,
        }).then((createdGroup) => {
            res.send(createdGroup);
        })
    } else {
        res.send("Group already exists");
    }
});

/** 
 * @swagger
 * /groups/:id:
 *  put:
 *    description: create group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: (optional) group name, (optional) group description
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description: 
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.put('/groups/:id', (req, res) => {
    Groups.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedGroup) => {
            if (err) return res.status(500).send(err);
            return res.send(updatedGroup);
        }
    )
});

/** 
 * @swagger
 * /groups/:id:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Header
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
    await GroupUser.deleteMany({ id_group: req.params.id });
    const posts = await Posts.find({ id_group: req.params.id });
    posts.forEach(async (element) => {
        await Comments.deleteMany({ id_post: element._id.str });
    });
    await Posts.deleteMany({ id_group: req.params.id });
    await Groups.findAndDelete({ _id: req.params.id })
});