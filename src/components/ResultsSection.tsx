import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, AlertTriangle, BarChart3, RotateCcw } from 'lucide-react';
import type { Scores } from '../types';
import { getClassification } from '../data';

interface ResultsSectionProps {
  scores: Scores;
  onReset: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  excellent: <Zap className="w-6 h-6" />,
  good: <TrendingUp className="w-6 h-6" />,
  moderate: <AlertTriangle className="w-6 h-6" />,
  low: <TrendingDown className="w-6 h-6" />,
  none: <BarChart3 className="w-6 h-6" />,
};

const colorStyles: Record<string, { bar: string; text: string; bg: string; border: string; glow: string }> = {
  emerald: {
    bar: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    glow: 'glow-emerald',
  },
  cyan: {
    bar: 'bg-gradient-to-r from-cyan-500 to-cyan-400',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    glow: 'glow-accent',
  },
  amber: {
    bar: 'bg-gradient-to-r from-amber-500 to-amber-400',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    glow: 'glow-amber',
  },
  rose: {
    bar: 'bg-gradient-to-r from-rose-500 to-rose-400',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    glow: 'glow-rose',
  },
  slate: {
    bar: 'bg-gradient-to-r from-slate-600 to-slate-500',
    text: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    glow: '',
  },
};

const categoryBarColors: Record<string, string> = {
  audience: 'bg-accent-500',
  product: 'bg-cyan-500',
  offer: 'bg-amber-500',
  funnel: 'bg-emerald-500',
};

const categoryBarBgColors: Record<string, string> = {
  audience: 'bg-accent-500/20',
  product: 'bg-cyan-500/20',
  offer: 'bg-amber-500/20',
  funnel: 'bg-emerald-500/20',
};

export default function ResultsSection({ scores, onReset }: ResultsSectionProps) {
  const totalScore = useMemo(
    () => scores.audience + scores.product + scores.offer + scores.funnel,
    [scores]
  );
  const classification = useMemo(() => getClassification(totalScore), [totalScore]);
  const style = colorStyles[classification.color];
  const percentage = (totalScore / 20) * 100;

  const categoryBreakdown = [
    { key: 'audience', label: 'Audience', score: scores.audience },
    { key: 'product', label: 'Product', score: scores.product },
    { key: 'offer', label: 'Offer', score: scores.offer },
    { key: 'funnel', label: 'Funnel', score: scores.funnel },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-12 sm:mt-16"
    >
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
        Your Results
      </h2>

      <div className={`glass-card rounded-2xl p-6 sm:p-10 ${totalScore > 0 ? style.glow : ''}`}>
        {/* Score display */}
        <div className="text-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={totalScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex flex-col items-center"
            >
              <div className="relative mb-4">
                <span className={`font-display text-7xl sm:text-8xl font-bold ${style.text}`}>
                  {totalScore}
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-slate-600 ml-1">
                  /20
                </span>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${style.bg} ${style.border} border`}>
                {iconMap[classification.level]}
                <span className={`font-semibold text-sm sm:text-base ${style.text}`}>
                  {classification.label}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${style.bar}`}
            />
          </div>
        </div>

        {/* Category breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {categoryBreakdown.map((cat) => (
            <div key={cat.key} className="text-center">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">
                {cat.label}
              </p>
              <div className="flex items-center gap-2 justify-center">
                <div className={`h-2 flex-1 rounded-full ${categoryBarBgColors[cat.key]}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.score / 5) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`h-full rounded-full ${categoryBarColors[cat.key]}`}
                  />
                </div>
                <span className="text-sm font-bold text-slate-300 w-6 text-right">
                  {cat.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={classification.level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 rounded-xl ${style.bg} border ${style.border}`}
          >
            <p className="text-slate-300 leading-relaxed text-center text-sm sm:text-base">
              {classification.recommendation}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Reset button */}
        <AnimatePresence>
          {totalScore > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-6 text-center"
            >
              <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 cursor-pointer group"
              >
                <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-[-180deg] transition-transform duration-300" />
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
