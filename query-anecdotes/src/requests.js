const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
    const response = await fetch(baseURL);
    if (!response.ok) {
        throw new Error('failed to fetch anecdotes');
    }
    return await response.json();
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(newAnecdote),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(baseURL, options)
    if (!response.ok) {
        throw new Error('failed to create anecdote');
    }
    return await response.json();
}


