import  {useStatistics} from "../store.js";
import countAverage from "../utils/countAverage.js";

const Statistics = () => {
  const {good, bad, neutral} = useStatistics()
  const all = good + bad + neutral
  const average = countAverage(good, neutral, bad)
  const positive = 0
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
