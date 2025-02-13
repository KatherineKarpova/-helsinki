const PersonForm = ({ state, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input 
                name="name"         // use 'name' to match state keys
                value={state.name}  // Use state.name to bind value
                onChange={onChange}
              />
      </div>
      <div>
        number: <input 
                 name="number"  
                 value={state.number}  // Use state.number for the value
                 onChange={onChange}  
               />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm