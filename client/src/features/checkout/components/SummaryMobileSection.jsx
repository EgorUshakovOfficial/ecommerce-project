import {Fragment, useState} from 'react';
import {Box, Collapse, IconButton, Typography} from '@mui/material';
import SummarySection from './SummarySection';
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

export default function SummaryMobileSection(props){
    // Expands the summary section
    const [expandSummary, setExpandSummary] = useState(false);

    // Handles summary section on click
    const handleExpandSummaryOnClick = () => setExpandSummary(prevState => !prevState);

    return (
        <Fragment>
            <Box
                display="flex"
                justifyContent="space-evenly"
                border="1px solid lightgray"
                borderRadius="0.5em"
                alignItems="center"
                gap="0.5em"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    gap="0.5em"
                >
                    <Typography>
                        View Order
                    </Typography>
                    <IconButton
                        disableRipple
                        onClick={handleExpandSummaryOnClick}
                        style={{background:"transparent"}}
                    >
                        {(expandSummary===false) ?
                        <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </Box>
                <Typography fontWeight="600">1718.18</Typography>
            </Box>
            <Collapse in={expandSummary} timeout="auto">
                <SummarySection />
            </Collapse>
        </Fragment>
    )

}