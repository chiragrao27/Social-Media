import React from 'react'
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import {
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import Form from "./Form";

import {
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { setMode } from 'state';


const LoginPage = () => {

  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dark = theme.palette.neutral.dark;

  return <Box>

    <Box width="100%" backgroundColor ={theme.palette.background.alt}
    p="1rem 6%" textAlign="center">
    
    <Box >
    <Typography
      fontWeight="bold"
      fontSize = "35px"
      color="primary"
      >
        Socials
        </Typography>
        <Box>
        <IconButton  onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{  fontSize : "25px", }} />
        ):(
        <LightMode sx={{ color : dark, fontSize : "25px" }}/>
        )}
      </IconButton>
      </Box>
      

      
      
      </Box>
      </Box>
      <Box 
        width={isNonMobileScreens ? "50% " : "93%"}
        p= "2rem"
        m = "2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        >
          <Typography
          fontWeight="500"
          variant="h5"
          sx = {{ mb : "1.5rem"}}
          textAlign="center">
            Welcome to Socials
            
          </Typography>
          
          <Typography 
          fontWeight="400"
          fontSize="15px"
          sx={{mb:"1.5rem"}}
          textAlign="center"
          color="primary">
            Enter the world of social
          </Typography>

          <Form/>
          
      </Box>
  </Box>
}

export default LoginPage;
