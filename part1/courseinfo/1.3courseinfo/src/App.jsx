const Header = (props) => {
  return (
    <h1> {props.course}</h1>
  )
};

const Part = (props) => {
  return (
    <p> {props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercise={props.exercise[0]} />
      <Part part={props.parts[1]} exercise={props.exercise[1]} />
      <Part part={props.parts[2]} exercise={props.exercise[2]} />
    </div>

  )
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercise[0] + props.exercise[1] + props.exercise[2]} </p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1.name, part2.name, part3.name]} exercise={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total exercise={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App