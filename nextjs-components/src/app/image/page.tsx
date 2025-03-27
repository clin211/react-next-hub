import Image from "next/image";
import img from "./img.jpg"

export default function page() {
    return (
        <div>
            <Image
                src={img}
                alt="Picture of the author"
                sizes="(max-width: 600px) 160px, 320px"
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
            />
        </div>
    );
}
