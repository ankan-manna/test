import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user._id;

    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: userId
    });
    if (!playlist) {
        throw new ApiError(500, "Something went wrong while creating the playlist");
    }
    return res.status(201).json(new ApiResponse(201, playlist, "Playlist created successfully"));
})

const getUserPlaylists = asyncHandler(async (req, res) => {    
    const { userId } = req.params;
    if(!userId){
        throw new ApiError(400, "userId is required")
    }
    const playlists = await Playlist.find({ owner: userId });
    
    return res.status(200).json(new ApiResponse(200, playlists, "User playlists fetched successfully"));

})

const getPlaylistById = asyncHandler(async (req, res) => {    
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    return res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlistId or videoId");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    if (playlist.videos.includes(videoId)) {
        throw new ApiError(400, "Video already exists in the playlist");
    }
    playlist.videos.push(videoId);
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, {}, "Video added to playlist successfully"));
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {    
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid playlistId or videoId");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    const videoIndex = playlist.videos.indexOf(videoId);
    if(videoIndex !=-1){
        playlist.videos.splice(videoIndex, 1);
    }
    await playlist.save();
    return res.status(200).json(new ApiResponse(200, {}, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {    
    const { playlistId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId");
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    if (playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to delete this playlist");
    }
    await Playlist.findByIdAndDelete(playlistId);
    return res.status(200).json(new ApiResponse(200, {}, "Playlist deleted successfully"));
})

const updatePlaylist = asyncHandler(async (req, res) => {    
    const { playlistId } = req.params;
    const { name, description } = req.body;
    const userId = req.user._id;

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to update this playlist");
    }
    
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { name, description }, { new: true });

    return res.status(200).json(new ApiResponse(200, updatedPlaylist, "Playlist updated successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
