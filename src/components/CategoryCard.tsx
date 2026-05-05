import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  score: number;
  onScoreChange: (score: number) => void;
  index: number;
}

const colorMap: Record<string, { bg: string; text: string; border: string; activeBg: string; glow: string }> = {
  accent: {
    bg: 'bg-accent-500/10',
    text: 'text-accent-400',
    border: 'border-accent-500/30',
    activeBg: 'bg-accent-500',
    glow: 'glow-accent',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    activeBg: 'bg-cyan-500',
    glow: 'glow-accent',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    activeBg: 'bg-amber-500',
    glow: 'glow-amber',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    activeBg: 'bg-emerald-500',
    glow: 'glow-emerald',
  },
};

export default function CategoryCard({ category, score, onScoreChange, index }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = colorMap[category.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${score > 0 ? colors.glow : ''}`}
    >
      <div className="p-8 sm:p-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            {/* Letter badge */}
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}
            >
              <span className={`font-display text-2xl font-bold ${colors.text}`}>
                {category.letter}
              </span>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                {category.headline}
              </h2>
              <p className={`text-base mt-1.5 ${colors.text} font-medium`}>{category.subtitle}</p>
            </div>
          </div>

          {/* Score indicator */}
          {score > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`flex-shrink-0 w-10 h-10 rounded-full ${colors.activeBg} flex items-center justify-center`}
            >
              <span className="text-white font-bold text-lg">{score}</span>
            </motion.div>
          )}
        </div>

        {category.subtext && (
          <p className="text-slate-400 text-base leading-relaxed mb-6">
            {category.subtext}
          </p>
        )}

        {/* Checklist toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 text-base font-medium ${colors.text} hover:opacity-80 transition-opacity mb-6 cursor-pointer`}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Hide checklist
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" /> View checklist to help you rate
            </>
          )}
        </button>

        {/* Checklist */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                {category.checklist.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.text} opacity-60`} />
                    <span className="text-base text-slate-300 leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score input */}
        <div>
          <p className="text-sm text-slate-500 uppercase tracking-wider font-medium mb-4">
            Rate from 1 to 5
          </p>
          <div className="flex gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => onScoreChange(value)}
                className={`score-btn flex-1 h-14 sm:h-16 rounded-xl font-display font-bold text-xl sm:text-2xl cursor-pointer transition-all duration-200
                  ${
                    score === value
                      ? `${colors.activeBg} text-white shadow-lg ${colors.glow} active`
                      : `bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white`
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
