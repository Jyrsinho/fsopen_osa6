const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(`${baseURL}`)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const create = async (newAnecdote) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(newAnecdote),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch( baseURL, options)
    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }
    return await response.json()
}

const update = async (id, anecdote) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(anecdote)
    }
    const response = await fetch(`${baseURL}/${id}`, options)
    if (!response.ok) {
        throw new Error('Failed to update anecdote')
    }
    return await response.json()
}

const remove = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch(`${baseURL}/${id}`, options)
    if (!response.ok) {
        throw new Error('Failed to delete anecdote')
    }
    return await response.json()
}

const anecdoteService = {
    getAll,
    create,
    update,
    remove,
}

export default anecdoteService