import { useState, useEffect } from 'react'

// Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const Anecdote = () => <p>{anecdotes[selected]}</p>
  // change state of selected based on a random number 
  // that corresponds with the list items

  const getRandomNum = ({exclude}) => {
    // define num as a result of the func
    const random = Math.floor(Math.random() * ((anecdotes.length - 1)))
    // if the random num is equal to the already selected num run the function again
    return random === exclude ? getRandomNum({exclude}) : random
  }

  const nextSelected = () => {
    const newSelected = getRandomNum({exclude: selected})
    console.log(newSelected)
    setSelected(newSelected)
  }
  return (
    <div>
      <Anecdote/>
      <Button onClick={nextSelected} text='next anecdote'/>
    </div>
  )
}

export default App