import React from 'react';
import { JourneyData } from '../data/journeyData';
import { generateJourney, JourneyPreferences } from '../data/journeyGenerator';
import JourneyMap from './JourneyMap';
import odishaDivider from '../assets/images/odisha_divider_mandala.png';
import { KonarkMandalaLogo } from './OdishaMotifs';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface GeneratedJourneyPageProps {
  preferences: JourneyPreferences | null;
  onBack: () => void;
}

const GeneratedJourneyPage: React.FC<GeneratedJourneyPageProps> = ({
  preferences,
  onBack,
}) => {
  const journey: JourneyData = generateJourney(preferences);

const visibleDays = journey.days;

const requestedDays = visibleDays.length;

const displayDuration = journey.duration;


const mapStops = visibleDays.map((day) => ({
  day: day.day,
  name: day.title,
  lat: day.lat,
  lng: day.lng,
}));

// =========================================
// DYNAMIC JOURNEY SUMMARY
// =========================================

// Total cost from the days actually included
const calculatedTotalCost = visibleDays.reduce((total, day) => {
  const cost = Number(day.estimatedCost.replace(/[₹,\s]/g, ''));
  return total + (Number.isNaN(cost) ? 0 : cost);
}, 0);

// Total distance from the days actually included
const calculatedTotalDistance = visibleDays.reduce((total, day) => {
  const distanceMatch = day.distance.match(/[\d.]+/);
  const distance = distanceMatch ? Number(distanceMatch[0]) : 0;
  return total + distance;
}, 0);

// Approximate road travel time.
// Prototype assumption: average 35 km/h across mixed Odisha roads.
const calculatedTravelHours = calculatedTotalDistance / 35;

const formattedTravelTime = (() => {
  const hours = Math.floor(calculatedTravelHours);
  const minutes = Math.round((calculatedTravelHours - hours) * 60);

  if (minutes === 0) {
    return `~${hours} hrs`;
  }

  if (hours === 0) {
    return `~${minutes} min`;
  }

  return `~${hours} hrs ${minutes} min`;
})();

const formattedTotalDistance = `~${Math.round(calculatedTotalDistance)} km`;

const formattedTotalCost = `₹${calculatedTotalCost.toLocaleString('en-IN')}`;

  const [exportingPdf, setExportingPdf] = React.useState(false);

  const handleExportItinerary = async () => {
    if (exportingPdf) return;

    try {
      setExportingPdf(true);

      // Give React one frame to render the off-screen export layout.
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );

      const root = document.getElementById('odisha-pdf-export');
      if (!root) {
        throw new Error('PDF export layout was not found.');
      }

      const pages = Array.from(
        root.querySelectorAll<HTMLElement>('.odisha-pdf-page'),
      );

      if (!pages.length) {
        throw new Error('No PDF pages were generated.');
      }

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let index = 0; index < pages.length; index += 1) {
        const page = pages[index];

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: '#faf8f4',
          logging: false,
          width: 1120,
          height: 790,
          windowWidth: 1120,
          windowHeight: 790,
        });

        const imageData = canvas.toDataURL('image/jpeg', 0.94);

        if (index > 0) {
          pdf.addPage('a4', 'landscape');
        }

        pdf.addImage(
          imageData,
          'JPEG',
          0,
          0,
          297,
          210,
          `odisha-page-${index + 1}`,
          'FAST',
        );
      }

      const safeTitle = journey.title
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase() || 'journey';

      pdf.save(`ODYSHA-${safeTitle}.pdf`);
    } catch (error) {
      console.error('ODYSHA PDF export failed:', error);
      window.alert(
        'Sorry, the itinerary PDF could not be generated. Please try again.',
      );
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div id="journey-page" className="min-h-screen bg-[#faf8f4] text-[#182f59]">


      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <main className="mx-auto max-w-[1500px] px-8 py-8">

        {/* Back */}
        <button
          onClick={onBack}
          className="print-hidden mb-5 text-sm font-medium text-[#182f59] transition-colors hover:text-[#c9552d]"
        >
          ← Back to Planner
        </button>


        {/* =========================================
              TITLE + ACTIONS
          ========================================= */}

          <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-start lg:justify-between">

            {/* Title */}
            <div className="min-w-0">
              <h1 className="font-serif text-[42px] font-bold leading-[0.98] tracking-tight text-[#182f59] sm:text-5xl">
                {journey.title}
              </h1>

              <img
                src={odishaDivider}
                alt=""
                className="mt-3 h-auto w-[170px] object-contain sm:w-[220px]"
              />
            </div>

            {/* Actions */}
            <div
              className="print-hidden
                grid
                w-full
                grid-cols-3
                gap-2
                sm:max-w-[520px]
                sm:gap-3
                lg:w-auto
                lg:max-w-none
              "
            >
              <button
                type="button"
                onClick={handleExportItinerary}
                disabled={exportingPdf}
                className="
                  flex items-center justify-center
                  gap-1.5
                  rounded-lg
                  border border-[#ded5c9]
                  bg-white
                  px-2
                  py-2.5
                  text-[11px]
                  font-medium
                  text-[#182f59]
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                <span>↓</span>
                <span className="truncate">{exportingPdf ? 'Preparing PDF…' : 'Export Itinerary'}</span>
              </button>

              <button
                type="button"
                className="
                  flex items-center justify-center
                  gap-1.5
                  rounded-lg
                  border border-[#ded5c9]
                  bg-white
                  px-2
                  py-2.5
                  text-[11px]
                  font-medium
                  text-[#182f59]
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                <span>↗</span>
                <span>Share</span>
              </button>

              <button
                type="button"
                className="
                  flex items-center justify-center
                  gap-1.5
                  rounded-lg
                  bg-[#182f59]
                  px-2
                  py-2.5
                  text-[11px]
                  font-medium
                  text-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:bg-[#213c6d]
                  sm:px-4
                  sm:py-3
                  sm:text-sm
                "
              >
                <span>♡</span>
                <span className="truncate">Save Journey</span>
              </button>
            </div>

          </div>

        {/* =========================================
            JOURNEY INFORMATION
        ========================================= */}

        <div className="mt-5 flex flex-wrap items-center gap-0 text-sm">

          <div className="border-r border-[#d8d0c6] px-4 first:pl-0">
            📅 &nbsp; {displayDuration}
          </div>

          <div className="border-r border-[#d8d0c6] px-4">
            ₹ &nbsp; {formattedTotalCost} <span className="text-gray-500">(approx)</span>
          </div>

          <div className="border-r border-[#d8d0c6] px-4">
            🌿 &nbsp; {journey.interests}
          </div>

          <div className="border-r border-[#d8d0c6] px-4">
            ◌ &nbsp; {journey.travelStyle}
          </div>

          <div className="px-4">
            ♧ &nbsp; {journey.travellers}
          </div>

        </div>


        {/* =========================================
            PERSONALIZATION MESSAGE
        ========================================= */}

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#ded9ce] bg-[#f3f3e9] px-5 py-3 text-sm text-[#343b35]">

          <span className="text-lg text-[#c9552d]">
            ✦
          </span>

          <span>
            {journey.personalizationMessage}
          </span>

        </div>


        {/* =========================================
            MAIN JOURNEY AREA
        ========================================= */}

        <div className="journey-print-grid mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">


          {/* =======================================
              LEFT — ITINERARY
          ======================================= */}

          <section className="journey-section overflow-hidden rounded-2xl border border-[#e5ddd2] bg-white">

            {/* Tabs */}

            <div className="print-hidden flex border-b border-[#e5ddd2]">

              <button className="border-b-2 border-[#c9552d] px-7 py-4 text-sm font-medium text-[#c9552d]">
                Itinerary
              </button>

              <button className="px-7 py-4 text-sm text-gray-600">
                Route Map
              </button>

              <button className="px-7 py-4 text-sm text-gray-600">
                Cost Estimate
              </button>

              <button className="px-7 py-4 text-sm text-gray-600">
                Why These Places?
              </button>

              <button className="px-7 py-4 text-sm text-gray-600">
                Journey Tips
              </button>

            </div>


            {/* Journey Days */}

            <div className="p-6">

              {visibleDays.map((day) => {
                const dayAccent =
                  day.day % 4 === 1
                    ? { fill: '#c96a43', border: '#ad5633' }
                    : day.day % 4 === 2
                      ? { fill: '#657653', border: '#526340' }
                      : day.day % 4 === 3
                        ? { fill: '#c08a45', border: '#a97131' }
                        : { fill: '#5c7691', border: '#4b657f' };

                return (
                <div
                  key={day.day}
                  className="journey-day relative border-b border-[#eee7dd] pb-8 pt-2 last:border-b-0"
                >

                  {/* Day heading */}

                  <div className="mb-6 flex items-start gap-5">

                    {/* Vintage Odysha day circle */}

                    <div
                      className="
                        relative
                        flex
                        h-[60px]
                        w-[60px]
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border-[2px]
                        text-center
                        shadow-[0_3px_10px_rgba(90,65,40,0.12)]
                        sm:h-[64px]
                        sm:w-[64px]
                      "
                      style={{
                        backgroundColor: dayAccent.fill,
                        borderColor: dayAccent.border,
                      }}
                    >
                      {/* Subtle vintage grain texture */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.16]"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0 0.8px, transparent 1px),
                            radial-gradient(circle at 70% 65%, rgba(60,40,25,0.28) 0 0.7px, transparent 1px),
                            radial-gradient(circle at 45% 80%, rgba(255,255,255,0.25) 0 0.6px, transparent 1px),
                            radial-gradient(circle at 85% 20%, rgba(60,40,25,0.20) 0 0.6px, transparent 1px)
                          `,
                          backgroundSize: '7px 7px, 9px 9px, 11px 11px, 13px 13px',
                        }}
                      />

                      {/* Soft inner vintage ring */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-[4px]
                          rounded-full
                          border
                          border-white/25
                        "
                      />

                      {/* Aged highlight */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          bg-gradient-to-br
                          from-white/15
                          via-transparent
                          to-black/10
                        "
                      />

                      {/* Day label + number */}
                      <div className="relative z-10 flex flex-col items-center leading-none">
                        <span
                          className="
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-white/85
                            sm:text-[9px]
                          "
                        >
                          DAY
                        </span>

                        <span
                          className="
                            mt-1
                            font-serif
                            text-[21px]
                            font-semibold
                            leading-none
                            text-white
                            sm:text-[23px]
                          "
                        >
                          {day.day}
                        </span>
                      </div>

                      {/* Small vintage registration dot */}
                      <span
                        className="
                          absolute
                          bottom-[2px]
                          left-1/2
                          h-[5px]
                          w-[5px]
                          -translate-x-1/2
                          rounded-full
                          bg-white/70
                        "
                      />
                    </div>

                    {/* Destination */}

                    <div className="flex-1">

                      <h2 className="font-serif text-2xl font-bold">
                        {day.title}
                      </h2>

                      <div className="mt-1 text-sm text-gray-600">
                        {day.subtitle}
                      </div>

                      <div className="mt-2 flex gap-4 text-xs text-gray-500">
                        <span>⌁ {day.distance}</span>
                        <span>₹ {day.estimatedCost}</span>
                      </div>

                    </div>

                  </div>


                  {/* Activities */}
                  <div
                    className="
                      ml-[18px]
                      border-l-2
                      border-dotted
                      border-[#d8d0c6]
                      pl-5
                      sm:ml-[27px]
                      sm:pl-8
                    "
                  >
                    {day.activities.map((activity, index) => (
                      <div
                        key={`${day.day}-${index}`}
                        className="relative mb-7 last:mb-0"
                      >
                        {/* Timeline dot */}
                        <div
                          className="
                            absolute
                            -left-[26px]
                            top-1.5
                            h-3
                            w-3
                            rounded-full
                            border-2
                            border-[#faf8f4]
                            bg-[#315337]
                            sm:-left-[41px]
                          "
                        />

                        {/* Activity content */}
                        <div className="min-w-0">
                          {/* Time + activity name */}
                          <div className="flex min-w-0 items-start gap-2.5">
                            <span
                              className="
                                w-[42px]
                                shrink-0
                                pt-0.5
                                text-[10px]
                                font-semibold
                                text-gray-600
                                sm:w-12
                                sm:text-xs
                              "
                            >
                              {activity.time}
                            </span>

                            <h3
                              className="
                                min-w-0
                                flex-1
                                break-words
                                text-[13px]
                                font-semibold
                                leading-snug
                                text-[#182f59]
                                sm:text-sm
                              "
                            >
                              {activity.name}
                            </h3>
                          </div>

                          {/* Description */}
                          <p
                            className="
                              mt-1.5
                              pl-[52px]
                              text-[11px]
                              leading-relaxed
                              text-gray-500
                              sm:ml-[60px]
                              sm:pl-0
                              sm:text-xs
                            "
                          >
                            {activity.description}
                          </p>

                          {/* Activity metadata */}
                          <div
                            className="
                              mt-2
                              flex
                              flex-wrap
                              gap-1.5
                              pl-[52px]
                              sm:ml-[60px]
                              sm:pl-0
                            "
                          >
                            <span
                              className="
                                rounded-md
                                bg-[#edf3e9]
                                px-2
                                py-1
                                text-[9px]
                                leading-none
                                text-[#315337]
                                sm:text-[11px]
                              "
                            >
                              {activity.walking}
                            </span>

                            <span
                              className="
                                rounded-md
                                bg-[#f5eee4]
                                px-2
                                py-1
                                text-[9px]
                                leading-none
                                text-gray-600
                                sm:text-[11px]
                              "
                            >
                              {activity.duration}
                            </span>

                            {activity.cost && (
                              <span
                                className="
                                  rounded-md
                                  bg-[#f5eee4]
                                  px-2
                                  py-1
                                  text-[9px]
                                  leading-none
                                  text-gray-600
                                  sm:text-[11px]
                                "
                              >
                                {activity.cost}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>


                  {/* Why in your plan */}

                  <div className="ml-[27px] mt-6 rounded-lg bg-[#f7f0e7] px-4 py-3">

                    <div className="text-xs font-semibold text-[#a74d2b]">
                      Why in your plan?
                    </div>

                    <div className="mt-1 text-xs text-gray-600">
                      {day.whyInPlan}
                    </div>

                  </div>

                </div>

                );
              })}

            </div>

          </section>


          {/* =======================================
              RIGHT COLUMN
          ======================================= */}

          <div className="space-y-6">


            {/* MAP PLACEHOLDER */}

            <section className="journey-map overflow-hidden rounded-2xl border border-[#e5ddd2] bg-white">

              <div className="flex items-center justify-between border-b border-[#e5ddd2] px-5 py-4">

                <h2 className="font-serif text-xl font-semibold">
                  Route Map
                </h2>

                <button className="rounded-lg border border-[#ded5c9] bg-white px-3 py-2 text-xs">
                  ⛶ View Full Route
                </button>

              </div>

              <div className="h-[390px]">
                <JourneyMap stops={mapStops} />
              </div>

            </section>


            {/* JOURNEY SUMMARY */}

            <section className="journey-summary rounded-2xl border border-[#e5ddd2] bg-white p-6">

              <h2 className="font-serif text-xl font-semibold">
                Journey Summary
              </h2>

              <div className="mt-5 space-y-4">

                <SummaryRow
                    icon="🚗"
                    label="Total Distance"
                    value={formattedTotalDistance}
                />

                <SummaryRow
                    icon="◷"
                    label="Total Travel Time"
                    value={formattedTravelTime}
                />

                <SummaryRow
                  icon="☀"
                  label="Best Time to Visit"
                  value={journey.summary.bestTimeToVisit}
                />

                <SummaryRow
                  icon="🚙"
                  label="Transport Mode"
                  value={journey.summary.transportMode}
                />

                <SummaryRow
                  icon="♧"
                  label="Pace"
                  value={journey.summary.pace}
                />

              </div>

            </section>


            {/* JOURNEY TIPS */}

            <section className="journey-tips rounded-2xl border border-[#e5ddd2] bg-[#fffaf3] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    Journey Tips
                  </h2>

                  <p className="mt-1 text-xs text-[#8a6b4a]">
                    Local knowledge for your route
                  </p>
                </div>

                <span className="rounded-full bg-[#f2e7d7] px-3 py-1 text-[10px] font-medium text-[#8a5c32]">
                  Odysha local guide
                </span>
              </div>

              <ul className="mt-5 space-y-3.5">
                {journey.journeyTips.map(
                  (tip, index) => (
                    <li
                      key={`${index}-${tip}`}
                      className="flex items-start gap-3 text-sm leading-relaxed text-gray-600"
                    >
                      <span className="mt-[5px] shrink-0 text-[#b86a32]">
                        ✦
                      </span>

                      <span>{tip}</span>
                    </li>
                  ),
                )}
              </ul>
            </section>

          </div>

        </div>

      </main>

      {/* =========================================================
          OFF-SCREEN 1–2 PAGE PDF EXPORT LAYOUT
          This is deliberately compact so the downloaded PDF is
          concise while still containing the full itinerary.
      ========================================================= */}
      <div
        id="odisha-pdf-export"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: 1120,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <PdfExportPage
          journey={journey}
          days={visibleDays.slice(0, Math.min(4, visibleDays.length))}
          pageNumber={1}
          totalPages={visibleDays.length > 4 ? 2 : 1}
          includeSummary={visibleDays.length <= 4}
        />

        {visibleDays.length > 4 && (
          <PdfExportPage
            journey={journey}
            days={visibleDays.slice(4)}
            pageNumber={2}
            totalPages={2}
            includeSummary
          />
        )}
      </div>

    </div>
  );
};


/* =========================================
   COMPACT PDF EXPORT COMPONENTS
========================================= */

interface PdfExportPageProps {
  journey: JourneyData;
  days: JourneyData['days'];
  pageNumber: number;
  totalPages: number;
  includeSummary: boolean;
}

const PDF_PAGE_STYLE: React.CSSProperties = {
  width: 1120,
  height: 790,
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: '#faf8f4',
  color: '#182f59',
  padding: 34,
  fontFamily: 'Arial, Helvetica, sans-serif',
  position: 'relative',
};

const pdfDayAccent = (day: number) =>
  day % 4 === 1
    ? { fill: '#c96a43', border: '#ad5633' }
    : day % 4 === 2
      ? { fill: '#657653', border: '#526340' }
      : day % 4 === 3
        ? { fill: '#c08a45', border: '#a97131' }
        : { fill: '#5c7691', border: '#4b657f' };

const PdfDayCard: React.FC<{ day: JourneyData['days'][number] }> = ({ day }) => {
  const accent = pdfDayAccent(day.day);

  return (
    <div
      style={{
        border: '1px solid #e5ddd2',
        borderRadius: 15,
        background: '#fffdf9',
        padding: '13px 15px 12px',
        boxSizing: 'border-box',
        minHeight: 112,
        boxShadow: '0 2px 7px rgba(90,65,40,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <div
          style={{
            position: 'relative',
            width: 44,
            height: 44,
            flex: '0 0 44px',
            borderRadius: '50%',
            background: accent.fill,
            border: `2px solid ${accent.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(90,65,40,0.12)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.16,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0 0.8px, transparent 1px),
                radial-gradient(circle at 70% 65%, rgba(60,40,25,0.28) 0 0.7px, transparent 1px),
                radial-gradient(circle at 45% 80%, rgba(255,255,255,0.25) 0 0.6px, transparent 1px),
                radial-gradient(circle at 85% 20%, rgba(60,40,25,0.20) 0 0.6px, transparent 1px)
              `,
              backgroundSize: '7px 7px, 9px 9px, 11px 11px, 13px 13px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 4,
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '50%',
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', lineHeight: 1 }}>
            <div style={{ fontSize: 7, letterSpacing: 1.5, fontWeight: 700, opacity: 0.9 }}>
              DAY
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 19, fontWeight: 700, marginTop: 4 }}>
              {day.day}
            </div>
          </div>
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#182f59' }}>
                {day.title}
              </div>
              <div style={{ marginTop: 2, fontSize: 9, color: '#666b73' }}>
                {day.subtitle}
              </div>
            </div>
            <div style={{ fontSize: 9, color: '#6a6f78', whiteSpace: 'nowrap' }}>
              {day.distance} · {day.estimatedCost}
            </div>
          </div>

          <div style={{ marginTop: 7, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 15, rowGap: 4 }}>
            {day.activities.map((activity, index) => (
              <div
                key={`${day.day}-${index}`}
                style={{
                  minWidth: 0,
                  display: 'grid',
                  gridTemplateColumns: '40px minmax(0,1fr)',
                  gap: 5,
                  alignItems: 'baseline',
                  fontSize: 8.5,
                  lineHeight: 1.2,
                  color: '#46505f',
                }}
              >
                <span style={{ fontWeight: 700, color: '#315337' }}>{activity.time}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ fontWeight: 700, color: '#182f59' }}>{activity.name}</span>
                  <span style={{ color: '#7a7f87' }}> · {activity.duration}</span>
                  {activity.cost ? <span style={{ color: '#7a7f87' }}> · {activity.cost}</span> : null}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 7,
              padding: '5px 7px',
              borderRadius: 7,
              background: '#f7f0e7',
              color: '#62666e',
              fontSize: 8,
              lineHeight: 1.25,
            }}
          >
            <span style={{ fontWeight: 700, color: '#a74d2b' }}>Why in your plan?</span>{' '}
            {day.whyInPlan}
          </div>
        </div>
      </div>
    </div>
  );
};

const PdfExportPage: React.FC<PdfExportPageProps> = ({
  journey,
  days,
  pageNumber,
  totalPages,
  includeSummary,
}) => {

    // PDF-only summary calculations
    const pdfTotalDistance = days.reduce((total, day) => {
      const match = day.distance.match(/[\d.]+/);
      return total + (match ? Number(match[0]) : 0);
    }, 0);

    const pdfTravelHours = pdfTotalDistance / 35;

    const pdfHours = Math.floor(pdfTravelHours);
    const pdfMinutes = Math.round(
      (pdfTravelHours - pdfHours) * 60
    );

    const pdfFormattedTotalDistance =
      `~${Math.round(pdfTotalDistance)} km`;

    const pdfFormattedTravelTime =
      pdfMinutes === 0
        ? `~${pdfHours} hrs`
        : pdfHours === 0
          ? `~${pdfMinutes} min`
          : `~${pdfHours} hrs ${pdfMinutes} min`;

  return (
    <div className="odisha-pdf-page" style={PDF_PAGE_STYLE}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.065,
          backgroundImage: `
            radial-gradient(circle at 15px 15px, #b86a32 1px, transparent 1.3px),
            radial-gradient(circle at 38px 38px, #b86a32 0.8px, transparent 1.2px)
          `,
          backgroundSize: '52px 52px, 72px 72px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 11,
            borderBottom: '1px solid #e2d5c6',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34 }}>
              <KonarkMandalaLogo className="h-full w-full text-[#c9552d]" />
            </div>
            <div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, letterSpacing: 1.4 }}>
                ODYSHA
              </div>
              <div style={{ fontSize: 8.5, color: '#666b73', marginTop: 2 }}>
                Local knowledge. Better journeys.
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 7.5, letterSpacing: 2, textTransform: 'uppercase', color: '#a35a38', fontWeight: 700 }}>
              Personalized Journey
            </div>
            <div style={{ marginTop: 3, fontFamily: 'Georgia, serif', fontSize: 11.5, fontWeight: 700 }}>
              {journey.title}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 15 }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, lineHeight: 1, fontWeight: 700 }}>
              {journey.title}
            </div>
            <img
              src={odishaDivider}
              alt=""
              style={{ display: 'block', marginTop: 7, width: 150, height: 10, objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <PdfMeta label="Duration" value={displayDurationText(journey.duration)} />
            <PdfMeta label="Cost" value={formatCompactCurrency(journey.totalCost)} />
            <PdfMeta label="Interests" value={journey.interests} />
            <PdfMeta label="Pace" value={journey.travelStyle} />
            <PdfMeta label="Travellers" value={journey.travellers} />
          </div>
        </div>

        <div
          style={{
            marginTop: 9,
            padding: '7px 10px',
            borderRadius: 8,
            border: '1px solid #ded9ce',
            background: '#f3f3e9',
            fontSize: 8.5,
            color: '#444a50',
          }}
        >
          <span style={{ color: '#c9552d', marginRight: 6, fontWeight: 700 }}>✦</span>
          {journey.personalizationMessage}
        </div>

        <div
          style={{
            marginTop: 10,
            display: 'grid',
            gridTemplateColumns: includeSummary ? '1.35fr 0.65fr' : '1fr',
            gap: 11,
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {days.map((day) => (
              <PdfDayCard key={day.day} day={day} />
            ))}
          </div>

          {includeSummary && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  border: '1px solid #e5ddd2',
                  borderRadius: 12,
                  background: '#ffffff',
                  padding: 12,
                }}
              >
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700 }}>
                  Journey Summary
                </div>
                <PdfSummaryRow label="Total Distance" value={pdfFormattedTotalDistance} />
                <PdfSummaryRow label="Total Travel Time" value={pdfFormattedTravelTime} />
                <PdfSummaryRow label="Best Time" value={journey.summary.bestTimeToVisit} />
                <PdfSummaryRow label="Transport" value={journey.summary.transportMode} />
                <PdfSummaryRow label="Pace" value={journey.summary.pace} />
              </div>

              <div
                style={{
                  border: '1px solid #e5ddd2',
                  borderRadius: 12,
                  background: '#fffaf3',
                  padding: 12,
                  flex: 1,
                }}
              >
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 700 }}>
                  Journey Tips
                </div>
                <div style={{ marginTop: 3, fontSize: 7.8, color: '#8a6b4a' }}>
                  Local knowledge for your route
                </div>
                <div style={{ marginTop: 8, display: 'grid', gap: 7 }}>
                  {journey.journeyTips.map((tip, index) => (
                    <div key={`${index}-${tip}`} style={{ display: 'flex', gap: 6, fontSize: 8.3, lineHeight: 1.3, color: '#5c6169' }}>
                      <span style={{ color: '#b86a32' }}>✦</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {!includeSummary && (
          <div
            style={{
              marginTop: 8,
              padding: '7px 10px',
              border: '1px solid #e7ded1',
              borderRadius: 8,
              background: '#fbf5ed',
              fontSize: 8,
              color: '#6a6f78',
            }}
          >
            Route overview: {days.map((day) => `Day ${day.day} – ${day.title}`).join('  ·  ')}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            left: 34,
            right: 34,
            bottom: 17,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #e4d8cb',
            paddingTop: 7,
            fontSize: 7.5,
            color: '#7a7f87',
          }}
        >
          <span>ODYSHA · Local knowledge. Better journeys.</span>
          <span>Page {pageNumber} of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

const PdfMeta: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div
    style={{
      padding: '5px 7px',
      borderRadius: 999,
      background: '#ffffff',
      border: '1px solid #e6ddd1',
      maxWidth: 170,
    }}
  >
    <span style={{ fontSize: 7, color: '#8a6b4a', marginRight: 4 }}>{label}</span>
    <span style={{ fontSize: 8.2, fontWeight: 700, color: '#182f59' }}>{value}</span>
  </div>
);

const PdfSummaryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 8, fontSize: 8.5 }}>
    <span style={{ color: '#666b73' }}>{label}</span>
    <span style={{ fontWeight: 700, color: '#182f59', textAlign: 'right' }}>{value}</span>
  </div>
);

const displayDurationText = (value: string) => {
  if (/4\s*[–-]\s*7/.test(value)) return '4–7 days';
  if (/2\s*[–-]\s*3/.test(value)) return '2–3 days';
  return value;
};

const formatCompactCurrency = (value: string) => {
  return value.replace(/\s*\(approx\)/i, '');
};

/* =========================================
   SMALL REUSABLE COMPONENT
========================================= */

interface SummaryRowProps {
  icon: string;
  label: string;
  value: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <span className="text-lg">
          {icon}
        </span>

        <span className="text-sm text-gray-600">
          {label}
        </span>

      </div>

      <span className="text-sm font-medium text-[#182f59]">
        {value}
      </span>

    </div>
  );
};


export default GeneratedJourneyPage;