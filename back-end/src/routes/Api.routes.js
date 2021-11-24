
//Routers
const ApiRouter = require('express').Router();

ApiRouter.get('/', (req, res) => { res.send('adogtame api') });

const GroupsRouter = require('./Groups.routes');
ApiRouter.use('/', GroupsRouter);

const UsersRouter = require('./Users.routes');
ApiRouter.use('/', UsersRouter);

const PostsRouter = require('./Posts.routes');
ApiRouter.use('/', PostsRouter);

const passport = require('passport')
ApiRouter.use('/auth', passport.initialize());
const AuthRouter = require('../auth');
ApiRouter.use('/auth', AuthRouter);
ApiRouter.use('/auth', passport.session());



module.exports = ApiRouter;