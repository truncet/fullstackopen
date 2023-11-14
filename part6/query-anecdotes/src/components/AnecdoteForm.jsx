import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createAnecdotes } from '../services/requests';


const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const queryClient = useQueryClient();

  const addAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    if (newAnecdote.trim().length >= 5) {
      addAnecdoteMutation.mutate({content: newAnecdote, votes:0});
      setNewAnecdote('');
    } else {
      console.log('Anecdote must be at least 5 characters long'); // Replace with proper error handling
    }}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input value={newAnecdote} onChange={(e) => setNewAnecdote(e.target.value)}/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
