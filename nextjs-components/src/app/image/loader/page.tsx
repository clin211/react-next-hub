'use client'

import Image, { ImageLoaderProps } from 'next/image'

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://images.pexels.com/photos/1152853/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
    return (
        <Image
            loader={imageLoader}
            src="pexels-photo-1152853.jpeg"
            alt="Picture of the author"
            width={1260}
            height={750}
            className='w-36'
            priority
            onLoad={e => console.log('on load natural width:', e.currentTarget.naturalWidth)}
        />
    )
}
