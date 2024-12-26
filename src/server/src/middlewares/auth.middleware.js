import jwt from "jsonwebtoken";
// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(200).json({ message: "Access token is required." });
    // return res.status(401).json({ message: "Access token is required." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(200).json({ message: "Invalid token." });
      // return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
};

export { authenticateToken };
