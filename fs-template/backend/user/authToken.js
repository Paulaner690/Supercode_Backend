import jwt from "jsonwebtoken";

// userEmailObj = {email: ""}
export function generateAccessToken(userEmailObj, persist) {
  return jwt.sign(userEmailObj, process.env.TOKEN_SECRET, {
    expiresIn: persist ? "7d" : "4h",
  });
}

// ! MIDDLEWARE
export function authenticateToken(req, res, next) {
  let token;
  if (req?.cookies?.auth) {
    token = req.cookies.auth;
  }

  if (!token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
  }

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err, user);
    if (err) return res.sendStatus(403);
    req.userEmail = user.email;

    next();
  });
}
