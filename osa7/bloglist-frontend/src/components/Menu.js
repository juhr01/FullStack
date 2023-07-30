import { Link } from 'react-router-dom'

const Menu = (props) => {
    return (
        <div>
            <Link to='/'>Blogs</Link>
            <Link to='/users'>Users</Link>
            <p>{props.user} logged in</p>
        </div>
    )
}

export default Menu