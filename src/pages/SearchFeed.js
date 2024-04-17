import React, { useEffect, useState } from 'react';
import {LinearProgress,Box } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from '../components/Videos';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import CircularProgress from '@mui/material/CircularProgress';

const SearchFeed = () => {
  const {searchTerm} = useParams()
  let {ref, inView} = useInView()
  const queryClient = useQueryClient()
  
  let videos;

  const fetchVideos = async ({ pageParam = '' }) => {
    let res = await fetchData(`search?part=snippet&q=${searchTerm}`,pageParam)
    return res; 
  };

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
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [inView,hasNextPage,fetchNextPage])

  if (status === 'pending') return <LinearProgress color="primary" />;
  if (error) return <div>Error: {error.message}</div>;

  videos = data?.pages.map(page => page.items).reduce((acc, val) => acc.concat(val), []);
  videos[videos.length-1].isEnd = true

  return (
    <>
      <div>
        <Videos videos={videos} innerref={ref}  isChannel={false} />
      </div>
      {isFetchingNextPage && 
        <Box sx={{display:"flex", justifyContent:"center", my:"25px"}}>
          <CircularProgress color="success" />
        </Box>
      }
    </>
  );
};

export default SearchFeed;
