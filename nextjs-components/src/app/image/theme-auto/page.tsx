import { getImageProps } from 'next/image'

export default function Page() {
    const common = { alt: 'Theme Example', width: 800, height: 400 }
    const {
        props: { srcSet: dark },
    } = getImageProps({ ...common, src: '/dark.png' })
    const {
        props: { srcSet: light, ...rest },
    } = getImageProps({ ...common, src: '/light.png' })

    return (
        <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={dark} />
            <source media="(prefers-color-scheme: light)" srcSet={light} />
            <img  {...rest} alt={rest.alt || ''} />
        </picture>
    )
}