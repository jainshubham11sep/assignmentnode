const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js')

const auth = async (req,res,next) => {
    // try {
    //     const token = req.header('Authorization').replace('Bearer ', '');
    //     const decoded = jwt.verify(token, "nodeAssignment");
    //     const user = await User.findOne({_user_id: decoded._id, 'token': token})
    //     if(!user){
    //         throw new Error();
    //     }
    //     req.token = token;
    //     req.user = user; 
    //     next();
    // } catch (e) {
    //     res.status(401).send({'error': 'Please authenticate'});
    // }

        let token = req.headers["x-access-token"];
        if (!token) {
          return res.status(403).send({
            message: "No token provided!"
          });
        }
        jwt.verify(token, "nodeassignmnet", (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!"
            });
          }
          req.user_id = decoded.id;
          next();
        });
}



module.exports = auth;