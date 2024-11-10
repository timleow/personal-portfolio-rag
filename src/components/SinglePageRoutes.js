import Home from "./home/Home";
import Resume from "./resume/Resume";
import React from 'react';
import { Box } from "@mui/material";

export default function SinglePageRoutes({refs}) {
    return (<Box mt={'3rem'}>
        <Home innerRef={refs.refHome}/>
        <Resume innerRef={refs.refResume}/>
    </Box>)
}