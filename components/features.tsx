'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: 'Professional Tarjima',
      description: 'Mutaxassis tarjimonlar tomonidan tasdiqlanmish tarjimalar',
      items: ['Tez Turish', 'Sifatli Natija', 'Reviziya Qilish'],
    },
    {
      title: 'Avtomatik Sertifikat',
      description: 'Turli xil shablonlardan tanlang va avtomatik sertifikat yarating',
      items: ['Har Hil Format', 'Tez Export', 'Xifiy Saqlash'],
    },
    {
      title: 'Oson Collaboration',
      description: 'Jamoaviy ishlash uchun tayyor alat',
      items: ['Real-time Tahrir', 'Comment Qilish', 'Versiya Boshqarish'],
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-24 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
            Nima Biz Taklif Qilamiz?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Tarjima va sertifikat qilishning barcha jarayonini soddalashtiring
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="p-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <div className="space-y-3">
                {feature.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-black flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
