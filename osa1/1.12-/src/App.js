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
      <th>
        <h1>statistics</h1>
      </th>
      <tr>
        <StatisticsLine content='good'/>
        <StatisticsLine content={props.stats1}/>
      </tr>
      <tr>
        <StatisticsLine content='neutral'/>
        <StatisticsLine content={props.stats2}/>
      </tr>
      <tr>
        <StatisticsLine content='bad'/>
        <StatisticsLine content={props.stats3}/>
      </tr>
      <tr>
       <StatisticsLine content='all'/>
        <StatisticsLine content={props.stats1 + props.stats2 + props.stats3}/>
      </tr>
      <tr>
        <StatisticsLine content='average'/>
        <StatisticsLine content={(props.stats1 * 1 + props.stats3 * -1)/(props.stats1 + props.stats2 + props.stats3)}/>
      </tr>
      <tr>
        <StatisticsLine content='positive'/>
        <StatisticsLine content={props.stats1/(props.stats1 + props.stats2 + props.stats3) * 100 + ' %'}/>
      </tr>
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
    <td>{props.content}</td>
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