import Note from './components/Note'
  
const App = ({ notes }) => {

  console.log('App works...')

  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState('') 

  const [showAll, setShowAll] = useState(true)
  
  const addNote = (event) => {
    // makes sure the page does not reload with the default before setting
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    // copy notes array with new note appended to this copy
    setNotes(notes.concat(noteObject))
    // reset the event handler for a new note as blank for the input field
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    // no default action to prevent
    setNewNote(event.target.value)
  }

  // showAll is either true or false
  // if showAll equals true show all notes
  // else showAll equals false show only important notes

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
