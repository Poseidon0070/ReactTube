import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack,LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {formatNumber,reformat} from "../assets/utils/unitConverter";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {Videos} from "./";
import fetchData from "../assets/utils/dataFetcher";

const VideoDetail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { videoId } = useParams();

  useEffect(() => {
    setIsLoading(true)
    fetchData(`videos?part=snippet,statistics&id=${videoId}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchData(`search?part=snippet&relatedToVideoId=${videoId}&type=video`)
      .then((data) => setVideos(data.items))
      setIsLoading(false)
  }, [videoId]);

  if(!videoDetail?.snippet) return <h1>Loading</h1>;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;



  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && 
        <Box minHeight="90vh">
          <Stack direction={{ xs: "column", md: "row", ml:"2" }}
            divider={
              <Box
                component="hr"
                sx={{
                  border: (theme) =>
                    `1px solid ${theme.palette.mode === 'dark' ? 'grey' : '#BBAB8C'}`,
                }}
              />
            }
          >
            <Box sx={{width:"90vw"}}>
              <Box sx={{ width: {md:"78vw", xs:"95vw"}, position: "sticky", top: "86px", px:2 }}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} className="react-player" controls />
                <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                  {title}
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                  <Link to={`/channel/${channelId}`}>
                    <Typography variant={{ sm: "subtitle1", md: 'h5' }}  color="#fff" >
                      {channelTitle}
                      <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                    </Typography> 
                  </Link>
                  <Stack direction="row" alignItems="center" gap={"20px"}>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      <Box sx={{display:"flex", gap:"5px", justifyContent:"center", alignItems:"center", height:"30px"}}>{reformat(formatNumber(parseInt(likeCount).toLocaleString()))}<div><ThumbUpIcon /></div></Box>
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                      {reformat(formatNumber(parseInt(viewCount).toLocaleString()))} views
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Videos videos={videos} isChannel={true} direction="column" />
            </Box>
          </Stack>
        </Box>
      }
    </>
  );
};

export default VideoDetail;