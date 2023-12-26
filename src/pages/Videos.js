import React from 'react'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
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
            {videos.map((video,key) => {
              if(video.id.videoId !== undefined){
                return <VideoCard key={key} video={video} />
              }else{
                return <ChannelCard key={key} channelDetail={video} />
              }
            })}
        </Box>
    </>
  )
} 

export default Videos
