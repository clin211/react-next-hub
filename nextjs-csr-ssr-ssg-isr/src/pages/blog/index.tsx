import Link from 'next/link'

export interface NextJSBlogPost {
    id: number
    title: string
    content: string
    author: string
    date: string
    category: string
}

export default function Blog({ posts }: { posts: NextJSBlogPost[] }) {
    return (
        <main>
            <h1>Blog</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://api.vercel.app/blog')
    const data = await res.json()
    return {
        props: { posts: data },
    }
}