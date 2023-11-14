import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from './../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newAnecdote.trim() === '') {
      console.log('Please enter a valid anecdote.');
      return;
    }
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotificationWithTimeout(newAnecdote, 5))
    setNewAnecdote('');


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
