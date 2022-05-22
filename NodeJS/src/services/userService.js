import db from "../models";
import bcrypt from 'bcryptjs';

let handleUserLogin =(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userData={};

            let isExist = await checkUserEmail(email);

            if(isExist){

                let user = await db.User.findOne({
                    where:{email:email},
                    attributes:['email','roleId','password'],
                    raw:true
                })
                if(user){
                       let check= await bcrypt.compareSync(password,user.password);
                       if(check){
                           userData.errorCode=0;
                           userData.errMessage='Ok',
                           delete user.password;
                           userData.user=user;
                       } else{
                        userData.errorCode=3;
                        userData.errMessage='Wrong password'
                       }
                }else{
                    userData.errorCode=2;
                    userData.errMessage=`User not not found`
                }
            
            }else{
                userData.errorCode=1;
                userData.errMessage=`Your Email isn't exist in your system.PLZ try other email`
              
            }
            resolve(userData)
        } catch (error) {
           
            reject(error)
        }
    })
}

let checkUserEmail= (email)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where:{email:email}
            })

            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }

    })
}




module.exports={
    handleUserLogin:handleUserLogin
}