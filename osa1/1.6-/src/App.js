import { useState } from 'react'

const Statistics = (props) => {
  if (props.stats1 + props.stats2 + props.stats3 == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given </p>
      </div>
    )
  }
    return (
    <div>
      <h1>statistics</h1>
      <p>good {props.stats1}</p>
      <p>neutral {props.stats2}</p>
      <p>bad {props.stats3}</p>
      <p>all {props.allStats}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}</p>
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
      <Statistics stats1={good} stats2={neutral} stats3={bad} allStats={good + neutral + bad} average={(good * 1 + bad * -1)/(good + neutral + bad)} positive={good/(good + neutral + bad)*100 + ' %'}/>
    </div>
  )
}

export default App