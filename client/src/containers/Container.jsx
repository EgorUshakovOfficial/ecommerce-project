import {Box, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material/styles';

const StyledBox = styled(Box)({
    margin:"auto",
    minHeight:"100vh"
});

export default function Container(props){
    // Children
    const {children} = props;

    // Theme
    const theme = useTheme();

    // Matches screen sizes of width up to and including 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <StyledBox width={matchDesktop ? '80%' : '100%'}>
            {children}
        </StyledBox>
    )
}