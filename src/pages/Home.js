import React, { useEffect, useState } from 'react';
import { Stack, Box,LinearProgress } from '@mui/material';
import fetchData from '../assets/utils/dataFetcher';
import Videos from './Videos';

import Sidebar from '../components/Sidebar';

const Home = () => {
  const [category, setCategory] = useState('New');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchData(`search?part=snippet&q=${category}`)
      .then((data) => setVideos(data.items))
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, [category]);

  return (
    <>
      {isLoading && <LinearProgress color="primary" />}
      {!isLoading && (
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
            <Videos videos={videos}  isChannel={false} />
          </div>
        </Stack>
      )}
    </>
  );
};

export default Home;
