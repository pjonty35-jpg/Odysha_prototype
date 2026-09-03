import React from 'react';
import { motion } from 'motion/react';
import { Heart, Instagram, Sparkles } from 'lucide-react';
import { SectionFlourish } from './OdishaMotifs';
import biswarupaPhoto from '../assets/images/team-biswarupa-mohapatra.jpeg';
import swadeshnaPhoto from '../assets/images/team-swadeshna-behera.jpeg';
import ashaPhoto from '../assets/images/team-asha-das.jpeg';
import shubhranilPhoto from '../assets/images/team-shubhranil-chaudhuri.jpeg';
import bighneshPhoto from '../assets/images/team-bighnesh-patro.jpeg';
import susmitaPhoto from '../assets/images/team-susmita-pradhan.jpeg';
import jagannathPhoto from '../assets/images/team-jagannath-prasad-behera.jpeg';

const teamMembers = [
  { name: 'Biswarupa Mohapatra', photo: biswarupaPhoto },
  { name: 'Swadeshna Behera', photo: swadeshnaPhoto },
  { name: 'Asha Das', photo: ashaPhoto },
  { name: 'Shubhranil Chaudhuri', photo: shubhranilPhoto },
  { name: 'Bighnesh Patro', photo: bighneshPhoto },
  { name: 'Susmita Pradhan', photo: susmitaPhoto },
  {
    name: 'Jagannath Prasad Behera',
    photo: jagannathPhoto,
    role: 'SPC',
    instagram: 'er._jonty_prasad',
  },
];

export const TeamSection: React.FC = () => (
  <section className="relative overflow-hidden bg-[#faf8f4] px-4 pb-14 pt-0 sm:px-6 sm:pb-20 sm:pt-0 lg:px-8">
    <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-56 w-56 rounded-full bg-[#d98b57]/20 blur-3xl" />
    <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-[#789b76]/15 blur-3xl" />
    <div className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-[#d9a04a]/15 blur-3xl" />

    <div className="relative z-10 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl pt-1 text-center sm:pt-2"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d98b57]/25 bg-white/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a44729] shadow-sm backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          With gratitude
        </div>
        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#172d49] sm:text-4xl lg:text-5xl">
          The Team
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5c6672] sm:text-base">
          Seven hearts, one shared love for Odisha, and a journey we will always treasure.
        </p>
        <SectionFlourish icon="mandala" className="mt-4 mb-8 sm:mb-10" maxHeight="max-h-6 sm:max-h-8" />
      </motion.div>

      <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/45 p-3 shadow-[0_18px_50px_rgba(112,72,42,0.13)] backdrop-blur-md sm:rounded-[34px] sm:p-5 lg:p-7">
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#c9552d]/45 to-transparent" />
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-7 xl:gap-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-[#eadfce] bg-[#fffdf9]/90 p-2 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-1 sm:rounded-[22px] sm:p-2.5 ${index < 3 ? 'col-span-2' : 'col-span-3'}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#eadfce] sm:rounded-2xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <div className="min-h-16 px-1 pb-1 pt-2 sm:min-h-[74px] sm:pt-3">
                <h3 className="font-serif text-sm font-bold leading-tight text-[#1d3147] sm:text-base">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#b84a2d]">
                    {member.role}
                  </p>
                )}
                {member.instagram && (
                  <a
                    href={`https://www.instagram.com/${member.instagram}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#78614d] transition hover:text-[#b84a2d]"
                    aria-label={`Follow ${member.name} on Instagram`}
                  >
                    <Instagram className="h-3 w-3" /> @{member.instagram}
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#e8dccb] pt-4 text-center text-xs text-[#706a63] sm:mt-6 sm:pt-5 sm:text-sm">
          <Heart className="h-4 w-4 fill-[#c9552d] text-[#c9552d]" />
          <span>Made with care, curiosity, and a little Odisha magic.</span>
        </div>
      </div>
    </div>
  </section>
);
