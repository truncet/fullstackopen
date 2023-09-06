import { useState } from 'react'


const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const StaticsLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({values}) => {
  let total = values[0] + values[1] + values[2];
  if (total > 0){
    let average =  (values[0] - values[2]) / total;
    let positive = values[0] / total * 100

    return (
      <div>
        <StaticsLine text="good" value={values[0]}/>
        <StaticsLine text="neutral" value={values[1]}/>
        <StaticsLine text="bad" value={values[2]}/>
        <StaticsLine text="all" value={total}/>
        <StaticsLine text="average" value={average}/>
        <StaticsLine text="positive" value={positive}/>

      </div>
    )
  }
  return (
      <div>
        <p>No feedbacks given</p>
      </div>
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
      <Statistics values={[good, neutral, bad]}/>

    </div>
  )
}

export default App