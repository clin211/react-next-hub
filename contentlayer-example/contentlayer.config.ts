import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { readFileSync } from 'fs';

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: '**/*.mdx',
    contentType: 'mdx',
    // 定义入口字段
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'string',
            required: true,
        },
        summary: {
            type: 'string',
            required: true,
        },
        publishedAt: {
            type: 'string',
            required: true,
        },
    },
    // 定义额外出参
    computedFields: {
        slug: {
            type: 'string',
            resolve: doc => doc._raw.flattenedPath,
        },
        readingTime: {
            type: 'nested',
            resolve: doc => readingTime(doc.body.code),
        },
    },
}));

export default makeSource({
    contentDirPath: 'posts',
    documentTypes: [Blog],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                // @ts-ignore
                rehypePrettyCode,
                {
                    // 代码主题类型 https://unpkg.com/browse/shiki@0.14.2/themes/
                    theme: 'material-theme-darker', //'dracula', // 'dark-plus',
                    // To apply a custom background instead of inheriting the background from the theme
                    keepBackground: false,
                },
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        // 锚点类名
                        className: ['anchor'],
                    },
                },
            ],
        ],
    },
});
