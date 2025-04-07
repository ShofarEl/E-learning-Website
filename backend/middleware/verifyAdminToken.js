import jwt from 'jsonwebtoken';
import { User } from '../model/usermodel.js';

export const verifyAdminToken = async (req, res, next) => {
    const token = req.cookies.AdminToken || 
                  req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Authentication required"
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

        const user = await User.findById(decodedToken.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        req.user = user;
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.clearCookie('AdminToken');

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
