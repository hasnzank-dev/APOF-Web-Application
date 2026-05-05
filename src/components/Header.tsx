import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
        {/* Logo badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8"
        >
          <Target className="w-4 h-4 text-accent-400" />
          <span className="text-sm font-medium text-accent-400 tracking-wide">
            APOF FRAMEWORK
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Business Audit{' '}
          <span className="bg-gradient-to-r from-accent-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Tool
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Assess the efficiency of your marketing foundation across{' '}
          <span className="text-accent-400 font-medium">Audience</span>,{' '}
          <span className="text-cyan-400 font-medium">Product</span>,{' '}
          <span className="text-amber-400 font-medium">Offer</span> &{' '}
          <span className="text-emerald-400 font-medium">Funnel</span>.
        </motion.p>

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </header>
  );
}
