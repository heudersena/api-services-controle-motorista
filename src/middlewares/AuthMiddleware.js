const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../private/data");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    // throw new Error("JWT token is missing");
    return res.status(401).json({
      codeStatus: 401,
      message: "Você precisa está autenticado para usar essa api",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, JWT_KEY); //My hidden jwt secret

    const { id } = data;
    req.userId = id;

    next();
  } catch {
    // throw new Error("Invalid JWT Token");
    return res.status(200).json({ codeStatus: 401, message: "Invalid JWT Token" });
  }
};

module.exports = authMiddleware;
