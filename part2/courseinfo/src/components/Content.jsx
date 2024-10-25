import Part from './Part'

const Content = ({ course_parts }) =>{
  return (
    <>
    {course_parts.map(part => (
        <Part key={part.id} part={part} />
    ))}
    </>
  )
}

  export default Content

