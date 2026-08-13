import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import DailyProgress from "./components/DailyProgress";
import RevisionPlan from "./components/RevisionPlan";
import Motivation from "./components/Motivation";
import MemorizationJourney from "./components/MemorizationJourney";
import HifzhCycle from "./components/HifzhCycle";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <MemorizationJourney />
      <HifzhCycle />
      <DailyProgress />
      <RevisionPlan />
      <Motivation />
    </>
  );
}
