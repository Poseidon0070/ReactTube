import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useAppContext } from '../context/appContext'
import { formatNumber, reformat } from '../assets/utils/unitConverter'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const SavedVideos = () => {

    let { savedVideos, setSavedVideos } = useAppContext()
    console.log(savedVideos)
    const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
    let navigate = useNavigate()

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ height: "auto", width: { md: "70vw", sm: "90vw", xs: "95vw" } }}>
                <Typography variant='h5' sx={{ color: "white", fontFamily: "cursive", mb: "20px", opacity: "0.9", position: "fixed", bgcolor: "black", display: "inline-block", width: "100%" }}>Saved Videos</Typography>
                {savedVideos.length === 0 ? (
                    <Typography variant='body1' sx={{ color: "white", fontFamily: "cursive" }}>No Saved Videos</Typography>
                ) : (
                    savedVideos.map((video, index) => (
                            <Box key={index} sx={{
                                display: "flex", my: "30px", mt: index == 0 ? "50px" : "0px", bgcolor: "#48424263", p: "7px", borderRadius: "8px", '&:hover': {
                                    bgcolor: "#938e8e63"
                                }
                            }}>
                                <Typography onClick={() => navigate(`/video/${video.videoId}`)} sx={{ color: "darkgrey", display: "flex", alignItems: "center", mr: "12px",'&:hover': {
                                                cursor: 'default',
                                            } }}>{index + 1}</Typography>
                                <img onClick={() => navigate(`/video/${video.videoId}`)} src={video.videoThumbnail} style={{ borderRadius: "20px", height: "140px", width: isScreenGreaterThanMd ? "250px" : "190px" }}></img>
                                <Box onClick={() => navigate(`/video/${video.videoId}`)} sx={{ display: "flex", width: "100%" }}>
                                    <Box sx={{ ml: "15px", mt: "10px" }}>
                                        <Typography sx={{ color: "white" }}>{video.videoTitle}</Typography>
                                        <Typography sx={{ color: "grey", fontSize: "15px" }}>{video.channelTitle}<CheckCircleIcon sx={{ fontSize: "12px", color: "gray" }} /></Typography>
                                        <Typography sx={{ color: "grey", fontSize: "12px" }}>{reformat(formatNumber(parseInt(video.views).toLocaleString()))} views</Typography>
                                    </Box>
                                </Box>
                                    <Box sx={{ ml: "auto", mt: "auto" }}>
                                        <DeleteIcon sx={{
                                            color: "white", '&:hover': {
                                                cursor: 'pointer',
                                                transform: "scale(1.1)",
                                                bgcolor: "#5e5656",
                                                borderRadius: "50%",
                                            },
                                        }} />
                                    </Box>
                            </Box>
                    ))
                )}
            </Box>
        </Box>
    )
}

export default SavedVideos
