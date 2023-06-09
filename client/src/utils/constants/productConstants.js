import {v4 as uuidv4} from 'uuid';

// Filter options
export const filters = [
    {id: uuidv4(), typeFilter:"Headphone Type", typeFilterOptions:['Earphones', 'Headphones', 'Airpods']},
    {id: uuidv4(), typeFilter:"Price", typeFilterOptions:["Lowest", "Highest"]},
    {id: uuidv4(), typeFilter:"Review", typeFilterOptions:[1, 2, 3, 4, 5]},
    {id: uuidv4(), typeFilter:"Color", typeFilterOptions:["Red", "Blue", "Pink", "Green"]},
    {id: uuidv4(), typeFilter:"Material", typeFilterOptions:[]},
    {id: uuidv4(), typeFilter:"Offer", typeFilterOptions:[]}
]
