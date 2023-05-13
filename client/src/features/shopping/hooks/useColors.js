import {useState} from 'react';

export default function useColors(colors){
    // Main image
    const defaultColor = colors.filter(({mainImage}) => mainImage)[0];

    // Selected color
    const [selectedColor, setSelectedColor] = useState(defaultColor.colorName);

    // Handle selected color on click
    const handleColorClick = event => setSelectedColor(event.target.getAttribute('value'));

    return {selectedColor, handleColorClick}
}