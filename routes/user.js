const express=require('express')
const router=express.Router();
const User=require("../models/UserSchema")
const Listing =require('../models/Listing')
const Booking=require('../models/Booking')
router.get('/:userId/properties',async(req,res)=>{
    const {userId}=req.params;
    try {
        const propertyList=await Listing.find({creator:userId}).populate("creator")
        res.status(200).json(propertyList)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "Can not find properties!", error: error.message })
    }
})

router.get('/:userId/trips',async(req,res)=>{
    const {userId}=req.params

    try {
        const tripList=await Booking.find({customerId:userId}).populate("customerId hostId listingId")
        res.status(200).json(tripList);
    } catch (error) {
        console.log("failed to fetch trip list", error.message);
    }
})
router.patch('/:userId/:listingId',async(req,res)=>{
    const {userId,listingId}=req.params;
    try {
        const user=await User.findById(userId)
        const listing=await Listing.findById(listingId).populate('creator')

        const favListing=user?.wishList.find((item)=>item._id.toString() === listingId)
        if(favListing)
        {
            user.wishList=user.wishList.filter((item)=>item._id.toString() !== listingId)
            await user.save()
            res.status(200).json({msg:"successfully removed from wishlist",wishList:user.wishList})
        }
        else{
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({msg:"successfully added to wishlist",wishList:user.wishList})
        }
    } catch (error) {
        console.log(error)
    }
})




module.exports=router