import {useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useAddReviewMutation } from '../../../services/reviewsApi';

export default function useReviewForm(){
    // User
    const user = useSelector(state => state.user.data);

    // Add review mutation function
    const [addReview] = useAddReviewMutation();

    // Product ID
    const {productId} = useParams();

    // Rating
    const [rating, setRating] = useState(-1);

    // Rating helper text
    const [ratingHelperText, setRatingHelperText] = useState('');

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
    const handleRatingOnChange = (event, newValue) => {
        setRating(newValue);
        setRatingHelperText('');
    }

    // Handles any feedback on change
    const handleFeedbackOnChange = event => setFeedback(event.target.value);

    // Handles review form submission
    const handleReviewFormOnSubmit = event => {
        // Prevent form from being submitted to the server
        event.preventDefault();

        // Validate rating has been selected
        if (rating === -1){
            setRatingHelperText('Please give us your rating');
            return;
        }

        // Checks if the file content has been selected
        if (fileContent === null) return;

        // Initialize new form data
        const formData = new FormData();

        // Append image, rating, feedback, user and product to the form
        formData.append('image', fileContent);
        formData.append('rating', rating);
        formData.append('feedback', feedback);
        formData.append('user', user.id);
        formData.append('product', productId);

        // Sends POST /api/products/:productId/reviews
        // Creates new review in the database
        addReview(formData)
        .then(response => response.data)
        .then(() => {
            setRating(-1);
            setFileContent(null);
            setPreviewImage(null);
            setFeedback('');

        })
    }

    return {
        rating,
        ratingHelperText,
        fileContent,
        feedback,
        previewImage,
        hiddenInputRef,
        closePreviewImageOnClick,
        handleFileUpload,
        handleReviewFormOnSubmit,
        handleRatingOnChange,
        handleFeedbackOnChange
    }
}