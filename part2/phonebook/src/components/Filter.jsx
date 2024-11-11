const Filter = (props) => {
	return (
	  <div> filter shown with
		<input  type={props.type}
				value={props.value}
				onChange={props.onChange}/>
	  </div>
	)
  }

export default Filter
