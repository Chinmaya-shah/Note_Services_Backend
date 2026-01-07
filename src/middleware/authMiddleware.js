const jwt = require('jsonwebtoken');
const {verify} = require("jsonwebtoken");
const protect = (req, res, next) => {
    try{
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token){
            return res.status(401).json({
                error: 'Unauthorised Access'
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decode.userId,
        };
        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Not Authorized'
        });
    }
};
module.exports = protect;