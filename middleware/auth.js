import jwt from 'jsonwebtoken';
import asyncHandler from './async.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return next(new ErrorResponse("No token provided", 401))
    }

    const token = authHeader.split(" ")[1];

    // Make sure token exists
    if(!token) {
        return next(new ErrorResponse('No token provided', 401));}
    // verify token
    const { id }  = jwt.verify(token, process.env.JWT_SECRET);
    console.log(id);

    const user  = await User.findById({_id: id });
    if (!user){
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }
    req.user = user;
    //console.log(req.user)
    return next();
       
});

export { protect }

