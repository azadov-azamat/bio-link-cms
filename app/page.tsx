'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Trust from '@/components/trust'
import Features from '@/components/features'
import TemplateCarousel from '@/components/template-carousel'
import HowItWorks from '@/components/how-it-works'
import CTA from '@/components/cta'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Trust />
      <Features />
      <TemplateCarousel />
      <HowItWorks />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  )
}
