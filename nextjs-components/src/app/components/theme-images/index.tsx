import styles from './theme-image.module.css'
import Image, { ImageProps } from 'next/image'

type Props = Omit<ImageProps, 'src' | 'priority' | 'loading'> & {
    srcLight: string
    srcDark: string
}

export default function ThemeImage(props: Props) {
    const { srcLight, srcDark, ...rest } = props

    return (
        <>
            <Image {...rest} src={srcLight} className={styles.imgLight} alt={rest.alt || ''} />
            <Image {...rest} src={srcDark} className={styles.imgDark} alt={rest.alt || ''} />
        </>
    )
}