'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'


export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      q: 'Tarjima qilish uchun qancha vaqt kerak?',
      a: 'Ko\'pchilik tarjimalar 24 soat ichida tayyorladi. Express xizmati uchun faylni ishlash 4 soat ichida tamamlash mumkin.',
    },
    {
      q: 'Qanday fayllar yuklash mumkin?',
      a: 'Biz Word (.docx, .doc), PDF (.pdf), PowerPoint (.pptx) va boshqa standart formatlarni qabul qilamiz.',
    },
    {
      q: 'Sertifikatlar international tan olinadi?',
      a: 'Bizning sertifikatlar tarji qlash sohasi bo\'yicha international standartlarga muvofiq tayyorlanadi.',
    },
    {
      q: 'Mening matnlar xifya saqlanadi?',
      a: 'Ha, biz end-to-end encryption ishlatibs va GDPR muvofiq xifya shakltashni tasdiqlab qo\'yamiz.',
    },
    {
      q: 'API orqali integratsiya qilsa bo\'ladimi?',
      a: 'Ha, Professional va Enterprise rejalari API kirish bilan keladi. Hujjatlar uchun support@biosahifa.uz ga yozing.',
    },
    {
      q: 'Moyni qaytarish siyosati nima?',
      a: '30 kunlik moyni qaytarish kafolati bilan keladi. Har qanday masalada support@biosahifa.uz ga murojaat qiling.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-24 px-4 md:px-6 bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
            Tez-Tez Soʻraladigan Savollar
          </h2>
          <p className="text-base sm:text-lg text-gray-600 text-balance">
            Bizning xizmatlar haqida batafsil ma\'lumot
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-black text-base sm:text-lg pr-4">{faq.q}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <p className="p-4 sm:p-6 text-gray-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Boshqa savol bormi?</p>
          <motion.a
            href="mailto:support@biosahifa.uz"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Biz bilan Aloqa Qiling
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
