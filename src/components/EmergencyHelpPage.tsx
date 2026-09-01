import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, HeartPulse, Hospital, MapPin, Phone, ShieldAlert, Siren, UsersRound } from 'lucide-react';
import { OdishaDivider, PattachitraGrainBackground } from './OdishaMotifs';

type HelpContact = {
  label: string;
  number: string;
  detail: string;
  icon: React.ElementType;
  accent: string;
};

const HELP_CONTACTS: HelpContact[] = [
  { label: 'Emergency response', number: '112', detail: 'Police, fire, ambulance, disaster and other urgent help.', icon: Siren, accent: 'bg-[#b84a2d]' },
  { label: 'Medical ambulance', number: '108', detail: 'Free emergency medical ambulance service.', icon: HeartPulse, accent: 'bg-[#3f7252]' },
  { label: 'Women’s helpline', number: '181', detail: 'Support for women facing distress or safety concerns.', icon: UsersRound, accent: 'bg-[#93522d]' },
  { label: 'Tourist help — Puri', number: '6370967100', detail: 'Official tourist helpline for visitors in Puri.', icon: MapPin, accent: 'bg-[#315b80]' },
  { label: 'Cyber fraud', number: '1930', detail: 'Report suspected online financial fraud promptly.', icon: ShieldAlert, accent: 'bg-[#664f89]' },
  { label: 'Road & highway help', number: '1033', detail: 'National Highway emergency assistance.', icon: Hospital, accent: 'bg-[#7a6743]' },
];

interface EmergencyHelpPageProps {
  onBackHome: () => void;
}

export const EmergencyHelpPage: React.FC<EmergencyHelpPageProps> = ({ onBackHome }) => {
  const [slideValue, setSlideValue] = useState(0);
  const [requestConfirmed, setRequestConfirmed] = useState(false);

  const confirmRequest = (value: number) => {
    setSlideValue(value);
    if (value >= 92) {
      setRequestConfirmed(true);
      setSlideValue(100);
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#faf8f4] text-[#17263a]">
      <PattachitraGrainBackground />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_7%,rgba(184,74,45,0.11),transparent_25%),radial-gradient(circle_at_92%_18%,rgba(47,93,76,0.1),transparent_24%)]" />

      <section className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="relative overflow-hidden rounded-[26px] border border-[#e6cba9] bg-[#172d49] px-6 py-9 text-white shadow-[0_18px_46px_rgba(24,47,89,0.17)] sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_87%_20%,rgba(244,197,139,0.22),transparent_28%),radial-gradient(circle_at_12%_110%,rgba(184,74,45,0.35),transparent_34%)]" />
          <div className="pointer-events-none absolute -right-14 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-[#f4c58b]/20" />
          <div className="relative max-w-3xl">
            <button type="button" onClick={onBackHome} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-[#f4c58b]">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </button>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#f4c58b]/45 bg-[#f4c58b]/10 shadow-[0_0_0_7px_rgba(244,197,139,0.06)]">
                <ShieldAlert className="h-7 w-7 text-[#f4c58b]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f4c58b]">Odysha travel support</p>
                <h1 className="mt-2 font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl">Help is close at hand.</h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/84 sm:text-lg">Essential official contacts for medical, safety, travel and ethical concerns while you are exploring Odisha.</p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-medium text-white/85">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Available 24/7 via 112</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Official contact details</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">No login required</span>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="rounded-[24px] border border-[#eadaca] bg-white/70 p-5 shadow-[0_12px_34px_rgba(66,48,29,0.07)] backdrop-blur-sm sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b84a2d]">If it is urgent</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#14243b]">Call first. Don’t wait for a reply.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#627080]">For immediate danger, serious illness, accident, fire or disaster, call the unified emergency number. Odysha is not an emergency-response service.</p>
            <a href="tel:112" className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#b84a2d] px-5 py-4 text-white shadow-[0_10px_26px_rgba(184,74,45,0.25)] transition hover:bg-[#9f3e25] sm:px-6">
              <span className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Phone className="h-5 w-5" /></span><span><span className="block text-xs font-semibold uppercase tracking-[0.15em] text-white/75">Call now</span><span className="mt-0.5 block text-2xl font-semibold">112</span></span></span>
              <ChevronRight className="h-6 w-6" />
            </a>
          </div>

          <div className="rounded-[24px] border border-[#d8c5a7] bg-[#fff7e9]/90 p-5 shadow-[0_12px_34px_rgba(66,48,29,0.07)] sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a562f]">Request Odysha follow-up</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#14243b]">Need someone to check in?</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#627080]">Slide to confirm a help request. In the live product, this will securely notify the Odysha support team by email.</p>
            {requestConfirmed ? (
              <div className="mt-5 rounded-2xl border border-[#a6c9ad] bg-[#edf8ee] px-4 py-4 text-[#245536]">
                <div className="flex items-center gap-2 font-semibold"><Check className="h-5 w-5" /> Help request confirmed</div>
                <p className="mt-1 text-sm leading-relaxed text-[#467153]">For this prototype, no email has been sent. If there is any immediate risk, call 112 now.</p>
              </div>
            ) : (
              <div className="relative mt-6 h-14 overflow-hidden rounded-2xl border border-[#d7c4a6] bg-white shadow-inner">
                <div className="pointer-events-none absolute inset-y-0 left-0 rounded-2xl bg-[#f2d3a7]/65 transition-[width] duration-150" style={{ width: `${slideValue}%` }} />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center pl-10 text-xs font-semibold uppercase tracking-[0.14em] text-[#765b42]">Slide to request help</div>
                <input aria-label="Slide to request help" type="range" min="0" max="100" value={slideValue} onChange={(event) => confirmRequest(Number(event.target.value))} onPointerUp={() => { if (slideValue < 92) setSlideValue(0); }} className="absolute inset-0 z-10 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0" />
                <div className="pointer-events-none absolute top-1.5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#172d49] text-white shadow-md transition-[left] duration-150" style={{ left: `calc(${slideValue}% - 2.75rem)` }}><ChevronRight className="h-5 w-5" /></div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 sm:mt-16" aria-labelledby="official-contacts">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b84a2d]">Official helplines</p>
              <h2 id="official-contacts" className="mt-2 font-serif text-3xl font-semibold text-[#14243b]">Find the right kind of help.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#627080]">Tap a card to call. Details below are sourced from Odisha Government and Odisha Police helpline pages.</p>
          </div>
          <OdishaDivider className="my-5 justify-start" maxHeight="max-h-5" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_CONTACTS.map(({ label, number, detail, icon: Icon, accent }) => (
              <a key={number} href={`tel:${number}`} className="group rounded-[20px] border border-[#e5d6c5] bg-white/75 p-5 shadow-[0_8px_24px_rgba(66,48,29,0.055)] transition hover:-translate-y-1 hover:border-[#d7b083] hover:shadow-[0_14px_30px_rgba(66,48,29,0.1)]">
                <div className="flex items-start justify-between gap-3"><div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${accent}`}><Icon className="h-5 w-5" /></div><Phone className="h-4 w-4 text-[#b84a2d] transition group-hover:scale-110" /></div>
                <h3 className="mt-5 text-sm font-semibold text-[#233348]">{label}</h3>
                <p className="mt-1 font-serif text-3xl font-semibold tracking-tight text-[#14243b]">{number}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#627080]">{detail}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#eadaca] bg-white/55 px-5 py-5 text-sm leading-relaxed text-[#627080] sm:px-6">
          <p><strong className="text-[#233348]">Keep in mind:</strong> If you are unsafe, unable to travel, or worried about a medical emergency, use the official helpline first. Odysha cannot dispatch emergency services. Verify non-urgent information with the relevant official authority.</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[#9a562f]">
            <a className="underline decoration-[#d9a26c]/60 underline-offset-4 hover:text-[#b84a2d]" href="https://odisha.gov.in/en/contacts/emergency" target="_blank" rel="noreferrer">Odisha Government emergency contacts</a>
            <a className="underline decoration-[#d9a26c]/60 underline-offset-4 hover:text-[#b84a2d]" href="https://police.odisha.gov.in/en/sun/helplinenumber" target="_blank" rel="noreferrer">Odisha Police helpline numbers</a>
          </div>
        </section>
      </main>
    </div>
  );
};
