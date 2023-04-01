import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

//https://console.cloudinary.com/console/c-5c666276dc862c29142a2889c4e647/getting-started
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

//Now we will make two paths : for getting and posting the posts

//getting the post
router.route('/').get(async(req,res)=>{
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});


//creating the post
router.route('/').post(async(req,res)=>{

    try {
        const { name, prompt, photo } = req.body; //destructuring and requesting all these from the body
        const photoUrl = await cloudinary.uploader.upload(photo); //reffer documentation of getting started in cloudinary   
    
        const newPost = await Post.create({
          name,
          prompt,
          photo: photoUrl.url,
        });
    
        res.status(200).json({ success: true, data: newPost });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
      }

});



export default router;