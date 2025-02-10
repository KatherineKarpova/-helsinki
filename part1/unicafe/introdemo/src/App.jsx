import { useState } from "react"

// const Button = (OnClick, text) => <button> OnClick={OnClick} {text}</button>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const AllClicks = ({value}) => <p>all {value}</p>

const AverageStat = ({value}) => <p>average {value}</p>

const PosPercentage =({value}) => <p>positive {value}%</p>

const App = () => {
  const FeedbackHeader = () => <h1>give feedback</h1>

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const scores = {
    goodScore : 1,
    neutralScore: 0,   
    badScore : -1
  }

  const updateAverage = (good, neutral, bad, all) => {
    const newAverage = (good * scores.goodScore + neutral * scores.neutralScore + bad * scores.badScore) / all
    setAverage(newAverage)
  };

  const updatePositive = (good, all) => {
    const positivePercentage = (good / all) * 100
    setPositive(positivePercentage)
  }

  const handleGoodClick = () => {
    console.log('good click')
    setGood(prevGood => {
      const newGood = prevGood +1
      const newAll = all + 1
      setAll(newAll)
      updateAverage(newGood, neutral, bad, newAll)
      updatePositive(newGood, newAll)

      return newGood
    })
  }
  const handleNeutralClick = () => {
    console.log('neutral click')
    setNeutral(prevNeutral => {
      const newNeutral = prevNeutral + 1
      const newAll = all + 1
      setAll(newAll)
      updateAverage(good, newNeutral, bad, newAll)
      updatePositive(good, newAll)

      return newNeutral
    })
  }

  const handleBadClick = () => {
    console.log('bad click')
    setBad(prevBad => {
      const newBad = prevBad + 1
      const newAll = all + 1
      setAll(newAll)
      updateAverage(good, neutral, newBad, newAll)
      updatePositive(good, newAll)

      return newBad
    })
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
      <AllClicks value={all}/>
      <AverageStat value={average}/>
      <PosPercentage value={positive}/>
    </div>
  )
}
export default App