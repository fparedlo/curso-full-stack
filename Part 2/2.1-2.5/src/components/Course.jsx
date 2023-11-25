import Header from "./Header";
import Content from "./Content";
import TotalExercises from "./TotalExercises";

const Course = ({ courses }) => {
  // console.log(courses);
  return (
    <>
      {
        courses.map(course => (
            <div key={course.id}>
              <Header courseName={course.name} />
              <Content courseParts={course.parts} />
              <TotalExercises courseParts={course.parts} />
            </div>
          )
        )
      }
    </>
  )
}

export default Course;