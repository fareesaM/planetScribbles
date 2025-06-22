import express from "express"
import { authUser,getUserProfile,registerUser,updateUserProfile,getUsers,delUser,getUserById,updateUser } from "../controllers/userController.js"
import {protect,admin} from "../middleware/authMiddleware.js"

const router=express.Router()

console.log(registerUser);
console.log(getUsers);

router.route("/").post(registerUser)
router.route("/").get(protect,admin,getUsers)
router.route("/login").post(authUser)
router.route("/profile")
.get(protect,getUserProfile)
.put(protect,updateUserProfile)
router.route("/:id")
.delete(protect,admin,delUser)
.get(protect,admin,getUserById)
.put(protect,admin,updateUser)




export default router 