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
        <td><StatisticsLine content='good'/></td>
        <td><StatisticsLine content={props.stats1}/></td>
      </tr>
      <tr>
        <td><StatisticsLine content='neutral'/></td>
        <td><StatisticsLine content={props.stats2}/></td>
      </tr>
      <tr>
        <td><StatisticsLine content='bad'/></td>
        <td><StatisticsLine content={props.stats3}/></td>
      </tr>
      <tr>
        <td><StatisticsLine content='all'/></td>
        <td><StatisticsLine content={props.stats1 + props.stats2 + props.stats3}/></td>
      </tr>
      <tr>
        <td><StatisticsLine content='average'/></td>
        <td><StatisticsLine content={(props.stats1 * 1 + props.stats3 * -1)/(props.stats1 + props.stats2 + props.stats3)}/></td>
      </tr>
      <tr>
        <td><StatisticsLine content='positive'/></td>
        <td><StatisticsLine content={props.stats1/(props.stats1 + props.stats2 + props.stats3) * 100 + ' %'}/></td>
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
    <p>{props.content}</p>
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