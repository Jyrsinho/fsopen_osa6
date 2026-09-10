import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useAnecdotes} from "./hooks/useAnecdotes.js";
import AnecdoteList from "./components/AnecdoteList.jsx";
import {NotificationContextProvider} from "./NotificationContext.jsx";

const App = () => {

    const {anecdotes, isPending, isError, updateAnecdote}= useAnecdotes()

    const handleVote = (anecdote) => {
        console.log('vote ', anecdote)
        const votedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1,
        }
        updateAnecdote(votedAnecdote)
    }

    if (isPending) {
        return (
            <div>
                loading anecdotes...
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                anecdote service not available due to problems in server
            </div>
        )
    }


  return (
      <NotificationContextProvider>
        <div>
          <h3>Anecdote app</h3>
          <Notification />
          <AnecdoteForm />
          <AnecdoteList anecdotes={anecdotes} handleVote={handleVote} />
        </div>
      </NotificationContextProvider>
  )
}

export default App