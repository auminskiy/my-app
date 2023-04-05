import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
      primary: { 
        main: '#165788',
        contrastText: '#fff',
      },
      secondary: { 
        main: '#004e32',
        contrastText: '#fff',
      },
      salat: { 
        main: '#69BE28',
        contrastText: '#fff',
      }, 
      greenPrimary: {
          backgroundColor: '#027b5b',
          color: '#fff',
      },
      greenPrimaryLight: { 
          backgroundColor: '#48ab88',
          color: '#fff',
      },
      greenPrimaryDark: { 
          backgroundColor: '#004e32', 
          color: '#EBD402',
      },
      blackSecondary: {
          backgroundColor: '#252525',
          color: '#c9c9c9',
      },
      blackSL: { 
          backgroundColor: '#4d4d4d',
          color: '#c9c9c9',
      },
      blackSecondaryDark: { 
          backgroundColor: '#252525', 
          color: '#c9c9c9',
          backgroundColorSecondary: '#252524',
      },
      greyPrimary:{
        backgroundColor: '#999999', 
        color: '#252525',
      },
      yellow: {
        backgroundColor: '#EBD402',
        color: '#fff',
      },
      components: {
        MuiListItemButton: {
          defaultProps: {
            selected: true
          },
          styleOverrides: {
            root: {
              "&$selected": {
                backgroundColor: "red",
                "&:hover": {
                  backgroundColor: "orange",
                },
              },
            },
           
          }
        }
      }
     
  },
});





ReactDOM.createRoot(
  document.getElementById("root"),
)
.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme} >
    <App />
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


