const verifyToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  }

  const token = authHeader.split(" ")[1]; // Extract token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
    req.user = decoded; // Attach user data
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
    