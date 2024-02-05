import express from "express";
import { protect} from "../middleware/auth.js"
import { createBlogPost, getBlogPost, getBlogPosts, 
    updateBlogPost, deleteBlogPost } from "../controllers/BlogPost.js";


const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.post('/new', protect, createBlogPost);
router.patch('/:id/edit', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

export default router

