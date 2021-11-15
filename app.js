const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Middlewares
const auth = require('./src/middlewares/auth');
//DB
const mongoose = require('mongoose');

require('dotenv').config();

//Puerto
const port = process.env.PORT || 3000;

//Routers
const GroupsRouter = require('./src/routes/Groups.routes');
const UsersRouter = require('./src/routes/Users.routes');
const PostsRouter = require('./src/routes/Posts.routes');

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
    apis: ['./src/routes/*']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.get('/', (req, res) => { res.send('adogtame api') });
router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
router.use('/', GroupsRouter);
router.use('/', UsersRouter);
router.use('/', PostsRouter);


const uri = "mongodb+srv://" + process.env.DB + "?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db...")
        app.listen(port, () => {

            app.use('/api', router);


            console.log('App API is listening in port: ' + port);
            console.log('http://localhost:' + port + '/api/');
            console.log('Swagger Docs: ' + 'http://localhost:' + port + '/api/docs');
        });
    })
    .catch((err) => console.log(err));