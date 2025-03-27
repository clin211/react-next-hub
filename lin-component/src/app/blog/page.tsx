import Image from 'next/image';
import Link from 'next/link';
import React from "react";

// 博客数据
const data = [
    {
        id: 1,
        title: "Composable Caching with Next.js",
        excerpt: "",
        description: `We’re working on a simple and powerful caching model for Next.js. In a previous post, we talked about our journey with caching and how we’ve arrived at the 'use cache' directive.`,
    },
    {
        id: 2,
        title: 'Next.js 15.1',
        excerpt: '',
        description: `Next.js 15.1 introduces core upgrades, new APIs, and improvements to the developer experience including: 1. React 19 (stable). 2.Improved Error Debugging. 3.after (stable). 4.forbidden / unauthorized (experimental)`
    },
    {
        id: 3,
        title: 'Our Journey with Caching',
        excerpt: '',
        description: `Frontend performance can be hard to get right. Even in highly optimized apps, the most common culprit by far is client-server waterfalls. When introducing Next.js App Router, we knew we wanted to solve this issue. To do that, we needed to move client-server REST fetches to the server using React Server Components in a single roundtrip. This meant the server had to sometimes be dynamic, sacrificing the great initial loading performance of Jamstack. We built partial prerendering to solve this tradeoff and have the best of both worlds.`
    }
];
export default function page() {
    return <div>
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((post) => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <Image src={`/assets/${post.id}.png`} width={200} height={200} alt={post.title} className="w-full h-56 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <Link href={`/blog/${post.id}?title=${post.title}`} className="text-blue-500 hover:text-blue-700 font-medium">
                                Read more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>;
}
