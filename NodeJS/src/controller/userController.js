import db from "../models";
import userService from '../services/userService';

let handeleLogin=async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message:'Missing inputs parametter!'
        })
    }

    let userData =await userService.handleUserLogin(email,password);
    return res.status(200).json({
        errCode:userData.errorCode,
        message:userData.errMessage,
        user:userData.user ? userData.user :{},
    })
}

module.exports={
    handeleLogin:handeleLogin
}