const express=require('express')
const router=express.Router()
const multer=require('multer')
const Listing = require('../models/Listing')


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})
router.post("/create",upload.array("listingPhotos"),async(req,res)=>{
    try {
        const {creator,streetAddress,city,district,state,guestCount,bedroomCount,bathroomCount,amenities,price}=req.body
        const listingPhotos=req.files
        if(!listingPhotos)
        {
            res.status(400).send('no photo uploaded')
        }
        const listingPhotoPaths=listingPhotos.map(file=>file.path)
        const newListing=new Listing({
            creator,
            streetAddress,
            city,
            district,
            state,
            guestCount,
            bedroomCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            price
        })
        await newListing.save()
        res.status(200).json(newListing)
    } catch (err) {
       res.status(400).json({msg:"Fail to create Listing", error: err.message })
       console.log(err)
    }

})
router.get('/',async(req,res)=>{
   const place=req.query.place;
   try {
    const listing=await Listing.find({city:place}).populate("creator")
    res.status(200).json(listing)
   } catch (error) {
    res.status(404).json({msg:"error occured while fetching"})
   }

})


router.get('/search/:search',async(req,res)=>{
    const {search}=req.params
    let listing=[];
    try {
        if(search==='all')
        {
            listing=await Listing.find({}).populate('creator')
        }
        else{
            listing=await Listing.find({
                $or:[
                    {city:{$regex:search , $options:"i"}},
                    {state:{$regex:search , $options:"i"}}
                ]
            })
        }
        res.status(200).json(listing);
    } catch (error) {
        res.status(400).json({msg:"search listings failed",listing:listing})
    }
})
router.get('/create',async(req,res)=>{
    try {
        const listing=await Listing.find({}).populate("creator")
        res.status(200).json({data:listing})
    } catch (error) {
        console.log(error)
    }
   
})


router.get('/:listingId',async(req,res)=>{
    const {listingId}=req.params
    try {
        const listing=await Listing.findById(listingId).populate("creator");
        res.status(200).json({listing:listing});
    } catch (error) {
        console.log(error)   
    }

})
module.exports=router