import React, { useState } from 'react';
import { Box, Grid, Typography, Avatar, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { resumeData } from './data.js';
import Style from './Resume.module.scss';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    transform: !expand ? 'rotate(0deg)' : 'rotate(90deg)',
}));

export default function Education() {
    const [expandedItems, setExpandedItems] = useState(
        resumeData.education.map(() => false)
    );
    const [imagesLoaded, setImagesLoaded] = useState(
        resumeData.education.map(() => false)
    );

    const handleExpandClick = (index) => {
        setExpandedItems((prev) => {
            const newExpandedItems = [...prev];
            newExpandedItems[index] = !newExpandedItems[index];
            return newExpandedItems;
        });
    };

    return (
        <Box display={'flex'}>
            <Grid display={'flex'} container direction="column" spacing={2}>
                
                <Typography fontWeight={'bold'}  variant="h6" gutterBottom>Education</Typography>
                <hr />
                
                {resumeData.education.map((item, index) => (
                    <Grid id={index} className={Style.experience} item key={index} onClick={() => handleExpandClick(index)}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar
                                    src={item.logoUrl}
                                    alt={item.altText}
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        opacity: imagesLoaded[index] ? 1 : 0,
                                        transition: 'opacity 0.5s ease-in-out'
                                    }}
                                    imgProps={{
                                        onLoad: () => {
                                            setImagesLoaded(prev => {
                                                const newImagesLoaded = [...prev];
                                                newImagesLoaded[index] = true;
                                                return newImagesLoaded;
                                            });
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="subtitle1" component="div" fontWeight="bold">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2">
                                    {item.subtitle}
                                </Typography>
                                <Typography variant="body2" fontStyle="italic">
                                    {item.period}
                                </Typography>
                            </Grid>
                            <Grid item alignItems="center">
                                <ExpandMore
                                    expand={expandedItems[index]}
                                    aria-expanded={expandedItems[index]}
                                    aria-label="show more"
                                    alignItems="center"
                                > 
                                    <i className={'fa fa-angle-right'} />
                                 </ExpandMore>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Collapse in={expandedItems[index]} timeout="auto">
                                <Box sx={{ opacity: expandedItems[index] ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}>
                                    <Typography variant="body2" component="ul" sx={{ m: 0, pl: 2 }}>
                                        {item.desc.map((bullet, bulletIndex) => (
                                            <li key={bulletIndex}>{bullet}</li>
                                        ))}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
