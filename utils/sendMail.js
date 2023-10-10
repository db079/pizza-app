const nodemailer = require('nodemailer');
const colors = require('colors')
module.exports = async (email,subject,text)=>{
    try {
        const trasnporter = nodemailer.createTransport ({
            host:process.env.HOST,
            port:Number(porcess.env.MAIL_PORT),
            secure:Boolean(process.env.SECURE),
            requireTLS:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        });
        await  trasnporter.sendMail ({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        }); 
       console.log("email sent successfully")
    } catch (error) {
        console.log(error);
    }

}



