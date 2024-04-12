const express=require('express')
const app=express();
const connectDB=require('./db/connect')
require('dotenv').config()
const BASE_URL=process.env.BASE_URL
const authRoutes=require('./routes/auth')
const cors=require('cors')
const User=require('./models/UserSchema')
const List=require('./models/Listing')
const userRoutes=require('./routes/user')
const bookingRoutes=require('./routes/booking')
const listingRoutes=require('./routes/List')
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use("/auth", authRoutes)
app.use("/properties",listingRoutes);
app.use("/users",userRoutes)
app.use("/bookings",bookingRoutes)

app.get("/properties/create",async(req,res)=>{
    const list=await List.find({})
    res.status(200).json({msg:"success",lists:list})
})
app.get('/auth/register',async(req,res)=>{
    const user=await User.find({})
    res.status(200).json({msg:"success",users:user})
})
app.delete('/',async(req,res)=>{
    await User.deleteMany({})
    res.status(200).json({msg:"all data deleted"})
})


    const PORT=3001;
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL,{
            dbName: "Home Rentals",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT,()=>{
            console.log(`server is listening on port no. ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()





