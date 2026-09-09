import {useAnecdotes} from "../hooks/useAnecdotes.js";

const AnecdoteForm = () => {

    const {addAnecdoteToServer} = useAnecdotes();


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
      addAnecdoteToServer(content);
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