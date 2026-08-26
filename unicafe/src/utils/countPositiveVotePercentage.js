const countPositiveVotePercentage = (good, neutral, bad) => {
    const numberOfVotes = good + neutral + bad
    if (numberOfVotes === 0) return 0

    return Math.round(good / numberOfVotes * 100)
}

export default countPositiveVotePercentage