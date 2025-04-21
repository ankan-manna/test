import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId");
    }

    const likedVideo = await Like.findOne({ video: videoId, likedBy: userId });

    if (!likedVideo) {
        const like = await Like.create({ video: videoId, likedBy: userId });
        if(!like){
            throw new ApiError(500, "Something went wrong while liking the video")
        }
        return res.status(200).json(new ApiResponse(200, {liked: true}, "Video liked successfully"));

    } else {
        await Like.findByIdAndDelete(likedVideo._id);
        return res.status(200).json(new ApiResponse(200, {liked: false}, "Video unliked successfully"));
    }
});

const toggleCommentLike = asyncHandler(async (req, res) => {    
    const { commentId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid commentId");
    }

    const likedComment = await Like.findOne({ comment: commentId, likedBy: userId });

    if (!likedComment) {
        const like = await Like.create({ comment: commentId, likedBy: userId });
         if(!like){
            throw new ApiError(500, "Something went wrong while liking the comment")
        }
        return res.status(200).json(new ApiResponse(200, {liked: true}, "Comment liked successfully"));
    } else {
        await Like.findByIdAndDelete(likedComment._id);
        return res.status(200).json(new ApiResponse(200, {liked: false}, "Comment unliked successfully"));
    }
    
})

const toggleTweetLike = asyncHandler(async (req, res) => {    
    const { tweetId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId");
    }

    const likedTweet = await Like.findOne({ tweet: tweetId, likedBy: userId });

    if (!likedTweet) {
        const like = await Like.create({ tweet: tweetId, likedBy: userId });
        if(!like){
            throw new ApiError(500, "Something went wrong while liking the tweet")
        }
        return res.status(200).json(new ApiResponse(200, {liked: true}, "Tweet liked successfully"));
    } else {
        await Like.findByIdAndDelete(likedTweet._id);
        return res.status(200).json(new ApiResponse(200, {liked: false}, "Tweet unliked successfully"));
    }
})

const getLikedVideos = asyncHandler(async (req, res) => {    
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "likedVideoDetails"
            }
        }
    ]);
    return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"));
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}