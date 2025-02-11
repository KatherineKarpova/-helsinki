import { useState, useEffect } from 'react'

// Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const voteTotal = ({ value }) => {
  <p>has {value} votes</p>
}


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
  // make votes array equal to anecdotes
  // start each vote as equal to 0
  const [votes, setVotes] = useState(Array.from({ length: anecdotes.length }, () => 0))

  const Anecdote = () => <h1>{anecdotes[selected]}</h1>
  // change state of selected based on a random number 
  // that corresponds with the list items

  const getRandomNum = ({exclude}) => {
    // define num as a result of the func
    const random = Math.floor(Math.random() * ((anecdotes.length - 1)))
    // if the random num is equal to the already selected num run the function again
    return random === exclude ? getRandomNum({exclude}) : random
  }

  const nextSelected = () => {
    // get different index num
    const newSelected = getRandomNum({exclude: selected})
    console.log(newSelected)
    // set selected to the new num
    setSelected(newSelected)
  }
  // change num of votes depending on button press
  const handleVote = () => {
    // Copy the votes array and increment the vote count for the selected index
    const newVotes = [...votes];

    newVotes[selected] += 1; // Increment the vote for the given index
        // Log the updated vote count for the selected anecdote
        console.log(`Vote for ${anecdotes[selected]}: ${newVotes[selected]}`);
    setVotes(newVotes); // Update state with the new array
  };

  return (
    <div>
      <Anecdote/>
      <Button onClick={handleVote} text='vote'/>
      <Button onClick={nextSelected} text='next anecdote'/>
      <voteTotal value={votes[selected]}/>
    </div>
  )
}

export default App