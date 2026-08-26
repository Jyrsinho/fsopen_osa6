import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Filter from "./components/Filter.jsx";
import { useEffect } from "react";
import anecdoteService from "./services/anecdotes.js";
import { useAnecdoteActions } from "./store.js";

const App = () => {

    const { initialize } = useAnecdoteActions();

    useEffect(() => {
        const fetchAnecdotes = async () => {
            try {
                const anecdotes = await anecdoteService.getAll()
                initialize(anecdotes)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAnecdotes();

    }, [initialize])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App
