import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ parts }: {parts: CoursePart[]}) => {
    return (
        <div>
            {parts.map((part, idx) => (
                <div key={idx}>
                    <p><strong>{part.name} {part.exerciseCount}</strong></p>
                    <Part part={part} />
                </div>
            ))}
        </div>
    )
}

export default Content