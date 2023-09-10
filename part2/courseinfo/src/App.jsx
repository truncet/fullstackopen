const Header = ({name}) => {
  return (
    <h1>{name}</h1>
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


// const Total = ({parts}) => {
//   return (
//     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
//   )
// }


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      {/* <Total parts={course.parts}/> */}
    </div>
  ) 
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

    return (
      <Course course={course}/>
    )
}

export default App