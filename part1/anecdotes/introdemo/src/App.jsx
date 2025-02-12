import { useState, useEffect } from 'react'

// Button component
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const AnecdoteHeader = () => <h1>Anecdote of the day</h1>

// make component able to display the current or most voted ancedote
const Anecdote = ({value}) => <p>{value}</p>

const MostVotesHeader = () => <h1>Anecdote with the most votes</h1>

const TotalVotes = ({ value }) => <p>has {value} votes</p>

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
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState('')

  // change state of selected based on a random number 
  // that corresponds with the list items

  const getRandomNum = ({exclude}) => {
    // define num as a result of the func
    const random = Math.floor(Math.random() * ((anecdotes.length - 1)))
    // if the random num is equal to the already selected num run the function again
    return random === exclude ? getRandomNum({exclude}) : random
  }

  const handleNextAncedote = () => {
    // get different index num
    const newSelected = getRandomNum({exclude: selected})
    // set selected to the new num
    setSelected(newSelected)
  }

  // change num of votes if vote button pressed
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log('newVote', newVotes[selected])
    setVotes(newVotes)
  }

  useEffect (() => {
    // get num of highest votes
    console.log('before most votes', mostVotes)
    const currentMostVotes = Math.max(...votes)
    console.log('new most votes', currentMostVotes)
    // see if it is greater than the mostVotes already set
    if ( currentMostVotes > mostVotes) {
      // if it is set current as the new mostVotes
      setMostVotes(currentMostVotes)
      // get the index of it in votes
      const index = votes.indexOf(currentMostVotes)
      console.log('index', index)
      // find corresponding ancedote
      setMostVotedAnecdote(anecdotes[index])
    }
  }, [votes])

  useEffect(() => {
    console.log('Updated most voted anecdote:', mostVotedAnecdote)
  }, [mostVotedAnecdote])

  return (
    <div>
      <AnecdoteHeader/>
      <Anecdote value={anecdotes[selected]}/>
      <TotalVotes value={votes[selected]}/>
      <Button onClick={handleVote} text='vote'/>
      <Button onClick={handleNextAncedote} text='next anecdote'/>
      <MostVotesHeader/>
      <Anecdote value={mostVotedAnecdote}/>
      <TotalVotes value={mostVotes}/>
    </div>
  )
}

export default App