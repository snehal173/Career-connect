const express=require("express");
const http=require("http");
const { Server } = require("socket.io");
const connectDb=require("./config/db")
const authRoutes=require("./routes/auth.routes")
const userRoutes=require("./routes/user.routes")
const postRoutes=require("./routes/post.routes")
const connectionRoutes=require("./routes/connection.routes")
const notificationRoutes=require("./routes/notification.routes")
const dotenv=require("dotenv");
const cookieParser = require('cookie-parser');
const cors=require('cors');




dotenv.config();
const { setSocketInstance,userSocketMap } = require('./socket');

const app=express();
let server=http.createServer(app);
//websocket connection
 const io=new Server(server,{
    cors:{
        origin:"https://career-connect-frontend-njua.onrender.com",
        credentials:true,
    }
})

setSocketInstance(io);


app.use(cors({
    origin:"https://career-connect-frontend-njua.onrender.com",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/connection",connectionRoutes);
app.use("/api/notification",notificationRoutes);

const port=process.env.PORT  || 3000;



io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
     socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
    })
    socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id);
    })
})


server.listen(port,()=>{
    connectDb();
    console.log("server is running");
})

module.exports={userSocketMap};
