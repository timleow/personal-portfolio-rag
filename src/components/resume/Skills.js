import React from 'react';
import { Box, Chip, Typography, Grid } from '@mui/material';
import { resumeData } from './data.js';

export default function Skills() {
    return (

        <Box display={'flex'}>
            <Grid display={'flex'} container direction="column" spacing={2}>
                <Typography variant="h6" fontWeight={'bold'} gutterBottom>Skills</Typography>
                <hr />
                <Grid container display={'flex'} marginTop={'auto'} spacing={1}>
                    {resumeData.skills.map((skill, index) => (
                        <Grid item key={index}>
                            <Chip color={'default'} component={'li'} label={skill} variant="outlined"></Chip>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>

    );
}
