async function getData(){
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { message: 'Hello, About' }
}

export default async function Page(){
    const { message } = await getData();
    return <h1>{message}</h1>
}
