const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({content}) => {
  const [ part1, part2, part3 ] = content;
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises}/>
      <Part part={part2.name} exercises={part2.exercises}/>
      <Part part={part3.name} exercises={part3.exercises}/>
    </>
  )
}

const Total = ({content}) => {
  const [part1, part2, part3 ] = content;
  return(
    <>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    </>
  )
}

const Part = ({part, exercises}) => {
  return(
    <p>
        {part} {exercises}
    </p>
  )

}



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
      }, {
        name: 'State of a component',
        exercises: 14
      }
    ]
}


  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total content={course.parts}/>
    </div>
  )
}

export default App