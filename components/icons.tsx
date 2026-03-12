'use client';

export const Icons = {
  Logo: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="#111" />
      <path d="M8 10h10a6 6 0 010 12H8V10z" fill="white" opacity="0.9" />
      <circle cx="22" cy="16" r="3" fill="#6EE7B7" />
    </svg>
  ),
  Menu: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Globe: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2c0 0-3 3-3 8s3 8 3 8M10 2c0 0 3 3 3 8s-3 8-3 8M2 10h16" stroke="currentColor" strokeWidth="1.5" /></svg>,
  Link: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 12l4-4M6 10l-1.5 1.5a3.5 3.5 0 004.95 4.95L11 14.9M14 10l1.5-1.5a3.5 3.5 0 00-4.95-4.95L9 5.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  MapPin: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>,
  Phone: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 3h3l1.5 3.5-2 1.2a9 9 0 004.8 4.8l1.2-2L17 11.5V14.5A2.5 2.5 0 0114.5 17C8 17 3 12 3 5.5A2.5 2.5 0 015.5 3H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Palette: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 100 16 4 4 0 000-8 4 4 0 010-8z" stroke="currentColor" strokeWidth="1.5" /><circle cx="6" cy="8" r="1.2" fill="currentColor" /><circle cx="14" cy="8" r="1.2" fill="currentColor" /><circle cx="10" cy="6" r="1.2" fill="currentColor" /></svg>,
  Zap: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Smartphone: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="10" cy="16" r="0.8" fill="currentColor" /></svg>,
  Image: () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="7" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M2 14l4-4 3 3 3-3 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Instagram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  Telegram: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Twitter: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 4s-2.7 1-4.2 1.3A6.1 6.1 0 004 9v1A14.5 14.5 0 012 5s-4 9 5 13a15.8 15.8 0 01-9 2c9 5 20 0 20-11.5 0-.28-.03-.55-.08-.82C19.14 6.55 22 4 22 4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Facebook: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  Youtube: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 8s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C15.6 4 12 4 12 4s-3.6 0-5.8.2c-.6 0-1.9 0-3 1.2C2.3 6 2 8 2 8S1.8 10.3 1.8 12.6v2.1c0 2.3.2 4.6.2 4.6s.3 2 1.2 2.7c1.1 1.1 2.6 1.1 3.3 1.1C8.7 23.2 12 23.2 12 23.2s3.6 0 5.8-.3c.6 0 1.9 0 3-1.2.9-.7 1.2-2.7 1.2-2.7s.2-2.3.2-4.6v-2.2C22.2 10.2 22 8 22 8z" stroke="currentColor" strokeWidth="1.8" /><polygon points="10,8.5 15,12 10,15.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /></svg>,
};
