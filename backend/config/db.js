import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import colors from "colors"

const connectDB=async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
          useNewUrlParser:true,
          useCreateIndex:true
          })
          console.log(`Mongodb connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(`error:${error.message}`.red.underline);
        process.exit(1)
    }
}
export default connectDB