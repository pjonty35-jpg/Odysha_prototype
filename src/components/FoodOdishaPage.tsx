import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Leaf,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { PattachitraGrainBackground, SectionFlourish } from './OdishaMotifs';
import foodHero from '../assets/images/food/food-hero.png';
import pakhalaImage from '../assets/images/food/pakhala-bhata.png';
import dalmaImage from '../assets/images/food/dalma.png';
import chhenaPodaImage from '../assets/images/food/chhena-poda.png';
import dahibaraImage from '../assets/images/food/dahibara-aloodum.png';
import mahaprasadImage from '../assets/images/food/mahaprasad.png';
import rasabaliImage from '../assets/images/food/rasabali.png';
import mandiaImage from '../assets/images/food/mandia-peja.png';
import machaImage from '../assets/images/food/macha-ghanta.png';

type Dish = {
  id: string;
  name: string;
  district: string;
  region: string;
  image: string;
  dietary: 'Vegetarian' | 'Non-vegetarian';
  availability: string;
  shortDescription: string;
  story: string;
  ingredients: string[];
  bestFor: string;
  localNote: string;
  safetyNote: string;
};

const DISTRICTS = [
  'All Odisha', 'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack',
  'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda',
  'Kalahandi', 'Kandhamal', 'Kendrapara', 'Keonjhar', 'Khordha', 'Koraput', 'Malkangiri',
  'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Sonepur', 'Sundargarh',
];

const DISHES: Dish[] = [
  {
    id: 'pakhala-bhata', name: 'Pakhala Bhata', district: 'Khordha', region: 'Across Odisha', image: pakhalaImage,
    dietary: 'Vegetarian', availability: 'Best in summer · available year-round',
    shortDescription: 'Cooling fermented rice served with bright, satisfying sides.',
    story: 'Pakhala is Odisha’s beloved answer to a hot day: cooked rice softened in water, sometimes lightly fermented, and brought alive with chilli, onion, greens and seasonal accompaniments. It is at once a home meal and a deeply familiar taste of Odisha.',
    ingredients: ['Cooked rice', 'Water or curd', 'Green chilli', 'Onion', 'Seasonal sides'],
    bestFor: 'A slow summer lunch or a home-style meal.',
    localNote: 'Ask whether the serving is plain, dahi pakhala, or lightly fermented; accompaniments vary by home and season.',
    safetyNote: 'Choose freshly prepared pakhala and clean drinking water, especially in warm weather.',
  },
  {
    id: 'dalma', name: 'Dalma', district: 'Puri', region: 'Temple & home kitchens', image: dalmaImage,
    dietary: 'Vegetarian', availability: 'Available year-round',
    shortDescription: 'Comforting lentils and vegetables, gentle with roasted spice.',
    story: 'Dalma brings lentils and vegetables together in a style closely associated with Odia home cooking and temple cuisine. Pumpkin, raw papaya, plantain and drumstick often lend it a naturally rounded sweetness.',
    ingredients: ['Lentils', 'Pumpkin', 'Raw papaya', 'Drumstick', 'Roasted cumin'],
    bestFor: 'A wholesome vegetarian lunch with rice.',
    localNote: 'Temple-style and home-style dalma can differ in texture and seasoning—both are worth trying.',
    safetyNote: 'Tell the server about allergies to lentils or ghee before ordering.',
  },
  {
    id: 'chhena-poda', name: 'Chhena Poda', district: 'Nayagarh', region: 'Nayagarh sweet tradition', image: chhenaPodaImage,
    dietary: 'Vegetarian', availability: 'Fresh batches daily · best by evening',
    shortDescription: 'A caramelised baked chhena cake with a deeply comforting crust.',
    story: 'Chhena Poda is made by slowly baking fresh chhena with sugar until its top turns beautifully caramelised. Its unfussy ingredients and distinctive baked edge have made it one of Odisha’s most recognisable sweets.',
    ingredients: ['Fresh chhena', 'Sugar', 'Semolina', 'Cardamom'],
    bestFor: 'A take-home sweet or an afternoon chai stop.',
    localNote: 'Buy from a busy, reputed sweet shop and ask for the day’s freshly baked batch.',
    safetyNote: 'Contains dairy; enjoy promptly and keep chilled if travelling with it.',
  },
  {
    id: 'dahibara-aloodum', name: 'Dahibara Aloodum', district: 'Cuttack', region: 'Cuttack street-food trail', image: dahibaraImage,
    dietary: 'Vegetarian', availability: 'Afternoon to late evening',
    shortDescription: 'Soft lentil dumplings, yoghurt and spiced potato curry in one iconic bowl.',
    story: 'Cuttack’s Dahibara Aloodum is a lively meeting of textures: soaked bara, cool yoghurt, tangy chutney and warmly spiced potato. It is an essential stop on the city’s street-food trail.',
    ingredients: ['Lentil bara', 'Yoghurt', 'Potato curry', 'Chutney', 'Sev'],
    bestFor: 'An evening street-food walk in Cuttack.',
    localNote: 'Crowded stalls with high turnover are usually the best choice for freshness.',
    safetyNote: 'Prefer freshly assembled bowls and avoid ice or water from an uncertain source.',
  },
  {
    id: 'mahaprasad', name: 'Puri Mahaprasad', district: 'Puri', region: 'Jagannath Temple food tradition', image: mahaprasadImage,
    dietary: 'Vegetarian', availability: 'Daytime, subject to temple schedule',
    shortDescription: 'A sacred vegetarian meal of rice, dal, greens, vegetables and sweets.',
    story: 'Mahaprasad is part of Puri’s living temple-food tradition. It is prepared through time-honoured practices and shared as a meal of devotion and community, with preparations changing through the day.',
    ingredients: ['Rice', 'Dalma', 'Saag', 'Khatta', 'Seasonal vegetables'],
    bestFor: 'A respectful food experience in Puri.',
    localNote: 'Follow current temple guidance and buy only from authorised, established selling areas.',
    safetyNote: 'Observe temple rules, dress guidance and local instructions while visiting.',
  },
  {
    id: 'rasabali', name: 'Rasabali', district: 'Kendrapara', region: 'Kendrapara sweet tradition', image: rasabaliImage,
    dietary: 'Vegetarian', availability: 'Year-round · popular during festivals',
    shortDescription: 'Fried chhena patties slowly soaked in sweetened reduced milk.',
    story: 'Rasabali pairs lightly fried chhena patties with fragrant thickened milk. It is indulgent, gentle and closely linked with the sweet-making traditions of Kendrapara.',
    ingredients: ['Chhena', 'Milk', 'Sugar', 'Cardamom'],
    bestFor: 'A slow dessert after a local meal.',
    localNote: 'It tastes best fresh, when the patties are tender and the milk is still fragrant.',
    safetyNote: 'Contains dairy and sugar; check freshness before buying a packed serving.',
  },
  {
    id: 'mandia-peja', name: 'Mandia Peja', district: 'Koraput', region: 'Koraput highlands', image: mandiaImage,
    dietary: 'Vegetarian', availability: 'Year-round · especially comforting in the highlands',
    shortDescription: 'A nourishing ragi millet porridge shaped by Koraput’s food culture.',
    story: 'Mandia, or finger millet, is central to many food traditions in southern Odisha. Mandia Peja is a simple, sustaining porridge that reflects the region’s deep relationship with millets and seasonal produce.',
    ingredients: ['Ragi millet', 'Water', 'Salt', 'Seasonal greens'],
    bestFor: 'A nourishing breakfast or a rural food experience.',
    localNote: 'Pair it with local greens and roasted vegetables for the most complete experience.',
    safetyNote: 'Ask about fermentation and ingredients if you have dietary sensitivities.',
  },
  {
    id: 'macha-ghanta', name: 'Macha Ghanta', district: 'Ganjam', region: 'Coastal Odisha', image: machaImage,
    dietary: 'Non-vegetarian', availability: 'Lunch and dinner · freshest near the coast',
    shortDescription: 'A fragrant fish-and-vegetable curry with a distinct coastal character.',
    story: 'Macha Ghanta brings fish together with vegetables and restrained spices, creating a comforting curry rather than a heavy one. Coastal homes often shape the dish around the day’s fresh catch.',
    ingredients: ['Fresh fish', 'Pumpkin', 'Potato', 'Mustard', 'Aromatic spices'],
    bestFor: 'A coastal lunch with steamed rice.',
    localNote: 'Ask what fish is in season and choose restaurants with clear sourcing and good turnover.',
    safetyNote: 'Confirm fish freshness and mention any seafood allergy before ordering.',
  },
];

const TRAILS = [
  { title: 'Puri temple food trail', copy: 'Mahaprasad, dalma and a respectful taste of Puri’s living food traditions.', district: 'Puri' },
  { title: 'Cuttack street-food trail', copy: 'Dahibara Aloodum and evening flavours in Odisha’s silver city.', district: 'Cuttack' },
  { title: 'Koraput millet trail', copy: 'Mandia, seasonal greens and the flavours of the highlands.', district: 'Koraput' },
];

interface FoodOdishaPageProps {
  onBackHome: () => void;
  onPlanJourney: (district: string) => void;
}

export const FoodOdishaPage: React.FC<FoodOdishaPageProps> = ({ onBackHome, onPlanJourney }) => {
  const [district, setDistrict] = useState('All Odisha');
  const [query, setQuery] = useState('');
  const [activeDish, setActiveDish] = useState<Dish | null>(null);

  const visibleDishes = useMemo(() => {
    const term = query.trim().toLowerCase();
    return DISHES.filter((dish) => (district === 'All Odisha' || dish.district === district) && (!term || `${dish.name} ${dish.region} ${dish.district}`.toLowerCase().includes(term)));
  }, [district, query]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#faf8f4] pb-12 text-[#172d49]">
      <PattachitraGrainBackground />
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-[#e1a15b]/15 blur-3xl" />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-7 sm:px-6 sm:pt-10 lg:px-8">
        <section className="relative min-h-[430px] overflow-hidden rounded-[30px] border border-white/70 shadow-[0_22px_60px_rgba(93,55,28,0.2)] sm:min-h-[470px] sm:rounded-[36px]">
          <img src={foodHero} alt="Traditional Odia food spread" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102342]/95 via-[#102342]/70 to-[#102342]/10" />
          <div className="relative flex min-h-[430px] max-w-2xl flex-col justify-center px-7 py-10 text-white sm:min-h-[470px] sm:px-12 lg:px-16">
            <button type="button" onClick={onBackHome} className="inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </button>
            <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">Taste Odisha.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/88 sm:text-lg">From temple kitchens to a hillside millet bowl, follow the dishes that make every part of Odisha feel like home.</p>
            <SectionFlourish icon="mandala" className="mt-6 opacity-80" maxHeight="max-h-7 sm:max-h-8" />
          </div>
        </section>

        <section className="mt-10 grid gap-7 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-[26px] border border-[#eadfce] bg-white/55 p-4 shadow-[0_12px_35px_rgba(101,67,38,0.09)] backdrop-blur-md lg:sticky lg:top-28">
            <div className="flex items-center gap-2 px-1"><MapPin className="h-4 w-4 text-[#b84a2d]" /><h2 className="font-serif text-xl font-bold">Explore by district</h2></div>
            <p className="mt-2 px-1 text-xs leading-relaxed text-[#657080]">Choose a district to discover dishes rooted there.</p>
            <div className="relative mt-4"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8277]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a dish" className="w-full rounded-xl border border-[#e5d9ca] bg-white/75 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-[#9b958c] focus:border-[#c9552d] focus:ring-2 focus:ring-[#c9552d]/10" /></div>
            <div className="mt-4 lg:hidden">
              <label htmlFor="food-district" className="sr-only">Choose a district</label>
              <select
                id="food-district"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="w-full rounded-xl border border-[#e5d9ca] bg-white/85 px-3 py-3 text-sm font-semibold text-[#172d49] outline-none transition focus:border-[#c9552d] focus:ring-2 focus:ring-[#c9552d]/10"
              >
                {DISTRICTS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="mt-4 hidden lg:block lg:max-h-none lg:space-y-1 lg:overflow-visible lg:pr-0">
              {DISTRICTS.map((item) => <button key={item} type="button" onClick={() => setDistrict(item)} className={`rounded-lg px-2.5 py-2 text-left text-xs transition lg:block lg:w-full ${district === item ? 'bg-[#172d49] font-semibold text-white shadow-sm' : 'text-[#4f5c68] hover:bg-[#f5ecdf] hover:text-[#b84a2d]'}`}>{item}</button>)}
            </div>
          </aside>

          <div>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b84a2d]">{district === 'All Odisha' ? 'A state on a plate' : `From ${district}`}</p><h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">{district === 'All Odisha' ? 'Food stories worth travelling for.' : `Traditional tastes of ${district}.`}</h2></div>
              <p className="text-sm text-[#657080]">{visibleDishes.length} {visibleDishes.length === 1 ? 'dish' : 'dishes'} found</p>
            </div>
            <SectionFlourish icon="diamond" className="my-4 justify-start" maxHeight="max-h-6" />

            {visibleDishes.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleDishes.map((dish) => <button key={dish.id} type="button" onClick={() => setActiveDish(dish)} className="group overflow-hidden rounded-[24px] border border-[#eadfce] bg-[#fffdfa]/85 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden"><img src={dish.image} alt={dish.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#102342]/75 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#172d49] backdrop-blur">{dish.district}</span><span className="absolute bottom-3 left-4 text-xs font-semibold text-white">Read its story <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></span></div>
                <div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-serif text-xl font-bold">{dish.name}</h3><span className={`mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-wide ${dish.dietary === 'Vegetarian' ? 'text-[#4d7c0f]' : 'text-[#b84a2d]'}`}>{dish.dietary === 'Vegetarian' ? '● Veg' : '● Non-veg'}</span></div><p className="mt-2 text-sm leading-relaxed text-[#657080]">{dish.shortDescription}</p><p className="mt-3 flex items-center gap-1.5 text-xs text-[#8a735a]"><Clock3 className="h-3.5 w-3.5" />{dish.availability}</p></div>
              </button>)}
            </div> : <div className="rounded-[26px] border border-dashed border-[#d9c9b7] bg-white/45 px-6 py-14 text-center"><Sparkles className="mx-auto h-6 w-6 text-[#c9552d]" /><h3 className="mt-3 font-serif text-2xl font-bold">We’re gathering this district’s food stories.</h3><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#657080]">Try another district for now, or explore all of Odisha while we continue documenting regional dishes.</p><button type="button" onClick={() => { setDistrict('All Odisha'); setQuery(''); }} className="mt-5 rounded-full bg-[#172d49] px-4 py-2 text-sm font-semibold text-white">Explore all Odisha</button></div>}
          </div>
        </section>

        <section className="mt-12 rounded-[30px] border border-[#eadfce] bg-[#fffdf9]/65 p-6 shadow-sm backdrop-blur-md sm:p-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b84a2d]">Curated food trails</p><h2 className="mt-2 font-serif text-3xl font-bold">Follow a flavour into a journey.</h2></div><p className="max-w-sm text-sm leading-relaxed text-[#657080]">Each trail starts with a dish and opens into the places, people and traditions around it.</p></div><div className="mt-6 grid gap-4 md:grid-cols-3">{TRAILS.map((trail) => <button key={trail.title} type="button" onClick={() => { setDistrict(trail.district); window.scrollTo({ top: 620, behavior: 'smooth' }); }} className="group rounded-2xl border border-[#eadfce] bg-white/70 p-5 text-left transition hover:-translate-y-1 hover:border-[#c9552d]/45 hover:shadow-md"><MapPin className="h-5 w-5 text-[#b84a2d]" /><h3 className="mt-4 font-serif text-xl font-bold">{trail.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#657080]">{trail.copy}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#b84a2d]">Explore trail <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></button>)}</div></section>

        <section className="mt-10 rounded-[28px] bg-[#172d49] px-6 py-8 text-center text-white shadow-[0_18px_48px_rgba(23,45,73,0.22)] sm:px-10"><Leaf className="mx-auto h-5 w-5 text-[#f6c77b]" /><h2 className="mt-3 font-serif text-3xl font-bold">Seen a flavour you want to follow?</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/75">Build a journey around the food, places and pace that feel right for you.</p><button type="button" onClick={() => onPlanJourney(district === 'All Odisha' ? '' : district)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#fff2dc] px-5 py-3 text-sm font-bold text-[#172d49] transition hover:-translate-y-0.5"><Sparkles className="h-4 w-4 text-[#b86a32]" />Plan a food journey <ArrowRight className="h-4 w-4" /></button></section>
      </main>

      {activeDish && createPortal(<div className="fixed inset-0 z-[10000] flex items-end bg-[#102342]/60 p-0 backdrop-blur-md sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${activeDish.name} details`} onClick={() => setActiveDish(null)}>
        <article className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[30px] border border-white/70 bg-white/75 shadow-[0_28px_90px_rgba(8,24,45,0.42)] backdrop-blur-2xl sm:rounded-[30px]" onClick={(event) => event.stopPropagation()}>
          <button type="button" onClick={() => setActiveDish(null)} className="absolute right-4 top-4 z-20 rounded-full border border-white/70 bg-white/85 p-2 text-[#172d49] shadow-md backdrop-blur transition hover:border-[#c9552d]/40 hover:text-[#b84a2d]" aria-label="Close dish story"><X className="h-4 w-4" /></button>
          <div className="grid lg:grid-cols-[42%_58%]"><div className="relative min-h-[280px] lg:min-h-full"><img src={activeDish.image} alt={activeDish.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#102342]/70 to-transparent" /><div className="absolute bottom-6 left-6 right-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffe1b1]"><MapPin className="mr-1 inline h-3.5 w-3.5" />{activeDish.region}</p><h2 className="mt-2 font-serif text-4xl font-bold">{activeDish.name}</h2></div></div><div className="p-6 sm:p-8"><div><span className="inline-flex rounded-full border border-[#f0d8bb] bg-[#fdf2e4]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[#a44729]">{activeDish.district} · {activeDish.dietary}</span><p className="mt-4 text-base leading-relaxed text-[#52606e]">{activeDish.story}</p></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/80 bg-[#f8f1e7]/80 p-4 shadow-sm"><h3 className="font-serif text-lg font-bold">What’s in it</h3><ul className="mt-2 space-y-1.5 text-sm text-[#586575]">{activeDish.ingredients.map((ingredient) => <li key={ingredient} className="flex gap-2"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b84a2d]" />{ingredient}</li>)}</ul></div><div className="rounded-2xl border border-white/80 bg-[#f3f6f0]/80 p-4 shadow-sm"><h3 className="font-serif text-lg font-bold">When to try it</h3><p className="mt-2 flex gap-2 text-sm leading-relaxed text-[#586575]"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#4d7c0f]" />{activeDish.availability}</p><p className="mt-3 text-sm font-semibold text-[#334d34]">{activeDish.bestFor}</p></div></div><div className="mt-4 rounded-2xl border border-[#e7d6bd] bg-[#fff8ed]/75 p-4 shadow-sm"><h3 className="flex items-center gap-2 font-serif text-lg font-bold"><UtensilsCrossed className="h-4 w-4 text-[#b84a2d]" />Local food note</h3><p className="mt-1.5 text-sm leading-relaxed text-[#657080]">{activeDish.localNote}</p></div><div className="mt-3 flex gap-3 rounded-2xl border border-[#d6e1d2] bg-[#f3f8f1]/80 p-4 shadow-sm"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#4d7c0f]" /><div><h3 className="font-serif text-lg font-bold text-[#28452b]">Try it well</h3><p className="mt-1 text-sm leading-relaxed text-[#4f6352]">{activeDish.safetyNote}</p></div></div><button type="button" onClick={() => { setActiveDish(null); onPlanJourney(activeDish.district); }} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#172d49] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(23,45,73,0.25)] transition hover:bg-[#b84a2d]"><Sparkles className="h-4 w-4 text-[#f6c77b]" />Add this food stop to my journey <ArrowRight className="h-4 w-4" /></button></div></div>
        </article>
      </div>, document.body)}
    </div>
  );
};
