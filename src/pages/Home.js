import React, { useEffect, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from './Videos'

import Sidebar from '../components/Sidebar';

const Home = () => {

  const [category, setCategory] = useState('New')
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchData(`search?part=snippet&q=${category}`)
    .then((data) => setVideos(data.items))
    .catch((err) => {throw new Error(err)})
  }, [category]);

  return (
    <Stack
      sx={{
        flexDirection: { sx: 'column', md: 'row' }
      }}
    >
      <Box
        sx={{ bgcolor: 'black', height: {md:'88vh', xs:'auto'}, width: 'auto' }}
        px={2}
        py={2}
        borderRight={'1px solid #3d3d3d'}
      >
        <Sidebar category={category} setCategory={setCategory}/>
      </Box>
      <div>
        <Videos videos={videos}/>
      </div>

    </Stack>
  );
};

export default Home;