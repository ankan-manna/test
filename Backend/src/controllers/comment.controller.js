import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    const videoComments = await Comment.aggregate([
        {
            $match:{
                video:new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $skip:(page - 1) * limit
        },
        {
            $limit:parseInt(limit)
        }
    ])
    if(!videoComments){
        throw new ApiError(404, "Comment not found")
    }
    return res.status(200).json(new ApiResponse(200,videoComments,"Comments fetched Successfully"))

})

const addComment = asyncHandler(async (req, res) => { 
    const { videoId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const comment = await Comment.create({ content, video: videoId, owner: userId });
    if(!comment){
        throw new ApiError(500, "Something went wrong while commenting")
    }
    return res.status(201).json(new ApiResponse(201, comment, "Comment Added successfully"));
})

const updateComment = asyncHandler(async (req, res) => {    
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content) {
        throw new ApiError(400, "Content is required");
    }

    const comment = await Comment.findById(commentId);
    if (!comment || comment.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment");
    }
    const updatedComment = await Comment.findByIdAndUpdate(commentId,{content}, { new: true });
    return res.status(200).json(new ApiResponse(200, updatedComment, "Comment Updated successfully"));

})

const deleteComment = asyncHandler(async (req, res) => {    
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment || comment.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"));

});

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
