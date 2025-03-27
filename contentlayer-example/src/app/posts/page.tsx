import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns';
import { allBlogs, Blog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

function PostCard(post: Blog) {
    const Component = useMDXComponent(post.body.code);
    return (
        <div className="mb-8">
            <h2 className="mb-1 text-xl">
                <Link
                    href={`/posts/${post.slug}`}
                    className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
                    {post.title}
                </Link>
            </h2>
            <time
                dateTime={post.date}
                className="mb-2 block text-xs text-gray-600">
                {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
            <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 prose prose-stone">
                <Component />
            </div>
        </div>
    );
}

export default function Home() {
    const posts = allBlogs.sort((a: Blog, b: Blog) =>
        compareDesc(new Date(a.date), new Date(b.date))
    );

    return (
        <div className="mx-auto max-w-5/6 py-8">
            {posts.map((post: Blog, idx: number) => (
                <PostCard key={idx} {...post} />
            ))}
        </div>
    );
}
