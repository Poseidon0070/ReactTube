import React, { useRef } from 'react';
import { Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import vidLogo from '../assets/images/vid_logo.png';
import TroubleshootSharpIcon from '@mui/icons-material/TroubleshootSharp';

const Navbar = () => {
  let searchContentRef = useRef('55');
  let navigate = useNavigate();

  let submitHandler = (event) => {
    event.preventDefault();
    let content = searchContentRef.current.value;
    if (content === '') {
      searchContentRef.current.focus();
      return;
    }
    console.log(content);
    return navigate('/search/' + content);
  };

  const isScreenGreaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={{ xs: 1, sm: 6 }}
      py={2}
      sx={{
        position: 'sticky',
        top: 0,
        bgcolor: 'rgba(0,0,0,0.9)',
        opacity:0.9,
        zIndex: 1000,
      }}
    >
      <Link to="./">
        <Stack direction="row">
          <img src={vidLogo} height={50} alt="Logo" />
          {isScreenGreaterThanSm && (
            <Typography variant="h4" sx={{ mt: 0.8, ml: 1, color:"white" }}>
              ReactTube
            </Typography>
          )}
        </Stack>
      </Link>

      <Paper
        component="form"
        sx={{ width: '260px', height: '40px', borderRadius: 4 }}
      >
        <TextField
          variant="standard"
          placeholder="Search ReactTube"
          sx={{ pl: 1.5, pt: 1, borderRight: 2, width: '200px' }}
          inputRef={searchContentRef}
        />
        <TroubleshootSharpIcon
          sx={{
            mt: 0.8,
            ml: 1,
            '&:hover': {
              bgcolor: 'transparent',
              cursor: 'pointer',
            },
          }}
          onClick={submitHandler}
        />
      </Paper>
    </Stack>
  );
};

export default Navbar;
