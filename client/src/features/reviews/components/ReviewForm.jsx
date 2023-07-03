import {Box, Button, Rating, TextField, Typography} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { REVIEW_MAIN_COLOR } from "../../../utils/constants/review";

export default function ReviewForm(){
    return (
        <Box
            sx={{
                display:"none",
                transition:"display ease-in 1s"
            }}
        >
            <Typography
                variant="h2"
                fontSize="1.5em"
                fontWeight="600"
                marginBottom="0.5em"
            >
                Write a review
            </Typography>
            <Box
                display="grid"
                gap="0.5em"
            >
                <Box
                    display="grid"
                    gap="0.25em"
                >
                    <Box
                        fontWeight="600"
                        variant="label"
                    >
                        Rating
                    </Box>
                    <Rating
                        defaultValue={0}
                        size="large"

                    />
                </Box>
                <Button
                    disableRipple
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    fullWidth
                    sx={{
                        color:"black",
                        border:"1px solid black",
                        '&.MuiButton-root:hover':{
                            bgcolor: 'transparent',
                            border:"1px solid black"
                        }
                    }}
                >
                    Add Media
                    <input type="file" hidden />
                </Button>
                <Box
                    display="grid"
                    gap="0.25em"
                >
                    <Box
                        variant="label"
                        fontWeight="600"
                    >
                        Feedback
                    </Box>
                    <TextField
                        id="review-feedback"
                        fullWidth
                        multiline={true}
                        InputLabelProps={{shrink:false}}
                    />
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    gap="0.25em"
                >
                    <Button
                        disableRipple
                        variant="contained"
                        sx={{
                            background:REVIEW_MAIN_COLOR,
                            ':hover':{background:REVIEW_MAIN_COLOR},
                            maxWidth:"max-content"
                        }}
                    >
                        Submit Review
                    </Button>
                    <Button
                        disableRipple
                        variant="outlined"
                        sx={{
                            color:REVIEW_MAIN_COLOR,
                            maxWidth:"max-width",
                            ':hover':{
                                border:`1px solid ${REVIEW_MAIN_COLOR}`,
                                background:"transparent"
                            },
                            border:`1px solid ${REVIEW_MAIN_COLOR}`
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}