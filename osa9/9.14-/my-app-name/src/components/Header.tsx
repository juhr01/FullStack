interface HeaderContent {
    name: string
}

const Header = (props: HeaderContent) => {
    return <h1>{props.name}</h1>
}

export default Header