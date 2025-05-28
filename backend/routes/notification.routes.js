const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/authmiddleware");
const NotificationController=require("../controllers/notification.controller")

router.get('/get',authMiddleware.authuser,NotificationController.getNotifications);
router.delete('/delete/:id',authMiddleware.authuser,NotificationController.deleteNotifications);
router.delete('/',authMiddleware.authuser,NotificationController.clearAllNotifications);

module.exports=router

