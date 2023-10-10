const { hashPassword, comparePassword } = require('../helper/authHelper');
const userModels = require('../modles/userModels');
const OrderModels = require('../modles/orderModels');
const JWT = require('jsonwebtoken');
const Token = require('../modles/token')
const sendMail = require('../utils/sendMail')
const crypto = require('crypto')


const registerController = async (req,res)=>{
    try {
        const { name, email, password, phone, address,answer} = req.body;

        // validation
        if(!name){
            return res.send({message:'name is required'});
        }
        if(!email){
            return res.send({message:'email is required'});
        }
        if(!password){
            return res.send({error:'password is required'});
        }
        if(!phone){
            return res.send({message:'phone is required'});
        }
        if(!address){
            return res.send({message:'address is required'});
        }
        if(!answer){
            return res.send({message:'answer is required'});
        }

        // check if existing is email is present
        const exixtingUser = await userModels.findOne({email});
        if(exixtingUser){
            return res.status(201).send({
                success:true,
                message:"Already registered please click on login"
            })
        }

        // register
        const hashedPassword = await hashPassword(password);
        // save data
        const user = await new userModels({name,email,phone,address,password:hashedPassword,answer}).save();


        // sendVerifyMail(name,email,user._id)
        let token = await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        }).save();
        const url = `Hi ${user.name} welcome to pizza app . Please click here to  verify you ${process.env.REACTAPP}/${user._id}/verify/${token.token}`
        await sendMail(user.email,"Verify your Email", url)


        res.status(201).send({
            success:true,  
            message:'An email sent to your accoumt please verify',
            user
        })


    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in outer Registration',
            error
        })
    }
}


// login controlller
const loginController = async (req,res)=>{
    try {
        const {email,password} = req.body;
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user = await userModels.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"wrong email or password"
            })
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(404).send({
                success:false,
                message:"wrong email or password"
            })
        }
        

        if(!user.is_verified){
            let token = await Token.findOne({userId:user._id});
            if(!token){
                let token = await new Token({
                    userId:user._id,
                    token:crypto.randomBytes(32).toString("hex")
                }).save();
                let url = `please click here to  verify ${process.env.REACTAPP}/${user._id}/verify/${token.token}`
                await sendMail(user.email,"Verify your Email", url)
            }
            return res.status(400).send({
                success:true,  
                message:'An email sent to your accoumt please verify',
                user
            });
        }
            
        let token  = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
            res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })

        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}

// test controllers
const testController=(req,res)=>{
    try {
        res.send("protected")
    } catch ( error) {
        res.send({error})
    }
}

// email link 
const emailLink = async (req,res)=>{
    try {
        const usr = await userModels.findOne({_id:req.params.id});
        if(!usr) {
            return res.status(400).send({
                success:false,
                message:"Invalid user"
            })
        }

        let token = await Token.findOne({
            userId:usr._id,
            token:req.params.token
        })
        if(!token) {
            return res.status(400).send({
                success:false,
                message:"Invalid token"
            })
        }
        const filter = { _id: usr._id };
        const update = { is_verified:true };
        let data = await userModels.updateOne(
            {_id:usr._id},
            {
                $set:{is_verified:"true"}
            }
        )        

        await token.deleteOne({_id:token._id});
        res.status(200).send({
            success:true,
            message:"Email verified successfully"
        });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Internal server error from email link',
            error
        })
    }
}

// forgot password
const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModels.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModels.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  
const updateProfileController = async (req,res)=>{
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModels.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModels.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        res.status(400).send({
          success: false,
          message: "Error WHile Update profile",
          error,
        });
      }
}

const getOrderController = async (req,res)=>{
    try {
        const orders = await OrderModels.find({buyer:req.user._id}).populate("buyer","name").populate("products")
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in getting your order"
        })
    }
}
const getAllOrderController = async (req,res)=>{
    try {
        const orders = await OrderModels.find({}).populate("products").populate("buyer","name").sort({createdAt:"-1"})
        res.json(orders);
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in getting your order"
        })
    }
}
const OrderStatusController = async (req,res)=>{
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await OrderModels.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );
        res.json(orders);
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error While Updateing Order",
          error,
        });
      }
}


module.exports = {registerController,loginController,testController,emailLink,forgotPasswordController,updateProfileController,getOrderController,getAllOrderController,OrderStatusController}