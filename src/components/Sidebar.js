import React from 'react';
import { categories } from '../assets/constants';
import { Stack, useMediaQuery, Typography } from '@mui/material';
import { Button } from '@mui/material';
import './Sidebar.css'; 
import CopyrightSharpIcon from '@mui/icons-material/CopyrightSharp';

const Sidebar = () => {

  const isScreenGreaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <>
      <Stack
        direction="row"
        sx={{
          flexDirection: { md: 'column' },
          overflowY: 'auto',
          overflowX: 'scroll',
          height: { xs: 'auto', md: '95%'},
          width:{xs:"95%" },
          mb:{md:2},
          mx:{xs:3}
        }}
        className="sidebar-container" 
      >
        {categories.map((category) => (
          <div>
            <Button variant="outlined" key={category.name} sx={{'&:hover':{backgroundColor:"#7D7C7C"}, borderColor:"#b4737369", my:{md:0.4}, mx:{xs:1}, width:"auto"} }>
              <Typography variant="body1" color="white">
                {category.name}
              </Typography>
              <span style={{ marginTop: '2px' }}>{category.icon}</span>
            </Button>
          </div>
        ))}

      </Stack>
        {isScreenGreaterThanSm && (
            <Stack direction="row" sx={{ml:2}}>
              <CopyrightSharpIcon height="10px" sx={{ color: 'white' }} />
              <Typography variant="body1" color={'white'} sx={{ mt: 0.1}}>
                Copyright ReactTube
              </Typography>
            </Stack>
        )}
      </>
  );
};

export default Sidebar;
