const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
    },
    profileImagePath:{
        type:String,
        default:""
    },
    tripList:{
        type:Array,
        default:[]
    },
    propertyList:{
        type:Array,
        default:[],
    },
    wishList:{
        type:Array,
        default:[]
    },
}
    ,{timestamps:true}
)

const User=mongoose.model("User",userSchema)
module.exports=User
