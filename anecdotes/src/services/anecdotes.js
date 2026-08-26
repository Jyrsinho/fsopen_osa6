const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(`${baseURL}`)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const anecdoteService = {
    getAll,
}

export default anecdoteService