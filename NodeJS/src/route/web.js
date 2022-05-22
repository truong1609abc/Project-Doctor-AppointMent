import express from "express";
import homeController from "../controller/homeController"
import userController from "../controller/userController"
let router =express.Router();

let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage),
    router.get('/about',homeController.getAbout)
    router.get('/crud',homeController.getCrud)
    router.post('/post-crud',homeController.InsertCrud)
    router.get('/viewall',homeController.ViewAll)
    router.get('/edit-crud',homeController.getEditCrud)
    router.post('/put-crud',homeController.putCrud)
    router.get('/delete-crud',homeController.deleteCrud)
    router.post('/api/login',userController.handeleLogin)


    return app.use("/",router)
}

module.exports=initWebRoutes