import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.js';

// connect db
import connectDB from './database.js';

// Routes files
import blogPost from './routes/blogPost.js';
import auth from './routes/auth.js'

// Load env variables
dotenv.config();

// conect to database
connectDB()

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CookieParser
app.use(cookieParser());

// Set static folder
app.use(express.static('public'));

// Mount routers
app.use('/api/v1/blogs', blogPost);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5080
app.listen(PORT, console.log(`Server running on port ${PORT}`));

app.get("/", (req, res, next) => { 
 
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'index.html');
   
    res.sendFile(_retfile);
   });