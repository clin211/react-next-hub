'use client'

import React from 'react'

export default function Client() {
    console.log('NEXT_PUBLIC_ANALYTICS_ID: ', process.env.NEXT_PUBLIC_ANALYTICS_ID);
    return (
        <div>this is Client Component</div>
    )
}
