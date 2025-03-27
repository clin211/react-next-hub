"use client"
import BlurText from "@/components/BlurText/BlurText";
import Masonry from "@/components/Masonry/Masonry";

const defaultFrom = { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' };

const defaultTo = [
    {
        filter: 'blur(5px)',
        opacity: 0.5,
        transform: 'translate3d(0,5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
];

const data = [
    { id: 1, image: 'https://picsum.photos/id/10/200/300', height: 400 },
    { id: 2, image: 'https://picsum.photos/id/14/200/300', height: 300 },
    { id: 3, image: 'https://picsum.photos/id/15/200/300', height: 300 },
    { id: 4, image: 'https://picsum.photos/id/16/200/300', height: 300 },
    { id: 5, image: 'https://picsum.photos/id/17/200/300', height: 300 },
    { id: 6, image: 'https://picsum.photos/id/19/200/300', height: 300 },
    { id: 7, image: 'https://picsum.photos/id/37/200/300', height: 200 },
    { id: 8, image: 'https://picsum.photos/id/39/200/300', height: 300 },
    { id: 9, image: 'https://picsum.photos/id/85/200/300', height: 200 },
    { id: 10, image: 'https://picsum.photos/id/103/200/300', height: 400 }
];
export default function page() {
    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <section>
            <BlurText
                text="Welcome to my portfolio!"
                delay={150}
                direction="top"
                animateBy="words"
                className="text-2xl mb-8"
                animationTo={defaultTo}
                animationFrom={defaultFrom}
                onAnimationComplete={handleAnimationComplete}
            />
            <Masonry data={data} />
        </section>
    )
}
