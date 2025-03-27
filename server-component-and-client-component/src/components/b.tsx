import React from 'react'
import { getPost } from '@/service/post'

async function BBB() {
    const post = await getPost();
    console.log('🚀 ~ BBB ~ post:', post)

    return (
        <div>BBB</div>
    )
}

export default BBB