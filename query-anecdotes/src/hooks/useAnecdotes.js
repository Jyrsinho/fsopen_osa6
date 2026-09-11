import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAll, updateAnecdote } from "../requests.js";
import useNotification from "./useNotification.js";

export const useAnecdotes = () => {
    const queryClient = useQueryClient();
    const { setNotification } = useNotification()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 1
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData( ['anecdotes'], anecdotes.concat(newAnecdote))
            setNotification(`created anecdote ${newAnecdote.content}`)
        },
        onError: (error) => {
            setNotification(error.message)
        }
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (votedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            const updatedAnecdotes = anecdotes.map((anecdote) => ( (anecdote.id === votedAnecdote.id) ? votedAnecdote : anecdote ))
            queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
            setNotification(`voted ${votedAnecdote.content}`)
        },
    })
    

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        isError: result.isError,
        updateAnecdote: (votedAnecdote) => voteAnecdoteMutation.mutate(votedAnecdote),
        addAnecdoteToServer: (content) => newAnecdoteMutation.mutate(content)
    }

}