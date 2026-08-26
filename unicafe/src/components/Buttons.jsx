import {useStatisticsActions} from "../store.js";

const Buttons = () => {
    const {voteGood, voteNeutral, voteBad} = useStatisticsActions()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={voteGood}>good</button>
      <button onClick={voteNeutral}>neutral</button>
      <button onClick={voteBad}>bad</button>
    </div>
  )
}

export default Buttons
