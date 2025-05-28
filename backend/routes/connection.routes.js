const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/authmiddleware");
const ConnectionController=require("../controllers/connection.controller");

router.post("/send/:id",authMiddleware.authuser,ConnectionController.sendConnection);
router.put("/accept/:id",authMiddleware.authuser,ConnectionController.acceptConnection);
router.put("/reject/:id",authMiddleware.authuser,ConnectionController.rejectConnection);
router.get("/status/:userId",authMiddleware.authuser,ConnectionController.getConnectionStatus);
router.delete("/remove/:userId",authMiddleware.authuser,ConnectionController.removeConnection);
//kitni  requests  hamare pass aayi hain
router.get("/getrequests",authMiddleware.authuser,ConnectionController.getConnectRequests);
router.get("/getall",authMiddleware.authuser,ConnectionController.getUserConnections);

module.exports=router;