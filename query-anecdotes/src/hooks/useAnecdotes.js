import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAll, updateAnecdote} from "../requests.js";

export const useAnecdotes = () => {
    const queryClient = useQueryClient();

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 1
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
    }

}