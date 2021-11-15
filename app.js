const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//DB
const mongoose = require('mongoose');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('./src/middlewares/auth');

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
const UserSessions = require('./src/models/UserSessions');
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
app.get('/users', auth, async (req, res) => {
    try {
        const users = await Users.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /users/{id}:
 *  get:
 *    description: return the user specified
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: user id 
 *        type: string
 *    responses:
 *      200:
 *        description: Success response
 *      400:
 *        description: There is no user with this id
*/
app.get('/users/:id', auth, async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ code: 400, error: "There is no user with this id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /users/{id}/posts:
 *  get:
 *    description: return all the user post
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
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
app.get('/users/:id/posts', auth, async (req, res) => {
    try {
        const posts = await Posts.find({ id_user: req.params.id });
        res.json(posts);
    } catch (err) {
        console.error(err);
    }
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
 *          tags:
 *            type: string
 *          date_birth:
 *            type: string
 *          profile_picture:
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/users', async (req, res) => {
    try {
        const { name, email, password, last_name, date_birth, tags, phone_number, profile_picture } = req.body;
        if (!(name && email && password)) {
            res.status(400).json({ code: 400, error: "You need at least: name, email, and password" });
        }
        const userExist = await Users.findOne({ email });
        if (userExist) {
            res.status(409).json({ code: 400, error: "There is a username, with this email, try login in" });
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                last_name,
                date_birth,
                tags, phone_number,
                profile_picture
            });

            const token = await jwt.sign({
                id: newUser._id, email
            }, process.env.TOKEN_KEY);
            newUser.token = token;
            res.status(201).json(newUser);
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /users/login:
 *  post:
 *    description: login
 *    parameters:
 *      - in: body
 *        name: params
 *        description: user email, user password
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *          password: 
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/users/login', (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            res.status(400).send("Missing body parameters");
        }
        const checkUser = await Users.findOne({ email });
        if (checkUser && (await bcrypt.compare(password, checkUser.password))) {
            const token = jwt.sign({
                id: checkUser._id, email
            }, process.env.TOKEN_KEY);
            checkUser.token = token;
            res.status(200).json(checkUser);
        } else {
            res.status(400).send("Bad credentials");
        }
    } catch (err) {
        console.log(err);
    }
});

/** 
 * @swagger
 * /users/{id}:
 *  put:
 *    description: update an existing user
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: user id 
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
 *          tags:
 *            type: string
 *          date_birth:
 *            type: string
 *          profile_picture:
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.put('/users/:id', auth, async (req, res) => {
    try {
        const userExist = await Users.findById(req.params.id);
        if (userExist) {
            if (userExist._id === req.user.id) {
                const updatedUser = await Users.findByIdAndUpdate(req.params.id);
                res.json(updatedUser);
            } else {
                res.status(403).json({ code: 403, error: "You dont have permisions to update this user" });
            }
        } else {
            res.status(400).json({ code: 400, error: "This user doesnt exist" });
        }
    } catch (err) {
        console.error(err);
    }
});


/** 
 * @swagger
 * /users/{id}:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: user id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.delete('/users/:id', auth, async (req, res) => {
    try {
        const userExist = await Users.findById(req.params.id);
        if (userExist) {
            if (userExist._id === req.user.id) {
                const deletedUser = await Users.findByIdAndDelete(req.params.id);
                res.json(deletedUser);
            } else {
                res.status(403).json({ code: 403, error: "You dont have permisions to delete this user" });
            }
        } else {
            res.status(400).json({ code: 400, error: "This user doesnt exist" });
        }
    } catch (err) {
        console.error(err);
    }
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

app.get('/posts', auth, async (req, res) => {
    try {
        const posts = await Posts.find({});
        res.json(posts);
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /posts/{id}:
 *  get:
 *    description: return the specified post
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: post doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/

app.get('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(400).json({ code: 400, err: "Wrong post id" });
        }
    } catch (err) {
        console.error(err);
    }
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
app.post('/posts', auth, async (req, res) => {
    try {
        const isPartOfGroup = await GroupUser.findOne({ req.body.id_group, id_user: req.user.id });
        if (isPartOfGroup) {
            const { id_group, title, information, photo, location, contact_info, pet_type } = req.body;
            if (!(id_group && title && information && photo && location && contact_info && pet_type)) {
                res.status(400).json({ code: 400, err: "you need at least: id_group, title, information, photo, location, contact_info, pet_type " });
            } else {
                const createdPost = await Posts.create({
                    id_user: req.user.id,
                    id_group,
                    title,
                    information,
                    photo,
                    location,
                    contact_info,
                    pet_type,
                    resolved: false
                });
                res.json(createdPost);
            }
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /posts/{id}:
 *  put:
 *    description: update the post
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
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
app.put('/posts/:id', auth, async (req, res) => {
    try {
        const post = Posts.findById(req.params.id);
        if (post) {
            if (post.id_user === req.user.id) {
                const updatedPost = Posts.findByIdAndUpdate(req.params.id, req.body);
                res.json(updatedPost);
            } else {
                res.status(403).json({ code: 403, err: "You dont have permissions to do this" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Post no exist" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /posts/{id}:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.delete('/posts/:id', auth, async (req, res) => {
    try {
        const post = Posts.findById(req.params.id);
        if (post) {
            if (post.id_user === req.user.id) {
                await Comments.deleteMany({ id_post: req.params.id });
                await Posts.findByIdAndDelete(req.params.id);
                res.json({ mesage: "Post deleted" });
            } else {
                res.status(403).json({ code: 403, err: "You dont have permissions to do this" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Post no exist" });
        }
    } catch (err) {
        console.error(err);
    }
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

app.get('/groups', auth, async (req, res) => {
    try {
        const groups = await Groups.find({});
        res.json(groups);
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}:
 *  get:
 *    description: return the specific group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
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
app.get('/groups/:id', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {
            res.json(group);
        } else {
            res.status(400).json({ code: 400, err: "Wrong group id" });
        }
    } catch (err) {
        console.error(err);
    }
});


/** 
 * @swagger
 * /groups/{id}/posts:
 *  get:
 *    description: return all the post of a specific group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
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
app.get('/groups/:id/posts', auth, async (req, res) => {
    try {
        const isPartOfGroup = await GroupUser.findOne({ id_group: req.params.id, id_user: req.user.id });
        if (isPartOfGroup) {
            const posts = await Posts.find({ id_group: req.params.id });
            res.json(posts);
        } else {
            res.status(403).json({ code: 403, err: "You cant see this groups posts" });
        }
    } catch (err) {
        console.error(err);
    }
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
app.post('/groups', auth, async (req, res) => {
    try {
        const { name, description } = req.body;
        if (name && description) {
            const exist = await Groups.findOne({ name: req.body.name });
            if (!exist) {
                const newGroup = await Groups.create({
                    name,
                    description,
                    created_by: req.user.id
                });
                const newGroupUser = GroupUser.create({
                    id_group: newGroup._id,
                    id_user: req.user.id,
                    permissions: "admin"
                });
                res.json({ newGroup, newGroupUser });
            } else {
                res.status(400).json({ code: 400, err: "Group already exists" });
            }
        } else {
            res.status(400).json({ code: 400, err: "you need atleast name, and description" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}:
 *  put:
 *    description: create group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: group id 
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
app.put('/groups/:id', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {
            const permissions = await GroupUser.findOne({ id_group: req.params.id, id_user: req.user.id });
            if (permissions && (permissions.permissions === "admin")) {
                const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body);
                res.json(updatedGroup);
            } else {
                res.status(403).json({ code: 403, err: "You cant edit this group" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Group not existing" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}:
 *  delete:
 *    description: delete an existing user
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: group id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/

app.delete('/groups/:id', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {
            const permissions = await GroupUser.findOne({ id_group: req.params.id, id_user: req.user.id });
            if (permissions && (permissions.permissions === "admin")) {
                await GroupUser.deleteMany({ id_group: req.params.id });
                const posts = await Posts.find({ id_group: req.params.id });
                posts.forEach(async (post) => {
                    await Comments.deleteMany({ id_post: post._id });
                });
                await Posts.deleteMany({ id_group: req.params.id });
                await Groups.findByIdAndDelete(req.params.id);
                res.json({ message: "Group deleted" });
            } else {
                res.status(403).json({ code: 403, err: "You dont have permisions to do this" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Wrong group id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}/permissions:
 *  get:
 *    description: return all the permissions of a group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
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
app.get('/groups/:id/permissions', auth, async (req, res) => {
    try {
        const permissions = await GroupUser.findOne({ id_group: req.params.id, id_user: req.user.id });
        if (permissions) {
            res.json(permissions);
        } else {
            res.status(403).json({ code: 403, id_group: req.params.id, id_user: req.user.id, permissions: "none" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}/permissions/{id_user}:
 *  post:
 *    description: create a new permission on a group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: user id
 *        type: object
 *        properties:
 *          permission: 
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/groups/:id/permissions/:id_user', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {

            const permissions = await GroupUser.findOne({ id_group: req.params.id, id_user: req.user.id });
            if (permissions && (permissions.permissions === "admin")) {
                const { permission } = req.body;
                if (permission && (permission === "user" || permission === "admin")) {
                    const exist = await GroupUser.findOne({ id_group: req.params.id, id_user: req.params.id_user });
                    if (!exist) {
                        const newGroupUser = await GroupUser.create({
                            id_group: req.params.id,
                            id_user: req.paramas.id_user,
                            permissions: permission
                        });
                        res.json(newGroupUser);
                    } else {
                        const updatedGroupUser = await GroupUser.findOneAndUpdate({ id_group: req.params.id, id_user: req.params.id_user }, {
                            permissions: permission
                        });
                        res.json(updatedGroupUser);
                    }
                } else {
                    res.status(400).json({ code: 403, err: "You must send a permission" });
                }
            } else {
                res.status(403).json({ code: 403, err: "You cant change this" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Wrong Group id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}/permissions/{id_user}:
 *  delete:
 *    description: delete an existing permission
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
 *        type: string
 *      - in: path
 *        name: id_permission
 *        description: permission id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.delete('/groups/:id/permissions/:id_permission', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {
            const permissions = await GroupUser.findOne({ id_group: req.params.id, id_user: req.user.id });
            if (permissions && (permissions.permissions === "admin")) {
                const exist = await GroupUser.findById(req.params.id_permission);
                if (exist) {
                    const deletedGroupUser = await GroupUser.findByIdAndDelete(req.params.id_permission);
                    res.json(deletedGroupUser);
                } else {
                    res.status(400).json({ code: 403, err: "This permission doesnt exist" });
                }
            } else {
                res.status(403).json({ code: 403, err: "You cant change this" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Wrong Group id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}/subscribe/{id_user}:
 *  post:
 *    description: create a new permission on a group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: user id
 *        type: object
 *        properties:
 *          id_user:
 *            type: string
 *          permission: 
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/groups/:id/subscribe', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {
            const exist = await GroupUser.findOne({ id_group: req.params.id, id_user: req.params.id_user });
            if (!exist) {
                const newGroupUser = await GroupUser.create({
                    id_group: req.params.id,
                    id_user: req.paramas.id_user,
                    permissions: "user"
                });
                res.json(newGroupUser);
            } else {
                res.json(exist);
            }
        } else {
            res.status(400).json({ code: 400, err: "Wrong Group id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /groups/{id}/subscribe/{id_permission}:
 *  delete:
 *    description: delete an existing permission
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
 *        type: string
 *      - in: path
 *        name: id_permission
 *        description: permission id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.delete('/groups/:id/subscribe/', auth, async (req, res) => {
    try {
        const group = await Groups.findById(req.params.id);
        if (group) {
            const exist = await GroupUser.findOne({ id_group: req.params.id, id_user: req.params.id_user });
            if (exist) {
                const deletedGrupUser = await GroupUser.findOneAndDelete({
                    id_group: req.params.id,
                    id_user: req.paramas.id_user
                });
            }
            res.json({ message: "Unsubscribed" });
        } else {
            res.status(400).json({ code: 400, err: "Wrong Group id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /posts/{id}/comments:
 *  get:
 *    description: return all the comments
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      204:
 *        description: user doesn't exist in database
 *      401:
 *        description: invalid token or not recieved
*/
app.get('/posts/:id/comments', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            const isPartOfGroup = await GroupUser.findOne({ id_group: post.id_group, id_user: req.user.id });
            if (isPartOfGroup) {
                const comments = await Comments.find({ id_group: post.id_group });
                res.json(comments);
            } else {
                res.status(403).json({ code: 403, err: "You cant see this post comments" });
            }
        } else {
            res.
        }
    } catch (err) {
        res.status(400).json({ code: 400, err: "Wrong post id" });
    }
});

/** 
 * @swagger
 * /posts/{id}/comments:
 *  post:
 *    description: create group
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: body
 *        name: params
 *        description: user id, comment
 *        type: object
 *        properties:
 *          id_user:
 *            type: string
 *          comment: 
 *            type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.post('/posts/:id/comments', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            const { comment } = req.body;
            if (comment) {
                const isPartOfGroup = await GroupUser.findOne({ id_group: post.id_group, id_user: req.user.id });
                if (isPartOfGroup) {
                    const newComment = await Comments.create({
                        id_group: post.id_group,
                        id_user: req.user.id,
                        comment
                    });
                    res.json(newComment);
                } else {
                    res.status(403).json({ code: 403, err: "You cant see this post comments" });
                }
            } else {
                res.status(400).json({ code: 400, err: "You must send a comment" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Wrong post id" });
        }
    } catch (err) {
        console.error(err);
    }
});

/** 
 * @swagger
 * /posts/{id}/comments/{id_comment}:
 *  delete:
 *    description: delete an existing comment
 *    parameters:
 *      - in: Header
 *        Bearer: token
 *        description: token 
 *        type: string
 *      - in: path
 *        name: id
 *        description: post id 
 *        type: string
 *      - in: path
 *        name: id_comment
 *        description: comment id 
 *        type: string
 *    responses:
 *      200:
 *        description: success response
 *      400:
 *        description: bad data request
*/
app.delete('/posts/:id/comments/:id_comment', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            const isPartOfGroup = await GroupUser.findOne({ id_group: post.id_group, id_user: req.user.id });
            if (isPartOfGroup) {
                const comment = await Comments.findById(req.paramas.id_comment);
                if (comment) {
                    if (isPartOfGroup.permission === "admin" || comment.id_user === req.user.id) {
                        const deletedComment = await Comment.findByIdAndDelete(req.paramas.id_comment);
                        res.json({ message: "Comment deleted" });
                    } else {
                        res.status(403).json({ code: 403, err: "You cant delete this comment" });
                    }
                } else {
                    res.status(400).json({ code: 400, err: "Wrong comment id" });
                }
            } else {
                res.status(403).json({ code: 403, err: "You cant access this posts comments" });
            }
        } else {
            res.status(400).json({ code: 400, err: "Wrong post id" });
        }
    } catch (err) {
        console.error(err);
    }
});
