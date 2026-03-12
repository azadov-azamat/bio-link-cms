'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TemplateCarousel() {
  const templates = [
    {
      id: 1,
      title: 'Biologiya Sertifikati',
      category: 'Biologiya',
      preview: 'Hujayra strukturasi, DNK va evolyutsiya mavzularini o\'z ichiga oladi',
    },
    {
      id: 2,
      title: 'Kimyo Sertifikati',
      category: 'Kimyo',
      preview: 'Kimyoviy reaksiyalar, Mendeleev jadvali va organik kimyoni qamrasa',
    },
    {
      id: 3,
      title: 'Fizika Sertifikati',
      category: 'Fizika',
      preview: 'Mexanika, elektronika, termizmi va optika fanlarini o\'z ichiga oladi',
    },
    {
      id: 4,
      title: 'Geologiya Sertifikati',
      category: 'Geologiya',
      preview: 'Minerallar, toshlr va yer tarixini qamrasa',
    },
    {
      id: 5,
      title: 'Ekologiya Sertifikati',
      category: 'Ekologiya',
      preview: 'Ekotizimlar, iqlim o\'zgarishi va biologiya xilma-xilligini qamrasa',
    },
    {
      id: 6,
      title: 'Astronomiya Sertifikati',
      category: 'Astronomiya',
      preview: 'Planetlar, yulduzlar va kosmik jarayonlarni qamrasa',
    },
    {
      id: 7,
      title: 'Matematika Sertifikati',
      category: 'Matematika',
      preview: 'Algebra, geometriya va analitik matematikani qamrasa',
    },
    {
      id: 8,
      title: 'Informatika Sertifikati',
      category: 'Informatika',
      preview: 'Dasturlash, algoritmlar va veb texnologiyalari qamrasa',
    },
  ]

  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % templates.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovered, templates.length])

  const next = () => setCurrent((prev) => (prev + 1) % templates.length)
  const prev = () => setCurrent((prev) => (prev - 1 + templates.length) % templates.length)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const visibleCards = isMobile ? 1 : 3
  const cards = []
  for (let i = 0; i < visibleCards; i++) {
    cards.push(templates[(current + i) % templates.length])
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
            Tayyor Shablonlar
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Turli xil fan sohalari uchun tayyorlanmish shablonlardan foydalaning
          </p>
        </motion.div>

        <div
          className="relative px-0 md:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{
                x: current === 0 ? 0 : -current * (100 / visibleCards),
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  className="flex-shrink-0 w-full md:w-1/3 min-w-0"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-5 md:p-6 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all h-full">
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-700 mb-4">
                      {template.category}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-black mb-3">{template.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{template.preview}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors z-10"
            aria-label="Previous templates"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors z-10"
            aria-label="Next templates"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(templates.length / visibleCards) }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i * visibleCards)}
                className={`h-2 rounded-full transition-all ${
                  Math.floor(current / visibleCards) === i
                    ? 'bg-black w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
