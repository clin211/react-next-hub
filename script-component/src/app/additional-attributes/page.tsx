import Script from 'next/script'

export default function Page() {
    return (
        <>
            <Script
                src="https://example.com/script.js"
                id="example-script"
                nonce="XUENAJFW"
                data-test="script"
            />
        </>
    )
}