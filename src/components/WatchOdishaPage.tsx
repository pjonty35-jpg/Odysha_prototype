import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Compass, Play, X } from 'lucide-react';
import { OdishaDivider, PattachitraGrainBackground } from './OdishaMotifs';
import chilikaImage from '../assets/images/explore_chilika.jpg';
import deomaliImage from '../assets/images/explore_deomali.jpg';
import dudumaImage from '../assets/images/explore_duduma.jpg';
import konarkImage from '../assets/images/explore_konark.jpg';
import puriImage from '../assets/images/explore_puri_beach.jpg';
import raghurajpurImage from '../assets/images/explore_raghurajpur.jpg';
import lingarajImage from '../assets/images/explore_lingaraj.jpg';
import gulmiImage from '../assets/images/explore_gulmi.jpg';
import watchOdishaBg from '../assets/images/WatchOdishaBg.jpg';

interface WatchStory {
  id: string;
  location: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  videoId: string;
  format: 'long' | 'short';
}

const FEATURED_FILMS: WatchStory[] = [
  {
    id: 'chilika-film',
    location: 'Chilika Lake',
    title: 'The lagoon that changes with the light',
    description: 'A slower journey through boats, birds and the quiet expanse of Chilika.',
    image: chilikaImage,
    duration: '02:31',
    videoId: 'DDKQDpY_nCo',
    format: 'long',
  },
  {
    id: 'konark-film',
    location: 'Konark Sun Temple',
    title: 'A monument written in stone',
    description: 'See the form, symbolism and detail behind Odisha’s most iconic temple.',
    image: konarkImage,
    duration: '03:08',
    videoId: 'ruqZJSXLkg0',
    format: 'long',
  },
  {
    id: 'duduma-film',
    location: 'Duduma Waterfall',
    title: 'Where the Eastern Ghats find their voice',
    description: 'A dramatic look at the Machkund River in southern Odisha.',
    image: dudumaImage,
    duration: '02:04',
    videoId: 'AQO-VLqYvy8',
    format: 'long',
  },
  {
    id: 'deomali-film',
    location: 'Deomali Hills',
    title: 'Above Odisha’s cloud line',
    description: 'A highland escape through the sweeping ridges of Koraput.',
    image: deomaliImage,
    duration: '02:18',
    videoId: 'EI0tylo7jhE',
    format: 'long',
  },
  {
    id: 'puri-film',
    location: 'Puri Beach',
    title: 'The coast wakes slowly',
    description: 'Sunrise, sea air and the everyday rhythm of Puri’s shoreline.',
    image: puriImage,
    duration: '02:42',
    videoId: 'lf_7Udg8sWE',
    format: 'long',
  },
  {
    id: 'raghurajpur-film',
    location: 'Raghurajpur',
    title: 'A village where every wall has a story',
    description: 'Meet the colours, craft and living traditions of Odisha’s art village.',
    image: raghurajpurImage,
    duration: '03:16',
    videoId: 'EM2CNmpttp8',
    format: 'long',
  },
  {
    id: 'lingaraj-film',
    location: 'Lingaraj Temple',
    title: 'Bhubaneswar’s living silhouette',
    description: 'A quiet encounter with the sacred geometry of the temple city.',
    image: lingarajImage,
    duration: '02:55',
    videoId: 'ECjPVsPnLnE',
    format: 'long',
  },
  {
    id: 'gulmi-film',
    location: 'Gulmi Waterfall',
    title: 'Into the green after the rain',
    description: 'A hidden waterfall journey through the forested hills of Koraput.',
    image: gulmiImage,
    duration: '01:52',
    videoId: 'sWuJjz88Yp8',
    format: 'long',
  },
];

const QUICK_GLIMPSES: WatchStory[] = [
  { id: 'puri-glimpse', location: 'Puri Beach', title: 'The coast, right now', description: 'A vertical glimpse of Puri’s shoreline.', image: puriImage, duration: '0:24', videoId: '0rBpuLCrkno', format: 'short' },
  { id: 'falls-glimpse', location: 'Duduma Waterfall', title: 'A waterfall in motion', description: 'A reel from Koraput’s dramatic falls.', image: dudumaImage, duration: '0:31', videoId: 'ZUKj2Yv_xyE', format: 'short' },
  { id: 'odisha-glimpse', location: 'Across Odisha', title: 'A state in a minute', description: 'A quick visual introduction to Odisha’s highlights.', image: deomaliImage, duration: '0:58', videoId: 'hFI-V2P_8YY', format: 'short' },
  { id: 'travel-glimpse', location: 'Odisha', title: 'Places worth a pause', description: 'A short travel guide to start your exploration.', image: raghurajpurImage, duration: '0:59', videoId: 'Sl1CyvTatWM', format: 'short' },
];

interface WatchOdishaPageProps {
  onBackHome: () => void;
  onPlanJourney: () => void;
}

export const WatchOdishaPage: React.FC<WatchOdishaPageProps> = ({ onBackHome, onPlanJourney }) => {
  const [activeStory, setActiveStory] = useState<WatchStory | null>(null);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#faf8f4] text-[#17263a]">
      <PattachitraGrainBackground />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_7%,rgba(195,118,48,0.12),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(20,43,75,0.1),transparent_24%)]" />

      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <div className="absolute inset-x-4 inset-y-0 overflow-hidden rounded-[22px] bg-[#172537] sm:inset-x-6 lg:inset-x-8">
          <img src={watchOdishaBg} alt="Aerial view of Kalijai Island on Chilika Lake" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101d2c]/78 via-[#132334]/42 to-[#132334]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101d2c]/25 via-transparent to-[#101d2c]/5" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <button type="button" onClick={onBackHome} className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>
          <div className="mt-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c58b]">Odysha visual explorer</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
              Watch Odisha unfold.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              From a quiet sunrise to a living craft, discover the many moods of Odisha before you choose your journey.
            </p>
            <OdishaDivider className="my-5 justify-start" maxHeight="max-h-5" />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="featured-films">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b84a2d]">Long-form stories</p>
              <h2 id="featured-films" className="mt-2 font-serif text-3xl font-semibold text-[#14243b]">Take your time with Odisha.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#627080]">Cinematic stories to help you understand the character of a place, not just its location.</p>
          </div>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {FEATURED_FILMS.map((story, index) => (
              <button key={story.id} type="button" onClick={() => setActiveStory(story)} className={`group relative min-h-[355px] overflow-hidden rounded-[24px] border border-white/70 text-left shadow-[0_16px_42px_rgba(22,38,54,0.14)] transition hover:-translate-y-1 ${index === 0 ? 'lg:col-span-2 lg:min-h-[430px]' : ''}`}>
                <img src={story.image} alt={story.location} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0b1b2d]/95 via-[#0b1b2d]/20 to-[#0b1b2d]/5" />
                <span className="relative flex h-full min-h-[355px] flex-col justify-between p-5 text-white sm:p-6">
                  <span className="flex items-center justify-between gap-4"><span className="rounded-full border border-white/35 bg-[#112941]/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] backdrop-blur-md">{story.location}</span><span className="text-xs font-semibold text-white/85">{story.duration}</span></span>
                  <span><span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/18 backdrop-blur-md"><Play className="ml-0.5 h-5 w-5 fill-current" /></span><span className="block max-w-xl font-serif text-2xl font-semibold leading-tight sm:text-3xl">{story.title}</span><span className="mt-2 block max-w-lg text-sm leading-relaxed text-white/80">{story.description}</span></span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-[#eadaca] pt-12 sm:mt-20 sm:pt-16" aria-labelledby="quick-glimpses">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b84a2d]">Quick glimpses</p>
              <h2 id="quick-glimpses" className="mt-2 font-serif text-3xl font-semibold text-[#14243b]">A little Odisha, right now.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#627080]">Short, vertical discoveries for the moments when curiosity strikes.</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {QUICK_GLIMPSES.map((story) => (
              <button key={story.id} type="button" onClick={() => setActiveStory(story)} className="group relative aspect-[9/14] overflow-hidden rounded-[22px] border border-white/70 text-left shadow-[0_12px_32px_rgba(22,38,54,0.13)] transition hover:-translate-y-1">
                <img src={story.image} alt={story.location} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0b1b2d]/95 via-[#0b1b2d]/15 to-transparent" />
                <span className="relative flex h-full flex-col justify-between p-3.5 text-white sm:p-4"><span className="flex items-center justify-between"><span className="rounded-full bg-black/25 px-2 py-1 text-[10px] font-semibold backdrop-blur-sm">{story.duration}</span><span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/65 bg-white/20 backdrop-blur-md"><Play className="ml-0.5 h-3.5 w-3.5 fill-current" /></span></span><span><span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f6ca91]">{story.location}</span><span className="mt-1 block font-serif text-lg font-semibold leading-tight">{story.title}</span></span></span>
              </button>
            ))}
          </div>
        </section>

        <section className="relative mt-16 overflow-hidden rounded-[26px] border border-[#38516d] bg-[#192d47] px-6 py-10 text-center text-white shadow-[0_18px_46px_rgba(24,47,89,0.16)] sm:mt-20 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_0%,rgba(244,197,139,0.34),transparent_25%),radial-gradient(circle_at_88%_100%,rgba(184,74,45,0.28),transparent_28%)]" />
          <div className="pointer-events-none absolute -left-5 top-1/2 hidden h-36 w-36 -translate-y-1/2 rounded-full border border-[#f4c58b]/25 sm:block" />
          <div className="pointer-events-none absolute -right-9 top-1/2 hidden h-48 w-48 -translate-y-1/2 rounded-full border border-[#f4c58b]/20 sm:block" />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#f4c58b]/45 bg-[#f4c58b]/10 shadow-[0_0_0_6px_rgba(244,197,139,0.06)]">
              <Compass className="h-5 w-5 text-[#f4c58b]" />
            </div>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f4c58b]">Turn inspiration into a route</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Ready to go beyond the screen?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">Save the feeling, then let Odysha shape it into a route that fits your time, interests and pace.</p>
            <div className="mx-auto mt-5 flex max-w-md flex-wrap justify-center gap-2 text-xs text-white/80">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Personalised route</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">Local discoveries</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">At your pace</span>
            </div>
            <button type="button" onClick={onPlanJourney} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#f8e7ce] px-5 py-3 text-sm font-semibold text-[#17263a] shadow-[0_8px_22px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-white">Plan my journey <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>
      </main>

      {activeStory && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0b1725]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStory.location} video`}
          onClick={() => setActiveStory(null)}
        >
          <div
            className={`w-full overflow-hidden rounded-2xl border border-white/25 bg-[#10233a] shadow-2xl ${activeStory.format === 'short' ? 'max-w-sm' : 'max-w-5xl'}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-5">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveStory(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f4c58b] transition hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Watch Odisha
                </button>
                <h3 className="mt-1 truncate font-serif text-lg">{activeStory.location}</h3>
              </div>
              <button type="button" onClick={() => setActiveStory(null)} className="shrink-0 rounded-full p-2 text-white/85 transition hover:bg-white/10" aria-label="Close video">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={activeStory.format === 'short' ? 'mx-auto h-[70vh] max-h-[760px] aspect-[9/16] bg-black' : 'aspect-video bg-black'}>
              <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${activeStory.videoId}?autoplay=1&rel=0`} title={`${activeStory.location} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};
