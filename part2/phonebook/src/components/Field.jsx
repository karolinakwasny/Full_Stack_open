const Field = ({ field, value, onChange }) => {
	return (
		<div>
		  {field}: <input value={value} onChange={onChange} />
		</div>
	)
  }

export default Field
