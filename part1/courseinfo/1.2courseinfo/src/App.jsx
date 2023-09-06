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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercise={[exercises1, exercises2, exercises3]} />
      <Total exercise={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App
