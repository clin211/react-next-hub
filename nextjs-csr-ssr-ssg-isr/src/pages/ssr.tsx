interface Todo {
    userId: number;
    id: number;
    title: string;
    completed?: boolean;
}

export default function Page({ data }: { data: Todo[] }) {
    return <p>{JSON.stringify(data)}</p>
}

// export async function getServerSideProps() {
export async function getStaticProps() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    const data: Todo[] = await res.json()

    return { props: { data } }
}
