import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    // Check if the token is passed in the Authorization header in the format 'Bearer <token>'
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from the 'Bearer <token>' format

    if (!token) {
        return res.json({ success: false});
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded?.id) {
            // Attach the decoded userId to the request body for future use
            req.body.userId = decoded.id;
            next(); // Continue to the next route handler or middleware
        } else {
            return res.json({ success: false, message: 'Invalid token. Please login again.' });
        }

    } catch (error) {
        // If the token is invalid or expired
        return res.json({ success: false, message: 'Invalid or expired token. Please login again.' });
    }
};

export default userAuth;
