'use client';

import { motion } from 'framer-motion';
import { Icons } from './icons';

export function FeaturesSection() {
  const features = [
    { Icon: Icons.Image, title: 'Logo va brend ko\'rinishi', desc: 'Logotipingizni yuklang, rang va shrift tanlab, o\'zingizga xos ko\'rinish yarating.', accent: '#F0FDF4', border: '#86EFAC' },
    { Icon: Icons.Link, title: 'Ijtimoiy tarmoqlar havolalari', desc: 'Instagram, Telegram, YouTube va boshqa tarmoqlarga havolalar qo\'shing.', accent: '#EFF6FF', border: '#93C5FD' },
    { Icon: Icons.Clock, title: 'Ish vaqti ko\'rsatish', desc: 'Har kunlik ish jadvali, bayram va ta\'til kunlarini batafsil ko\'rsating.', accent: '#FFF7ED', border: '#FCA5A5' },
    { Icon: Icons.MapPin, title: 'Manzil havolalari', desc: 'Google Maps, Yandex Maps va 2GIS havolalarini bir joyga jamlang.', accent: '#FDF4FF', border: '#D8B4FE' },
    { Icon: Icons.Phone, title: 'Telefon raqamlar', desc: 'Bir yoki bir nechta aloqa raqamlarini qo\'shing, tezkor qo\'ng\'iroq tugmasi bilan.', accent: '#F0FDFA', border: '#6EE7B7' },
    { Icon: Icons.Globe, title: 'Shaxsiy havola', desc: 'biosahifa.uz/ismingiz ko\'rinishida o\'zingizning maxsus havolangizni oling.', accent: '#FAFAFA', border: '#D1D5DB' },
    { Icon: Icons.Zap, title: 'Tez sozlash', desc: 'Ro\'yxatdan o\'tish va sozlashni 2-3 daqiqada yakunlang. Murakkab texnik bilim shart emas.', accent: '#FEFCE8', border: '#FDE047' },
    { Icon: Icons.Smartphone, title: 'Mobilga mos dizayn', desc: 'Barcha qurilmalarda, jumladan smartfon va planshetlarda mukammal ko\'rinadi.', accent: '#EFF6FF', border: '#93C5FD' },
  ];

  return (
    <section id="imkoniyatlar" className="py-24 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[13px] font-semibold text-zinc-400 uppercase tracking-widest mb-4">Imkoniyatlar</p>
          <h2 className="text-[40px] lg:text-[52px] font-black tracking-tight text-zinc-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
            Hamma narsa bir joyda
          </h2>
          <p className="mt-4 text-[17px] text-zinc-500 max-w-[500px] mx-auto leading-relaxed">
            Sahifangizni to'liq boshqarish uchun kerakli barcha vositalar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ Icon, title, desc, accent, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl p-6 border border-zinc-100 hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-900/5 transition-all cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-zinc-700 group-hover:scale-110 transition-transform"
                style={{ background: accent, border: `1.5px solid ${border}` }}
              >
                <Icon />
              </div>
              <h3 className="text-[15px] font-bold text-zinc-900 mb-2 leading-snug">{title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
