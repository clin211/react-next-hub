'use client'

import Image, { ImageLoaderProps } from 'next/image'

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    return `https://images.pexels.com/photos/1152853/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
    return (
        <Image
            loader={imageLoader}
            src="pexels-photo-115285311.jpeg" // 有效地址 pexels-photo-1152853.jpeg
            alt="Picture of the author"
            width={1260}
            height={750}
            className='w-36'
            priority
            onError={e => console.log('on error event:', e)}
        />
    )
}

