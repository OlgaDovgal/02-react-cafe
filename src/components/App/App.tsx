import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import { useState } from "react";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
export default function App() {
  const [values, setValues] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });
  const handleVote = (key: VoteType) => {
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  };
  const resetVotes = () => {
    setValues({ good: 0, neutral: 0, bad: 0 });
  };
  const totalVotes = values.good + values.neutral + values.bad;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={values}
          totalVotes={totalVotes}
          positiveRate={
            totalVotes ? Math.round((values.good / totalVotes) * 100) : 0
          }
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
