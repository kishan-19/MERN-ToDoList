const jwt = require('jsonwebtoken');

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).json({ error: "please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data;
        next();
    } catch (err) {
        res.status(401).json({ error: "invalidate  token" });
    }
}

module.exports = fetchUser;