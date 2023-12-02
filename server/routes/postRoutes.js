import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js'

dotenv.config();

const router = express.Router();

// conf cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route('/').get( async(req,res) =>{
    try {
        const posts = await Post.find({});

        res.status(200).json({succes: true, data:posts})
    } catch (error) {
        res.status(500).json({succes: false, message: error})
    }
});

// CREATE A POST 
router.route('/').post( async(req,res) =>{
    try{
        // Getting from frontend
        const {name, prompt, photo} = req.body;

        const photoURL = await cloudinary.uploader.upload(photo);
        
        console.log(photoURL);

        const newPost = await Post.create({
            name,
            prompt,
            photo:photoURL.url
        });

        res.status(201).json({succes: true, data: newPost});
    } catch(error){
        console.log(error);
        res.status(500).json({succes: false, message: error});
    }
    
});

export default router