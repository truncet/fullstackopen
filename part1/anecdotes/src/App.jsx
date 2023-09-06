import { useState } from 'react'


const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandomNumbers = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  
  const increaseVote = (i) => {
    const copyVotes = [...votes]
    copyVotes[i] +=1

    let maxIndex = 0;
    let maxValue = copyVotes[0];
  
    for (let i = 1; i < copyVotes.length; i++) {
      if (copyVotes[i] > maxValue) {
        maxValue = copyVotes[i];
        maxIndex = i;
      }
    }

    setVotes(copyVotes);
    setMostVotedAnecdote(anecdotes[maxIndex]);
  }

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length)) 
  const [selected, setSelected] = useState(getRandomNumbers())
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(anecdotes[selected]);

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button text="vote" handleClick={() => increaseVote(selected)}/>
      <Button text="next anecdote" handleClick={() => setSelected(getRandomNumbers())}/>

      <Header text="Anecdote with most votes"/>
      {mostVotedAnecdote}
      </div>
  )
}

export default App