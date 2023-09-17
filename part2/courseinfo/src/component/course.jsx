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

  export default AllCourses