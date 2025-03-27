import React from 'react'
import { RevalidatePathButton } from './revalidate-path-button'
import { RevalidateTagButton } from './revalidate-tag-button'

const port = process.env.PORT;
export default async function page() {
    const dataA: string = await fetch(`http://localhost:${port}/api/time?a`, {
        cache: "force-cache",
        next: {
            tags: ["a"],
        },
    })
        .then((res) => res.json())
        .then((res) => res);

    const dataB: string = await fetch(`http://localhost:${port}/api/time?b`, {
        cache: "force-cache",
        next: {
            tags: ["b"],
        },
    })
        .then((res) => res.json())
        .then((res) => res);

    return (
        <div className="flex justify-center">
            <div className="p-8 space-y-4">
                <h1 className="text-4xl font-semibold text-center">按需重新验证</h1>
                <div className="flex flex-col">
                    <RevalidatePathButton label="基于路径 Revalidate" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-[family-name:var(--font-geist-mono)]">
                        基于标签 Revalidate A：
                        <code className="bg-black/[.05] px-1 py-0.5 rounded font-semibold">
                            {JSON.stringify(dataA)}
                        </code>
                    </p>
                    <RevalidateTagButton tag="a" label="基于标签 Revalidate A" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-[family-name:var(--font-geist-mono)]">
                        基于标签 Revalidate B：
                        <code className="bg-black/[.05] px-1 py-0.5 rounded font-semibold">
                            {JSON.stringify(dataB)}
                        </code>
                    </p>
                    <RevalidateTagButton tag="b" label="基于标签 Revalidate B" />
                </div>
            </div>
        </div>
    )
}


