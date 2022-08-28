const User = require('../model/userModel');
const bycrpt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        //RECIEVE DATA FROM FRONTEND
        const { email, username, password } = req.body; 
        
        // CREDENTIALS CHECK 
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.json({msg: "Username already exists!", status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg: "Email already exists!", status: false});
        }

        // CREATING HASH OF PASSWORD USING BYCRPT LIBRARY
        const hashedPassword = await bycrpt.hash(password, 10);

        // CREATE USER IN DATABASE WITH PROCESSED CREDENTAILS
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        delete user.password;   // Delete original password for security from backend

        res.json({status: true, user});

    } 
    catch (error) {
        next(error);
    }
};