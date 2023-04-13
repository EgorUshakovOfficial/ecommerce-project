import { CircularProgress } from "@mui/material";

export default function Loading(){
    return (
        <div
            style={{
                position:"absolute",
                top:"50%",
                left:"48%"
            }}
        >
            <CircularProgress sx={{circle:{color:"black"}}} />
        </div>
    )
}