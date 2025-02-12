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

export default Course