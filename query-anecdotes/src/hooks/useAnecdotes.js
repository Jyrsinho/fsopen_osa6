import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAnecdote, getAll, updateAnecdote } from "../requests.js";
import { useContext } from "react";
import NotificationContext from "../NotificationContext.jsx";

export const useAnecdotes = () => {
    const queryClient = useQueryClient();
    const { setNotification } = useContext(NotificationContext);

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
        },
        onError: (error) => {
            console.log('on error fired on mutation')
            console.log('error - ', error)
            console.log('error.message - ', error.message)
            setNotification(error.message)
        }
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (votedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes']);
            const updatedAnecdotes = anecdotes.map((anecdote) => ( (anecdote.id === votedAnecdote.id) ? votedAnecdote : anecdote ))
            queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
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