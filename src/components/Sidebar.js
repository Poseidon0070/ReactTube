import React from 'react';
import { categories } from '../assets/utils/constants';
import { Stack, useMediaQuery, Typography,Box } from '@mui/material';
import { Button } from '@mui/material';
import './Sidebar.css'; 
import CopyrightSharpIcon from '@mui/icons-material/CopyrightSharp';


const Sidebar = (props) => {

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
          width:{xs:"97.1%" },
          mb:{md:2},
          mx:{md:3}
        }}
        className="sidebar-container" 
      >
        {categories.map((category, index) => (
          <Box key={index} sx={{px:{md:1}}}>
            <Button variant="standard" key={category.name} 
            sx={{'&:hover':{backgroundColor:"#7D7C7C", transform:"scale(1.1)"}, 
            my:{md:0.4}, 
            width:"auto"}}
            onClick={() => props.setCategory(category.name)}
            >
              <span style={{ color:"lightgreen", marginTop:"4px" }}><div>{category.icon}</div></span>
              <Typography variant="body1" color="grey" sx={{px:2}}>
                {category.name}
              </Typography>
            </Button>
          </Box>
        ))}

      </Stack>
        {isScreenGreaterThanSm && (
            <Stack direction="row" sx={{ml:4}}>
              <CopyrightSharpIcon height="10px" sx={{ color: 'grey' }} />
              <Typography variant="body1" color={'grey'} sx={{ mt: 0.1}}>
                Copyright ReactTube
              </Typography>
            </Stack>
        )}
      </>
  );
};

export default Sidebar;
