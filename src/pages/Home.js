import React, { useEffect, useState } from 'react';
import { Stack, Box, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from '../components/Videos';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import CircularProgress from '@mui/material/CircularProgress';

import Sidebar from '../components/Sidebar';
import { useAppContext } from '../context/appContext';

const Home = () => {
  let { ref, inView } = useInView()
  const {isSidebarOpen} = useAppContext()
  const queryClient = useQueryClient()
  const isScreenGreaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
  
  const {category, setCategory} = useAppContext();
  const fetchVideos = async ({ pageParam = '' }) => {
    let res = await fetchData(`search?part=snippet&q=${category}`, pageParam)
    return res;
  };

  let videos;

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['fetchVideos'],
    queryFn: fetchVideos,
    initialPageParam: '',
    getNextPageParam: (data) => {
      return data.nextPageToken || false;
    },
  });


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    queryClient.resetQueries(['fetchVideos', category]);
  }, [category, queryClient])

  if (status === 'pending') return <LinearProgress color="primary" />;
  if (error) return <div>Error: {error.message}</div>;

  videos = data?.pages.map(page => page.items).reduce((acc, val) => acc.concat(val), []);
  videos[videos.length - 1].isEnd = true

  return (
    <>
      <Stack
        sx={{
          flexDirection: { sx: 'column', md: 'row' },
          ml:isSidebarOpen && isScreenGreaterThanMd?"250px":"0px"
        }}
      >
        <div>
          <Videos videos={videos} innerref={ref} isChannel={false} />
        </div>
      </Stack>
      {isFetchingNextPage &&
        <Box sx={{ display: "flex", justifyContent: "center", my: "25px" }}>
          <CircularProgress color="success" />
        </Box>
      }
    </>
  );
};

export default Home;
