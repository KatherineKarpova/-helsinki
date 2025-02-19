const Persons = ({array, deletePerson}) => {
  return (
    <div>
      {array.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}
  export default Persons