'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function CTA() {
  const plans = [
    {
      name: 'Shusha',
      price: '0',
      period: 'Oʻz',
      description: 'Boshlanuvchilar uchun',
      features: [
        '3 ta tarjima oyiga',
        'Asosiy shablonlar',
        'Email qoʻllab-quvvatlash',
      ],
      cta: 'Boshla',
      primary: false,
    },
    {
      name: 'Professional',
      price: '49,999',
      period: 'oyiga',
      description: 'Aktiv foydalanuvchilar uchun',
      features: [
        'Cheksiz tarjimalar',
        'Barcha shablonlar',
        'Priority qoʻllab-quvvatlash',
        'API kirish',
        'Advanced versionlash',
      ],
      cta: 'Hozir boshlash',
      primary: true,
    },
    {
      name: 'Enterprise',
      price: 'O\'ziga xos',
      period: 'Aloqani oling',
      description: 'Katta jamoalar uchun',
      features: [
        'Barcha Professional imkoniyatlari',
        'Custom branding',
        'SSO va SAML',
        'Dedicated support',
        'SLA garantiyasi',
      ],
      cta: 'Aloqa',
      primary: false,
    },
  ]

  return (
    <section className="py-24 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
            Sodda va Oʻz Imkoniyatiga Mos Narxlar
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-balance">
            Xohlagan rejani tanlang va darhol boshlang
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={plan.primary ? { y: -8 } : { y: -4 }}
              className={`rounded-lg p-8 transition-all ${
                plan.primary
                  ? 'bg-black text-white border-2 border-black ring-2 ring-black ring-offset-4 shadow-xl'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.primary && (
                <div className="inline-block px-3 py-1 bg-white text-black rounded-full text-xs font-bold mb-4">
                  TAVSIYA ETILGAN
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                {plan.price !== "O'ziga xos" && plan.period !== 'Aloqani oling' && (
                  <span className={plan.primary ? ' text-gray-300 text-sm' : ' text-gray-600 text-sm'}> {plan.period}</span>
                )}
              </div>
              <p className={plan.primary ? 'text-gray-300' : 'text-gray-600'}>
                {plan.description}
              </p>

              <button
                className={`w-full py-3 rounded-lg font-semibold mt-8 transition-colors ${
                  plan.primary
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>

              <div className={`mt-8 pt-8 border-t space-y-4 ${plan.primary ? 'border-gray-700' : 'border-gray-200'}`}>
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-sm">
            Barcha rejalar 14 kunlik bepul trial bilan keladi. Kredit kartasi talab qilinmaydi.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
