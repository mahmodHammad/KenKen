import React, {useEffect,useState } from "react";
import { createTheme ,ThemeProvider,responsiveFontSizes} from '@mui/material/styles';
import { green,orange } from '@mui/material/colors';
import Game from "./Game"

let theme = createTheme({
 
  components: {
    // Name of the component
   
    MuiButton: {
     
      defaultProps: {
        // The props to change the default for.
        // disableRipple: true, // No more ripple, on the whole application 💣!
      },
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // minWidth:"200px",
          // borderRadius:"1px",
          // boxShadow: "none"
          // fontSize: '1rem',  
        },
      },
    },
  },
  palette: { 
    spacing: 4,
    primary: {
      main: "#E98300",
      contrastText: '#fff',
    },
    secondary: {
      main: "#2E4957" ,
      contrastText: '#fff',

    },
    neutral: {
      main: '#04748B',
      dark: orange[100],
      light: orange["A700"],
      contrastText: '#fff',
    },
  }, 
});

theme = responsiveFontSizes(theme);
export default function App() { 
 
  useEffect(() => {
    
  }, []);

  return (
    <ThemeProvider theme={theme}>
 
        <Game/>
         
      </ThemeProvider>
  );
}

// theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2.4rem',
//   },
// };