import jwt from "jsonwebtoken";

export const generateAdminToken = (res, userId) => {
  try {
    if (!process.env.JWT_ADMIN_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const AdminToken = jwt.sign(
      { userId }, // good payload
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("AdminToken", AdminToken, {
      httpOnly: true, // protects from XSS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict", // good against CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: "/studentdashboard", // cookie only sent on this route
      domain:
        process.env.NODE_ENV === "production"
          ? ".yourdomain.com"
          : undefined,
    });

    return AdminToken;
  } catch (error) {
    console.error("Token generation failed:", error);
    res.status(500).json({ error: "Authentication system error" });
    throw error; // may not need to throw again unless you want the caller to handle it
  }
};
