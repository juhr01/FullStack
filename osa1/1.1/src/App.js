const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>Fundamentals of React {props.e1}</p>
      <p>Using props to pass data {props.e2}</p>
      <p>State of a component {props.e3}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <>
      <Header course={course}/>
      <Content e1={exercises1} e2={exercises2} e3={exercises3} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3}/>
    </> 
  )
}

export default App