import React from 'react'

async function ServerComponentExample() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json()

    return (
        <div>
            <h2>Server Component Example</h2>
            <p>{data.title}</p>
        </div>
    )
}

export default ServerComponentExample