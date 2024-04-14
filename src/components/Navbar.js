import React, { useRef } from 'react';
import { Paper, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import vidLogo from '../assets/images/vid_logo.png';
import TroubleshootSharpIcon from '@mui/icons-material/TroubleshootSharp';

const Navbar = () => {
  let searchContentRef = useRef('');
  let navigate = useNavigate();

  const isScreenGreaterThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  let inputWidth = isScreenGreaterThanSm ? '310px' : '260px';
  let searchWidth = isScreenGreaterThanSm ? '260px' : '210px';

  let submitHandler = (event) => {
    event.preventDefault();
    let content = searchContentRef.current.value;
    if (content === '') {
      searchContentRef.focus();
      return;
    }
    console.log(content);
    navigate(`/search/${content}`);
  };


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
        opacity: 1,
        zIndex: 1000,
      }}
    >
      <Link to="./">
        <Stack direction="row">
          <img src={vidLogo} height={50} alt="Logo" />
          {isScreenGreaterThanSm && (
            <Typography variant="h4" sx={{ mt: 0.8, ml: 1, color: "red", fontFamily: "fantasy", textShadow: "red 2px 1px 3px" }}>
              ReactTube
            </Typography>
          )}
        </Stack>
      </Link>

      <Paper
        component="form"
        sx={{ width: { xs: "260px", md: "340px" }, height: '40px', borderRadius: 4, opacity: "0.9" }}
      >
        <TextField
          variant="standard"
          placeholder="Search ReactTube"
          sx={{ pl: 1.5, pt: 1, borderRight: 2, width: { xs: "200px", md: "280px" } }}
          inputRef={searchContentRef}
          autoComplete='off'
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
