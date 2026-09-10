import { useAnecdotes } from "../hooks/useAnecdotes.js";
import { useContext } from "react";
import NotificationContext from "../NotificationContext.jsx";

const AnecdoteForm = () => {

    const { addAnecdoteToServer } = useAnecdotes();
    const { setNotification } = useContext(NotificationContext)


    const onCreate = (event) => {
        event.preventDefault()
        try {
            const content = event.target.anecdote.value
            event.target.reset()
            addAnecdoteToServer(content);
            setNotification(`created anecdote ${content}`)
        }catch(e){
            setNotification(e.message )
        }
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm