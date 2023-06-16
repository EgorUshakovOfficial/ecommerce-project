import {useState, useEffect} from 'react';

export default function useIsMount(){
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {setDidMount(true)})

    return didMount;

}