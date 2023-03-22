import airpods from '../assets/images/airpods.jpg';
import drDreBeats from '../assets/images/dr-dre-beats.jpg';
import earphones from '../assets/images/earphones.jpg';
import headphones from '../assets/images/headphone.jpg';
import skullCandy from '../assets/images/skull-candy.jpg';

export const cartItems = [
    {
        id:"1",
        name: "Headphones",
        description:"Some cool headphones",
        color:"Red",
        quantity:12,
        image:headphones,
        otherImages:[headphones, headphones,headphones,headphones],
        reviews:{avgRating:4, numReviews:121},
        cost: 49.99,
    },
    {
        id:"2",
        name: "Airpods",
        description:"Some cool airpods",
        color:"White",
        quantity:4,
        image:airpods,
        otherImages:[airpods, airpods, airpods, airpods],
        reviews:{avgRating:4, numReviews:121},
        cost: 119.99
    },
    {
        id:"3",
        name: "Skull Candy Airpods",
        description:"High quality airpods",
        color:"Black",
        quantity:4,
        image:skullCandy,
        otherImages:[skullCandy, skullCandy, skullCandy, skullCandy],
        reviews:{avgRating:4, numReviews:121},
        cost: 129.99
    },
    {
        id:"4",
        name: "Dr Dre Headphones",
        description:"High quality headphones",
        color:"Black",
        quantity:3,
        image:drDreBeats,
        otherImages:[drDreBeats, drDreBeats, drDreBeats, drDreBeats],
        reviews:{avgRating:4, numReviews:121},
        cost: 119.99
    },
    {
        id:"5",
        name: "Earphones",
        description:"Basic earphones",
        color:"Black",
        image:earphones,
        quantity:8,
        otherImages:[earphones, earphones, earphones, earphones],
        reviews:{avgRating:4, numReviews:121},
        cost: 9.99
    }
]