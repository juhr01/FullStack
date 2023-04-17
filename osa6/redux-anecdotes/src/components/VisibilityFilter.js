import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterChange(event.target.value))
    }

    return (
        <div>
            filter <input type='text' onChange={handleChange}/>
            <br />
            <br />
        </div>
    )
}

export default VisibilityFilter