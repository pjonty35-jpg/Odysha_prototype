import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Music2,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { PattachitraGrainBackground, SectionFlourish } from './OdishaMotifs';
import festivalHero from '../assets/images/festivals/festival-hero.webp';
import baliJatraImage from '../assets/images/festivals/bali-jatra.webp';
import konarkDanceImage from '../assets/images/festivals/konark-dance.webp';
import nuakhaiImage from '../assets/images/festivals/nuakhai.webp';
import chaitaParabImage from '../assets/images/festivals/chaita-parab.webp';
import rajaParbaImage from '../assets/images/festivals/raja-parba.webp';
import dhanuYatraImage from '../assets/images/festivals/dhanu-yatra.webp';
import boitaBandanaImage from '../assets/images/festivals/boita-bandana.webp';
import rathYatraImage from '../assets/images/festivals/rath-yatra.webp';

type Festival = {
  id: string;
  name: string;
  district: string;
  region: string;
  monthKey: string;
  timing: string;
  tag: string;
  image: string;
  summary: string;
  story: string;
  whatToExpect: string[];
  where: string;
  etiquette: string[];
  safetyNote: string;
  videoId: string;
};

const DISTRICTS = [
  'All Odisha', 'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack',
  'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda',
  'Kalahandi', 'Kandhamal', 'Kendrapara', 'Keonjhar', 'Khordha', 'Koraput', 'Malkangiri',
  'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh',
];

const MONTHS = [
  { key: 'All', label: 'All year' }, { key: 'Jan', label: 'Jan' }, { key: 'Feb', label: 'Feb' },
  { key: 'Mar', label: 'Mar' }, { key: 'Apr', label: 'Apr' }, { key: 'May', label: 'May' },
  { key: 'Jun', label: 'Jun' }, { key: 'Jul', label: 'Jul' }, { key: 'Aug', label: 'Aug' },
  { key: 'Sep', label: 'Sep' }, { key: 'Oct', label: 'Oct' }, { key: 'Nov', label: 'Nov' },
  { key: 'Dec', label: 'Dec' },
];

const FESTIVALS: Festival[] = [
  {
    id: 'rath-yatra', name: 'Rath Yatra', district: 'Puri', region: 'Puri Grand Road', monthKey: 'Jun', timing: 'June–July · dates follow the lunar calendar', tag: 'Spiritual', image: rathYatraImage,
    summary: 'The great chariot journey that turns Puri into a moving celebration of devotion.',
    story: 'Rath Yatra brings Lord Jagannath, Balabhadra and Subhadra from the Jagannath Temple to the Gundicha Temple in grand wooden chariots. It is one of Odisha’s most widely recognised living traditions, shaped by devotion, craftsmanship and an immense shared public spirit.',
    whatToExpect: ['A ceremonial chariot procession', 'Traditional music and devotional atmosphere', 'Extremely high visitor numbers'],
    where: 'Puri, especially the Grand Road between the Jagannath Temple and Gundicha Temple.',
    etiquette: ['Check official access and traffic advisories before travelling.', 'Stay within police barricades and designated viewing areas.', 'Dress modestly and keep pathways clear for local worshippers.'],
    safetyNote: 'Crowds can become very dense. Carry water, keep your group together, and follow on-ground instructions from authorities.', videoId: 'hFI-V2P_8YY',
  },
  {
    id: 'konark-dance-festival', name: 'Konark Dance Festival', district: 'Puri', region: 'Konark', monthKey: 'Dec', timing: 'Early December · annual programme', tag: 'Dance & heritage', image: konarkDanceImage,
    summary: 'Classical dance and music performed against the timeless presence of the Sun Temple.',
    story: 'The Konark Dance Festival brings leading classical dance traditions to the cultural landscape surrounding the Sun Temple. Its evening performances frame living art alongside one of Odisha’s most celebrated monuments.',
    whatToExpect: ['Evening classical dance performances', 'A heritage setting near the Sun Temple', 'Seasonal cultural programming'],
    where: 'Konark, near the Sun Temple precinct and festival venue.',
    etiquette: ['Confirm programme times and entry rules before you go.', 'Arrive early for seating and security checks.', 'Keep phones on silent during performances.'],
    safetyNote: 'Use official parking and keep a warm layer for late outdoor performances.', videoId: 'MF1EzSs5LbQ',
  },
  {
    id: 'bali-jatra', name: 'Bali Jatra', district: 'Cuttack', region: 'Mahanadi riverfront', monthKey: 'Nov', timing: 'October–November · Kartika season', tag: 'Cultural fair', image: baliJatraImage,
    summary: 'A riverfront fair that remembers Odisha’s historic maritime connections.',
    story: 'Bali Jatra recalls the journeys of Odia seafarers who once sailed across the Bay of Bengal. Today, Cuttack’s riverfront fills with crafts, food, performances and boats that keep the memory of that maritime imagination alive.',
    whatToExpect: ['A large evening fair', 'Craft, food and cultural stalls', 'Riverfront lights and boating symbolism'],
    where: 'Cuttack riverfront fairgrounds along the Mahanadi.',
    etiquette: ['Use authorised entrances and official parking.', 'Keep children close in crowded fair areas.', 'Support artisans respectfully and ask before photographing stalls or people.'],
    safetyNote: 'Agree on a meeting point with your group and avoid stepping into restricted river-edge areas.', videoId: 'hFI-V2P_8YY',
  },
  {
    id: 'nuakhai', name: 'Nuakhai', district: 'Sambalpur', region: 'Western Odisha', monthKey: 'Sep', timing: 'August–September · after the new harvest', tag: 'Harvest', image: nuakhaiImage,
    summary: 'A warm harvest celebration centred on the first offering of new grain.',
    story: 'Nuakhai is a much-loved harvest observance across western Odisha. Families offer the season’s new rice before sharing a meal and renewing bonds with relatives and neighbours.',
    whatToExpect: ['New-rice offerings and home meals', 'Sambalpuri cultural expression', 'A family-centred atmosphere'],
    where: 'Sambalpur and western Odisha; the most meaningful experiences are community-led.',
    etiquette: ['Accept invitations only when genuinely offered.', 'Ask before entering homes or photographing rituals.', 'Dress simply and respectfully for a family observance.'],
    safetyNote: 'Festival schedules are local and may vary—confirm any public programme before building travel around it.', videoId: 'hFI-V2P_8YY',
  },
  {
    id: 'chaita-parab', name: 'Chaita Parab', district: 'Koraput', region: 'Koraput highlands', monthKey: 'Mar', timing: 'March–April · spring celebration', tag: 'Tribal culture', image: chaitaParabImage,
    summary: 'A springtime cultural gathering rooted in the rhythms of the Koraput highlands.',
    story: 'Chaita Parab is associated with the spring season and celebrates community, music and dance across the Koraput region. It is an opportunity to learn through local context rather than treating culture as a spectacle.',
    whatToExpect: ['Community music and dance', 'Highland landscapes and local markets', 'Events whose format can vary by locality'],
    where: 'Koraput district and nearby community venues; seek locally verified programmes.',
    etiquette: ['Ask for consent before photography or recording.', 'Follow the guidance of local hosts and organisers.', 'Buy directly from local makers where possible.'],
    safetyNote: 'Use locally arranged transport after dark and verify road conditions in the highlands.', videoId: 'hFI-V2P_8YY',
  },
  {
    id: 'raja-parba', name: 'Raja Parba', district: 'Khordha', region: 'Across Odisha', monthKey: 'Jun', timing: 'Mid-June · three-day monsoon festival', tag: 'Seasonal tradition', image: rajaParbaImage,
    summary: 'A monsoon festival of swings, flowers, rest and the renewal of the earth.',
    story: 'Raja Parba marks the arrival of the monsoon and honours the earth’s fertility through rest, play, special foods and flower-decorated swings. Its atmosphere is gentle, domestic and joyfully seasonal.',
    whatToExpect: ['Decorated swings and floral courtyards', 'Poda pitha and seasonal snacks', 'Monsoon celebrations in homes and public spaces'],
    where: 'Across Odisha, with strong public celebrations around Bhubaneswar and coastal towns.',
    etiquette: ['Treat home and temple spaces as private unless invited.', 'Ask before photographing families or children.', 'Wear footwear suitable for wet ground.'],
    safetyNote: 'Rain can make pathways slippery; carry a light rain layer and use well-lit routes at night.', videoId: 'hFI-V2P_8YY',
  },
  {
    id: 'dhanu-yatra', name: 'Dhanu Yatra', district: 'Bargarh', region: 'Bargarh town', monthKey: 'Dec', timing: 'December–January · annual open-air theatre', tag: 'Folk theatre', image: dhanuYatraImage,
    summary: 'An expansive open-air theatre that makes the town itself part of the stage.',
    story: 'Dhanu Yatra is a celebrated open-air retelling drawn from the Krishna tradition. During the festival, Bargarh’s streets and public spaces become an immersive theatre landscape with characters, processions and community audiences.',
    whatToExpect: ['Outdoor folk theatre', 'Town-wide procession and stage spaces', 'Late-evening performances'],
    where: 'Bargarh town, across designated public performance zones.',
    etiquette: ['Check performance timing with local organisers.', 'Do not cross performance routes or obstruct actors.', 'Be mindful of late-night noise and road diversions.'],
    safetyNote: 'Choose a known meeting point and arrange your return transport before late performances finish.', videoId: 'hFI-V2P_8YY',
  },
  {
    id: 'boita-bandana', name: 'Boita Bandana', district: 'Cuttack', region: 'Mahanadi ghats', monthKey: 'Nov', timing: 'Kartika Purnima · October–November', tag: 'River ritual', image: boitaBandanaImage,
    summary: 'A dawn ritual of small boats, lamps and Odisha’s memories of the sea.',
    story: 'On Kartika Purnima, families float tiny boats to remember Odisha’s historic maritime journeys. The quiet, early-morning ritual connects riverbanks, remembrance and the wider spirit later celebrated at Bali Jatra.',
    whatToExpect: ['Dawn riverbank gathering', 'Small handmade boats and lamps', 'A calm, reflective setting'],
    where: 'River ghats in Cuttack and other Odisha towns.',
    etiquette: ['Keep the ghat clean and use biodegradable offerings where possible.', 'Give families space for the ritual.', 'Follow local restrictions around lamps, boats and river access.'],
    safetyNote: 'Stay away from unprotected water edges and supervise children closely at the ghat.', videoId: 'hFI-V2P_8YY',
  },
];

interface FestivalOdishaPageProps {
  onBackHome: () => void;
  onPlanJourney: (destination: string) => void;
}

export const FestivalOdishaPage: React.FC<FestivalOdishaPageProps> = ({ onBackHome, onPlanJourney }) => {
  const [district, setDistrict] = useState('All Odisha');
  const [month, setMonth] = useState('All');
  const [query, setQuery] = useState('');
  const [activeFestival, setActiveFestival] = useState<Festival | null>(null);

  const filteredFestivals = useMemo(() => FESTIVALS.filter((festival) => {
    const byDistrict = district === 'All Odisha' || festival.district === district || festival.region === 'Across Odisha';
    const byMonth = month === 'All' || festival.monthKey === month;
    const words = `${festival.name} ${festival.district} ${festival.region} ${festival.tag}`.toLowerCase();
    return byDistrict && byMonth && words.includes(query.trim().toLowerCase());
  }), [district, month, query]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f4] text-[#102342]">
      <PattachitraGrainBackground />
      <div className="relative z-10 mx-auto max-w-[1520px] px-4 pb-20 pt-7 sm:px-6 lg:px-10">
        <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/30 bg-[#112a4b] shadow-[0_24px_65px_rgba(16,35,66,0.22)]">
          <img src={festivalHero} alt="A Rath Yatra celebration in Odisha" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#091c35]/95 via-[#102746]/75 to-[#102746]/15" />
          <button type="button" onClick={onBackHome} className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20 sm:left-8 sm:top-8">
            <ArrowLeft size={17} /> Back to home
          </button>
          <div className="max-w-2xl px-7 pb-10 pt-24 sm:px-12 sm:pb-12 sm:pt-24 lg:px-16 lg:pb-14 lg:pt-28">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.17em] text-[#ffe0a8] backdrop-blur-sm"><Sparkles size={14} /> Odisha festival explorer</div>
            <h1 className="font-serif text-5xl font-bold leading-[0.95] text-white sm:text-6xl">Celebrate Odisha.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">Follow the calendar of living traditions—where music, devotion, harvest and community turn every season into a reason to gather.</p>
            <div className="mt-6"><SectionFlourish className="text-[#dea65e]" /></div>
          </div>
        </section>

        <section className="mt-9 rounded-[1.75rem] border border-[#eadcca] bg-white/70 px-5 py-6 shadow-[0_15px_40px_rgba(47,38,29,0.06)] backdrop-blur-sm sm:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8552e]">Find your moment</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#102342]">A year of Odisha, at a glance.</h2></div>
            <p className="max-w-md text-sm leading-relaxed text-[#5d6a7d]">Festival dates can follow local and lunar calendars. Use these as planning guides, then check current official or organiser updates before travel.</p>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-[1.35fr_repeat(12,minmax(0,1fr))]">
            {MONTHS.map((item) => <button type="button" key={item.key} onClick={() => setMonth(item.key)} className={`rounded-xl border px-2 py-3 text-xs font-bold transition ${month === item.key ? 'border-[#c8552e] bg-[#c8552e] text-white shadow-sm' : 'border-[#eadcca] bg-[#fffdf9] text-[#506078] hover:border-[#d69059]'}`}>{item.label}</button>)}
          </div>
        </section>

        <section className="mt-9 grid gap-7 lg:grid-cols-[305px_minmax(0,1fr)]">
          <aside className="self-start rounded-[1.5rem] border border-[#eadcca] bg-white/80 p-5 shadow-[0_15px_40px_rgba(47,38,29,0.06)] backdrop-blur-sm lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-[#b84d29]"><MapPin size={18} /><h2 className="font-serif text-xl font-bold text-[#102342]">Explore by district</h2></div>
            <p className="mt-2 text-sm leading-relaxed text-[#68758a]">Choose a district to see curated festivals rooted there.</p>
            <label className="mt-5 flex items-center gap-2 rounded-xl border border-[#e7d6c2] bg-[#fffdf9] px-3 py-3 text-sm text-[#657287]"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#9aa4b1]" placeholder="Search a festival" /></label>
            <div className="mt-4 lg:hidden"><select aria-label="Choose a district" value={district} onChange={(event) => setDistrict(event.target.value)} className="w-full rounded-xl border border-[#e7d6c2] bg-[#fffdf9] px-3 py-3 text-sm font-semibold text-[#193657] outline-none">{DISTRICTS.map((item) => <option key={item}>{item}</option>)}</select></div>
            <div className="mt-4 hidden space-y-1 lg:block">{DISTRICTS.map((item) => <button type="button" key={item} onClick={() => setDistrict(item)} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${district === item ? 'bg-[#17345b] font-semibold text-white shadow-sm' : 'text-[#536177] hover:bg-[#f7efe4] hover:text-[#17345b]'}`}>{item}</button>)}</div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8552e]">{district === 'All Odisha' ? 'Across Odisha' : district}</p><h2 className="mt-1 font-serif text-3xl font-bold">Festival stories to step into.</h2></div><p className="text-sm font-medium text-[#68758a]">{filteredFestivals.length} {filteredFestivals.length === 1 ? 'festival' : 'festivals'} found</p></div>
            {filteredFestivals.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredFestivals.map((festival) => <button type="button" key={festival.id} onClick={() => setActiveFestival(festival)} className="group overflow-hidden rounded-[1.45rem] border border-[#e7d6c2] bg-white text-left shadow-[0_13px_30px_rgba(47,38,29,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(47,38,29,0.16)]">
              <div className="relative aspect-[4/3] overflow-hidden"><img src={festival.image} alt={festival.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0d2441]/80 via-transparent to-transparent" /><div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#14335b] backdrop-blur-sm">{festival.district}</div><div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-semibold text-white"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/20 backdrop-blur-sm"><Play size={15} fill="currentColor" /></span> Read the story <ArrowRight size={16} /></div></div>
              <div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-serif text-2xl font-bold leading-tight">{festival.name}</h3><span className="shrink-0 rounded-full bg-[#f7ead8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#ab542c]">{festival.tag}</span></div><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#647188]">{festival.summary}</p><div className="mt-4 flex items-center gap-2 border-t border-[#f0e5d8] pt-3 text-xs font-medium text-[#8b745e]"><CalendarDays size={15} />{festival.timing}</div></div>
            </button>)}</div> : <div className="rounded-[1.5rem] border border-dashed border-[#d9bf9d] bg-white/65 px-7 py-14 text-center"><Music2 className="mx-auto text-[#c8552e]" size={30} /><h3 className="mt-4 font-serif text-2xl font-bold">A story is waiting beyond this filter.</h3><p className="mx-auto mt-2 max-w-md text-sm text-[#68758a]">Try another month or district. We are continuing to grow this living festival archive.</p><button type="button" onClick={() => { setDistrict('All Odisha'); setMonth('All'); setQuery(''); }} className="mt-5 rounded-full bg-[#17345b] px-4 py-2.5 text-sm font-semibold text-white">Show all festivals</button></div>}
          </div>
        </section>

        <section className="mt-12 rounded-[1.8rem] border border-[#eadcca] bg-[#fffdf9]/80 p-6 shadow-[0_15px_40px_rgba(47,38,29,0.06)] sm:p-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8552e]">Suggested celebration trails</p><h2 className="mt-2 font-serif text-3xl font-bold">Let a festival shape the journey.</h2><div className="mt-4"><SectionFlourish /></div></div><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
          ['Puri devotion trail', 'Rath Yatra, temple town, beach evenings', 'Puri'], ['Heritage after dark', 'Konark dance, craft villages and the coast', 'Puri'], ['Western harvest trail', 'Nuakhai, Sambalpuri craft and local food', 'Sambalpur'], ['River & maritime memories', 'Boita Bandana and Bali Jatra in Cuttack', 'Cuttack'],
        ].map(([title, copy, destination]) => <button type="button" key={title} onClick={() => onPlanJourney(destination)} className="rounded-2xl border border-[#eadcca] bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#d18b55] hover:shadow-md"><div className="flex items-center justify-between"><UsersRound size={19} className="text-[#c8552e]" /><ArrowRight size={18} className="text-[#a56437]" /></div><h3 className="mt-5 font-serif text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#68758a]">{copy}</p><span className="mt-4 inline-block text-xs font-bold uppercase tracking-wide text-[#b84d29]">Plan from {destination}</span></button>)}</div></section>

        <section className="mt-8 grid gap-5 rounded-[1.8rem] bg-[#17345b] p-7 text-white shadow-[0_18px_45px_rgba(16,35,66,0.22)] md:grid-cols-[1fr_auto] md:items-center sm:p-9"><div><div className="flex items-center gap-2 text-[#ffd18d]"><ShieldCheck size={20} /><span className="text-xs font-bold uppercase tracking-[0.16em]">Before you go</span></div><h2 className="mt-3 font-serif text-3xl font-bold">Celebrate with care.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">Confirm dates and access through current official or organiser notices, respect spaces of worship and community rituals, and follow local traffic, crowd and weather guidance.</p></div><button type="button" onClick={() => onPlanJourney(district === 'All Odisha' ? 'Puri' : district)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ffe0aa] px-5 py-3.5 text-sm font-bold text-[#17345b] transition hover:-translate-y-0.5 hover:bg-white">Build a festival journey <ArrowRight size={17} /></button></section>
      </div>

      {activeFestival && createPortal(<div className="fixed inset-0 z-[10000] flex items-end bg-[#0b1d35]/65 p-0 backdrop-blur-md sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${activeFestival.name} story`}>
        <article className="relative max-h-[94vh] w-full overflow-y-auto rounded-t-[2rem] border border-white/60 bg-[#fffdf9]/85 shadow-[0_30px_90px_rgba(4,17,34,0.45)] backdrop-blur-2xl sm:max-w-5xl sm:rounded-[2rem]">
          <button type="button" onClick={() => setActiveFestival(null)} aria-label="Close festival story" className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/80 bg-white/90 text-[#17345b] shadow-lg transition hover:scale-105 hover:bg-white"><X size={20} /></button>
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]"><div className="relative min-h-[340px] lg:min-h-full"><img src={activeFestival.image} alt={activeFestival.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a223f]/90 via-[#0a223f]/15 to-transparent" /><div className="absolute bottom-6 left-6 right-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffdd9c]">{activeFestival.region}</p><h2 className="mt-2 font-serif text-4xl font-bold leading-tight">{activeFestival.name}</h2><p className="mt-3 flex items-center gap-2 text-sm text-white/85"><CalendarDays size={16} />{activeFestival.timing}</p></div></div><div className="p-6 pt-16 sm:p-8 sm:pt-8"><p className="text-base leading-relaxed text-[#536177]">{activeFestival.story}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[#eadcca] bg-[#fbf4e9]/85 p-5"><h3 className="font-serif text-xl font-bold">What to expect</h3><ul className="mt-3 space-y-2 text-sm text-[#59677b]">{activeFestival.whatToExpect.map((item) => <li key={item} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#c8552e]" />{item}</li>)}</ul></div><div className="rounded-2xl border border-[#dbe5d5] bg-[#f2f7ef]/80 p-5"><h3 className="font-serif text-xl font-bold">Where to go</h3><p className="mt-3 text-sm leading-relaxed text-[#536177]">{activeFestival.where}</p><p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#496a31]"><Clock3 size={16} />{activeFestival.timing}</p></div></div>
            <div className="mt-5 rounded-2xl border border-[#f0cfb7] bg-[#fff7ec] p-5"><div className="flex items-center gap-2 text-[#b84d29]"><ShieldCheck size={19} /><h3 className="font-serif text-xl font-bold text-[#102342]">Celebrate respectfully</h3></div><ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#59677b]">{activeFestival.etiquette.map((item) => <li key={item} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#c8552e]" />{item}</li>)}</ul><p className="mt-4 rounded-xl bg-white/70 p-3 text-sm font-medium text-[#79593d]"><span className="font-bold text-[#b84d29]">Safety note: </span>{activeFestival.safetyNote}</p></div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#dbe3ee] bg-[#102342]"><div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white"><Play size={16} fill="currentColor" /> A visual story from Odisha</div><div className="aspect-video"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${activeFestival.videoId}?rel=0`} title={`${activeFestival.name} video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div>
            <button type="button" onClick={() => { setActiveFestival(null); onPlanJourney(activeFestival.district); }} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#17345b] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0f294a]"><Sparkles size={17} className="text-[#ffd18d]" /> Add this celebration to my journey <ArrowRight size={17} /></button>
          </div></div>
        </article>
      </div>, document.body)}
    </main>
  );
};
