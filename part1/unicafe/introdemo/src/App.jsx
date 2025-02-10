import { useState } from "react"

// const Button = (OnClick, text) => <button> OnClick={OnClick} {text}</button>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const App = () => {
  const FeedbackHeader = () => <h1>give feedback</h1>

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    console.log('good click')
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    console.log('neutral click')
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad click')
    setBad(bad + 1)
  }

  const StatsHeader = () => <h1>statistics</h1>
  // display total num of clicks under stats h1 as 'text num/n'

  return (
    <div>
      <FeedbackHeader/>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <StatsHeader/>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
    </div>
  )
}

export default App