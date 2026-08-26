import AnecdoteList from "./components/AnecdoteList.jsx";

const App = () => {


  return (
    <div>
        <AnecdoteList/>
     <h2>create new</h2>
      <form>
        <div>
          <input data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
