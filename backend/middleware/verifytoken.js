import jwt from 'jsonwebtoken';
import { User } from '../model/usermodel.js';

export const verifyToken = async (req, res, next) => {
    // 1. More robust token extraction
    const token = req.cookies.token || 
                 req.headers['authorization']?.split(' ')[1]; // Also check Bearer token
    
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Authentication required"
        });
        return;
    }

    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Fetch complete user data
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // 4. Attach full user data to request
        req.user = user;
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        
        // 5. Clear invalid token cookie
        res.clearCookie('token');
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Session expired, please login again"
            });
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication"
            });
        }
        
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};