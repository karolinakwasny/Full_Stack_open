import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return(
    <h1>
      {props.text}
    </h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Total = (props) => {
  return (
    <div>
      {props.category} {props.total}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text={'give feedback'}/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Header text={'statistics'}/>
      <Total category={'good'} total={good}/>
      <Total category={'neutral'} total={neutral}/>
      <Total category={'bad'} total={bad}/>
    </div>
  )
}

export default App
