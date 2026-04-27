import AngerShameCycle from "@/features/the_anger_shame_cycle/components/AngerShameCycle";

const Index = () => {
  return <AngerShameCycle onClose={() => window.history.back()} />;
};

export default Index;
