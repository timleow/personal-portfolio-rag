import React from 'react';
import {Box} from "@mui/material";

export default function SinglePageToggler({singlePage, handleSinglePage}) {
    const transition = 'all 250ms ease'

   return (
      <Box fontSize={'1.5rem'} sx={{cursor: 'pointer', ":hover": {transform: 'translateY(-3px)', transition: transition}}}>
         {
            singlePage ?
               <span onClick={handleSinglePage} aria-label="Multi-Page" role="img">📖</span>
               :
               <span onClick={handleSinglePage} aria-label="Single-Page" role="img">📃</span>
         }
      </Box>
   )
}