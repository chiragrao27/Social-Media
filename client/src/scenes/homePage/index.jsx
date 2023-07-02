import Box from "@mui/material/Box"
import React from 'react'
import Navbar from "scenes/navbar/index.jsx"

import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidgets";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {

  const isNonMobilScreens = useMediaQuery ("(min-width:1000px)");
  const { _id , picturePath } = useSelector ((state)=> state.user);

  return (
    <Box>

      <Navbar/>
      <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobilScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >

        <Box flexBasis={isNonMobilScreens ? "26%" : undefined} >
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        <Box
        flexBasis={isNonMobilScreens?  "42%" : undefined }
        mt={isNonMobilScreens ? undefined : "2rem"}

        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />

        </Box>
        {isNonMobilScreens && (<Box flexBasis="26%">
          <AdvertWidget/>

          <Box m="2rem 0"/>
            
          <FriendListWidget userId={_id}/>

          </Box>)}
      </Box>
      
    </Box>
  )
}

export default HomePage;
