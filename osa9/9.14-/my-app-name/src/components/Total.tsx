interface TotalContent {
    total: string,
    count: number
}

const Total = (props: TotalContent) => {
    return <p><strong>{props.total} {props.count}</strong></p>
}

export default Total