import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, LinearProgress, CardMedia, useMediaQuery } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatNumber, reformat } from "../assets/utils/unitConverter";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import { Videos } from "./";
import fetchData from "../assets/utils/dataFetcher";
import { demoProfilePicture } from "../assets/utils/constants";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

const VideoDetail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState(null);
  const { videoId } = useParams();
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    setIsLoading(true)
    fetchData(`videos?part=snippet,statistics&id=${videoId}`)
      .then((data) => {
        setVideoDetail(data.items[0])
        console.log("here => ", data)
        let channelId = data?.items[0]?.snippet?.channelId
        console.log(channelId)
        return channelId
      })
      .then(channelId => {
        fetchData(`channels?part=snippet&id=${channelId}`)
          .then((data) => setChannelDetail(data.items[0]))
      })

    fetchData(`search?part=snippet&relatedToVideoId=${videoId}&type=video`)
      .then((data) => setVideos(data.items))
    setIsLoading(false)
  }, [videoId]);

  if (!videoDetail?.snippet) return <h1>Loading</h1>;

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading &&
        <Box minHeight="90vh">
          <Stack direction={{ xs: "column", md: "row", ml: "2" }}
            sx={{ display: "flex", }}
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
            <Box sx={{ width: "90vw" }}>
              <Box sx={{ width: { md: "70vw", xs: "95vw" }, position: "sticky", top: "50px", px: 3 }}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} className="react-player" controls />
                <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                  {title}
                </Typography>
                <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
                  <Box sx={{ display: "flex" }}>
                    <Link to={`/channel/${channelId}`}>
                      <Typography variant={{ sm: "subtitle1", md: 'h5' }} sx={{ display: "flex", alignItems: "conter" }} color="#fff" >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CardMedia
                            image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
                            alt={channelDetail?.snippet?.title}
                            sx={{ borderRadius: '50%', height: '45px', width: '45px', border: '1px solid #e3e3e3' }}
                          />
                          {isScreenGreaterThanMd && 
                          <Box>
                          <Typography variant="subtitle1" fontSize='1rem' sx={{ ml: "10px", fontWeight: "900" }}>{channelTitle}</Typography>
                          {channelDetail?.statistics?.subscriberCount && (
                            <Typography sx={{ fontSize: '11px', fontWeight: 500, color: 'gray', ml:"10px" }}>
                              {reformat(formatNumber(parseInt(channelDetail?.statistics?.subscriberCount)).toLocaleString('en-US'))} {isScreenGreaterThanMd ? "Subscribers" : "Subs"}
                            </Typography>
                          )}
                          </Box>
                          }
                          {isScreenGreaterThanMd && <CheckCircleIcon sx={{ fontSize: "18px", color: "gray", ml: "5px", mb:"20px" }} />}
                          
                        </Box>
                      </Typography>
                    </Link>
                    <Box
                      // onClick={handleSignup}
                      sx={{
                        border: "1px solid white",
                        display: "flex",
                        alignItems: "center",
                        padding: "7px 12px",
                        borderRadius: "999px",
                        transition: "200ms ease-in-out",
                        ml: "20px",
                        '&:hover': {
                          cursor: 'pointer',
                          bgcolor: "#5e5656"
                        }
                      }}>
                      <SubscriptionsRoundedIcon />
                      {isScreenGreaterThanMd && 
                      <Typography sx={{ color: "white", ml: "3px" }}>Subscribe</Typography>
                      }
                    </Box>
                    <Box
                      // onClick={handleSignup}
                      sx={{
                        border: "1px solid white",
                        display: "flex",
                        alignItems: "center",
                        padding: "7px 12px",
                        borderRadius: "999px",
                        transition: "200ms ease-in-out",
                        ml: {md:"20px", xs:"10px"},
                        '&:hover': {
                          cursor: 'pointer',
                          bgcolor: "#5e5656"
                        }
                      }}><LibraryAddRoundedIcon />
                      {isScreenGreaterThanMd && 
                      <Typography sx={{ color: "white", ml: "3px" }}>
                        Save
                      </Typography>
                      }
                    </Box>
                  </Box>
                  <Stack direction="row" alignItems="center" gap={"20px"}>
                    <Typography variant="body1" sx={{
                      opacity: 0.7, border: "1px solid white",
                      display: "flex",
                      alignItems: "center",
                      py:"4px",
                      px:{md:"18px", xs:"8px"},
                      borderRadius: "999px",
                      bgcolor: "#5e5656"
                    }}>
                      <Box sx={{
                        display: "flex", gap: "5px", justifyContent: "center", alignItems: "center", height: "30px",
                      }}>{reformat(formatNumber(parseInt(likeCount).toLocaleString()))}<ThumbUpIcon sx={{mb:"5px"}}/></Box>
                    </Typography>
                    <Typography variant="body1" sx={{
                      opacity: 0.7,
                      border: "1px solid white",
                      display: "flex",
                      alignItems: "center",
                      py:"8px",
                      px:{md:"18px", xs:"8px"},
                      borderRadius: "999px",
                      bgcolor: "#5e5656"
                    }}>
                      {reformat(formatNumber(parseInt(viewCount).toLocaleString()))} <RemoveRedEyeRoundedIcon sx={{ml:"4px"}}/>
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