import { format, parseISO } from 'date-fns';
import { allBlogs } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

const PostLayout = ({ params }: { params: { slug: string } }) => {
    console.log('params', params);
    const post = allBlogs.find(post => post._raw.flattenedPath === params.slug);
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
    const Component = useMDXComponent(post.body.code);
    return (
        <article className="mx-auto max-w-xxl py-8">
            <div className="mb-8 text-center">
                <time
                    dateTime={post.date}
                    className="mb-1 text-xs text-gray-600">
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>
            <div className="[&>*]:mb-3 [&>*:last-child]:mb-0 prose prose-stone">
                <Component />
            </div>
        </article>
    );
};

export default PostLayout;
