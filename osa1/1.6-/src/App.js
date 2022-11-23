import { useState } from 'react'

const Display = (props) => {
    return (    <div>
      <h1>statistics</h1>
      <p>{props.option1} {props.stats1}</p>
      <p>{props.option2} {props.stats2}</p>
      <p>{props.option3} {props.stats3}</p>
    </div>
    )
  }

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Display option1='good' option2='neutral' option3='bad' stats1={good} stats2={neutral} stats3={bad}/>
    </div>
  )
}

export default App