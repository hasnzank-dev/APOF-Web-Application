import { useState, useCallback } from 'react';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import ResultsSection from './components/ResultsSection';
import ActionPlan from './components/ActionPlan';
import Footer from './components/Footer';
import { categories } from './data';
import type { Scores, ActionItems } from './types';

export default function App() {
  const [scores, setScores] = useState<Scores>({
    audience: 0,
    product: 0,
    offer: 0,
    funnel: 0,
  });

  const [actionItems, setActionItems] = useState<ActionItems>({
    audience: '',
    product: '',
    offer: '',
    funnel: '',
  });

  const handleScoreChange = useCallback((categoryId: string, value: number) => {
    setScores((prev) => ({ ...prev, [categoryId]: value }));
  }, []);

  const handleActionChange = useCallback((category: keyof ActionItems, value: string) => {
    setActionItems((prev) => ({ ...prev, [category]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setScores({ audience: 0, product: 0, offer: 0, funnel: 0 });
    setActionItems({ audience: '', product: '', offer: '', funnel: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="animated-gradient min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Assessment Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              score={scores[category.id as keyof Scores]}
              onScoreChange={(value) => handleScoreChange(category.id, value)}
              index={index}
            />
          ))}
        </section>

        {/* Results */}
        <ResultsSection scores={scores} onReset={handleReset} />

        {/* Action Plan */}
        <ActionPlan actionItems={actionItems} onActionChange={handleActionChange} />
      </main>

      <Footer />
    </div>
  );
}
