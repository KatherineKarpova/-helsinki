const App = () => {
  console.log('app works')
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  console.log('Courses array before rendering:', courses)
  const Course = ({course}) => {
    return (
      // header
      // contents as part name and num exercises each
      <div>
        <h1>{course.name}</h1>
        <>
          {course.parts.map(part => (
            <p key={part.name}>{part.name} {part.exercises} </p>
          ))}
        </>
        <p>
          <strong>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
        </p>
      </div>
      )
    }

  return (
    
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course}/>
    ))}
    </div>
  )
}
export default App