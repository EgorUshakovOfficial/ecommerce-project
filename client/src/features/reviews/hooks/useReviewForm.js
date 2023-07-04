import {useState, useRef} from 'react';

export default function useReviewForm(){
    // Rating
    const [rating, setRating] = useState(-1);

    // File content
    const [fileContent, setFileContent] = useState(null);

    // Preview URL
    const [previewImage, setPreviewImage] = useState(null);

    // Feedback
    const [feedback, setFeedback] = useState('');

    // Input reference
    const hiddenInputRef = useRef('');

    // Closes preview image
    const closePreviewImageOnClick = () => {
        // Sets preview image to null
        setPreviewImage(null);

        // Sets file content to null
        setFileContent(null);

        // Clears value attribute of the hidden input
        hiddenInputRef.current.value="";
    };

    // Handles file upload on change
    const handleFileUpload = event => {
        // Intialize files
        const files = event.target.files;

        // If no files selected, do nothing
        if (!files) return;

        // Get the first selected file
        const file = files[0];

        if (file){
            // Set the file content state variable
            setFileContent(file);

            // Sets preview image
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Handles rating on change with the new value provided
    const handleRatingOnChange = (event, newValue) => setRating(newValue);

    // Handles any feedback on change
    const handleFeedbackOnChange = event => setFeedback(event.target.value);

    return {
        rating,
        fileContent,
        feedback,
        previewImage,
        hiddenInputRef,
        closePreviewImageOnClick,
        handleFileUpload,
        handleRatingOnChange,
        handleFeedbackOnChange
    }
}