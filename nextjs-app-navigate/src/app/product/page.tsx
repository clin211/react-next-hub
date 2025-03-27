'use client'

import { useSearchParams } from 'next/navigation'

export default function SortProducts() {
    const searchParams = useSearchParams()

    function updateSorting(sortOrder: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', sortOrder)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    return (
        <>
            <button className='px-4 py-2 mx-4 text-cyan-500 border border-dashed border-cyan-300 rounded-full' onClick={() => updateSorting('asc')}>Sort Ascending</button>
            <button className='px-4 py-2 text-purple-500 border border-dashed border-purple-700 rounded-full' onClick={() => updateSorting('desc')}>Sort Descending</button>
        </>
    )
}

