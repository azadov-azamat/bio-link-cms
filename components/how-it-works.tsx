'use client'

import { motion } from 'framer-motion'
import { Upload, FileCheck, Download, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Faylni Yuklang',
      description: 'Tarjima qilish uchun Word yoki PDF faylni yuklang',
    },
    {
      icon: FileCheck,
      title: 'Shablonni Tanlang',
      description: 'Sizga mos keladigan sertifikat shablonini tanlang',
    },
    {
      icon: Download,
      title: 'Tarjima Qiling',
      description: 'Professional tarjimonlar sizning matnni tarjima qilishadi',
    },
    {
      icon: CheckCircle,
      title: 'Sertifikat Oling',
      description: 'Tayyor sertifikatni yuklab oling va foydalaning',
    },
  ]

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
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-24 px-4 md:px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
            Qanday Ishlaydi?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            4 ta oddiy qadamda tarjima va sertifikat olishni boshlang
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-black via-black to-transparent -z-10" style={{
            top: '100px',
          }} />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div key={i} variants={itemVariants} className="relative">
                {/* Step Number Circle */}
                <motion.div
                  className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {i + 1}
                </motion.div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gray-50 border border-gray-200">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center text-sm">{step.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
