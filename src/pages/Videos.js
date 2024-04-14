import React from 'react'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import { Box,LinearProgress } from '@mui/material'
 
const Videos = ({videos,innerref, isChannel, direction}) => {
  console.log("here")
  console.log({videos, isChannel, direction})
  if(!videos?.length) return <h1><LinearProgress /></h1>
  return (
    <>
        <Box direction = {direction || "row"} sx={{display:"flex",
        flexDirection : {direction},
        flexWrap:"wrap", mx:2, px:2,
        justifyContent:"space-evenly",
        height:"92vh",
        overflowY:"scroll",
        }}>
            {videos.map((video,key) => {
              if(video.id.videoId !== undefined){
                if(video.isEnd === true){
                  return <VideoCard key={key} innerref={innerref} video={video} />
                }
                return <VideoCard key={key} video={video} />
              }else if(!isChannel){
                return <ChannelCard key={key} channelDetail={video} />
              }
              return [];
            })}
        </Box>
    </>
  )
} 

export default Videos
