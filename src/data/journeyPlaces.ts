export type JourneyInterest =
  | 'nature'
  | 'heritage'
  | 'beaches'
  | 'food'
  | 'crafts'
  | 'wildlife'
  | 'spiritual'
  | 'hidden';

export interface JourneyPlace {
  id: string;
  name: string;
  subtitle: string;
  district: string;

  lat: number;
  lng: number;

  interests: JourneyInterest[];

  suitableFor: string[];

  walking: 'Low' | 'Moderate' | 'High';

  priceLevel: 'Low' | 'Moderate' | 'High';

  estimatedCost: number;

  duration: string;

  description: string;

  bestTime: string;

  icon: string;

  localTips?: string[];
  safetyNotes?: string[];
}

export const JOURNEY_PLACES: JourneyPlace[] = [

  /* =========================================================
     BHUBANESWAR
     ========================================================= */

  {
    id: 'lingaraj-temple',
    name: 'Lingaraj Temple',
    subtitle: 'Heritage & Spiritual',
    district: 'Khordha',
    lat: 20.2380,
    lng: 85.8339,
    interests: ['heritage', 'spiritual'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family', 'Elderly'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 200,
    duration: '45 min',
    description:
      'A remarkable Kalinga-era temple and one of Bhubaneswar’s defining cultural landmarks.',
    bestTime: 'Oct – Mar',
    icon: 'temple',
  },

  {
    id: 'udayagiri-khandagiri',
    name: 'Udayagiri & Khandagiri Caves',
    subtitle: 'Ancient Heritage',
    district: 'Khordha',
    lat: 20.2608,
    lng: 85.7868,
    interests: ['heritage', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Low',
    estimatedCost: 150,
    duration: '75 min',
    description:
      'Historic Jain rock-cut caves offering a glimpse into Odisha’s ancient past.',
    bestTime: 'Oct – Feb',
    icon: 'caves',
  },

  {
    id: 'ekamra-haat',
    name: 'Ekamra Haat',
    subtitle: 'Arts & Crafts',
    district: 'Khordha',
    lat: 20.2895,
    lng: 85.8294,
    interests: ['crafts', 'food', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family', 'Elderly'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '60 min',
    description:
      'A lively space to discover Odisha handicrafts, textiles and local products.',
    bestTime: 'All year',
    icon: 'craft',
    localTips: [
        'For moving around Bhubaneswar, check AMA BUS routes before leaving. The official service provides live tracking, nearby-stop information and route planning.',
        'Keep a little buffer between attractions because city traffic can make short journeys take longer than expected.',
    ],
  },

  {
    id: 'dhauli',
    name: 'Dhauli Shanti Stupa',
    subtitle: 'Peace & Heritage',
    district: 'Khordha',
    lat: 20.1926,
    lng: 85.8390,
    interests: ['spiritual', 'heritage', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Family', 'Elderly'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 100,
    duration: '60 min',
    description:
      'A peaceful hilltop landmark connected with the transformation of Emperor Ashoka.',
    bestTime: 'Oct – Mar',
    icon: 'pagoda',
  },

  /* =========================================================
     PURI / KONARK
     ========================================================= */

  {
    id: 'puri-beach',
    name: 'Puri Beach',
    subtitle: 'Coastal Experience',
    district: 'Puri',
    lat: 19.7983,
    lng: 85.8245,
    interests: ['beaches', 'nature'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Low',
    estimatedCost: 150,
    duration: '90 min',
    description:
      'A classic Odisha coast experience with open sea, local life and evening views.',
    bestTime: 'Oct – Mar',
    icon: 'beach',
    safetyNotes: [
      'Stay within designated beach areas, follow lifeguard and local authority instructions, and avoid entering the sea when conditions are unsafe.',
    ],
  },

  {
    id: 'golden-beach',
    name: 'Golden Beach',
    subtitle: 'Beach & Sunset',
    district: 'Puri',
    lat: 19.7900,
    lng: 85.8200,
    interests: ['beaches', 'nature'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 100,
    duration: '60 min',
    description:
      'A calmer stretch of coastline suited to sunset and relaxed exploration.',
    bestTime: 'Oct – Mar',
    icon: 'sunset',
    localTips: [
        'Early morning or evening is generally more comfortable for a beach stop than the strongest afternoon heat.',
    ],
    safetyNotes: [
      'Follow beach signage and local authority advisories, especially around sea conditions and sunset.',
    ],
  },

  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    subtitle: 'UNESCO Heritage',
    district: 'Puri',
    lat: 19.8876,
    lng: 86.0945,
    interests: ['heritage'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Moderate',
    estimatedCost: 500,
    duration: '90 min',
    description:
      'An iconic masterpiece of Kalinga architecture shaped like a monumental stone chariot.',
    bestTime: 'Oct – Mar',
    icon: 'temple',
    safetyNotes: [
      'Carry water, follow monument instructions and use marked visitor areas—especially during busy hours or high heat.',
    ],
  },

  {
    id: 'chandrabhaga',
    name: 'Chandrabhaga Beach',
    subtitle: 'Quiet Coastal Escape',
    district: 'Puri',
    lat: 19.8550,
    lng: 86.1200,
    interests: ['beaches', 'nature', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 100,
    duration: '60 min',
    description:
      'A quieter beach near Konark known for its sunrise and open coastal landscape.',
    bestTime: 'Oct – Feb',
    icon: 'beach',
    safetyNotes: [
      'Follow beach signage and local authority advisories; avoid isolated stretches after dark.',
    ],
  },

  /* =========================================================
     PURI / CULTURAL CRAFTS
     ========================================================= */

  {
    id: 'raghurajpur',
    name: 'Raghurajpur Craft Village',
    subtitle: 'Pattachitra & Artisan Life',
    district: 'Puri',
    lat: 19.9000,
    lng: 85.8500,
    interests: ['crafts', 'heritage', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '90 min',
    description:
      'Meet artisans and discover Odisha’s traditional Pattachitra painting culture.',
    bestTime: 'Oct – Mar',
    icon: 'art',
    localTips: [
        'Visit artisan homes and workshops rather than treating Raghurajpur as a quick photo stop.',
        'Keep some time for browsing and buying directly from artisans.',
        'Pair Raghurajpur with the Puri side of the itinerary rather than making a long cross-Odisha detour.',
    ],
    safetyNotes: [
      'Use recognised workshops or guides, keep valuables with you, and respect private homes and local community boundaries.',
    ],
  },

  /* =========================================================
     CHILIKA
     ========================================================= */

  {
    id: 'chilika-satapada',
    name: 'Chilika Lake – Satapada',
    subtitle: 'Lake & Dolphin Experience',
    district: 'Puri',
    lat: 19.6747,
    lng: 85.4250,
    interests: ['nature', 'wildlife', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Moderate',
    estimatedCost: 800,
    duration: '120 min',
    description:
      'Boat-based exploration of Chilika with opportunities for birdlife and dolphin sightings.',
    bestTime: 'Nov – Feb',
    icon: 'boat',
    localTips: [
        'Keep your boat schedule protected with some buffer because the lake experience is more time-sensitive than a normal city attraction.',
        'Check the latest boating arrangements before travelling to Satapada.',
    ],
    safetyNotes: [
      'Use designated boating operators, wear the supplied safety equipment, and follow boating instructions and current local authority advisories.',
    ],
  },

  /* =========================================================
     BERHAMPUR / GANJAM
     ========================================================= */

  {
    id: 'berhampur-market',
    name: 'Berhampur Local Market',
    subtitle: 'Local Life & Food',
    district: 'Ganjam',
    lat: 19.3150,
    lng: 84.7941,
    interests: ['food', 'hidden', 'crafts'],
    suitableFor: ['Solo', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Low',
    estimatedCost: 250,
    duration: '75 min',
    description:
      'Explore southern Odisha through local food, markets and everyday life.',
    bestTime: 'All year',
    icon: 'market',
  },

  {
    id: 'gopalpur-beach',
    name: 'Gopalpur Beach',
    subtitle: 'Southern Odisha Coast',
    district: 'Ganjam',
    lat: 19.2650,
    lng: 84.9000,
    interests: ['beaches', 'nature', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Low',
    estimatedCost: 200,
    duration: '90 min',
    description:
      'A quieter coastal experience near Berhampur with a relaxed seaside atmosphere.',
    bestTime: 'Oct – Mar',
    icon: 'beach',
    localTips: [
        'Keep the beach experience closer to sunrise or sunset rather than the harshest afternoon heat.',
        'Allow extra time if your plan depends on a relaxed seaside stop; coastal traffic and local road conditions can affect timing.',
    ],
  },

  {
    id: 'taptapani',
    name: 'Taptapani',
    subtitle: 'Hot Springs & Hills',
    district: 'Ganjam',
    lat: 19.4960,
    lng: 84.3860,
    interests: ['nature', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '120 min',
    description:
      'A scenic hill-region escape known for its natural hot springs.',
    bestTime: 'Oct – Feb',
    icon: 'nature',
  },

  /* =========================================================
     CUTTACK
     ========================================================= */

  {
    id: 'barabati-fort',
    name: 'Barabati Fort',
    subtitle: 'Medieval Heritage',
    district: 'Cuttack',
    lat: 20.4800,
    lng: 85.8681,
    interests: ['heritage', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 100,
    duration: '60 min',
    description:
      'Historic fort remains that reveal Cuttack’s medieval past.',
    bestTime: 'Oct – Mar',
    icon: 'heritage',
  },

  {
    id: 'silver-filigree',
    name: 'Silver Filigree Experience',
    subtitle: 'Traditional Craftsmanship',
    district: 'Cuttack',
    lat: 20.4625,
    lng: 85.8830,
    interests: ['crafts', 'heritage', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '90 min',
    description:
      'Discover Cuttack’s distinctive silver filigree craft traditions.',
    bestTime: 'All year',
    icon: 'craft',
  },

  /* =========================================================
     WESTERN ODISHA
     ========================================================= */

  {
    id: 'hirakud-dam',
    name: 'Hirakud Dam',
    subtitle: 'Landscape & Reservoir',
    district: 'Sambalpur',
    lat: 21.5350,
    lng: 83.8700,
    interests: ['nature', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 150,
    duration: '90 min',
    description:
      'A vast reservoir landscape offering a different side of Odisha.',
    bestTime: 'Oct – Feb',
    icon: 'nature',
  },

  {
    id: 'sambalpuri-craft',
    name: 'Sambalpuri Craft Experience',
    subtitle: 'Textile & Culture',
    district: 'Sambalpur',
    lat: 21.4669,
    lng: 83.9758,
    interests: ['crafts', 'heritage', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '90 min',
    description:
      'Explore Sambalpuri textile traditions and regional craftsmanship.',
    bestTime: 'All year',
    icon: 'craft',
  },

  /* =========================================================
     KORAPUT
     ========================================================= */

  {
    id: 'deomali',
    name: 'Deomali Hills',
    subtitle: 'Mountain Landscape',
    district: 'Koraput',
    lat: 18.8167,
    lng: 82.7167,
    interests: ['nature', 'hidden'],
    suitableFor: ['Solo', 'Couple', 'Friends'],
    walking: 'High',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '120 min',
    description:
      'A highland landscape with dramatic hills and expansive views.',
    bestTime: 'Oct – Feb',
    icon: 'mountain',
    localTips: [
        'Start early for a comfortable hill day and keep extra time for road travel.',
        'Carry water and footwear suitable for uneven outdoor terrain.',
    ],
    safetyNotes: [
      'Start early, stay on established routes, carry water, and avoid hill travel after dark or during unsafe weather.',
    ],
  },

  {
    id: 'koraput-tribal-culture',
    name: 'Tribal Culture Experience',
    subtitle: 'Living Local Traditions',
    district: 'Koraput',
    lat: 18.8135,
    lng: 82.7123,
    interests: ['crafts', 'heritage', 'hidden', 'nature'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 300,
    duration: '90 min',
    description:
      'Discover the living traditions, crafts and cultural identity of southern Odisha.',
    bestTime: 'Oct – Feb',
    icon: 'culture',
  },

  /* =========================================================
     WILDLIFE
     ========================================================= */

  {
    id: 'nandankanan',
    name: 'Nandankanan Zoological Park',
    subtitle: 'Wildlife Experience',
    district: 'Khordha',
    lat: 20.3974,
    lng: 85.8186,
    interests: ['wildlife', 'nature'],
    suitableFor: ['Solo', 'Couple', 'Friends', 'Family'],
    walking: 'Moderate',
    priceLevel: 'Moderate',
    estimatedCost: 600,
    duration: '120 min',
    description:
      'One of Odisha’s major wildlife attractions with a large collection of species.',
    bestTime: 'Oct – Feb',
    icon: 'wildlife',
    localTips: [
        'Nandankanan Zoological Park is closed every Monday. Plan your wildlife day on another day.',
        'From April to September, the zoo currently operates from 7:30 AM to 5:30 PM; from October to March, it operates from 8:00 AM to 5:00 PM.',
        'Consider starting early if wildlife is the main focus of your day.',
    ],
  },

  {
    id: 'puri-mahaprasad',
    name: 'Jagannath Mahaprasad Experience',
    subtitle: 'Temple Food & Tradition',
    district: 'Puri',
    lat: 19.8049,
    lng: 85.8179,
    interests: ['food', 'spiritual'],
    suitableFor: [
        'Solo',
        'Couple',
        'Friends',
        'Family',
        'Elderly',
    ],
    walking: 'Low',
    priceLevel: 'Low',
    estimatedCost: 250,
    duration: '60 min',
    description:
        'Experience the distinctive food traditions surrounding Jagannath culture and Mahaprasad.',
    bestTime: 'All year',
    icon: 'food',
    localTips: [
        'Plan your Jagannath visit early in the day when possible. Odisha Tourism sample itineraries specifically schedule early-morning darshan.',
        'Puri sees very high daily temple footfall, so allow buffer time around darshan rather than planning another tightly timed activity immediately afterward.',
        'Temple timings and rituals can vary around festivals and special occasions, so check the latest information before your visit.',
    ],
    },

    {
        id: 'bhubaneswar-odia-food',
        name: 'Traditional Odia Food Trail',
        subtitle: 'Local Flavours',
        district: 'Khordha',
        lat: 20.2961,
        lng: 85.8245,
        interests: ['food', 'hidden'],
        suitableFor: [
            'Solo',
            'Couple',
            'Friends',
            'Family',
            'Elderly',
        ],
        walking: 'Low',
        priceLevel: 'Low',
        estimatedCost: 350,
        duration: '90 min',
        description:
            'Discover traditional Odia dishes, regional flavours and everyday local food culture.',
        bestTime: 'All year',
        icon: 'food',
        },

    {
        id: 'cuttack-food-trail',
        name: 'Cuttack Local Food Trail',
        subtitle: 'Street Food & Local Flavours',
        district: 'Cuttack',
        lat: 20.4625,
        lng: 85.8830,
        interests: ['food'],
        suitableFor: [
            'Solo',
            'Couple',
            'Friends',
            'Family',
        ],
        walking: 'Moderate',
        priceLevel: 'Low',
        estimatedCost: 300,
        duration: '90 min',
        description:
            'Explore the local flavours and street-food culture of historic Cuttack.',
        bestTime: 'All year',
        icon: 'food',
        },

    {
        id: 'sambalpur-food',
        name: 'Western Odisha Food Experience',
        subtitle: 'Regional Cuisine',
        district: 'Sambalpur',
        lat: 21.4669,
        lng: 83.9758,
        interests: ['food', 'hidden'],
        suitableFor: [
            'Solo',
            'Couple',
            'Friends',
            'Family',
        ],
        walking: 'Low',
        priceLevel: 'Low',
        estimatedCost: 300,
        duration: '75 min',
        description:
            'Taste distinctive flavours from western Odisha and discover regional food traditions.',
        bestTime: 'All year',
        icon: 'food',
        },

];
