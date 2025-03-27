'use client'

import Script from 'next/script'

export default function Page() {
    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.20/lodash.min.js"
                onLoad={() => {
                    console.log("lodash loaded:", _.sample([1, 2, 3, 4]))
                }}
            />
        </>
    )
}