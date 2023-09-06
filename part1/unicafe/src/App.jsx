import { useState } from 'react'


const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Stats = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Header text="statistics"/>
      <Stats text="good" value={good} />
      <Stats text="neutral" value={neutral} />
      <Stats text="bad" value={bad} />

    </div>
  )
}

export default App