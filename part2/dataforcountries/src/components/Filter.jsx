const Filter = (props) => {
	return (
	  <div> find countries
		<input  type={props.type}
				value={props.value}
				onChange={props.onChange}/>
	  </div>
	)
  }

  export default Filter
