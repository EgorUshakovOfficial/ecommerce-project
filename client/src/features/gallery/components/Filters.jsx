import {Box, Button, useMediaQuery, useTheme} from '@mui/material';
import {styled} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from './FilterDropdown';
import {filters} from '../../../utils/constants';

const Container = styled(Box)(({theme}) => ({
    display:"flex",
    alignItems:"center",
    gap:"0.5em",
    padding: theme.spacing(1, 0),
}));

export default function Filters(){
    // Theme
    const theme = useTheme();

    // Match width screen size of at least 600px
    const matchDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Container
            justifyContent="space-between"
            style={{
                width: matchDesktop ? '100%' : "90%",
                marginInline: matchDesktop ? "none" : "auto",
                overflowX:"auto"
            }}
        >
            <Container>
                {filters.map(filter => <Filter {...filter} />)}
                <Button
                    id="all-filters-btn"
                    color="inherit"
                    disableRipple
                    size="medium"
                    style={{textTransform:"none", fontSize:"1em"}}
                    onClick={() => {}}
                    endIcon={<FilterListIcon />}
                >
                    All Filters
                </Button>
            </Container>
            <Filter typeFilter="Sort by" typeFilterOptions={["Lowest", "Highest"]} />
        </Container>
    )
}