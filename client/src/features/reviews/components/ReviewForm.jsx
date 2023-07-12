import {Box, Button, Rating, TextField, Typography} from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ReviewImage from "./ReviewImage";
import { REVIEW_MAIN_COLOR } from "../../../utils/constants/review";
import useReviewForm from "../hooks/useReviewForm";

export default function ReviewForm({closeReviewFormOnClick}){
    // Review form custom hook
    const reviewFormHook = useReviewForm();

    return (
        <Box
            component="form"
            onSubmit={reviewFormHook.handleReviewFormOnSubmit}
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
                        getLabelText={reviewFormHook.getLabelText}
                        onChangeActive={reviewFormHook.handleRatingLabelChange}
                        size="large"
                        value={reviewFormHook.rating}
                        onChange={reviewFormHook.handleRatingOnChange}
                    />
                    {reviewFormHook.ratingHelperText!=="" && <Typography variant="span" color="red">{reviewFormHook.ratingHelperText}</Typography>}
                </Box>
                {(reviewFormHook.fileContent !== null) &&
                    <ReviewImage
                        closePreviewImageOnClick={reviewFormHook.closePreviewImageOnClick}
                        previewImage={reviewFormHook.previewImage}
                        style={{width:300, height:300}}
                    />
                }
                <Button
                    disableRipple
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    disabled={reviewFormHook.fileContent !== null}
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
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={reviewFormHook.hiddenInputRef}
                        onChange={reviewFormHook.handleFileUpload}
                    />
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
                        rows={4}
                        onChange={reviewFormHook.handleFeedbackOnChange}
                        value={reviewFormHook.feedback}
                        required
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
                        type="submit"
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
                        onClick={closeReviewFormOnClick}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}