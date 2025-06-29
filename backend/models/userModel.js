import mongoose from "mongoose"
import bcrypt from "bcrypt" 

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    }
},{
    timestamps:true
})

userSchema.methods.matchPassword=async function(enteredPassword){
return await bcrypt.compare(enteredPassword,this.password)
}

// Add to your existing userSchema
userSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'organizer'
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

const User=mongoose.model("User",userSchema)
export default User