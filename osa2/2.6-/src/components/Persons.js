import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <div>
            {props.persons.filter(p => p.name.toUpperCase().includes(props.newFilter.toUpperCase())).map(person =>
                <Person key={person.name} name={person.name} number={person.number} />
            )}
        </div>
    )

}

export default Persons