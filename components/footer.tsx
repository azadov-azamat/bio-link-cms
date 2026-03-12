'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    Product: ['Xususiyatlar', 'Narxlar', 'Shablonlar', 'API'],
    Company: ['Haqida', 'Blog', 'Martaba', 'Hamkorlik'],
    Resources: ['Hujjatlar', 'Qoʻllab-quvvatlash', 'Community', 'Status'],
    Legal: ['Shartlar', 'Xususiylik', 'Cookies', 'Litsenziya'],
  }

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
    <footer className="bg-black text-white pt-12 md:pt-20 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 mb-8 md:mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
            <div className="text-xl md:text-2xl font-bold mb-4">
              Bio<span className="text-gray-400">Sahifa</span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Fan matnlarini tarjima qilish va sertifikat olishning eng oson yo\'li.
            </p>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="col-span-1"
            >
              <h4 className="font-semibold text-sm md:text-base mb-3 md:mb-4">{category}</h4>
              <ul className="space-y-2 md:space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 py-8 md:py-12 border-t border-gray-800"
        >
          <motion.a
            variants={itemVariants}
            href="mailto:support@biosahifa.uz"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="text-xs md:text-sm">support@biosahifa.uz</span>
          </motion.a>

          <motion.a
            variants={itemVariants}
            href="tel:+998712345678"
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="text-xs md:text-sm">+998 (71) 234-56-78</span>
          </motion.a>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-gray-400"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="text-xs md:text-sm">Tashkent, O'zbekistan</span>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 md:py-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0"
        >
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            © {currentYear} BioSahifa. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex gap-3 md:gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a4.5 4.5 0 01-1.3-4.5z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
