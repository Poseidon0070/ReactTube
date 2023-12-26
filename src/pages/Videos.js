import React from 'react'
import VideoCard from '../components/VideoCard'
import { Box } from '@mui/material'

const Videos = ({videos}) => {
  return (
    <>
        <Box sx={{display:"flex", 
        flexWrap:"wrap", mx:4, 
        justifyContent:"space-evenly",
        height:"92vh",
        overflowY:"scroll",
        }}>
            {videos.map((video) => {
                return (
                    <VideoCard video={video} />
                )
            })}
        </Box>
    </>
  )
} 

export default Videos
