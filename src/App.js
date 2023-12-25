import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RootLayout, Home } from './pages';

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
      children: [
        { index: true, element: <Home /> },
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
