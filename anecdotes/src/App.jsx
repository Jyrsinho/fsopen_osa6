import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Filter from "./components/Filter.jsx";
import { useEffect } from "react";
import { useAnecdoteActions } from "./store.js";

const App = () => {
    const { initialize } = useAnecdoteActions();

    useEffect(() => {
        initialize();
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
