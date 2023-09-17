const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
};

const Part = ({name, exercise}) => {
  return (
    <p> {name} {exercise}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {
        parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}></Part>)
      }
    </div>
  )
};

const Total = ({parts}) => {
  return (
    <strong>total of {
      parts.reduce((sum, part)=> sum + part.exercises, 0)
    } exercises
    </strong>
  )
}



const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  ) 
}

const AllCourses = ({courses}) => {
  return (
    <div>
      <h1>
        Web Development Curriculum
      </h1>
      {
        courses.map((course, id)=> {
          return <Course key={id} course={course} />
        })
      }
    </div>
  )
}


const App = () => {
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

    return (
      <div>
        <AllCourses courses={courses}/>
      </div>
      
    )
}

export default App