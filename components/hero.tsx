'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6 md:space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-tight text-balance"
          >
            Fan Matnlarini Tarjima Qiling,<br className="hidden sm:block" />
            <span className="text-gray-600">Sertifikat Oling</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Biologiya, kimyo, fizika va boshqa fan sohalari uchun professional tarjima va sertifikat xizmatlari. 
            O'zingizning shablonlarini yarating va tarjima ish oqimini soddalashtiring.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 md:pt-4 w-full"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
            >
              Bepul Boshlang
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Demo Ko'ring
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-8"
          >
            <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
          </motion.div>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      </div>
    </section>
  )
}
