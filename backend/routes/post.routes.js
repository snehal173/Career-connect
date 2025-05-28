const express = require("express");
const router=express.Router();
const PostController=require("../controllers/post.controller");
const upload=require("../middlewares/multer");
const authMiddleware=require("../middlewares/authmiddleware");


router.post('/create',authMiddleware.authuser,upload.single("image"),PostController.createPost);
router.get('/fetchPosts',authMiddleware.authuser,PostController.getAllPosts);
router.get('/like/:id',authMiddleware.authuser,PostController.likePost);
router.post('/comment/:id',authMiddleware.authuser,PostController.commentPost);

module.exports=router;
