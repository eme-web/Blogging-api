import  ErrorResponse  from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import BlogPost from "../models/BlogPost.js";


// @desc    Create new blog post
// @route   POST /api/v1/blogs/new
// @access  Private
const createBlogPost = asyncHandler(async (req, res, next) => {
    //Add user to req.body
    req.body.author = req.user

    const blogPost = await BlogPost.create(req.body );
    res.status(201).json({success: true, data: blogPost, msg: 'Create new blog post'});
});

// @desc    Get all blog posts
// @route   GET /api/v1/blogs
// @access  Public 

const getBlogPosts = asyncHandler(async(req, res, next) => {
    const blogPost = await BlogPost.find({})
    res.status(200).json({success: true, data: blogPost, msg: "show all blog posts"});

});

// @desc    Get single blog post
// @route   GET /api/v1/blogs/:id
// @access  Public 
const getBlogPost = asyncHandler(async(req, res, next) => {
    const {params: { id }} = req
    const blogPost = await BlogPost.findById({_id: id})
    res.status(200).json({success: true, data:blogPost, msg: "show blog post"});
});

// @desc    Update blog post
// @route   PATCH /api/v1/blogs/:id/edit
// @access  Private
const updateBlogPost = asyncHandler(async(req, res, next) => {
    const { params: { id}, body } = req
    let blogPost = await BlogPost.findById({_id: id});

    
    if(!blogPost){
        return next(new ErrorResponse("Blog post not found", 404))
    }

    //Make sure user is blog post owner
    if(blogPost.author.toString() !== req.user.id) {
        return next(new ErrorResponse("User is not authorized to update this blog post",404))

    }


    blogPost = await BlogPost.findByIdAndUpdate({_id: id },
        { $set: {...body } }, { new: true });
      res.status(200).json({success: true, data:blogPost, msg: "Update blog post" });
});


// @desc    Delete blog post
// @route   DELETE /api/v1/blogs/:id
// @access  Private
const deleteBlogPost = asyncHandler(async(req, res, next) => {
    const { params: { id }} = req
    let blogPost = await BlogPost.findById({ _id: id});

    if(!blogPost){
        return next(new ErrorResponse("Bootcamp not found", 404));
    }

     //Make sure user is blog post owner
     if(blogPost.author.toString() !== req.user.id ) {
        return next(new ErrorResponse(" User is not authorized to delete this blog post", 404))
    }

    blogPost = await BlogPost.findByIdAndDelete({_id: id})
    res.status(200).json({success: true, data: {}, msg: "Delete blog post"});
});



export { createBlogPost, getBlogPosts, getBlogPost, updateBlogPost, deleteBlogPost } 