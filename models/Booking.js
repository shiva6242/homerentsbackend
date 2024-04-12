const mongoose=require('mongoose')

const BookingSchmea=new mongoose.Schema({
    customerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    },
    hostId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    listingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true
    }
},
{timestamps:true}
)

const Booking=mongoose.model("booking",BookingSchmea)
module.exports=Booking