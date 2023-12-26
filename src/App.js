import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RootLayout, Home, Channel, Error } from './pages';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3', // Custom primary color
      },
      secondary: {
        main: '#f50057', // Custom secondary color
      },
    },
  });

  let router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement : <Error />,
      children: [
        { index: true, element: <Home /> },
        { path : 'channel/:channelId', element : <Channel />}
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
