import React, { useEffect, useState } from 'react';
import { Stack, Box, LinearProgress, Typography } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from '../components/Videos';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import CircularProgress from '@mui/material/CircularProgress';

import Sidebar from '../components/Sidebar';

const Home = () => {
  const [category, setCategory] = useState('New');
  let { ref, inView } = useInView()
  const queryClient = useQueryClient()

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
        }}
      >
        <Box
          sx={{ bgcolor: 'black', height: { md: '88vh', xs: 'auto' }, width: 'auto' }}
          px={2}
          py={2}
          borderRight={'1px solid #3d3d3d'}
        >
          <Sidebar category={category} setCategory={setCategory} />
        </Box>
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
