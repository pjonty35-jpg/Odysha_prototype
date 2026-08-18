import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Accessibility,
  ArrowRight,
  Bike,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Footprints,
  Flower2,
  Gem,
  Heart,
  Landmark,
  Leaf,
  LocateFixed,
  MapPin,
  Navigation,
  Palette,
  PersonStanding,
  Sparkles,
  TreePine,
  Users,
  Utensils,
  WalletCards,
  Waves,
} from 'lucide-react';

import planHeroArt from '../assets/images/plan-hero-art.png';
import { OdishaDivider } from './OdishaMotifs';

type JourneyPreferences = {
  startingFrom: string;
  duration: string;
  travellers: string;
  interests: string[];
  travelStyle: string;
  budget: string;
  walking: string;
};

interface PlanJourneyPageProps {
  initialDestination?: string;
  onBuildJourney?: (preferences: JourneyPreferences) => void;
  onBackHome?: () => void;
}

const interestOptions = [
  { id: 'nature', label: 'Nature', icon: Leaf, tone: 'green' },
  { id: 'heritage', label: 'Heritage', icon: Landmark, tone: 'brown' },
  { id: 'beaches', label: 'Beaches', icon: Waves, tone: 'blue' },
  { id: 'food', label: 'Food', icon: Utensils, tone: 'orange' },
  { id: 'crafts', label: 'Arts & Crafts', icon: Palette, tone: 'orange' },
  { id: 'wildlife', label: 'Wildlife', icon: TreePine, tone: 'green' },
  { id: 'spiritual', label: 'Spiritual', icon: Flower2, tone: 'orange' },
  { id: 'hidden', label: 'Hidden Gems', icon: Gem, tone: 'orange' },
];

const locations = [
  'Bhubaneswar',
  'Puri',
  'Cuttack',
  'Konark',
  'Koraput',
  'Berhampur',
  'Balasore',
  'Sambalpur',
];

const durationOptions = [
  { value: '1 day', label: '1 day', icon: Clock3 },
  { value: '2–3 days', label: '2 – 3 days', icon: CalendarDays },
  { value: '4–7 days', label: '4 – 7 days', icon: CalendarDays },
];

const travellerOptions = [
  { value: 'Solo', icon: PersonStanding },
  { value: 'Couple', icon: Heart },
  { value: 'Friends', icon: Users },
  { value: 'Family', icon: Users },
  { value: 'Elderly', icon: PersonStanding },
  { value: 'Accessibility needs', icon: Accessibility },
];

const styleOptions = [
  {
    value: 'Relaxed',
    icon: PersonStanding,
    description: 'Take it slow and enjoy at a comfortable pace.',
  },
  {
    value: 'Balanced',
    icon: Bike,
    description: 'Mix of exploration and relaxation.',
  },
  {
    value: 'Packed',
    icon: Footprints,
    description: 'See more places, make the most of time.',
  },
];

const budgetOptions = ['₹5k or less', '₹5k – ₹10k', '₹10k – ₹15k', '₹15k+'];

const walkingOptions = [
  { value: 'Low', description: 'Prefer minimal walking', icon: PersonStanding },
  { value: 'Moderate', description: 'Comfortable with some walking', icon: Footprints },
  { value: 'High', description: 'Love exploring on foot', icon: Footprints },
];

function OptionButton({
  selected,
  onClick,
  children,
  className = '',
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative overflow-hidden',
        'border-2',
        'transition-all duration-200 ease-out',
        'transform-gpu',
        'active:scale-[0.97]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a2b]/30',

        selected
          ? [
              'border-[#c85a2b]',
              'bg-[#fff7ef]',
              'shadow-[0_5px_16px_rgba(200,90,43,0.14)]',
              '-translate-y-[2px]',
              'ring-1 ring-[#c85a2b]/10',
            ].join(' ')
          : [
              'border-[#eadfd3]',
              'bg-white/55',
              'hover:-translate-y-[1px]',
              'hover:border-[#d7c3ae]',
              'hover:bg-white',
              'hover:shadow-[0_3px_10px_rgba(115,82,52,0.07)]',
            ].join(' '),

        className,
      ].join(' ')}
    >
      {/* Selected-state glow */}
      {selected && (
        <span
          className="
            pointer-events-none
            absolute inset-0
            rounded-[inherit]
            bg-gradient-to-br
            from-[#c85a2b]/[0.06]
            via-transparent
            to-[#e9b965]/[0.08]
          "
        />
      )}

      {/* Selected indicator */}
      {selected && (
        <span
          className="
            absolute right-1.5 top-1.5
            flex h-4 w-4
            items-center justify-center
            rounded-full
            bg-[#c85a2b]
            text-white
            shadow-[0_2px_5px_rgba(200,90,43,0.25)]
            animate-[selectedPop_180ms_ease-out]
          "
        >
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
      )}

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}

function SectionTitle({
  number,
  children,
  icon,
}: {
  number?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      {number ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b94b21] text-[11px] font-bold text-white">
          {number}
        </span>
      ) : (
        <span className="text-[#9b6334]">{icon}</span>
      )}
      <h2 className="font-serif text-[17px] font-semibold leading-tight text-[#14294d]">
        {children}
      </h2>
    </div>
  );
}


function JourneyBuildingOverlay({
  activeStage,
}: {
  activeStage: number;
}) {
  const stages = [
    {
      title: 'Understanding your travel preferences',
      description: 'Matching your interests, pace and travel style.',
    },
    {
      title: 'Finding places that fit your journey',
      description: 'Looking across Odisha for experiences worth your time.',
    },
    {
      title: 'Designing your route & itinerary',
      description: 'Balancing distance, time and your preferred pace.',
    },
    {
      title: 'Adding the local touch',
      description: 'Shaping a journey beyond the usual tourist trail.',
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf8f4]/95 px-6 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #9a6a38 0.8px, transparent 1px), radial-gradient(circle at 80% 70%, #9a6a38 0.7px, transparent 0.9px)',
          backgroundSize: '10px 10px, 13px 13px',
        }}
      />

      <div className="relative w-full max-w-[520px] text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-[#c85a2b]/20" />
            <div className="absolute inset-2 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-dashed border-[#c85a2b]/35" />
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c85a2b] text-white shadow-[0_8px_25px_rgba(200,90,43,0.22)]">
              <span className="text-xl">✦</span>
            </div>
          </div>
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b94b21]">
          ODYSHA
        </p>

        <h2 className="font-serif text-[32px] font-semibold leading-tight text-[#14294d] sm:text-[38px]">
          Crafting your
          <br />
          Odisha journey
        </h2>

        <p className="mx-auto mt-4 max-w-[410px] text-[14px] leading-relaxed text-[#566074]">
          Turning your preferences into a journey worth remembering.
        </p>

        <div className="mx-auto mt-8 max-w-[420px]">
          <div className="mb-2 flex items-center justify-between text-[10px] font-medium text-[#7c7f82]">
            <span>PERSONALIZING</span>
            <span>{Math.min((activeStage + 1) * 25, 100)}%</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-[#e8ddd0]">
            <div
              className="h-full rounded-full bg-[#c85a2b] transition-all duration-700 ease-out"
              style={{ width: `${Math.min((activeStage + 1) * 25, 100)}%` }}
            />
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-[420px] space-y-3 text-left">
          {stages.map((stage, index) => {
            const completed = index < activeStage;
            const active = index === activeStage;

            return (
              <div
                key={stage.title}
                className={[
                  'flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-500',
                  active
                    ? 'bg-white/80 shadow-[0_4px_18px_rgba(80,59,40,0.06)]'
                    : '',
                ].join(' ')}
              >
                <div
                  className={[
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all duration-500',
                    completed
                      ? 'border-[#566b45] bg-[#566b45] text-white'
                      : active
                        ? 'border-[#c85a2b] bg-[#c85a2b] text-white'
                        : 'border-[#ded4c8] bg-[#f6f0e8] text-[#9b948b]',
                  ].join(' ')}
                >
                  {completed ? '✓' : active ? '•' : ''}
                </div>

                <div>
                  <p
                    className={[
                      'text-[12px] font-semibold transition-colors',
                      active || completed ? 'text-[#263957]' : 'text-[#a19b94]',
                    ].join(' ')}
                  >
                    {stage.title}
                  </p>

                  {active && (
                    <p className="mt-0.5 text-[10px] leading-relaxed text-[#77736e] animate-[fadeIn_400ms_ease-out]">
                      {stage.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-7 text-[10px] italic text-[#9a938b]">
          Every journey should feel a little personal.
        </p>
      </div>
    </div>
  );
}

export default function PlanJourneyPage({
  initialDestination = '',
  onBuildJourney,
  onBackHome,
}: PlanJourneyPageProps) {
  const [startingFrom, setStartingFrom] = useState(initialDestination || '');
  const [duration, setDuration] = useState('');
  const [travellers, setTravellers] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [travelStyle, setTravelStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [walking, setWalking] = useState('');

  const [isBuildingJourney, setIsBuildingJourney] = useState(false);
  const [buildingStage, setBuildingStage] = useState(0);

  // The six-step bar is a real navigation control. Each step scrolls
  // to the corresponding section and becomes the active step.
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  const stepCompletion = [
    Boolean(startingFrom && duration),
    Boolean(travellers),
    interests.length > 0,
    Boolean(travelStyle && budget),
    Boolean(walking),
    Boolean(
      startingFrom &&
      duration &&
      travellers &&
      interests.length > 0 &&
      travelStyle &&
      budget &&
      walking,
    ),
  ];

  const progressSteps = [
    ['1', 'Basics'],
    ['2', 'Travellers'],
    ['3', 'Interests'],
    ['4', 'Style & Budget'],
    ['5', 'Preferences'],
    ['6', 'Review'],
  ] as const;

  const goToStep = (index: number) => {
    const target = stepRefs.current[index];

    if (!target) return;

    setActiveStep(index);

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Keep the highlighted step in sync when the user scrolls manually.
  useEffect(() => {
    const observedSections = stepRefs.current.filter(
      (section): section is HTMLElement => Boolean(section),
    );

    if (!observedSections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const visibleIndex = stepRefs.current.findIndex(
          (section) => section === visibleEntries[0].target,
        );

        if (visibleIndex >= 0) {
          setActiveStep(visibleIndex);
        }
      },
      {
        root: null,
        rootMargin: '-110px 0px -55% 0px',
        threshold: [0.05, 0.2, 0.5],
      },
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  const [locationError, setLocationError] = useState('');

  const preferences = useMemo<JourneyPreferences>(
    () => ({
      startingFrom,
      duration,
      travellers,
      interests,
      travelStyle,
      budget,
      walking,
    }),
    [startingFrom, duration, travellers, interests, travelStyle, budget, walking],
  );

  useEffect(() => {
    if (initialDestination) setStartingFrom(initialDestination);
  }, [initialDestination]);

  useEffect(() => {
    if (!isBuildingJourney) return;

    setBuildingStage(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const stage2 = window.setTimeout(() => setBuildingStage(1), 650);
    const stage3 = window.setTimeout(() => setBuildingStage(2), 1300);
    const stage4 = window.setTimeout(() => setBuildingStage(3), 2050);
    const finish = window.setTimeout(() => {
      onBuildJourney?.(preferences);
      setIsBuildingJourney(false);
    }, 2850);

    return () => {
      window.clearTimeout(stage2);
      window.clearTimeout(stage3);
      window.clearTimeout(stage4);
      window.clearTimeout(finish);
      document.body.style.overflow = previousOverflow;
    };
  }, [isBuildingJourney, onBuildJourney, preferences]);

  const toggleInterest = (id: string) => {
    setInterests((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const clearAll = () => {
    setStartingFrom('');
    setDuration('');
    setTravellers('');
    setInterests([]);
    setTravelStyle('');
    setBudget('');
    setWalking('');
  };

  const useCurrentLocation = () => {
    setLocationError('');
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setStartingFrom('Bhubaneswar'),
      () => setLocationError('Please allow location access and try again.'),
    );
  };

  const selectedInterestLabels = interests
    .map((id) => interestOptions.find((item) => item.id === id)?.label)
    .filter(Boolean) as string[];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf8f4] text-[#162847]">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #9a6a38 0.7px, transparent 0.8px), radial-gradient(circle at 80% 60%, #9a6a38 0.6px, transparent 0.7px)',
          backgroundSize: '8px 8px, 11px 11px',
        }}
      />

      <div className="relative z-10 h-[9px] overflow-hidden border-y border-[#ead3b8] bg-[#fffaf3]">
        <div className="flex h-full items-center justify-around text-[9px] tracking-[0.3em] text-[#d58b50] opacity-75">
          {Array.from({ length: 36 }).map((_, i) => <span key={i}>◇</span>)}
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-[1500px] px-5 pb-0 pt-6 sm:px-6 sm:pt-8 lg:px-12">
        {/* HERO */}
        <div className="relative min-h-0 md:min-h-[245px]">

          {/* Hero text */}
          <div
            className="
              relative z-20
              flex w-full flex-col justify-center
              pt-4 sm:pt-6
              md:w-[690px]
              md:pt-8
            "
          >
            <button
              type="button"
              onClick={onBackHome}
              className="mb-4 flex w-fit items-center gap-2 text-sm font-medium text-[#182f59] transition-colors hover:text-[#c9552d]"
            >
              ← Back to Home
            </button>

            <h1
              className="
                font-serif font-semibold leading-[1.02]
                tracking-[-0.025em] text-[#10264b]
                text-[40px]
                sm:text-[46px]
                md:text-[52px]
                lg:text-[58px]
              "
            >
              Plan Your Journey
            </h1>

            <p
              className="
                mt-3 max-w-[620px]
                text-[15px]
                leading-relaxed
                text-[#26334a]
                sm:text-[16px]
                md:text-[18px]
              "
            >
              Tell us how you travel. We’ll craft the perfect Odisha journey for you.
            </p>

            <div className="mt-5 w-[230px] sm:w-[270px] md:w-[300px]">
              <OdishaDivider />
            </div>
          </div>

          {/* HERO IMAGE */}
          <div
            className="
              relative mt-5
              h-[150px] w-full
              overflow-hidden
              sm:h-[175px]
              md:absolute
              md:right-[-35px]
              md:top-1/2
              md:mt-0
              md:h-[270px]
              md:w-[72%]
              md:max-w-none
              md:-translate-y-1/2
              lg:right-[-45px]
            "
          >
            <img
              src={planHeroArt}
              alt=""
              className="
                h-full w-full
                object-cover
                object-[50%_68%]
                opacity-[0.94]
                md:pointer-events-none
              "
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 66% 72% at 52% 47%, black 8%, rgba(0,0,0,0.94) 22%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.20) 73%, transparent 100%)',
                maskImage:
                  'radial-gradient(ellipse 66% 72% at 52% 47%, black 8%, rgba(0,0,0,0.94) 22%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.20) 73%, transparent 100%)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: '100% 100%',
                maskSize: '100% 100%',
              }}
            />

            {/* Mobile top fade */}
            <div
              className="
                pointer-events-none absolute inset-x-0 top-0 z-10
                h-[16%]
                bg-gradient-to-b
                from-[#faf8f4]/55
                via-[#faf8f4]/18
                to-transparent
                md:h-[18%]
              "
            />

            {/* Mobile bottom fade */}
            <div
              className="
                pointer-events-none absolute inset-x-0 bottom-0 z-10
                h-[20%]
                bg-gradient-to-t
                from-[#faf8f4]/65
                via-[#faf8f4]/22
                to-transparent
                md:h-[25%]
              "
            />
          </div>
        </div>

        {/* PROGRESS STEPS */}
        <div className="relative mt-5 md:mt-1">
          <div className="relative px-2 sm:px-5 md:px-10">
            {/* Connector line - desktop only */}
            <div className="absolute left-[7%] right-[7%] top-[18px] hidden h-px border-t border-dashed border-[#dfd2c3] md:block" />

            {/* Mobile: 2 rows, 3 steps per row */}
            <div className="grid grid-cols-3 gap-y-5 md:hidden">
              {progressSteps.map(([number, label], index) => {
                const isActive = activeStep === index;
                const isComplete = stepCompletion[index];

                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => goToStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Go to step ${number}: ${label}`}
                    className="group relative z-10 flex cursor-pointer flex-col items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a2b]/30 rounded-lg"
                  >
                    <span
                      className={[
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200',
                        isActive
                          ? 'bg-[#b94b21] text-white shadow-[0_4px_10px_rgba(185,75,33,0.20)]'
                          : isComplete
                            ? 'border border-[#c85a2b]/45 bg-[#fff7ef] text-[#b94b21]'
                            : 'bg-[#f3eee7] text-[#1d2a42] group-hover:bg-[#eadfd3]',
                      ].join(' ')}
                    >
                      {isComplete && !isActive ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      ) : (
                        number
                      )}
                    </span>

                    <span
                      className={[
                        'text-center text-[10px] leading-tight transition-colors',
                        isActive
                          ? 'font-semibold text-[#172846]'
                          : 'text-[#273147] group-hover:text-[#b94b21]',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Desktop/tablet: single row */}
            <div className="relative hidden items-start justify-between md:flex">
              {progressSteps.map(([number, label], index) => {
                const isActive = activeStep === index;
                const isComplete = stepCompletion[index];

                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => goToStep(index)}
                    aria-current={isActive ? 'step' : undefined}
                    aria-label={`Go to step ${number}: ${label}`}
                    className="group relative z-10 flex min-w-[70px] cursor-pointer flex-col items-center gap-2 rounded-lg px-2 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a2b]/30"
                  >
                    <span
                      className={[
                        'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                        isActive
                          ? 'bg-[#b94b21] text-white shadow-[0_4px_12px_rgba(185,75,33,0.20)]'
                          : isComplete
                            ? 'border border-[#c85a2b]/45 bg-[#fff7ef] text-[#b94b21]'
                            : 'bg-[#f3eee7] text-[#1d2a42] group-hover:bg-[#eadfd3]',
                      ].join(' ')}
                    >
                      {isComplete && !isActive ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        number
                      )}
                    </span>

                    <span
                      className={[
                        'whitespace-nowrap text-[13px] transition-colors',
                        isActive
                          ? 'font-semibold text-[#172846]'
                          : 'text-[#273147] group-hover:text-[#b94b21]',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto max-w-[1500px] px-6 pb-8 pt-5 lg:px-12">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2.15fr)_410px]">
          <div className="space-y-3">
            <div className="rounded-2xl border border-[#e9ddd0] bg-white/45 p-4 shadow-[0_4px_20px_rgba(115,82,52,0.035)] md:p-5">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr_1.1fr]">
                <div
                  ref={(el) => { stepRefs.current[0] = el; }}
                  className="scroll-mt-24 border-b border-[#eadfd3] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5"
                >
                  <SectionTitle number="1">Where are you starting from?</SectionTitle>
                  <div className="relative">
                    <select
                      value={startingFrom}
                      onChange={(e) => setStartingFrom(e.target.value)}
                      className={[
                        'w-full appearance-none rounded-xl border border-[#e7ddd1] bg-white/70 px-4 py-3 pr-10 text-[15px] outline-none focus:border-[#c85a2b]',
                        startingFrom ? 'text-[#172846]' : 'text-[#7b8493]',
                      ].join(' ')}
                    >
                      <option value="" disabled>
                        Select your starting point
                      </option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
                  </div>
                  <button
                    type="button"
                    onClick={useCurrentLocation}
                    className="mt-3 flex items-center gap-2 text-[12px] font-medium text-[#3d5d89] hover:text-[#b94b21]"
                  >
                    <LocateFixed className="h-4 w-4" />
                    Use my current location
                  </button>
                  {locationError && <p className="mt-1 text-[11px] text-[#b94b21]">{locationError}</p>}
                </div>

                <div className="border-b border-[#eadfd3] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
                  <SectionTitle number="2">How much time do you have?</SectionTitle>
                  <div className="grid grid-cols-3 gap-2">
                    {durationOptions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <OptionButton
                          key={item.value}
                          selected={duration === item.value}
                          onClick={() => setDuration((current) => current === item.value ? '' : item.value)}
                          className="flex min-h-[86px] flex-col items-center justify-center rounded-xl px-2"
                        >
                          <Icon className="mb-2 h-6 w-6 text-[#b94b21]" strokeWidth={1.5} />
                          <span className="text-[12px] font-medium">{item.label}</span>
                        </OptionButton>
                      );
                    })}
                  </div>
                </div>

                <div
                  ref={(el) => { stepRefs.current[1] = el; }}
                  className="scroll-mt-24"
                >
                  <SectionTitle icon={<Users className="h-5 w-5" />}>Who are you travelling with?</SectionTitle>
                  <div className="grid grid-cols-3 gap-2">
                    {travellerOptions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <OptionButton
                          key={item.value}
                          selected={travellers === item.value}
                          onClick={() => setTravellers((current) => current === item.value ? '' : item.value)}
                          className="flex min-h-[68px] flex-col items-center justify-center rounded-xl px-1.5"
                        >
                          <Icon className={travellers === item.value ? 'mb-1 h-5 w-5 text-[#b94b21]' : 'mb-1 h-5 w-5 text-[#26364b]'} strokeWidth={1.5} />
                          <span className="text-[11px] font-medium leading-tight">{item.value}</span>
                        </OptionButton>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-3">
                <section
                  ref={(el) => { stepRefs.current[2] = el; }}
                  className="scroll-mt-24 rounded-2xl border border-[#e9ddd0] bg-white/45 p-4 shadow-[0_4px_20px_rgba(115,82,52,0.035)] md:p-5"
                >
                  <SectionTitle number="4">What do you love?</SectionTitle>
                  <div className="grid grid-cols-4 gap-2">
                    {interestOptions.map((item) => {
                      const Icon = item.icon;
                      const selected = interests.includes(item.id);
                      const tone =
                        item.tone === 'green' ? 'text-[#4e743b]' :
                        item.tone === 'blue' ? 'text-[#2576a2]' :
                        item.tone === 'brown' ? 'text-[#8c5427]' :
                        'text-[#c85a2b]';

                      return (
                        <OptionButton
                          key={item.id}
                          selected={selected}
                          onClick={() => toggleInterest(item.id)}
                          className="relative flex min-h-[67px] flex-col items-center justify-center rounded-xl px-1"
                        >
                          <Icon className={`mb-1 h-6 w-6 ${tone}`} strokeWidth={1.4} />
                          <span className="text-[10.5px] font-medium">{item.label}</span>
                          
                        </OptionButton>
                      );
                    })}
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#35435a]">
                    <Sparkles className="h-3.5 w-3.5 text-[#b94b21]" />
                    You can select multiple
                  </p>
                </section>

                <section
                  ref={(el) => { stepRefs.current[4] = el; }}
                  className="scroll-mt-24 rounded-2xl border border-[#e9ddd0] bg-white/45 p-4 shadow-[0_4px_20px_rgba(115,82,52,0.035)] md:p-5"
                >
                  <SectionTitle number="7">How much walking are you comfortable with?</SectionTitle>
                  <div className="grid grid-cols-3 gap-2">
                    {walkingOptions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <OptionButton
                          key={item.value}
                          selected={walking === item.value}
                          onClick={() => setWalking((current) => current === item.value ? '' : item.value)}
                          className="flex min-h-[67px] items-center gap-2 rounded-xl px-3 text-left"
                        >
                          <Icon className={walking === item.value ? 'h-6 w-6 shrink-0 text-[#b94b21]' : 'h-6 w-6 shrink-0 text-[#526842]'} strokeWidth={1.4} />
                          <span>
                            <span className="block text-[12px] font-semibold">{item.value}</span>
                            <span className="mt-0.5 block text-[9.5px] leading-tight text-[#485064]">{item.description}</span>
                          </span>
                        </OptionButton>
                      );
                    })}
                  </div>
                </section>
              </div>

              <div
                ref={(el) => { stepRefs.current[3] = el; }}
                className="scroll-mt-24 rounded-2xl border border-[#e9ddd0] bg-white/45 p-4 shadow-[0_4px_20px_rgba(115,82,52,0.035)] md:p-5"
              >
                <section>
                  <SectionTitle icon={<Navigation className="h-5 w-5" />}>What’s your travel style?</SectionTitle>
                  <div className="grid grid-cols-3 gap-2">
                    {styleOptions.map((item) => {
                      const Icon = item.icon;
                      return (
                        <OptionButton
                          key={item.value}
                          selected={travelStyle === item.value}
                          onClick={() => setTravelStyle((current) => current === item.value ? '' : item.value)}
                          className="flex min-h-[94px] flex-col items-center justify-center rounded-xl px-3 text-center"
                        >
                          <Icon className="mb-1.5 h-6 w-6 text-[#536a4d]" strokeWidth={1.4} />
                          <span className="text-[12px] font-semibold">{item.value}</span>
                          <span className="mt-1 text-[9.5px] leading-tight text-[#50596b]">{item.description}</span>
                        </OptionButton>
                      );
                    })}
                  </div>
                </section>

                <div className="my-5 h-px bg-[#eadfd3]" />

                <section>
                  <SectionTitle icon={<WalletCards className="h-5 w-5" />}>What’s your budget range?</SectionTitle>
                  <div className="grid grid-cols-4 gap-2">
                    {budgetOptions.map((item) => (
                      <OptionButton
                        key={item}
                        selected={budget === item}
                        onClick={() => setBudget((current) => current === item ? '' : item)}
                        className="flex min-h-[76px] items-center justify-center rounded-xl px-2 text-center text-[14px] font-semibold"
                      >
                        {item}
                      </OptionButton>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          <aside
            ref={(el) => { stepRefs.current[5] = el; }}
            className="scroll-mt-24 self-start overflow-hidden rounded-2xl border border-[#e5d8ca] bg-white/75 shadow-[0_7px_28px_rgba(80,59,40,0.08)] xl:sticky xl:top-5"
          >
            <div className="bg-[#566b45] px-6 py-5 text-white">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#e9b965]" />
                <div>
                  <h2 className="font-serif text-[20px] font-semibold">Let’s craft your Odisha story!</h2>
                  <p className="mt-2 text-[12px] leading-relaxed text-white/90">
                    We’ll personalize it using local knowledge,<br />
                    real-time insights and your preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-[16px] font-semibold">Your selections</h3>
                <button type="button" onClick={clearAll} className="text-[12px] font-medium text-[#b94b21] hover:underline">
                  Clear all
                </button>
              </div>

              <div className="space-y-3.5">
                <SummaryRow icon={<MapPin />} label="Starting from" value={startingFrom || 'Not selected'} />
                <SummaryRow icon={<Clock3 />} label="Duration" value={duration || 'Not selected'} />
                <SummaryRow icon={<Users />} label="Travellers" value={travellers || 'Not selected'} />
                <SummaryRow icon={<Flower2 />} label="Interests" value={selectedInterestLabels.length ? selectedInterestLabels.join(', ') : 'Not selected'} />
                <SummaryRow icon={<Leaf />} label="Travel style" value={travelStyle || 'Not selected'} />
                <SummaryRow icon={<WalletCards />} label="Budget" value={budget || 'Not selected'} />
                <SummaryRow icon={<Footprints />} label="Walking preference" value={walking || 'Not selected'} />
              </div>

              <div className="mt-5 rounded-xl border border-[#eadfd2] bg-[#f8f0e5] p-3.5">
                <div className="flex gap-3">
                  <Gem className="mt-0.5 h-5 w-5 shrink-0 text-[#9a6330]" />
                  <p className="text-[11px] leading-relaxed text-[#3e4653]">
                    We use verified information and community insights to create the best possible journey for you.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!isBuildingJourney) {
                    setIsBuildingJourney(true);
                  }
                }}
                disabled={isBuildingJourney}
                className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#152b58] px-5 py-4 text-[14px] font-semibold text-white shadow-[0_5px_14px_rgba(21,43,88,0.18)] transition hover:-translate-y-0.5 hover:bg-[#1b376f] active:translate-y-0 disabled:cursor-wait disabled:opacity-80"
              >
                <Sparkles className="h-4 w-4 text-[#e9b965]" />
                {isBuildingJourney ? 'Crafting your journey...' : 'Build My Journey'}
                {!isBuildingJourney && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
          </aside>
        </div>
      </main>

      {isBuildingJourney && (
        <JourneyBuildingOverlay activeStage={buildingStage} />
      )}

      <section className="relative z-10 min-h-[165px] overflow-hidden border-t border-[#eee0cf] bg-[#f7efe3]">
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-center px-6 py-8 text-center">
          <div>
            <p className="font-serif text-[18px] text-[#15294a] md:text-[20px]">
              Odisha is not just a destination, it’s a feeling.
            </p>
            <p className="mt-1 font-serif text-[15px] text-[#bd4d22]">Let us show you the real Odisha.</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-[#b87542]">
              <span className="h-px w-16 bg-[#d7ad82]" />
              <span className="text-[10px]">◆</span>
              <span className="text-[12px]">✤</span>
              <span className="text-[10px]">◆</span>
              <span className="h-px w-16 bg-[#d7ad82]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#26364c]">{icon}</span>
      <span className="min-w-0 flex-1 text-[12px] text-[#2e394d]">{label}</span>
      <span className="max-w-[175px] text-right text-[11px] font-medium text-[#263147]">{value}</span>
    </div>
  );
}