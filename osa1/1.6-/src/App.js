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
      <StatisticsLine text='good' value={props.stats1}/>
      <StatisticsLine text='neutral' value={props.stats2}/>
      <StatisticsLine text='bad' value={props.stats3}/>
      <StatisticsLine text='all' value={props.stats1 + props.stats2 + props.stats3}/>
      <StatisticsLine text='average' value={(props.stats1 * 1 + props.stats3 * -1)/(props.stats1 + props.stats2 + props.stats3)}/>
      <StatisticsLine text='positive' value={props.stats1/(props.stats1 + props.stats2 + props.stats3) * 100 + ' %'}/>
    </div>
    )
  }

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

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
      <Statistics stats1={good} stats2={neutral} stats3={bad}/>
    </div>
  )
}

export default App