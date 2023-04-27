import {Button} from '@mui/material';

export default function Connect({icon, strategyName}){
    return (
        <Button
            color="inherit"
            disableRipple
            size="large"
            startIcon={icon}
            sx={{
                textTransform:"none",
                display:"grid",
                gridTemplateColumns:"max-content 1fr",
                justifyContent:"center",
                fontWeight:"600",
                fontSize:"1.125em",
                borderRadius:"0.25em",
                border:"1px solid lightgray"
            }}
            onClick={() => {}}
        >
            {strategyName}
        </Button>
    )
}