const Total = ({ course_parts }) => {
  const sum = course_parts.reduce((total, part) => total + part.exercises, 0);
  return (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
  )
}

export default Total
