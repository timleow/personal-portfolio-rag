import React from 'react';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import { Box, Grid, Typography } from '@mui/material';

export default function Resume({ innerRef }) {
    return (
        <Box ref={innerRef} id="resume" sx={{ maxWidth: 800, margin: 'auto', padding: 5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                    <WorkExperience />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Education />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Skills />
                </Grid>
            </Grid>
        </Box>
    );
}
