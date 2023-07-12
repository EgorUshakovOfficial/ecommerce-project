import {Fragment} from 'react';
import {Backdrop, Box, Button, Fade, IconButton, Modal, Typography} from '@mui/material';
import { Close } from '@mui/icons-material';
import useReviewModal from '../hooks/useReviewModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border:"1px solid lightgray",
    borderRadius:"0.5em",
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ReviewCautionModal({id}){
    const {
      openReviewModal,
      closeReviewModalOnClick,
      deleteReviewOnClick,
      openReviewModalOnClick
    } = useReviewModal(id);

    return (
      <Fragment>
        <IconButton
          disableRipple
          onClick={openReviewModalOnClick}
          sx={{
              position:"absolute",
              top:0,
              left:"88%",
              "&:hover":{background:"transparent"},
          }}
        >
          <Close />
        </IconButton>
        <Modal
          open={openReviewModal}
          onClose={closeReviewModalOnClick}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openReviewModal}>
            <Box sx={style}>
              <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
              >
                  <Typography id="review-modal-title" variant="h6" component="h2">
                      Delete Review?
                  </Typography>
                  <IconButton
                      disableRipple
                      onClick={closeReviewModalOnClick}
                  >
                      <Close />
                  </IconButton>
              </Box>
              <Typography id="review-modal-description" sx={{ marginTop: "1em", marginBottom:"0.5em"}}>
                Are you sure you want to delete this review?
              </Typography>
              <Box
                  display="flex"
                  justifyContent="flex-end"
                  gap="0.5em"
              >
                  <Button
                      disableRipple
                      disableElevation
                      onClick={closeReviewModalOnClick}
                      sx={{fontWeight:600,}}
                  >
                      Cancel
                  </Button>
                  <Button
                      disableRipple
                      disableElevation
                      onClick={deleteReviewOnClick}
                      variant="contained"
                      sx={{"&:hover": {
                          bgcolor: "#1976D2"
                        }}}
                  >
                      Delete
                  </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Fragment>
    );
}