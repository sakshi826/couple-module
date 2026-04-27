export interface QuizQuestion {
  statement: string;
  answer: "myth" | "fact";
  whyMyth?: string;
  whyFact?: string;
  realFact: string;
  example?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    statement: "Anger is bad. If you feel angry, something is wrong with you.",
    answer: "myth",
    whyMyth: "Anger is a natural, universal human emotion — just like joy, sadness, or fear. It evolved to help us protect ourselves and set boundaries.",
    realFact: "Anger is a normal, healthy emotion. Everyone feels it. It's not a sign that something is 'wrong' with you — it's a signal that something matters to you. What counts is how you respond to it, not whether you feel it.",
    example: "A veteran feels angry when their boundaries are crossed. That anger is valid — it's telling them something important.",
  },
  {
    statement: "Anger can be a signal that your boundaries have been crossed.",
    answer: "fact",
    whyFact: "Anger often shows up when something important to you is being threatened or disrespected. It's your mind's way of saying 'this matters.'",
    realFact: "Anger is information. When you feel it, it's worth asking: what boundary was crossed? What need isn't being met? Listening to your anger — without acting on impulse — helps you understand yourself better and take meaningful action.",
    example: "You feel angry when a coworker takes credit for your work. That anger is pointing to a need for recognition and fairness.",
  },
  {
    statement: "If you're angry, you have to let it out by yelling or hitting things.",
    answer: "myth",
    whyMyth: "Research shows that 'venting' aggressively actually increases anger and aggression over time — it reinforces the explosive pattern rather than relieving it.",
    realFact: "Healthy anger expression doesn't mean suppression OR explosion. It means acknowledging your feelings and expressing them constructively — through words, journaling, physical activity, or creative outlets. You can honor your anger without destruction.",
    example: "Instead of punching a wall, you go for a run or write down exactly what's bothering you. The anger moves through you without causing harm.",
  },
  {
    statement: "Learning to manage anger is a sign of emotional strength.",
    answer: "fact",
    whyFact: "Managing anger requires self-awareness, patience, and courage. It's one of the hardest emotional skills to develop, and doing so shows real inner strength.",
    realFact: "People who work on their anger management aren't weak — they're doing some of the bravest emotional work there is. Choosing to pause, reflect, and respond thoughtfully takes far more strength than reacting on impulse.",
    example: "Taking a deep breath and saying 'I need a minute before I respond' in a heated moment is a powerful act of self-control.",
  },
  {
    statement: "If someone makes you angry, it's their fault. You have no responsibility.",
    answer: "myth",
    whyMyth: "While others can trigger our anger, our emotional response is ultimately ours. Giving others full control over our emotions gives away our power.",
    realFact: "Other people can trigger your anger, but how you respond is your responsibility — and your power. Taking ownership of your reactions doesn't mean the other person was right. It means you're choosing how to show up. That's empowerment, not blame.",
    example: "Someone cuts you off in traffic. You feel angry — that's normal. But you choose whether to rage or take a breath. The choice is yours.",
  },
];
