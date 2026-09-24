import React from 'react';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { PattachitraGrainBackground, SectionFlourish } from './OdishaMotifs';
import { TeamSection } from './TeamSection';

interface AboutUsPageProps {
  onBackHome: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBackHome }) => (
  <div className="relative isolate overflow-hidden bg-[#faf8f4] py-10 sm:py-14">
    <PattachitraGrainBackground />
    <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#d98b57]/15 blur-3xl" />

    <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-2 rounded-full border border-[#d98b57]/30 bg-white/55 px-4 py-2 text-sm font-semibold text-[#172d49] shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#c9552d]/50 hover:text-[#b84a2d]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </button>

      <section className="mx-auto max-w-3xl pb-10 pt-12 text-center sm:pb-14 sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d98b57]/25 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#a44729] shadow-sm backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          About Odysha
        </div>
        <h1 className="mt-5 font-serif text-4xl font-bold tracking-tight text-[#172d49] sm:text-5xl lg:text-6xl">
          Rooted in Odisha.<br />Made for meaningful journeys.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5c6672] sm:text-lg">
          Odysha brings local knowledge, authentic discoveries and thoughtful planning together—so every traveller can experience Odisha with confidence and care.
        </p>
        <SectionFlourish icon="mandala" className="mt-7" maxHeight="max-h-7 sm:max-h-9" />
      </section>
    </main>

    <TeamSection />

    <section className="relative z-10 mx-auto max-w-4xl px-4 pb-4 text-center sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-[#eadfce] bg-white/45 px-6 py-7 shadow-[0_14px_38px_rgba(112,72,42,0.1)] backdrop-blur-md sm:px-10">
        <Heart className="mx-auto h-5 w-5 fill-[#c9552d] text-[#c9552d]" />
        <p className="mt-3 font-serif text-xl font-bold text-[#172d49]">Our promise</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#5c6672] sm:text-base">
          To help people discover the wider Odisha—responsibly, safely and with respect for the places and communities that make it special.
        </p>
      </div>
    </section>
  </div>
);
