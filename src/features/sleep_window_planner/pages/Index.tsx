import SleepWindow from '@/features/sleep_window_planner/components/SleepWindow/SleepWindow';

const Index = () => {
  return <SleepWindow onExit={() => window.history.back()} />;
};

export default Index;
