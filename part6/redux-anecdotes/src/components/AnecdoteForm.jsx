import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from './../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newAnecdote.trim() === '') {
      console.log('Please enter a valid anecdote.');
      return;
    }
    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification(`You added ${newAnecdote}`))
    setNewAnecdote('');
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={newAnecdote}
            onChange={(event) => setNewAnecdote(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
