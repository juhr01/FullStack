import React from 'react'

const Total = (props) => {
    const parts = props.course.parts.map(course => course.exercises)
    return (
        <div>
            <p>Number of exercises {parts.reduce((s, p) => s + p)}</p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        </div>
    )
}

const Part = (props) => {
    return (
       <p>{props.name} {props.exercises}</p>
    )
   
}
    
const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}


const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            <Content course={props.course} />
            <Total course={props.course} />
        </div>
    )
}

export default Course