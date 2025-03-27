import Image from "next/image";

import img from "../img.jpg"

export default function page() {
    return (
        <main className='flex flex-wrap gap-4'>
            {/* 正常显示 */}
            <section>
                <div className='w-[200px] h-[200px] relative bg-gray-400'>
                    <Image src={img} alt="Picture of the author" />
                </div>
            </section>

            {/* 添加 fill属性后，自适应容器导致图片变形 */}
            <section>
                <div className='w-[200px] h-[200px] relative bg-gray-400'>
                    <Image fill src={img} alt="Picture of the author" />
                </div>
            </section>

            {/* 添加 fill属性后，自适应容器导致图片变形， 使用 CSS object-fit 的 contain 属性，图片在保持其宽高比的同时填充元素的整个内容框 */}
            <section>
                <div className='w-[200px] h-[200px] relative bg-gray-400'>
                    <Image fill src={img} alt="Picture of the author" className='object-contain' />
                </div>
            </section>

            {/* 添加 fill属性后，自适应容器导致图片变形， 使用 CSS object-fit 的 cover 属性，图片在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框超出，该对象将被剪裁以适应内容框 */}
            <section>
                <div className='w-[200px] h-[200px] relative bg-gray-400'>
                    <Image fill src={img} alt="Picture of the author" className='object-cover' />
                </div>
            </section>
        </main>

    )
}
