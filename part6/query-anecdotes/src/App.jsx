import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdotes } from './services/requests'

const App = () => {

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({   
     queryKey: ['anecdotes'],    
     queryFn: getAnecdotes,
     retry: 3
    })  
    console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  const anecdotes = result.data

  return anecdotes? 
      <div>
        <h1>Anecdote APp</h1>
        <Notification/>
        <AnecdoteForm/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    :<p> anecdote service not available due to problem in server</p>
}

export default App
