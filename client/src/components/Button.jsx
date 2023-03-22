import {Button as MuiButton} from '@mui/material';
import {Link as ReactRouterLink} from 'react-router-dom';

export default function Button(props){
    return <MuiButton
        {...props}
        component={ReactRouterLink}
        to={props.href}
    />
}