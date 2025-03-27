export default function Page(props){
    console.log('article props:', JSON.stringify(props, null, 4))
    return <h1>render article by id {props.params.id}</h1>
}
