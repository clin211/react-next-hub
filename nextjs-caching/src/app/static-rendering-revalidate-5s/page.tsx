import React from 'react'

export default async function page() {
    const port = process.env.PORT;
    const res = await fetch(`http://localhost:${port}/api/time`, { next: { revalidate: 5 } })
    const data = await res.json()
    return (
        <div>
            <p> 本次渲染时的时间:{new Date().toString()} </p>
            <p> 服务端获取的数据:{JSON.stringify(data)}</p>
        </div>
    )
}
