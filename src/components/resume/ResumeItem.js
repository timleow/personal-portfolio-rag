import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import Style from './Resume.module.scss';

export default function ResumeItem({ item }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <Box
            onClick={toggleExpanded}
            className={classNames(Style.resumeItem, 'animate__animated', 'animate__fadeInUp')}
            p={2}
            m={1}
            boxShadow={3}
            borderRadius={2}
            bgcolor={'background.paper'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            textAlign={'center'}
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s, max-height 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
            }}
        >
            <Typography variant="h6">{item.title}</Typography>
            <Box
                className={Style.content}
                sx={{
                    maxHeight: expanded ? '500px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease',
                    mt: 2,
                }}
            >
                <Typography variant="body1">{item.content}</Typography>
            </Box>
        </Box>
    );
}
