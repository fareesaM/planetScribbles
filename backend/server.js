import path from "path"
import express from "express"
import dotenv from "dotenv"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import colors from "colors"
import productRoutes from "./routes/productRoute.js"
import userRoutes from "./routes/userRoute.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import eventRoutes from './routes/eventRoutes.js';



dotenv.config({ path: './../.env' });

connectDB();
const app=express()

app.use(express.json())

app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use('/api/events', eventRoutes);

console.log(process.env.MONGO_URI)
app.get("/api/config/paypal",(req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname=path.resolve()
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname,"/frontend/dist")))    
app.get("*",(req,res)=>
res.sendFile(path.resolve(__dirname,"frontend","dist","index.html")))
}else{
  app.get("/",(req,res)=>{
      res.send("API is running....")
  })  
}


   
app.use(notFound)
app.use(errorHandler)



const PORT=process.env.PORT||5000

app.listen(PORT,console.log((`server running on port ${PORT} in ${process.env.NODE_ENV}`)));