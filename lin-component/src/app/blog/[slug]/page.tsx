export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params
    return (
        <div>
            <h2>page: {slug}</h2>
        </div>
    )
}

