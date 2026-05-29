export interface Feeling {
  id: string;
  label: string;
  affirmations: string[];
}

export const feelings: Feeling[] = [
  {
    id: "lonely",
    label: "When you feel lonely or disconnected",
    affirmations: [
      "I can share my loneliness without criticizing my partner.",
      "Connection is rebuilt through vulnerability, not defensive anger.",
      "I am allowed to ask for connection when I feel distant.",
      "My feelings of loneliness are valid and deserve expression.",
      "A single warm gesture can bridge this temporary distance.",
    ],
  },
  {
    id: "terrified",
    label: "When you feel anxious or insecure",
    affirmations: [
      "I can soothe my own anxiety before reacting to my partner.",
      "My partner's silence does not mean I am being abandoned.",
      "I can slow down and ask for reassurance when I feel insecure.",
      "I don't have to control everything to be emotionally safe.",
      "I can breathe through the panic of disconnection.",
    ],
  },
  {
    id: "insignificant",
    label: "When you feel dismissed or ignored",
    affirmations: [
      "My voice and emotional needs are important to this relationship.",
      "I can express my hurt without blaming my partner's intentions.",
      "I am allowed to take up space and speak my truth.",
      "My feelings deserve to be heard and validated.",
      "I can honor my own value even when my partner is distracted.",
    ],
  },
  {
    id: "overwhelmed",
    label: "When communication gets flooded",
    affirmations: [
      "I am allowed to ask for a pause when my system is flooded.",
      "Stepping away to calm down protects our relationship.",
      "Reassurance helps my partner wait while I regulate my emotions.",
      "One breath at a time: I can slow down our dialogue.",
      "I will return to this conversation when my mind is calm.",
    ],
  },
  {
    id: "hopeless",
    label: "When you feel stuck in conflict",
    affirmations: [
      "This difficult moment is not the whole story of us.",
      "Every relationship has struggles; repair is always possible.",
      "I don't have to solve this disagreement today to feel safe.",
      "We can hold different perspectives and still care for each other.",
      "A gentle word can soften the hardest stance.",
    ],
  },
  {
    id: "conflicted",
    label: "When you are unsure of your needs",
    affirmations: [
      "It's okay to feel conflicted about what I want.",
      "I can take my time to find clarity before I speak.",
      "Uncertainty is a natural phase of relational growth.",
      "I can share my confusion with my partner as a vulnerability.",
      "I trust my heart to guide me toward my core needs.",
    ],
  },
  {
    id: "self-critical",
    label: "When you blame yourself for conflict",
    affirmations: [
      "I am not responsible for fixing every relationship issue.",
      "Making a mistake does not make me a bad partner.",
      "I can hold myself with compassion while taking accountability.",
      "Relationship patterns are shared, not just my fault.",
      "I am learning and growing in love every single day.",
    ],
  },
  {
    id: "out-of-place",
    label: "When you feel misunderstood by them",
    affirmations: [
      "I can explain my inner world gently if my partner doesn't understand.",
      "It's okay that we see things differently; it is not a threat.",
      "I belong in this relationship as my authentic self.",
      "I can seek understanding without demanding agreement.",
      "My partner can love me even when they don't fully comprehend me.",
    ],
  },
  {
    id: "unsafe",
    label: "When you feel emotionally unsafe",
    affirmations: [
      "I have the right to set firm, respectful boundaries for safety.",
      "If a conversation becomes toxic, I am allowed to step away.",
      "I can prioritize my emotional safety while staying respectful.",
      "I deserve to be treated with gentleness and respect.",
      "I can speak up for what I need to feel safe.",
    ],
  },
  {
    id: "pressured",
    label: "When you feel pressured to agree",
    affirmations: [
      "My boundaries are valid, even if they disappoint my partner.",
      "I can say 'no' or 'not yet' and still be a loving partner.",
      "A healthy relationship allows room for disagreement.",
      "I don't have to compromise my values to keep the peace.",
      "I can stand firmly in my truth while listening to theirs.",
    ],
  },
  {
    id: "face-the-day",
    label: "When you want to shut down or withdraw",
    affirmations: [
      "Withdrawing is my shield, but sharing my overwhelm is the bridge.",
      "I can say 'I'm overwhelmed' instead of completely shutting down.",
      "I am allowed to take a break, but I will let them know I'll return.",
      "Reconnecting after a withdraw is safe and healing.",
      "I can show up in small, quiet ways even when I'm tired.",
    ],
  },
  {
    id: "future",
    label: "When you worry about your relationship's future",
    affirmations: [
      "We can build our future one calm conversation at a time.",
      "I can focus on how we handle the present moment together.",
      "Worrying about tomorrow drains the energy I need for repair today.",
      "I can trust our capacity to adapt, grow, and heal.",
      "Our commitment is built on the daily choices we make.",
    ],
  },
  {
    id: "stuck",
    label: "When you keep repeating the same cycle",
    affirmations: [
      "Noticing the cycle is the first step to stepping out of it.",
      "I can pause my automatic reaction and choose a new path.",
      "We are not stuck; we are just in a familiar loop we can break.",
      "A single different response can change the entire dynamic.",
      "Patience with our patterns helps us heal them slowly.",
    ],
  },
  {
    id: "compare",
    label: "When you compare your bond to others",
    affirmations: [
      "Our relationship has its own unique path and pace.",
      "Comparing our struggles to others' highlight reels is unfair.",
      "I will focus on the connection we are building here.",
      "Every couple has unseen challenges; ours is worth the work.",
      "We are writing our own story of love and repair.",
    ],
  },
  {
    id: "give-up",
    label: "When you feel ready to give up on repair",
    affirmations: [
      "I don't have to decide the future of our relationship today.",
      "Feeling exhausted is valid; I can rest without quitting.",
      "This despair is a feeling, not a final destination.",
      "I can take one tiny step toward soft communication.",
      "Underneath the fatigue, my desire for connection still matters.",
    ],
  },
];
