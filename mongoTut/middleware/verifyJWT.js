const jwt = require("jsonwebtoken");



const verifyJwt = (req,res, next) => {
    const authHeader = req.headers.authorization || req.headers.authorization
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    console.log(authHeader); // bearer token

    const token = authHeader.split(" ")[1];
    jwt.verify(                                
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
    
} 


module.exports = verifyJwt;
    