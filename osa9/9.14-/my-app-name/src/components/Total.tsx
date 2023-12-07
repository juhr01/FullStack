interface TotalContent {
    total: string,
    count: number
}

const Total = (props: TotalContent) => {
    return <p>{props.total} {props.count}</p>
}

export default Total