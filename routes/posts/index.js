const express = require('express');
const Controller = require('./controller');
const validators = require('../../middlewares/validators');
const authorize = require('../../middlewares/authorize');
const decodeToken = require('../../middlewares/decode-token');
const permission = require('../../middlewares/permission');
const identify = require('../../middlewares/identify');
const cache = require('../../middlewares/cache');
const postProcess = require('../../middlewares/post-process');

const router = express.Router();

const getPosts = async (req, res, next) => {
  const { adminRequest } = req;
  try {
    const posts = await Controller.getPosts({ ...req.query, adminRequest });
    res.status(200).json({ _total: posts.length, posts });
    if (!adminRequest) {
      req.expiresIn = 60;
      req.data = posts;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const getPostTags = async (req, res, next) => {
  try {
    const tags = await Controller.getPostTags();
    res.status(200).json({ _total: tags.length, tags });
    req.expiresIn = 60 * 60;
    req.data = tags;
    next();
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  if (req.sentCache) return next();

  try {
    const post = await Controller.getPost(req.postId);
    if (post) {
      res.status(200).json({ post });
      req.expiresIn = 60;
      req.data = post;
      next();
    } else {
      res.status(404).json({ post: {} });
    }
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  req.body.author = req.user.username;
  try {
    const post = await Controller.createPost(req.body);
    res.status(201).json({ post });
    req.postId = post._id;
    next();
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  if (req.postApproved && !req.adminRequest) {
    return res.status(403).json({ error: 'No access permission' });
  }

  const { id } = req.params;
  try {
    const post = await Controller.updatePost(id, req.body);
    if (post) {
      res.status(200).json({ post });
      next();
    } else {
      res.status(400).end();
    }
  } catch (err) {
    next(err);
  }
};

const approvePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Controller.approvePost(id, req.body.approval);
    res.status(post ? 204 : 400).end();
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Controller.deletePost(id);
    res.status(post ? 204 : 400).end();
  } catch (err) {
    next(err);
  }
};

router.get('/', validators.getPosts, decodeToken, identify.adminRequest, cache.getPosts, getPosts, cache.saveCache);
router.get('/tags', cache.getPostTags, getPostTags, cache.saveCache);
router.get('/:id', cache.getPost, getPost, cache.saveCache, postProcess.increaseViews);
router.post('/', validators.createPost, authorize, createPost, postProcess.syncSlugs);
router.put('/:id', validators.updatePost, authorize, permission('admin,postOwner'), identify.approvedPost, identify.adminRequest, updatePost, postProcess.syncSlugs);
router.put('/:id/approval', validators.approvePost, authorize, permission('admin'), approvePost);
router.delete('/:id', authorize, permission('admin'), deletePost);

module.exports = router;
