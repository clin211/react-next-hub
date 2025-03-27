import type { GetStaticPaths } from 'next'

interface Post {
    id: string
    title: string
    content: string
}

interface Props {
    post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch('https://api.vercel.app/blog');
    const posts = await res.json();
    const paths = posts.map((post: Post) => ({
        params: { id: String(post.id) },
    }))

    // { fallback: 'blocking' } 将在路径不存在时按需服务器渲染页面。
    return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
    const res = await fetch(`https://api.vercel.app/blog/${params.id}`);
    const post: Post = await res.json();

    return {
        props: { post },
        // Next.js 将在请求到来时使缓存失效，
        // 最多每 60 秒请求一次。
        revalidate: 60,
    }
}

export default function Page({ post }: Props) {
    return (
        <main>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </main>
    )
}