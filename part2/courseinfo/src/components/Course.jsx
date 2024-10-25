import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => {
	const header = course.name
	const course_parts = course.parts

	return (
	  <div>
		<Header course={header} />
		<Content course_parts={course_parts} />
		<Total course_parts={course_parts} />
	  </div>
	)
  }

  export default Course

