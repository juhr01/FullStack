import { CoursePart } from '../types'

const Part = ( { part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <p>{part.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <p>project count : {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <p>{part.description}</p>
                    <p>submit to {part.backgroundMaterial}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.map((skill, index) => (index !== part.requirements.length - 1) ? `${skill}, ` : skill)}</p>
                </div>
            )
    }
}

export default Part