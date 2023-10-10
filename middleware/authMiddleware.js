const JWT = require('jsonwebtoken');
const userModels = require('../modles/userModels');

// protected router
const requireSignIn = async (req,res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        // console.log(error)
    }
}
const isAdmin = async( req, res, next)=>{
    try {
        const user = await userModels.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'unAuthorized access',
            })
        }
        else{
            next()
        }
    } catch (error) {
        res.status(401).send({
            success:false,
            message:'admin middleware access',
            error
        })
    }
}

module.exports = {requireSignIn,isAdmin};