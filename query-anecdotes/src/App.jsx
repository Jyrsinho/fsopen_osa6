import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAll, updateAnecdote} from "./requests.js";


const App = () => {

    const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 1
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (votedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            const updatedAnecdotes = anecdotes.map((anecdote) => ( (anecdote.id === votedAnecdote.id) ? votedAnecdote : anecdote ))
            queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
        },
    })

    const handleVote = (anecdote) => {
        console.log('vote ', anecdote)
        const votedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1,
        }
        voteAnecdoteMutation.mutate(votedAnecdote)
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