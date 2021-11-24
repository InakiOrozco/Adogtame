const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
require('dotenv').config();

//DB
const mongoose = require('mongoose');

//Puerto
const port = process.env.PORT || 3000;

//Routers
const ApiRouter = express.Router();
ApiRouter.get('/', (req, res) => { res.send('adogtame api') });
ApiRouter.use(express.urlencoded({ extended: true }));
ApiRouter.use(express.json());

const GroupsRouter = require('./src/routes/Groups.routes');
ApiRouter.use('/', GroupsRouter);

const UsersRouter = require('./src/routes/Users.routes');
ApiRouter.use('/', UsersRouter);

const PostsRouter = require('./src/routes/Posts.routes');
ApiRouter.use('/', PostsRouter);

const passport = require('passport')
ApiRouter.use('/auth', passport.initialize());
const AuthRouter = require('./src/auth');
ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/auth', passport.session());


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
ApiRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const uri = "mongodb+srv://" + process.env.DB + "?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db...")
        app.use(cors());
        app.use('/api', ApiRouter);
        app.use(express.static(path.join(__dirname, "adogtame-front", "dist", "adogtame-front")));
        app.listen(port, () => {
            console.log('App API is listening in port: ' + port);
            console.log('http://localhost:' + port + '/api/');
            console.log('Swagger Docs: ' + 'http://localhost:' + port + '/api/docs');
            console.log('App on: ' + 'http://localhost:' + port);
        });
    })
    .catch((err) => console.log(err));