import {Fragment} from 'react';
import { Typography } from '@mui/material';

export default function LoginHeader(){
    return (
        <Fragment>
            <Typography
                component="h2"
                variant="h4"
                align="center"
                gutterBottom
            >
                Sign in to
            </Typography>
            <Typography
                component="div"
                align="center"
                variant="h3"
                gutterBottom
            >
                Logo
            </Typography>
            <Typography
                component="p"
                variant="h6"
                align="center"
                maxWidth="80%"
                margin="auto"
            >
                Log in to better your shopping experience. We won't post anything anywhere.
            </Typography>
        </Fragment>
    )
}