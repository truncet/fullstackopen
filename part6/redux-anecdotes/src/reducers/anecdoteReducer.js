import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import anecdoteService from './../services/anecdotes'


export const voteAnecdote = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    console.log(updatedAnecdote);
    const response = await anecdoteService.update(anecdote.id, updatedAnecdote);
    return response;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(_, action) {
      return action.payload
    },
  },
  extraReducers: {
    // Handle the voteAnecdote async thunk
    [voteAnecdote.fulfilled]: (state, action) => {
      const updatedAnecdote = action.payload;
      console.log(updatedAnecdote)
      const index = state.findIndex(a => a.id === updatedAnecdote.id);
      if (index !== -1) {
        state[index] = updatedAnecdote;
      }
    },
  },
});

export const { addAnecdote, setAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
  }
}




export default anecdoteSlice.reducer;
