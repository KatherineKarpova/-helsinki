const Persons = ({array}) => {
  return (
    <div>
      {array.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}
  export default Persons