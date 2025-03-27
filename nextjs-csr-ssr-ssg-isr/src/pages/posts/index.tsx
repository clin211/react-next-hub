import Link from 'next/link';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default function Blog({ posts }: { posts: Post[] }) {
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return {
        props: {
            posts,
        },
    }
}