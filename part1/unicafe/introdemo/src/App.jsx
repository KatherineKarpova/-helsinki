import { useState, useEffect } from "react"

// Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

// StatisticLine component
const StatisticLine = ({ text, value }) => <p>{text} {value}</p>

// Statistics component
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average.toFixed(2)} /> {/* Limit to four decimal places */}
      <StatisticLine text="positive" value={positive.toFixed(2) + '%'} /> {/* Limit to two decimal places */}
    </div>
  )
}

const App = () => {
  const FeedbackHeader = () => <h1>give feedback</h1>

  // Save each click type in its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const scores = {
    goodScore: 1,
    neutralScore: 0,
    badScore: -1
  }

  const addClicks = () => {
    return good + neutral + bad
  }
  // Update the average value
  const updateAverage = (newAll) => {
    const totalScore = (good * scores.goodScore) + (neutral * scores.neutralScore) + (bad * scores.badScore);
    const newAverage = newAll > 0 ? totalScore / newAll : 0; // Use the sum directly
    setAverage(newAverage);
  }
  

  // Update the positive percentage
  const updatePositive = (newAll) => {
    const newPositive = newAll > 0 ? good / newAll * 100 : 0
    setPositive(newPositive)
  }

  // Update stats (all, average, and positive)
  const updateStats = () => {
    const newAll = addClicks(); // Calculate new "all" first
    updateAverage(newAll);  // This will now use the correct "all" value
    updatePositive(newAll); // This will also use the correct "all" value
    setAll(newAll);   // Now update the "all" state
  }
  

  const handleGoodClick = () => {
    const newGood = good + 1   // Increment good value
    setGood(newGood)           // Update good state
    // No need to call updateStats directly; useEffect will handle it
  }
  
  const handleNeutralClick = () => {
    const newNeutral = neutral + 1  // Increment neutral value
    setNeutral(newNeutral)          // Update neutral state
    // No need to call updateStats directly; useEffect will handle it
  };
  
  const handleBadClick = () => {
    const newBad = bad + 1    // Increment bad value
    setBad(newBad)            // Update bad state
    // No need to call updateStats directly; useEffect will handle it
  }
  
  useEffect(() => {
    updateStats()  // Update the stats whenever good, neutral, or bad changes
  }, [good, neutral, bad]) // Dependencies for the effect

  const StatsHeader = () => <h1>statistics</h1>

  return (
    <div>
      <FeedbackHeader />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <StatsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App

