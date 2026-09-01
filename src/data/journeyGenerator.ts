import {
  JOURNEY_PLACES,
  JourneyInterest,
  JourneyPlace,
} from './journeyPlaces';

import {
  JourneyData,
  JourneyDay,
  JourneyActivity,
} from './journeyData';

export interface JourneyPreferences {
  startingFrom: string;
  duration: string;
  travellers: string;
  interests: string[];
  travelStyle: string;
  budget: string;
  walking: string;
}

/* =========================================================
   STARTING LOCATIONS
   ========================================================= */

const STARTING_POINTS: Record<
  string,
  { lat: number; lng: number }
> = {
  Bhubaneswar: {
    lat: 20.2961,
    lng: 85.8245,
  },

  Puri: {
    lat: 19.8135,
    lng: 85.8312,
  },

  Cuttack: {
    lat: 20.4625,
    lng: 85.8830,
  },

  Konark: {
    lat: 19.8876,
    lng: 86.0945,
  },

  Koraput: {
    lat: 18.8135,
    lng: 82.7123,
  },

  Berhampur: {
    lat: 19.3150,
    lng: 84.7941,
  },

  Balasore: {
    lat: 21.4942,
    lng: 86.9317,
  },

  Sambalpur: {
    lat: 21.4669,
    lng: 83.9758,
  },
};

/* =========================================================
   INTEREST LABELS
   ========================================================= */

const INTEREST_LABELS: Record<string, string> = {
  nature: 'Nature',
  heritage: 'Heritage',
  beaches: 'Beaches',
  food: 'Food',
  crafts: 'Arts & Crafts',
  wildlife: 'Wildlife',
  spiritual: 'Spiritual',
  hidden: 'Hidden Gems',
};

/* =========================================================
   DURATION
   ========================================================= */

function durationToDays(duration: string): number {
  const value = String(duration).toLowerCase();

  if (
    value.includes('4–7') ||
    value.includes('4-7')
  ) {
    return 7;
  }

  if (
    value.includes('2–3') ||
    value.includes('2-3')
  ) {
    return 3;
  }

  if (value.includes('1 day')) {
    return 1;
  }

  const match = value.match(/\d+/);

  return match ? Number(match[0]) : 3;
}

/* =========================================================
   DISTANCE
   ========================================================= */

function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;

  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const deltaLat =
    ((b.lat - a.lat) * Math.PI) / 180;

  const deltaLng =
    ((b.lng - a.lng) * Math.PI) / 180;

  const sinLat = Math.sin(deltaLat / 2);
  const sinLng = Math.sin(deltaLng / 2);

  const h =
    sinLat * sinLat +
    Math.cos(lat1) *
      Math.cos(lat2) *
      sinLng *
      sinLng;

  return (
    2 *
    R *
    Math.asin(Math.sqrt(h))
  );
}

/* =========================================================
   INTEREST MATCHING
   ========================================================= */

function interestMatchScore(
  place: JourneyPlace,
  selectedInterests: string[],
): number {
  if (!selectedInterests.length) {
    return 0;
  }

  const primaryInterest =
    place.interests[0];

  if (
    selectedInterests.includes(
      primaryInterest,
    )
  ) {
    return 100;
  }

  const secondaryMatch =
    selectedInterests.some(
      (interest) =>
        place.interests.includes(
          interest as JourneyInterest,
        ),
    );

  if (
    secondaryMatch &&
    selectedInterests.length > 1
  ) {
    return 35;
  }

  return -100;
}

/* =========================================================
   TRAVELLER MATCHING
   ========================================================= */

function travellerMatchScore(
  place: JourneyPlace,
  traveller: string,
): number {
  /*
   * Traveller type is a core planning constraint.
   * A suitable place should strongly outrank a merely
   * interest-matching place.
   *
   * Accessibility needs are handled from the place's
   * walking level because the current place dataset
   * does not yet have a separate accessibility field.
   */
  if (traveller === 'Accessibility needs') {
    if (place.walking === 'Low') return 90;
    if (place.walking === 'Moderate') return 25;
    return -100;
  }

  if (place.suitableFor.includes(traveller)) {
    if (traveller === 'Elderly') return 90;
    return 70;
  }

  /*
   * Elderly travellers should not be sent to places
   * that the dataset explicitly marks as unsuitable.
   */
  if (traveller === 'Elderly') {
    return -100;
  }

  return -60;
}

/*
 * Hard suitability check used before the normal scoring
 * system. This prevents a highly-scored but unsuitable
 * place from winning simply because it matches an interest.
 */
function isTravellerEligible(
  place: JourneyPlace,
  traveller: string,
): boolean {
  if (traveller === 'Accessibility needs') {
    return place.walking !== 'High';
  }

  if (traveller === 'Elderly') {
    /*
     * Prefer explicitly elderly-suitable places, but do not
     * make the dataset so restrictive that a nature/food trip
     * becomes impossible. High-walking places are the hard no.
     */
    return place.walking !== 'High';
  }

  return place.suitableFor.includes(traveller);
}

/* =========================================================
   TRAVELLER-SPECIFIC EXPERIENCE MATCHING
   ========================================================= */

const TRAVELLER_INTEREST_BONUSES: Record<
  string,
  Partial<Record<JourneyInterest, number>>
> = {
  Solo: {
    hidden: 18,
    food: 12,
    crafts: 10,
    wildlife: 8,
  },
  Couple: {
    beaches: 18,
    nature: 14,
    food: 12,
    hidden: 10,
  },
  Friends: {
    beaches: 16,
    wildlife: 15,
    food: 14,
    hidden: 12,
    nature: 8,
  },
  Family: {
    heritage: 14,
    spiritual: 10,
    food: 12,
    nature: 10,
    wildlife: 8,
  },
  Elderly: {
    heritage: 16,
    spiritual: 15,
    food: 12,
    nature: 8,
    crafts: 8,
  },
  'Accessibility needs': {
    heritage: 12,
    spiritual: 10,
    food: 12,
    nature: 8,
    crafts: 8,
  },
};

function travellerExperienceScore(
  place: JourneyPlace,
  traveller: string,
): number {
  const bonuses =
    TRAVELLER_INTEREST_BONUSES[
      traveller
    ] ?? {};

  return place.interests.reduce(
    (total, interest) =>
      total +
      (bonuses[interest] ?? 0),
    0,
  );
}

/* =========================================================
   WALKING MATCHING
   ========================================================= */

function walkingMatchScore(
  place: JourneyPlace,
  walking: string,
): number {
  if (walking === 'Low') {
    if (place.walking === 'Low') return 25;
    if (place.walking === 'Moderate') return 5;

    return -30;
  }

  if (walking === 'High') {
    if (place.walking === 'High') return 25;
    if (place.walking === 'Moderate') return 15;

    return 5;
  }

  if (place.walking === 'Moderate') {
    return 20;
  }

  return 10;
}

/* =========================================================
   BUDGET MATCHING
   ========================================================= */

function budgetMatchScore(
  place: JourneyPlace,
  budget: string,
): number {
  if (budget === '₹5k or less') {
    return place.priceLevel === 'Low'
      ? 25
      : place.priceLevel === 'Moderate'
        ? 5
        : -20;
  }

  if (budget === '₹5k – ₹10k') {
    if (place.priceLevel === 'Low') return 20;
    if (place.priceLevel === 'Moderate') return 15;

    return 0;
  }

  if (budget === '₹10k – ₹15k') {
    if (place.priceLevel === 'High') return 15;

    return 10;
  }

  return 15;
}

/* =========================================================
   STARTING LOCATION MATCHING
   ========================================================= */

function startingLocationScore(
  place: JourneyPlace,
  startingFrom: string,
): number {
  const start =
    STARTING_POINTS[startingFrom];

  if (!start) {
    return 0;
  }

  const distance = distanceKm(
    start,
    {
      lat: place.lat,
      lng: place.lng,
    },
  );

  if (distance <= 40) return 50;
  if (distance <= 100) return 35;
  if (distance <= 180) return 15;
  if (distance <= 280) return 5;

  return -20;
}

/* =========================================================
   TRAVEL STYLE
   ========================================================= */

function placesPerDayForStyle(
  travelStyle: string,
  traveller: string,
): number {
  /*
   * Traveller type can limit how many stops fit comfortably
   * into a day. This is intentionally separate from the
   * user's pace preference.
   */
  const isLowerPaceTraveller =
    traveller === 'Elderly' ||
    traveller === 'Accessibility needs';

  if (isLowerPaceTraveller) {
    if (travelStyle === 'Relaxed') return 2;
    if (travelStyle === 'Balanced') return 3;
    return 3;
  }

  if (travelStyle === 'Relaxed') {
    return 3;
  }

  if (travelStyle === 'Balanced') {
    return 4;
  }

  return 5;
}

/* =========================================================
   CURRENCY
   ========================================================= */

function formatCurrency(
  value: number,
): string {
  return `₹${Math.round(value).toLocaleString(
    'en-IN',
  )}`;
}

/* =========================================================
   COST NORMALIZATION
   ========================================================= */

function normalizeCosts(
  days: JourneyDay[],
  budget: string,
): JourneyDay[] {
  const budgetCaps: Record<string, number> = {
    '₹5k or less': 5000,
    '₹5k – ₹10k': 10000,
    '₹10k – ₹15k': 15000,
    '₹15k+': 20000,
  };

  const totalBase = days.reduce(
    (sum, day) => {
      const numeric = Number(
        day.estimatedCost.replace(
          /[₹,\s]/g,
          '',
        ),
      );

      return (
        sum +
        (Number.isFinite(numeric)
          ? numeric
          : 0)
      );
    },
    0,
  );

  if (!totalBase) {
    return days;
  }

  const cap =
    budgetCaps[budget] ?? totalBase;

  if (
    budget === '₹15k+' ||
    totalBase <= cap
  ) {
    return days;
  }

  const scale = cap / totalBase;

  return days.map((day) => {
    const numeric = Number(
      day.estimatedCost.replace(
        /[₹,\s]/g,
        '',
      ),
    );

    return {
      ...day,
      estimatedCost: formatCurrency(
        numeric * scale,
      ),
    };
  });
}

/* =========================================================
   ACTIVITY TIME
   ========================================================= */

function getActivityTime(
  index: number,
): string {
  const times = [
    '09:00',
    '11:30',
    '14:00',
    '16:30',
    '18:00',
  ];

  return (
    times[index] ??
    '18:30'
  );
}

/* =========================================================
   GENERATOR
   ========================================================= */

export function generateJourney(
  preferences: JourneyPreferences | null,
): JourneyData {
  const safePreferences: JourneyPreferences = {
    startingFrom:
      preferences?.startingFrom ||
      'Bhubaneswar',

    duration:
      preferences?.duration ||
      '2–3 days',

    travellers:
      preferences?.travellers ||
      'Solo',

    interests:
      preferences?.interests?.length
        ? preferences.interests
        : ['nature'],

    travelStyle:
      preferences?.travelStyle ||
      'Balanced',

    budget:
      preferences?.budget ||
      '₹10k – ₹15k',

    walking:
      preferences?.walking ||
      'Moderate',
  };

  const requiredDays =
    durationToDays(
      safePreferences.duration,
    );

  const placesPerDay =
    placesPerDayForStyle(
      safePreferences.travelStyle,
      safePreferences.travellers,
    );

  const startingPoint =
    STARTING_POINTS[
      safePreferences.startingFrom
    ] ??
    STARTING_POINTS.Bhubaneswar;

  /* =======================================================
     SCORE EVERY PLACE
     ======================================================= */

  const scoredPlaces = JOURNEY_PLACES
    .map((place) => {
      const score =
        interestMatchScore(
          place,
          safePreferences.interests,
        ) +
        travellerMatchScore(
          place,
          safePreferences.travellers,
        ) +
        travellerExperienceScore(
          place,
          safePreferences.travellers,
        ) +
        walkingMatchScore(
          place,
          safePreferences.walking,
        ) +
        budgetMatchScore(
          place,
          safePreferences.budget,
        ) +
        startingLocationScore(
          place,
          safePreferences.startingFrom,
        );

      return {
        place,
        score,
      };
    })
    .filter(({ place }) => {
      /*
       * Traveller suitability is a hard gate.
       * This keeps the final itinerary aligned with
       * who the user is actually travelling with.
       */
      if (
        !isTravellerEligible(
          place,
          safePreferences.travellers,
        )
      ) {
        return false;
      }

      const selectedInterests =
        safePreferences.interests;

      if (!selectedInterests.length) {
        return true;
      }

      const primaryInterest =
        place.interests[0];

      /*
      * Single-interest trip:
      * ONLY primary-interest places are allowed.
      */
      if (selectedInterests.length === 1) {
        return (
          primaryInterest ===
          selectedInterests[0]
        );
      }

      /*
      * Multi-interest trip:
      * allow places belonging to any selected
      * primary category OR a meaningful secondary
      * category.
      */
      return selectedInterests.some(
        (interest) =>
          place.interests.includes(
            interest as JourneyInterest,
          )
      );
    })
    .sort(
      (a, b) =>
        b.score - a.score,
    );

  /* =======================================================
     SELECT PLACES WITHOUT DUPLICATES
     ======================================================= */

  const selectedPlaces: JourneyPlace[] = [];
  const usedIds = new Set<string>();

  /* The starting point is a hard route anchor. A great itinerary may
   * never send the traveller across Odisha before their first stop. */
  const startingAnchor = JOURNEY_PLACES
    .filter((place) => isTravellerEligible(place, safePreferences.travellers))
    .map((place) => ({
      place,
      distance: distanceKm(startingPoint, { lat: place.lat, lng: place.lng }),
    }))
    .filter(({ distance }) => distance <= 150)
    .sort((a, b) => a.distance - b.distance)[0]?.place;

  /*
   * First pass:
   * prioritize the strongest matches.
   */
  for (
    const item of scoredPlaces
  ) {
    if (
      usedIds.has(item.place.id)
    ) {
      continue;
    }

    selectedPlaces.push(
      item.place,
    );

    usedIds.add(
      item.place.id,
    );

    if (
      selectedPlaces.length >=
      requiredDays * placesPerDay
    ) {
      break;
    }
  }

  /*
   * If we don't have enough places for the requested
   * duration, continue with lower-ranked places from
   * the SAME interests while still respecting the
   * traveller suitability gate.
   */

  if (
    selectedPlaces.length <
    requiredDays *
      placesPerDay
  ) {
    for (
      const item of JOURNEY_PLACES
        .map((place) => ({
          place,
          score:
            startingLocationScore(
              place,
              safePreferences.startingFrom,
            ) +
            travellerMatchScore(
              place,
              safePreferences.travellers,
            ) +
            travellerExperienceScore(
              place,
              safePreferences.travellers,
            ) +
            walkingMatchScore(
              place,
              safePreferences.walking,
            ),
        }))
        .filter(
          ({ place }) =>
            !usedIds.has(
              place.id,
            ) &&
            isTravellerEligible(
              place,
              safePreferences.travellers,
            ) &&
            safePreferences.interests.some(
              (interest) =>
                place.interests.includes(
                  interest as JourneyInterest,
                ),
            )
        )
        .sort(
          (a, b) =>
            b.score - a.score,
        )
    ) {
      selectedPlaces.push(
        item.place,
      );

      usedIds.add(
        item.place.id,
      );

      if (
        selectedPlaces.length >=
        requiredDays *
          placesPerDay
      ) {
        break;
      }
    }
  }

  /* Keep the first day close to the starting point even when interest
   * scoring alone would otherwise fill the itinerary with distant stops. */
  if (startingAnchor && !usedIds.has(startingAnchor.id)) {
    const targetCount = requiredDays * placesPerDay;

    if (selectedPlaces.length >= targetCount) {
      const displaced = selectedPlaces.pop();
      if (displaced) usedIds.delete(displaced.id);
    }

    selectedPlaces.unshift(startingAnchor);
    usedIds.add(startingAnchor.id);
  }


  /* =======================================================
     GROUP PLACES INTO DAYS
     ======================================================= */

  const generatedDays: JourneyDay[] = [];

/*
 * Group matching places by district first.
 * This prevents a single day from mixing
 * Khordha + Cuttack + Puri + Ganjam.
 */
const districtGroups = new Map<
  string,
  JourneyPlace[]
>();

for (const place of selectedPlaces) {
  const existing =
    districtGroups.get(place.district) ?? [];

  existing.push(place);

  districtGroups.set(
    place.district,
    existing,
  );
}

/*
 * Order districts into a real route, not a relevance-ranked list.
 * Each new day is the closest suitable district to the preceding stop.
 */
const remainingDistricts = [...districtGroups.entries()];
const orderedDistricts: Array<[string, JourneyPlace[]]> = [];
let routePosition = startingPoint;

while (remainingDistricts.length) {
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < remainingDistricts.length; index++) {
    const [, places] = remainingDistricts[index];
    const distanceToDistrict = Math.min(
      ...places.map((place) =>
        distanceKm(routePosition, { lat: place.lat, lng: place.lng }),
      ),
    );

    if (distanceToDistrict < nearestDistance) {
      nearestDistance = distanceToDistrict;
      nearestIndex = index;
    }
  }

  const [nextDistrict] = remainingDistricts.splice(nearestIndex, 1);
  orderedDistricts.push(nextDistrict);
  const [, nextPlaces] = nextDistrict;
  const nearestPlace = [...nextPlaces].sort(
    (a, b) =>
      distanceKm(routePosition, { lat: a.lat, lng: a.lng }) -
      distanceKm(routePosition, { lat: b.lat, lng: b.lng }),
  )[0];
  routePosition = { lat: nearestPlace.lat, lng: nearestPlace.lng };
}

/*
 * One district becomes one itinerary day.
 *
 * We intentionally do NOT force placesPerDay
 * places into every day. A day can have fewer
 * activities when a district has fewer matching
 * attractions.
 */
let previousRoutePosition = startingPoint;

for (
  const [district, places] of orderedDistricts
) {
  if (
    generatedDays.length >=
    requiredDays
  ) {
    break;
  }

  const dayPlaces =
    places.slice(0, placesPerDay);

  if (!dayPlaces.length) {
    continue;
  }

  const firstPlace =
    dayPlaces[0];

  const activities: JourneyActivity[] =
    dayPlaces.map(
      (place, index) => ({
        time:
          getActivityTime(index),

        name:
          place.name,

        description:
          place.description,

        duration:
          place.duration,

        cost:
          place.estimatedCost > 0
            ? formatCurrency(
                place.estimatedCost,
              )
            : undefined,

        walking:
          place.walking,

        icon:
          place.icon,
      }),
    );

  let totalDistance = 0;

  /* Include inter-day transfers as well as the Day 1 departure, so the
   * displayed distance and journey time match the route on the map. */
  totalDistance += distanceKm(
    previousRoutePosition,
    { lat: firstPlace.lat, lng: firstPlace.lng },
  );

  /*
   * Calculate distance only between
   * places belonging to this district/day.
   */
  for (
    let j = 1;
    j < dayPlaces.length;
    j++
  ) {
    totalDistance +=
      distanceKm(
        {
          lat:
            dayPlaces[j - 1].lat,
          lng:
            dayPlaces[j - 1].lng,
        },
        {
          lat:
            dayPlaces[j].lat,
          lng:
            dayPlaces[j].lng,
        },
      );
  }

  const finalPlaceOfDay = dayPlaces[dayPlaces.length - 1];
  previousRoutePosition = {
    lat: finalPlaceOfDay.lat,
    lng: finalPlaceOfDay.lng,
  };

  const dayCost =
    dayPlaces.reduce(
      (sum, place) =>
        sum +
        place.estimatedCost,
      0,
    );

  const daySafetyNotes = [
    ...new Set(
      dayPlaces.flatMap((place) => place.safetyNotes ?? []),
    ),
  ];

  const daySafetyNote =
    daySafetyNotes.join(' ') ||
    'Check the latest opening hours, weather and local conditions before setting out. Follow instructions at the destination.';

  const interestText =
    safePreferences.interests
      .map(
        (interest) =>
          INTEREST_LABELS[
            interest
          ] ?? interest,
      )
      .join(', ');

  generatedDays.push({
    day:
      generatedDays.length + 1,

    /*
     * IMPORTANT:
     * The title now represents the actual
     * geographic area containing ALL activities.
     */
    title:
      district,

    subtitle:
      firstPlace.subtitle,

    distance:
      `~${Math.max(
        5,
        Math.round(
          totalDistance,
        ),
      )} km total`,

    estimatedCost:
      formatCurrency(
        dayCost,
      ),

    lat:
      firstPlace.lat,

    lng:
      firstPlace.lng,

    activities,

    whyInPlan:
      `A ${district} day selected for your ` +
      `${interestText} interests, ` +
      `for ${safePreferences.travellers.toLowerCase()} travel, ` +
      `${safePreferences.walking.toLowerCase()} walking preference, ` +
      `and journey from ${safePreferences.startingFrom}.`,
    safetyNote: daySafetyNote,
  });
}

  /* =======================================================
     NORMALIZE COST
     ======================================================= */

  const finalDays =
    normalizeCosts(
      generatedDays,
      safePreferences.budget,
    );

  /* =======================================================
    LOCAL KNOWLEDGE / JOURNEY TIPS
    ======================================================= */

  /*
  * IMPORTANT:
  * Only places that actually appear in the final
  * displayed itinerary are allowed to contribute
  * Journey Tips.
  */
  const itineraryPlaceNames =
    new Set(
      finalDays.flatMap((day) =>
        day.activities.map(
          (activity) => activity.name,
        ),
      ),
    );

  const itineraryPlaces =
    JOURNEY_PLACES.filter(
      (place) =>
        itineraryPlaceNames.has(
          place.name,
        ),
    );

  const journeyTips: string[] = [];

  /*
  * Collect destination-specific local knowledge.
  */
  for (const place of itineraryPlaces) {
    for (const tip of place.localTips ?? []) {
      if (!journeyTips.includes(tip)) {
        journeyTips.push(tip);
      }
    }
  }

  /*
  * Add transport advice ONLY when the actual
  * displayed itinerary contains a Khordha place.
  */
  if (
    itineraryPlaces.some(
      (place) =>
        place.district === 'Khordha',
    )
  ) {
    journeyTips.push(
      'For local movement around Bhubaneswar and Khordha, check AMA BUS routes and live timings before leaving.',
    );
  }

  /*
  * Add coastal practical advice ONLY when the
  * actual itinerary contains a coastal/nature stop.
  */
  if (
    itineraryPlaces.some(
      (place) =>
        place.interests.includes('beaches') ||
        place.interests.includes('nature'),
    )
  ) {
    journeyTips.push(
      'Keep some buffer around coastal stops because weather, traffic and local conditions can affect travel time.',
    );
  }

  /*
  * Remove duplicates and keep the section compact.
  */
  const finalJourneyTips = [
    ...new Set(journeyTips),
  ].slice(0, 5);

  /*
  * Safety fallback.
  *
  * This should only appear when none of the actual
  * itinerary places has local knowledge yet.
  */
  if (finalJourneyTips.length === 0) {
    finalJourneyTips.push(
      'Check the latest opening hours and local conditions before setting out.',
      'Keep some buffer between major stops so the journey stays comfortable.',
      'Carry water and comfortable footwear for sightseeing.',
    );
  }

  const safetyNotes = [
    ...new Set(
      itineraryPlaces.flatMap((place) => place.safetyNotes ?? []),
    ),
    'For an immediate emergency—medical, police, fire or disaster—call 112. Odysha does not dispatch emergency services.',
    'Use authorised operators and guides, keep valuables secure, and share your plan with someone you trust when visiting remote areas.',
  ].slice(0, 5);

  /* =======================================================
     TOTALS
     ======================================================= */

  const totalCost =
    finalDays.reduce(
      (sum, day) => {
        const numeric =
          Number(
            day.estimatedCost.replace(
              /[₹,\s]/g,
              '',
            ),
          );

        return (
          sum +
          (Number.isFinite(
            numeric,
          )
            ? numeric
            : 0)
        );
      },
      0,
    );

  const totalDistance =
    finalDays.reduce(
      (sum, day) => {
        const match =
          day.distance.match(
            /[\d.]+/,
          );

        return (
          sum +
          (match
            ? Number(match[0])
            : 0)
        );
      },
      0,
    );

  const travelHours =
    totalDistance / 35;

  const interestText =
    safePreferences.interests
      .map(
        (interest) =>
          INTEREST_LABELS[
            interest
          ] ?? interest,
      )
      .join(' + ');

  /* =======================================================
     FINAL JOURNEY DATA
     ======================================================= */

  return {
    title:
      'Your Odisha Journey',

    duration:
      requiredDays === 1
        ? '1 Day'
        : `${requiredDays} Days`,

    totalCost:
      formatCurrency(
        totalCost,
      ),

    interests:
      interestText,

    travelStyle:
      safePreferences.travelStyle,

    travellers:
      safePreferences.travellers,

    personalizationMessage:
      `Designed for a ${safePreferences.travelStyle.toLowerCase()} ` +
      `${safePreferences.travellers.toLowerCase()} journey from ` +
      `${safePreferences.startingFrom}, focused on ` +
      `${interestText.toLowerCase()}, with ` +
      `${safePreferences.walking.toLowerCase()} walking preference.`,
    journeyTips: finalJourneyTips,
    safetyNotes,
    days: finalDays,

    summary: {
      totalDistance:
        `~${Math.round(
          totalDistance,
        )} km`,

      totalTravelTime:
        `~${Math.round(
          travelHours * 60,
        )} min`,

      bestTimeToVisit:
        'Oct – Mar',

      transportMode:
        safePreferences.budget ===
        '₹5k or less'
          ? 'Local + shared transport'
          : safePreferences.budget ===
              '₹5k – ₹10k'
            ? 'Mixed local transport'
            : 'Private Car',

      pace:
        safePreferences.travelStyle,
    },
  };
}
