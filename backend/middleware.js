import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    console.log("hit");
    console.log(req.headers);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing or invalid." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        console.log(req.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

export default authMiddleware;