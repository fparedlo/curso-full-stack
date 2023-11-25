import Part from './Part.jsx'

const Content = ({ courseParts }) => 
  <>
    { courseParts.map((part)=>
      <Part key={part.id} partName={part.name} partExercises={part.exercises} /> 
    )}
  </>

export default Content