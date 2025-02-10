import { useState, useEffect } from "react"

// Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

// StatisticLine component
const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

// Statistics component
const Statistics = ({ clicks, all, average, positive }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <StatisticLine text="good" value={clicks.good} />
      <StatisticLine text="neutral" value={clicks.neutral} />
      <StatisticLine text="bad" value={clicks.bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average.toFixed(4)} /> {/* Limit to two decimal places */}
      <StatisticLine text="positive" value={positive.toFixed(2) + '%'} /> {/* Limit to two decimal places */}
    </div>
  )
}

const App = () => {
  const FeedbackHeader = () => <h1>give feedback</h1>

  // Save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const scores = {
    goodScore: 1,
    neutralScore: 0,
    badScore: -1
  }

  // Update the average value
  const updateAverage = (newAll) => {
    const totalScore = (clicks.good * scores.goodScore) + (clicks.neutral * scores.neutralScore) + (clicks.bad * scores.badScore)
    const newAverage = newAll > 0 ? totalScore / newAll : 0
    setAverage(newAverage)
  }

  // Update the positive percentage
  const updatePositive = (newAll) => {
    // newAll > 0 ?
    const newPositive = (clicks.good / newAll) * 100
    setPositive(newPositive)
  }

  // Update stats (all, average, and positive)
  const updateStats = (newAll) => {
    setAll(newAll)
    updateAverage(newAll)
    updatePositive(newAll)
  }

  // Handle Good Click
  const handleGoodClick = () => {
    const newClicks = { ...clicks, good: clicks.good + 1 }
    setClicks(newClicks)
    const newAll = all + 1
    updateStats(newAll)
  }

  // Handle Neutral Click
  const handleNeutralClick = () => {
    const newClicks = { ...clicks, neutral: clicks.neutral + 1 }
    setClicks(newClicks)
    const newAll = all + 1
    updateStats(newAll)
  }

  // Handle Bad Click
  const handleBadClick = () => {
    const newClicks = { ...clicks, bad: clicks.bad + 1 }
    setClicks(newClicks)
    const newAll = all + 1
    updateStats(newAll)
  }

  useEffect(() => {
    console.log('updated all:', all)  // Logs the new value of `all` after it is updated
  }, [all])

  const StatsHeader = () => <h1>statistics</h1>

  return (
    <div>
      <FeedbackHeader />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <StatsHeader />
      <Statistics clicks={clicks} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App

