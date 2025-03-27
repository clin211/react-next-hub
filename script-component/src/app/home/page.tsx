import Script from 'next/script';

export default function Home() {
    return (
        <>
            <h1>Welcome to My Site</h1>
            <Script src="https://example.com/script.js" />
        </>
    );
}