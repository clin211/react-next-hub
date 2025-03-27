import React from 'react'
import { PhotoHit, PhotoResponse } from '../types/photo'
import Link from 'next/link'

const page = async () => {
    const result = await fetch(`https://pixabay.com/api/?key=46712723-2e28bf4b50d420ec7fa237d40&per_page=100&lang=zh&orientation=horizontal`)
    if (!result.ok) return <p></p>
    const data = await result.json() as unknown as PhotoResponse
    const list = data.hits;
    return (
        <div>
            <section className='max-w-[1440px] mx-auto'>
                <ul className='grid grid-cols-4 gap-4 p-4'>
                    {list.map((item: PhotoHit) => {
                        return (
                            <li key={item.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                                <Link href={`/photo/${item.id}`} className='block'>
                                    <img
                                        src={item.previewURL}
                                        alt={item.tags}
                                        className='w-full h-48 object-cover'
                                    />
                                    <div className='p-4'>
                                        <p className='text-lg font-semibold'>{item.tags}</p>
                                        <p className='text-gray-600'>{item.user}</p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    )
}

export default page