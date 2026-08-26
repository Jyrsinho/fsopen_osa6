const countAverage = (good, neutral, bad) => {
    const amountOfVotes = good + neutral + bad
    if (amountOfVotes === 0) return 0

    return (good - bad) / amountOfVotes
}

export default countAverage