import {Box, Button} from '@mui/material';
import {styled} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filter from './FilterDropdown';
import {filters} from '../../../data/constants/productConstants';

const Container = styled(Box)(({theme}) => ({
    display:"flex",
    alignItems:"center",
    gap:"0.5em",
    padding: theme.spacing(1, 0)
}));

export default function Filters(){
    return (
        <Container justifyContent="space-between" style={{width:"100%", overflowX:"auto"}}>
            <Container>
                {filters.map(filter => <Filter {...filter} />)}
                <Button
                    id="all-filters-btn"
                    color="inherit"
                    disableRipple
                    size="medium"
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