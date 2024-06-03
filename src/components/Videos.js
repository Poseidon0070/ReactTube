import React from 'react'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
import { Box,LinearProgress, useMediaQuery } from '@mui/material'
 
const Videos = ({videos,innerref, isChannel, direction}) => {
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  if(!videos?.length) return <h1><LinearProgress /></h1>
  return (
    <>
        <Box direction = {direction || "row"} sx={{display:"flex",
        flexDirection : {direction},
        flexWrap:"wrap", px:4,
        justifyContent:"space-evenly",
        height:"92vh",
        overflowY:"scroll",
        mt: !isScreenGreaterThanMd?"50px":"0px"
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
