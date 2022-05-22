
import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomePage = async (req,res)=>{
    try{
        let data= await db.User.findAll();
        console.log('-------------------');
        console.log(data);
        console.log('----------');
        return res.render('homepage.ejs',{
            data:JSON.stringify(data)
        });
    }catch(e){
        console.log(e);
    }

};

let getAbout =(req,res)=>{
    return res.render('test/about.ejs');
}

let getCrud =(req,res)=>{
    return res.render('crud.ejs')
}
let InsertCrud= async(req,res)=>{
  let message=await CRUDService.createNewUser(req.body);
  return res.render('viewAll.ejs',{
    data:message
  
});
}

let ViewAll=async(req,res)=>{
  let data=await CRUDService.ViewAll();
  return res.render('viewAll.ejs',{
    data:data
});
  
}


let getEditCrud= async(req,res)=>{
   let userId=  req.query.id;
   if(userId){
        let userData=await CRUDService.getUserInfoById(userId);
        return res.render('editCrud.ejs',{
            dataEdit:userData
        })
   }
   else{
       return res.send('Khoong co san pham co id ='+userId)
   }
   
}

let putCrud= async(req,res)=>{
    let data=req.body;
    console.log(data);
    let allUser=  await CRUDService.updateCrud(data);
    return res.render('viewAll.ejs',{
        data:allUser
    })
    

}

let deleteCrud = async(req,res)=>{
    let userIdDelete= req.query.id;
    if(userIdDelete){
        let userData=await CRUDService.deleteCrud(userIdDelete);
        return res.render('viewAll.ejs',{
            data:userData
        })
    }else{
        return res.send('ko co user de xoa')
    }
}


module.exports = {
    getHomePage:getHomePage,
    getAbout:getAbout,
    getCrud:getCrud,
    InsertCrud:InsertCrud,
    ViewAll:ViewAll,
    getEditCrud:getEditCrud,
    putCrud:putCrud,
    deleteCrud:deleteCrud,
}