import { getImageProps } from 'next/image'

function getBackgroundImage(srcSet = '') {
    const imageSet = srcSet
        .split(', ')
        .map((str) => {
            const [url, dpi] = str.split(' ')
            return `url("${url}") ${dpi}`
        })
        .join(', ')
    return `image-set(${imageSet})`
}

export default function Home() {
    const {
        props: { srcSet },
    } = getImageProps({ alt: '', width: 128, height: 128, src: '/assets/images/img-1.jpg' })
    const backgroundImage = getBackgroundImage(srcSet)
    const style: React.CSSProperties = { height: '100vh', width: '100vw', backgroundImage, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }

    return (
        <main style={style}>
            <h1>Hello World</h1>
        </main>
    )
}