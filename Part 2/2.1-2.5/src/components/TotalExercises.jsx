const TotalExercises = ({courseParts}) => {
  const total = courseParts.reduce((zero, part)=>{
    return zero + part.exercises;
  }, 0)
  return <p><strong>total of {total} exercises</strong></p>
}

export default TotalExercises;