const express = require('express')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

// root url
app.get('/', (request, response) => {
  response.send('<h1>MMRREEEOOOWWWWWW<h2>')
})

// full phonebook 
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

/* info page
show time request is received
and how many entries in phonebook
*/
app.get('/api/info', (request, response) => {
  const totalEntries = persons.length
  const currentTime = new Date().toString()
  response.send(`<p>Phonebook has info for ${totalEntries} people</p>
    <p>${currentTime}</p>`)
})
// show info for 1 person based on id, 404 status if not found
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
// enable ability to delete a person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})
// allow adding a new person to the phonebook via post
// create new id 
const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0
  return String(maxId + 1)
}
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }
  if ((persons.some(person => person.name === body.name))) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }
  const person = {
    name: body.name,
    number: body.number, 
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})