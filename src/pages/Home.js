import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

import Sidebar from '../components/Sidebar';

const Home = () => {


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
        <Sidebar />
      </Box>
      <Box sx={{ flexDirection: "column", height: "92vh",width:"100%", overflow: "auto" }}>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
  <Typography variant="h1">Hello</Typography>
</Box>

    </Stack>
  );
};

export default Home;
