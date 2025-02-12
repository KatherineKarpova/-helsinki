import { useState } from 'react'
import Note from './components/Note'
  
const App = (props) => {

  console.log('App works...')

  const [notes, setNotes] = useState(props.notes)

  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  
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

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
