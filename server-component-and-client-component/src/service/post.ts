import { notFound } from 'next/navigation'

export interface Post {
    id: string
    title: string
    content: string
}

export async function getPost() {
    const res = await fetch(`https://api.vercel.app/blog/1`, {
        cache: 'force-cache',
    })
    const post: Post = await res.json()
    if (!post) notFound()
    return post
}

