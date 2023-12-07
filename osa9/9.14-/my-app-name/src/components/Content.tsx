interface Content {
    name: string,
    count: number
}

const Content = (props: Content) => {
    return <p>{props.name} {props.count}</p>
}

export default Content