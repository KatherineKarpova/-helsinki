const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }

  const Header = () => {
    return (
      <h1>{course.name}</h1>
    )
  }
  const Content = () => {
     return (
        <p>
          {course.parts.map(part => (
          <p key={part.name}>{part.name} {part.exercises} </p>
          ))}
        </p>

     )
  }

    const Total = () => {
      return (
        <p>
          Total number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
        </p>
      )
    }

    return (
      <div>
      <Header/>
      <Content/>
      <Total/>
      </div>
    )
  }

export default App