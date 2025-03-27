'use client'

import {useState} from "react";

export default async function Page(props){
    // const {message} = await getData();
    const [error, setError] = useState(false)
    const handleGetError = () => {
        setError(true)
    }
    return <>
        {/*<h1>Hello Dashboard! {message}</h1>*/}
        {error ? Error() : <button onClick={handleGetError}>Get Error</button>}
    </>
}


async function getData(){
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return {
        message: 'Hello, Dashboard!'
    }
}
