import blogService from '../services/blogs'
import { useQuery } from "react-query";
import { Link } from 'react-router-dom'

const Users = () => {

    const result = useQuery("blogs", blogService.getAll, {
        retry: 1,
        refetchOnWindowFocus: false,
      });
    
      if (result.isLoading) {
        return <div>loading data...</div>;
      }
    
      const blogs = result.data;

      const blogsByUser = blogs.reduce((acc, blog) => {
        const user = blog.user.username
        if (!acc[user]) {
          acc[user] = []
        }
        acc[user].push(blog)
        return acc
      }, {})
    
      const users = Object.keys(blogsByUser);

    return (
        <div>
            <h2>Users</h2>
            <table>
            <tr>
                <th></th>
                <th>blogs created</th>
            </tr>
            {users.map(user =>
                <tr key={user}>
                    <td><Link to={`/users/${blogsByUser[user][0].user.id}`}>{user}</Link></td>
                    <td>{blogsByUser[user].length}</td>
                </tr>
            )}
            </table>
        </div>
    )
}

export default Users