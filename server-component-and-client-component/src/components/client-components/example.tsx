'use client';
import React from 'react'

function ClientComponentExample({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <h2>Client Component Example</h2>
            {children}
        </div>
    )
}

export default ClientComponentExample