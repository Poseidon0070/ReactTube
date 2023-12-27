import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../assets/utils/dataFetcher'
import { Box, LinearProgress } from '@mui/material'
import VideoCard from '../components/VideoCard'
import ChannelCard from '../components/ChannelCard'
import Videos from './Videos'

const Channel = () => {
    const [channelDetail, setChannelDetail] = useState(null)
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {channelId} = useParams();

    useEffect(() => {
        setIsLoading(true)

        fetchData(`channels?part=snippet&id=${channelId}`)
        .then((data) => setChannelDetail(data.items[0]))
        .catch((err) => {throw new Error("Cannot fetch channel data")})

        fetchData(`search?channelId=${channelId}&part=snippet&order=date`)
        .then((data) => setVideos(data.items))
        .catch((err) => {throw new Error("Cannot fetch channel data")})

        setIsLoading(false)
      }, [channelId])
    
  return (
    <>
    {isLoading && <LinearProgress color="primary" />}
    {!isLoading && 
      <Box>
        <Box sx={{height:"230px", bgcolor:"yellow", width:"100%"}} />
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <ChannelCard channelDetail={channelDetail} marginTop='-100px' isLinkDisabled={true}/>
        </Box>
        <Box>
          <Videos videos={videos} isChannel={true}/>
        </Box>
      </Box>
    }
    </>
  )
}

export default Channel
