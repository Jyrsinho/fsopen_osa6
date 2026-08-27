import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Filter from "./components/Filter.jsx";
import { useEffect } from "react";
import { useAnecdoteActions } from "./stores/useAnecdoteStore.js";
import Notification from "./components/Notification.jsx";

const App = () => {
    const { initialize } = useAnecdoteActions();

    useEffect(() => {
        initialize();
    }, [initialize])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <Filter/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App
