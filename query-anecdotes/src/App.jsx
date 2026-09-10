import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import AnecdoteList from "./components/AnecdoteList.jsx";
import  { NotificationContextProvider } from "./NotificationContext.jsx";
import { useAnecdotes } from "./hooks/useAnecdotes.js";


const App = () => {

    const { isPending, isError } = useAnecdotes()

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
                <AnecdoteList />
            </div>
        </NotificationContextProvider>
    )
}

export default App