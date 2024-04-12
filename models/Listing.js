const mogoose=require('mongoose')

const ListingSchema=mogoose.Schema({
    creator:{
        type:mogoose.Schema.Types.ObjectId,
        ref:'User'
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },

    guestCount: {
    type: Number,
    required: true,
    },
    bedroomCount: {
    type: Number,
    required: true,
    },
    bathroomCount: {
    type: Number,
    required: true,
    },
    amenities: {
    type: Array,
    default:[]
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs
    price: {
    type: Number,
    required: true,
    }},
{ timestamps: true}
)

const Listing=mogoose.model('Listing',ListingSchema)
module.exports= Listing