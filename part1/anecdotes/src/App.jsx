import { useState } from 'react'

const Header = (props) => {
  return(
    <h1>
      {props.text}
    </h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleOnClick}>
      {props.text}
    </button>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const numberOfAnecdotes = anecdotes.length
  const [points, setPoints] = useState(Array(numberOfAnecdotes).fill(0));
  const [indexfav, setFav] = useState(0)


  const generateRandomNumber = () => {
    const n = numberOfAnecdotes
    return Math.floor(Math.random() * n);
  };

  const handleClick = () => {
    setSelected(generateRandomNumber())
  }

  const getMaxIndex = (copyPoints) => {
    const maxValue = Math.max(...copyPoints);
    const maxIndex = copyPoints.indexOf(maxValue);
    return maxIndex;
  }

  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
    setFav(getMaxIndex(copyPoints))
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote anecdote={anecdotes[selected]}/>
      <Button handleOnClick={handleVote} text='vote'/>
      <Button handleOnClick={handleClick} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <Anecdote anecdote={anecdotes[indexfav]}/>
      {/* <div>
        array {points}
      </div> */}
    </div>
  )
}

export default App
