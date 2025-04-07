import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not configured");
        }

        // Fixed payload - using userId parameter
        const token = jwt.sign(
            { userId },  // ✅ Corrected payload
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Fixed SameSite and added domain handling
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",  // ✅ Corrected typo
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
            domain: process.env.NODE_ENV === "production" 
                  ? ".yourdomain.com" 
                  : undefined
        });

        return token;
    } catch (error) {
        console.error("Token generation failed:", error);
        // Consider sending error response if this is middleware
        res.status(500).json({ error: "Authentication system error" });
        throw error; // Re-throw for additional handling
    }
};