'use client'

import { motion } from 'framer-motion'

export default function Trust() {
  const stats = [
    { number: '5,000+', label: 'Foydalanuvchi' },
    { number: '50,000+', label: 'Tarjima Qilindi' },
    { number: '98%', label: 'Qoniqish Darajasi' },
    { number: '24/7', label: 'Qo\'llab-Quvvatlash' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                {stat.number}
              </motion.div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
