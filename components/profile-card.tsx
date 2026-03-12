'use client';

import { motion } from 'framer-motion';
import { Icons } from './icons';

interface ProfileCardProps {
  theme?: 'light' | 'dark';
  name: string;
  handle: string;
  bio: string;
  color: string;
  accent: string;
  delay?: number;
}

export function ProfileCard({ 
  theme = 'light', 
  name, 
  handle, 
  bio, 
  color, 
  accent, 
  delay = 0 
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-55 rounded-[28px] overflow-hidden shadow-2xl ${
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      }`}
      style={{ border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }}
    >
      {/* Top gradient bar */}
      <div className="h-20 w-full" style={{ background: `linear-gradient(135deg, ${color}, ${accent})` }} />
      <div className="px-5 pb-5">
        {/* Avatar */}
        <div className="relative -mt-8 mb-3">
          <div
            className="w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${accent})` }}
          >
            {name[0]}
          </div>
        </div>
        <div className={`text-[14px] font-bold mb-0.5 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          {name}
        </div>
        <div className={`text-[11px] mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
          @{handle}
        </div>
        <div className={`text-[11px] leading-relaxed mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {bio}
        </div>

        {/* Buttons */}
        {['Bog\'lanish', 'Portfolio', 'Telegram'].map((btn, i) => (
          <div
            key={i}
            className={`w-full py-2 px-3 mb-1.5 rounded-xl text-center text-[11px] font-semibold ${
              i === 0
                ? 'text-white'
                : theme === 'dark'
                  ? 'bg-white/10 text-white/80'
                  : 'bg-zinc-100 text-zinc-600'
            }`}
            style={i === 0 ? { background: `linear-gradient(135deg, ${color}, ${accent})` } : {}}
          >
            {btn}
          </div>
        ))}

        {/* Social */}
        <div className="flex gap-2 mt-3 justify-center">
          {[<Icons.Instagram key="i" />, <Icons.Telegram key="t" />, <Icons.Youtube key="y" />].map((Icon, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-zinc-100 text-zinc-500'
              }`}
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
