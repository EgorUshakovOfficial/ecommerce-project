import {useState} from 'react';

export default function useReviewForm(){
    // Filename
    const [filename, setFilename] = useState('');

    // Handles file upload on change
    const handleFileUpload = event => {
        // If no file is uploaded, do nothing
        // if (!event.target.files) return;


        // const file = event.target.files[0];

        // const {name} = file;

        // setFilename(name);
    }
}