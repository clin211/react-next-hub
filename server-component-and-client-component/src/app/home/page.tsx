import React from 'react'
import ClientComponentExample from '@/components/client-components/example'
import ServerComponentExample from '@/components/server-components/example'

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>This is the home page.</p>
            <ClientComponentExample>
                <ServerComponentExample />
            </ClientComponentExample>
        </div>
    )
}

export default HomePage