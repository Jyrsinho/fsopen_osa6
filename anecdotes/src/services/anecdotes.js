const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(`${baseURL}`)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const create = async (newAnecdote) => {
    console.log('anecdoteServices -  newAnecdote - ', newAnecdote)
    const options = {
        method: 'POST',
        body: JSON.stringify(newAnecdote),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch( baseURL, options)
    console.log('response from server', response)
    return await response.json()
}

const anecdoteService = {
    getAll,
    create,
}

export default anecdoteService