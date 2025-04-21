import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    
    const channelId = req.user._id

    const totalVideoViews = await Video.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $group:{
                _id: null,
                totalViews:{$sum: "$views"}
            }
        }
    ])

    const totalSubscribers = await Subscription.countDocuments({channel: channelId})
    const totalVideos = await Video.countDocuments({owner: channelId})
    const totalLikes = await Like.countDocuments({likedBy: channelId})

    const channelStats = {
        totalViews: totalVideoViews.length > 0 ? totalVideoViews[0].totalViews : 0,
        totalSubscribers,
        totalVideos,
        totalLikes
    }

    if(!channelStats){
        throw new ApiError(500, "Something went wrong while fetching channel Stats")
    }

    return res.status(200).json(new ApiResponse(200, channelStats, "Channel stats fetched successfully"))

});

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const channelVideos = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: parseInt(limit)
        }
    ]);
    return res.status(200).json(new ApiResponse(200, channelVideos, "Channel videos fetched successfully"));
});

export {
    getChannelStats, 
    getChannelVideos
    }