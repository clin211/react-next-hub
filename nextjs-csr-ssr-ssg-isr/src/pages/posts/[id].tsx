interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts: Post[] = await res.json()

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }))

    // fallback: false 意味着当访问其他路由的时候返回 404
    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    // 如果路由地址为 /posts/1, params.id 为 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post: Post = await res.json()

    return {
        props: { post },
        revalidate: 10, // 每 10 秒请求一次
    }
}

export default function Post({ post }: { post: Post }) {
    return <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </div>
}