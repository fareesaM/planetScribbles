import bcrypt from "bcryptjs"
const users=[
    {
        name:"admin user",
        email:"admin@ex.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"saro",
        email:"saro@ex.com",
        password:bcrypt.hashSync("123456",10),
        
    },
    {
        name:"john",
        email:"john@ex.com",
        password:bcrypt.hashSync("123456",10),
        
    },
    {
        name:"jane",
        email:"jane@ex.com",
        password:bcrypt.hashSync("123456",10),
        
    }
]
export default users