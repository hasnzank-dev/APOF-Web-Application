import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import type { ActionItems } from '../types';

interface ActionPlanProps {
  actionItems: ActionItems;
  onActionChange: (category: keyof ActionItems, value: string) => void;
}

const columns: { key: keyof ActionItems; label: string; color: string; placeholder: string }[] = [
  {
    key: 'audience',
    label: 'Audience',
    color: 'accent',
    placeholder: 'e.g., Research customer demographics, survey existing clients...',
  },
  {
    key: 'product',
    label: 'Product',
    color: 'cyan',
    placeholder: 'e.g., Gather testimonials, improve packaging...',
  },
  {
    key: 'offer',
    label: 'Offer',
    color: 'amber',
    placeholder: 'e.g., Add money-back guarantee, create limited-time bonus...',
  },
  {
    key: 'funnel',
    label: 'Funnel',
    color: 'emerald',
    placeholder: 'e.g., Set up email follow-ups, optimize landing page speed...',
  },
];

const dotColorMap: Record<string, string> = {
  accent: 'bg-accent-400',
  cyan: 'bg-cyan-400',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
};

const borderColorMap: Record<string, string> = {
  accent: 'focus:border-accent-500/50',
  cyan: 'focus:border-cyan-500/50',
  amber: 'focus:border-amber-500/50',
  emerald: 'focus:border-emerald-500/50',
};

export default function ActionPlan({ actionItems, onActionChange }: ActionPlanProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12 sm:mt-16 mb-20"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <ClipboardList className="w-5 h-5 text-accent-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            My Plan
          </h2>
        </div>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Based on your score, create an action plan below. This will help you know where to focus
          when creating your ads strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {columns.map((col, i) => (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
            className="glass-card rounded-2xl p-5 sm:p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${dotColorMap[col.color]}`} />
              <h3 className="font-display font-semibold text-white text-lg">{col.label}</h3>
            </div>
            <textarea
              value={actionItems[col.key]}
              onChange={(e) => onActionChange(col.key, e.target.value)}
              placeholder={col.placeholder}
              rows={4}
              className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder:text-slate-600 resize-none outline-none transition-colors duration-200 ${borderColorMap[col.color]}`}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
