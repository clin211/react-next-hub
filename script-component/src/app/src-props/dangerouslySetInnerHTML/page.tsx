import Script from 'next/script'

export default function page() {
    return (
        <section>
            <h1>src Props dangerouslySetInnerHTML</h1>
            <p id='now'>now: </p>
            <Script id="dangerouslySetInnerHTML" dangerouslySetInnerHTML={{
                __html: `
                  setInterval(() => {
                      const now = new Date();
                      document.getElementById('now').textContent = "now: "+now;
                  }, 1000);
              `
            }} />
        </section>
    )
}
