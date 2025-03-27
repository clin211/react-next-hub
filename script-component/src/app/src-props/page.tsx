import Script from 'next/script';

export default function page() {
    return (
        <section>
            <h1>src Props</h1>
            <p id='now'>now: </p>
            <Script id='src-props-time-now'>
                {`
                    setInterval(() => {
                        const now = new Date();
                        document.getElementById('now').textContent = "now: "+now;
                    }, 1000);
                `}
            </Script>
        </section>
    )
}
