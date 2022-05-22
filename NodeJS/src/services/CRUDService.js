
import bcrypt from 'bcryptjs';
import db from '../models';
const salt = bcrypt.genSaltSync(10);


let createNewUser=async(data)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let hashPasswordBcipt = await hashUserPassword(data.password);
            await db.User.create({
                email:data.email,
                password:hashPasswordBcipt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber:data.phonenumber,
                gender:data.gender === '1'?true:false,
                roleId:data.roleId,
            })
            let allUser= await db.User.findAll();
            resolve(allUser)
         
        } catch (error) {
            reject(error)
        }
    })
 
}   

let hashUserPassword =(password)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(e)
        }
       
    })
}
let ViewAll =()=>{
    return new Promise( async(resolve,reject)=>{
        try {
             let data= await db.User.findAll({
                raw:true,
             });  
             resolve(data);
        } catch (error) {
            reject(error)
        }
    })
}

let getUserInfoById =(id)=>{
    return new Promise(async(resolve,reject)=>{
        try {
               let userdata= await db.User.findOne({
                   where:{id:id},
                   raw:true

               })

               if(userdata){
                   resolve(userdata)
               }else{
                   resolve([])
               }
        } catch (error) {
            reject(error)
        }
    })
}

let updateCrud =(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where:{id:data.id}
            })

         

           if(user){
               user.email=data.email;
               user.lastName=data.lastName;
               user.address=data.address;

               await user.save();

               let allUser= await db.User.findAll();
               resolve(allUser)
           }else{
               resolve()
           }
        } catch (error) {
            reject(error)
        }

    })
}

let deleteCrud =(id)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where:{id:id}
            })

            
            if(user){
        
                await user.destroy();

                let allUser= await db.User.findAll();
                resolve(allUser)
            }else{
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports={
    createNewUser:createNewUser,
    ViewAll:ViewAll,
    getUserInfoById:getUserInfoById,
    updateCrud:updateCrud,
    deleteCrud:deleteCrud,
}