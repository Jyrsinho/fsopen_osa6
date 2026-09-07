import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery} from "@tanstack/react-query";
import {getAll} from "./requests.js";


const App = () => {

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 1
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: vote,

    })

    const handleVote = (anecdote) => {
        console.log('vote ', anecdote)
    }

    if (result.isPending) {
        return (
            <div>
                loading anecdotes...
            </div>
        )
    }

    if (result.isError) {
        return (
            <div>
                anecdote service is unavailable due to an error in the server
            </div>
        )
    }

    const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App