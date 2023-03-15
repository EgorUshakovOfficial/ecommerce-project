import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(){
    return (
        <Box variant="div">
            <input
                placeholder="Search Product"
                type="text"
                onClick={() => {}}
            />
            <Box variant="div">
                <SearchIcon />
            </Box>
        </Box>
    )
}