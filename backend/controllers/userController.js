import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(`Trying to login: ${email}`);

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ User not found");
  } else {
    const isMatch = await user.matchPassword(password);
    console.log("🔐 Password match:", isMatch);
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});


//@desc get user profile
//@route get /api/users/profile
//@access private
const getUserProfile=asyncHandler(async(req,res)=>{
const user=await User.findById(req.user._id)
if(user){
  res.json({
    _id:user._id,
   name:user.name,
   email:user.email,
   isAdmin:user.isAdmin,
  })
}else{
  res.status(404)
  throw new Error("user not found")
}

})

//desc register a new user
//route POST /api/users
//access public
const registerUser=asyncHandler(async(req,res)=>{
  const {name,email,password}=req.body 
const userExists= await User.findOne({email:email})  
if(userExists){
  res.status(404) 
  throw new Error("user already exists")
}

const user=await User.create({
  name,
  email,
  password
})


if(user){
  console.log(user);
  
res.status(201).json({
  _id:user._id,
  name:user.name,
  email:user.email,
  isAdmin:user.isAdmin,
  token:generateToken(user._id)  

  
})

}else{
  res.status(404)
  throw new Error("invalid user address")
}
}) 


//@desc update user profile
//@route put /api/users/profile
//@access private
const updateUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id)
  if(user){
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
if(req.body.password){
  user.password=req.body.password
}
const updatedUser= await user.save()
res.json({
  _id:updatedUser._id,
  name:updatedUser.name,
  email:updatedUser.email,
  isAdmin:updatedUser.isAdmin,
  token:generateToken(updatedUser._id) 
})
  }else{
    res.status(404)
    throw new Error("user not found")
  }
  
  })

//@desc get all users
//@route put /api/users
//@access private/Admin
  const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({})
    res.json(users)
    
    })



//@desc delete user
//@route delete /api/users/:id
//@access private/Admin
const delUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)
  if(user){
await user.remove()
res.json({message:"User Removed"})
  }else{
    res.status(404)
    throw new Error("user not found")
  }
  
  })


//@desc get a user by id
//@route get /api/users/:id
//@access private/Admin
const getUserById=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id).select("-password")
  if(user){
    res.json(user)
  }else{
    res.status(404)
    throw new Error("user not found")
  }
 
  
  })

  //@desc update user profile
//@route put /api/users/profile
//@access private
const updateUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.params.id)
  if(user){
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
user.isAdmin=req.body.isAdmin

const updatedUser= await user.save()
res.json({
  _id:updatedUser._id,
  name:updatedUser.name,
  email:updatedUser.email,
  isAdmin:updatedUser.isAdmin,
  
})
  }else{
    res.status(404)
    throw new Error("user not found")
  }
  
  })



export {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,delUser,getUserById,updateUser}