import React from 'react'
import { getPost } from '@/service/post'

async function AAA() {
    const post = await getPost();
    console.log('🚀 ~ AAA ~ post:', post)

    return (
        <div>AAA</div>
    )
}

export default AAA