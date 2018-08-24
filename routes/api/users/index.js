const express = require('express');
const Controller = require('./controller');
const permission = require('../../../middlewares/check-permission');
const requireAuth = require('../../../middlewares/require-auth');

const router = express.Router();

const signUp = async (req, res, next) => {
    try {
        const existingUser = await Controller.findUser(req.body.username);
        if (existingUser) {
            res.status(400).json({ error: 'Username already exists' });
        }
        else {
            const user = await Controller.createUser(req.body);
            res.json({ username: user.username, accessToken: user.accessToken });
        }
    } catch (err) {
        next(err);
    }
};

const signIn = async (req, res, next) => {
    try {
        const user = await Controller.findUser(req.body.username);
        if (!user) {
            return res.status(401).json({ error: 'Incorrect username' });
        }

        const isMatch = await Controller.comparePassword(req.body.password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: 'Incorrect password' });
        }
        else {
            res.json({ username: user.username, accessToken: user.accessToken });
        }
    } catch (err) {
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const user = await Controller.changePassword(req.params.username, req.body.password);
        if (user) {
            res.status(200).json({ accessToken: user.accessToken })
        }
        else {
            res.status(400).json({ error: 'Incorrect username' });
        }
    } catch (err) {
        next(err);
    }
};

const changeRole = async (req, res, next) => {
    if (!req.adminRequest) {
        return res.status(403).json({ error: 'No access permission' });
    }

    try {
        const successful = await Controller.changeRole(req.params.username, req.body.role);
        if (successful) {
            res.status(200).json({ _updated: true })
        }
        else {
            res.status(400).json({ _updated: false });
        }
    } catch (err) {
        next(err);
    }
};

const getPosts = async (req, res, next) => {
    try {
        const posts = await Controller.getPosts(req.params.username);
        if (posts) {
            res.status(200).json({ _total: posts.length, posts });
        }
        else {
            res.status(404).json({ error: 'No such user' });
        }
    } catch (err) {
        next(err);
    }
};

router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/:username/password', requireAuth, permission.accountOwner, changePassword);
router.put('/:username/role', requireAuth, permission.admin, changeRole);
router.get('/:username/posts', getPosts);

module.exports = router;