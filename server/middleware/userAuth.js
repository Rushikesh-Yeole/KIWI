import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ success: false, message: 'Not Authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
      next();
    } else {
      return res.json({ success: false, message: 'Invalid JWT' });
    }
  } catch (error) {
    return res.json({ success: false, message: 'Invalid JWT' });
  }
};

export default userAuth;