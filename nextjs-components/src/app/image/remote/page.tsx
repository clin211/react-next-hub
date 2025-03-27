import Image from "next/image";

export default function page() {
    return (
        <div>
            <Image
                width={200}
                height={200}
                src="https://images.unsplash.com/photo-1733860532456-3e83dd0b1174"
                alt="Pars Sahin"
            />
        </div>
    );
}

