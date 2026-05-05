import type { Category, ClassificationResult } from './types';

export const categories: Category[] = [
  {
    id: 'audience',
    letter: 'A',
    headline: 'Audience',
    subtitle: 'Do you know your ideal customer?',
    subtext:
      "The people you're targeting with your ads. You need to deeply understand who they are, what they want, and their pain points.",
    color: 'accent',
    checklist: [
      'Who your ideal customers are (age, gender, location, income, profession)?',
      'What keeps them awake at night—their biggest pain points and frustrations?',
      'What they desire most in their personal or professional lives?',
      'What objections might stop them from buying (e.g., price, trust, urgency)?',
      'Where they spend their time online (social media, forums, websites)?',
      'How you can segment your audience into smaller, more specific groups for targeting?',
    ],
  },
  {
    id: 'product',
    letter: 'P',
    headline: 'Product',
    subtitle: 'Do you know your product clearly?',
    subtext: '',
    color: 'cyan',
    checklist: [
      'How your product solves a specific problem for your audience?',
      'What makes your product different from or better than competitors?',
      'The key features and emotional benefits your product provides?',
      'Whether you have testimonials, case studies, or proof that the product works?',
      'If the product is presented professionally and is visually appealing?',
      'If the pricing is competitive and aligned with the perceived value?',
    ],
  },
  {
    id: 'offer',
    letter: 'O',
    headline: 'Offer',
    subtitle: 'How attractive is your value proposition?',
    subtext:
      "The specific deal or package you're presenting to your audience. It includes pricing, bonuses, benefits, guarantees, trust signals and calls to action.",
    color: 'amber',
    checklist: [
      'If your offer is clear and easy to understand at a glance?',
      'If the offer directly aligns with the needs and desires of your audience?',
      'Whether your audience sees the offer as highly valuable that can get their desires?',
      "What additional bonuses or incentives you're providing to sweeten the deal?",
      "How you're addressing risk with guarantees (e.g., money-back, satisfaction)?",
      'Why your audience should act now (urgency, scarcity, limited-time benefits)?',
      'How your offer addresses common objections like cost, commitment, or trust?',
    ],
  },
  {
    id: 'funnel',
    letter: 'F',
    headline: 'Funnel',
    subtitle: 'How well are you converting interest to outcomes?',
    subtext:
      'The process that converts ad viewers into paying customers. It includes the ad, landing page, and follow-up systems.',
    color: 'emerald',
    checklist: [
      'Whether your ad connects seamlessly with the landing page and offer?',
      'If your landing page is fast-loading, mobile-friendly, and easy to navigate?',
      'How your funnel guides potential customers step-by-step toward a decision?',
      'You are not leaving them unattended for long?',
      "How you're capturing leads effectively?",
      'If you have a follow-up system (emails, retargeting ads) to nurture leads?',
      'What trust signals (testimonials, reviews, certifications) are included to build credibility?',
      "How you're tracking conversions, clicks, and drop-off points in your funnel?",
      "If you're prepared to A/B test and optimize your funnel continuously?",
    ],
  },
];

export function getClassification(totalScore: number): ClassificationResult {
  if (totalScore === 0) {
    return {
      level: 'none',
      label: 'Enter scores first',
      recommendation: 'Rate each category from 1 to 5 to see your results.',
      color: 'slate',
    };
  }
  if (totalScore >= 20) {
    return {
      level: 'excellent',
      label: 'Extremely High Success Probability',
      recommendation:
        "You're in a great place to scale your campaigns. Your marketing foundation is rock solid.",
      color: 'emerald',
    };
  }
  if (totalScore >= 15) {
    return {
      level: 'good',
      label: 'High Success Probability',
      recommendation:
        'You can scale and also work on extracting more value from your existing setup.',
      color: 'cyan',
    };
  }
  if (totalScore >= 10) {
    return {
      level: 'moderate',
      label: 'Low Success Probability',
      recommendation:
        'Some areas need work. Campaigns are likely unstable and expensive right now.',
      color: 'amber',
    };
  }
  return {
    level: 'low',
    label: 'Extremely Low Success Probability',
    recommendation:
      'Not ready to run ads — 99% likely to fail. Focus on building your foundation first.',
    color: 'rose',
  };
}
