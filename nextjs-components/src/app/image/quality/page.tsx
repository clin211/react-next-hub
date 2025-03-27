import Image from "next/image";

export default function page() {
    return (
        <div>
            <Image
                priority
                width={500}
                height={500}
                quality={75}
                src="https://images.unsplash.com/photo-1733860532456-3e83dd0b1174"
                alt="Pars Sahin"
            />
        </div>
    );
}

