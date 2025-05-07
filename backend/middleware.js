import jwt from "jsonwebtoken";


const authMiddleware = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Authorization token missing or invalid." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; 
        return userId;
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
}

export default authMiddleware;