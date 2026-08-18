export interface JourneyActivity {
  time: string;
  name: string;
  description: string;
  duration: string;
  cost?: string;
  walking: 'Low' | 'Moderate' | 'High';
  icon?: string;
}

export interface JourneyDay {
  day: number;
  title: string;
  subtitle: string;
  distance: string;
  estimatedCost: string;
  lat: number;
  lng: number;
  activities: JourneyActivity[];
  whyInPlan: string;
}

export interface JourneyData {
  title: string;
  duration: string;
  totalCost: string;
  interests: string;
  travelStyle: string;
  travellers: string;

  personalizationMessage: string;

  journeyTips: string[];

  days: JourneyDay[];

  summary: {
    totalDistance: string;
    totalTravelTime: string;
    bestTimeToVisit: string;
    transportMode: string;
    pace: string;
  };
}


/*
|--------------------------------------------------------------------------
| DEFAULT ODISHA JOURNEY
|--------------------------------------------------------------------------
|
| This is our first working itinerary.
| Later, the planner preferences will determine which places/days
| are selected and this data will become dynamic.
|
*/

export const DEFAULT_JOURNEY: JourneyData = {
  title: 'Your Odisha Journey',

  duration: '4 Days / 3 Nights',

  totalCost: '₹12,000',

  interests: 'Nature + Culture',

  travelStyle: 'Relaxed',

  travellers: 'Elderly Family',

  personalizationMessage:
    'Designed for a relaxed trip with elderly family members, low walking preference and love for nature & culture.',

  journeyTips: [
    'Keep some buffer time between major stops.',
    'Carry water and comfortable footwear.',
    'Check attraction timings before visiting.',
  ],

  days: [
    {
      day: 1,

      title: 'Bhubaneswar',

      subtitle: 'Heritage & Culture',

      distance: '~25 km total',

      estimatedCost: '₹1,800',

        lat: 20.2961,
        lng: 85.8245,

      activities: [
        {
          time: '09:00',
          name: 'Lingaraj Temple',
          description:
            'Ancient Kalinga architecture masterpiece.',
          duration: '45 min',
          walking: 'Low',
          icon: 'temple',
        },

        {
          time: '12:30',
          name: 'Local Lunch (Regional Thali)',
          description:
            'Try authentic Odia flavours.',
          duration: '60 min',
          cost: '₹250',
          walking: 'Low',
          icon: 'food',
        },

        {
          time: '15:00',
          name: 'Udayagiri & Khandagiri Caves',
          description:
            'Ancient Jain rock-cut caves.',
          duration: '75 min',
          walking: 'Low',
          icon: 'caves',
        },

        {
          time: '17:00',
          name: 'Ekamra Haat',
          description:
            'Explore local handicrafts and souvenirs.',
          duration: '60 min',
          cost: '₹300',
          walking: 'Low',
          icon: 'market',
        },
      ],

      whyInPlan:
        'Easy access from your stay, rich culture and minimal walking.',
    },

    {
      day: 2,

      title: 'Puri',

      subtitle: 'Spiritual & Coastal',

      distance: '~65 km total',

      estimatedCost: '₹2,200',

        lat: 19.8135,
        lng: 85.8312,

      activities: [
        {
          time: '07:00',
          name: 'Jagannath Temple (Darshan)',
          description:
            'Spiritual heart of Odisha.',
          duration: '90 min',
          walking: 'Moderate',
          icon: 'temple',
        },

        {
          time: '12:00',
          name: 'Local Lunch',
          description:
            'Taste Mahaprasad & local seafood.',
          duration: '60 min',
          cost: '₹250',
          walking: 'Low',
          icon: 'food',
        },

        {
          time: '16:30',
          name: 'Puri Beach',
          description:
            'Relax and enjoy the sea breeze.',
          duration: '90 min',
          walking: 'Low',
          icon: 'beach',
        },

        {
          time: '18:00',
          name: 'Golden Beach',
          description:
            'Beautiful sunset point.',
          duration: '60 min',
          cost: '₹100',
          walking: 'Low',
          icon: 'sunset',
        },
      ],

      whyInPlan:
        'Spiritual + relaxation with plenty of rest time.',
    },

    {
      day: 3,

      title: 'Konark & Chilika',

      subtitle: 'Nature & Heritage',

      distance: '~120 km total',

      estimatedCost: '₹3,000',

      lat: 19.8876,
      lng: 86.0945,

      activities: [
        {
          time: '07:30',
          name: 'Konark Sun Temple',
          description:
            'UNESCO World Heritage Site.',
          duration: '90 min',
          walking: 'Moderate',
          icon: 'temple',
        },

        {
          time: '11:00',
          name: 'Chandrabhaga Beach',
          description:
            'Peaceful beach near Konark.',
          duration: '60 min',
          walking: 'Low',
          icon: 'beach',
        },

        {
          time: '14:00',
          name: 'Chilika Lake (Satapada)',
          description:
            'Boat ride & dolphin spotting.',
          duration: '120 min',
          cost: '₹800',
          walking: 'Low',
          icon: 'boat',
        },

        {
          time: '17:30',
          name: 'Return to Puri',
          description:
            'Relax after a full day of exploration.',
          duration: '—',
          walking: 'Low',
          icon: 'car',
        },
      ],

      whyInPlan:
        'Perfect mix of heritage and nature while keeping walking manageable.',
    },

    {
      day: 4,

      title: 'Hidden Gems & Local Life',

      subtitle: 'Offbeat Experience',

      distance: '~80 km total',

      estimatedCost: '₹2,000',

      lat: 20.3974,
      lng: 85.8186,

      activities: [
        {
          time: '08:00',
          name: 'Raghurajpur Craft Village',
          description:
            "Pattachitra artists' village.",
          duration: '90 min',
          walking: 'Low',
          icon: 'art',
        },

        {
          time: '11:00',
          name: 'Dhauli Peace Pagoda',
          description:
            'Serene hilltop with great views.',
          duration: '60 min',
          walking: 'Low',
          icon: 'pagoda',
        },

        {
          time: '15:00',
          name: 'Nandankanan Zoo',
          description:
            'Wildlife experience.',
          duration: '120 min',
          cost: '₹600',
          walking: 'Low',
          icon: 'wildlife',
        },
      ],

      whyInPlan:
        'Offbeat + peaceful day before your journey ends.',
    },

        {
      day: 5,
      title: 'Cuttack',
      subtitle: 'Heritage & Local Flavours',
      distance: '~75 km total',
      estimatedCost: '₹2,200',
      lat: 20.4625,
      lng: 85.8830,
      activities: [
        {
          time: '09:00',
          name: 'Barabati Fort',
          description:
            'Historic fort overlooking the Mahanadi delta.',
          duration: '60 min',
          walking: 'Low',
          icon: 'heritage',
        },
        {
          time: '11:30',
          name: 'Cuttack Old Town',
          description:
            'Explore the historic streets and local character of the city.',
          duration: '90 min',
          walking: 'Low',
          icon: 'city',
        },
        {
          time: '14:00',
          name: 'Local Odia Lunch',
          description:
            'Enjoy traditional flavours from Cuttack.',
          duration: '60 min',
          cost: '₹300',
          walking: 'Low',
          icon: 'food',
        },
        {
          time: '16:00',
          name: 'Silver Filigree Experience',
          description:
            'Discover Cuttack’s famous traditional silver craftsmanship.',
          duration: '90 min',
          walking: 'Low',
          icon: 'craft',
        },
      ],
      whyInPlan:
        'Adds heritage, local culture and traditional craftsmanship without an overly demanding pace.',
    },

    {
      day: 6,
      title: 'Berhampur & Gopalpur',
      subtitle: 'Coastal Life & Local Culture',
      distance: '~45 km total',
      estimatedCost: '₹1,800',
      lat: 19.3150,
      lng: 84.7941,
      activities: [
        {
          time: '09:00',
          name: 'Berhampur Local Market',
          description:
            'Explore the local character, food and everyday life of southern Odisha.',
          duration: '75 min',
          walking: 'Moderate',
          icon: 'market',
        },
        {
          time: '11:30',
          name: 'Local Odia Lunch',
          description:
            'Try regional flavours and southern Odisha specialties.',
          duration: '60 min',
          cost: '₹250',
          walking: 'Low',
          icon: 'food',
        },
        {
          time: '14:00',
          name: 'Gopalpur Beach',
          description:
            'A relaxed coastal experience near Berhampur.',
          duration: '90 min',
          walking: 'Moderate',
          icon: 'beach',
        },
        {
          time: '17:00',
          name: 'Gopalpur Sunset',
          description:
            'End the day by the coast and enjoy a quieter evening.',
          duration: '60 min',
          walking: 'Low',
          icon: 'sunset',
        },
      ],
      whyInPlan:
        'A natural starting-area experience for travellers beginning from Berhampur.',
    },

    {
      day: 7,
      title: 'Sambalpur',
      subtitle: 'Culture & Nature',
      distance: '~300 km total',
      estimatedCost: '₹3,000',
      lat: 21.4669,
      lng: 83.9758,
      activities: [
        {
          time: '09:00',
          name: 'Samaleswari Temple',
          description:
            'Visit one of western Odisha’s important cultural landmarks.',
          duration: '60 min',
          walking: 'Low',
          icon: 'temple',
        },
        {
          time: '11:30',
          name: 'Hirakud Dam',
          description:
            'Experience the vast reservoir and surrounding landscape.',
          duration: '90 min',
          walking: 'Low',
          icon: 'nature',
        },
        {
          time: '14:00',
          name: 'Local Lunch',
          description:
            'Taste regional western Odisha cuisine.',
          duration: '60 min',
          cost: '₹300',
          walking: 'Low',
          icon: 'food',
        },
        {
          time: '16:30',
          name: 'Sambalpuri Craft Experience',
          description:
            'Discover the region’s distinctive textile and craft traditions.',
          duration: '90 min',
          walking: 'Low',
          icon: 'craft',
        },
      ],
      whyInPlan:
        'Introduces the cultural identity of western Odisha and adds variety beyond the coastal circuit.',
    },

    {
      day: 8,
      title: 'Koraput',
      subtitle: 'Hills & Tribal Odisha',
      distance: '~350 km total',
      estimatedCost: '₹3,500',
      lat: 18.8135,
      lng: 82.7123,
      activities: [
        {
          time: '08:00',
          name: 'Deomali Hills',
          description:
            'Scenic mountain landscape and one of Odisha’s most distinctive highland regions.',
          duration: '90 min',
          walking: 'Moderate',
          icon: 'mountain',
        },
        {
          time: '11:30',
          name: 'Tribal Culture Experience',
          description:
            'Learn about the region’s living tribal traditions and crafts.',
          duration: '90 min',
          walking: 'Low',
          icon: 'culture',
        },
        {
          time: '14:00',
          name: 'Regional Lunch',
          description:
            'Try local flavours from the Koraput region.',
          duration: '60 min',
          cost: '₹300',
          walking: 'Low',
          icon: 'food',
        },
        {
          time: '16:00',
          name: 'Coffee & Local Produce',
          description:
            'Explore locally produced coffee and regional products.',
          duration: '60 min',
          walking: 'Low',
          icon: 'nature',
        },
      ],
      whyInPlan:
        'Ends the extended journey with Odisha’s hill landscapes, local culture and a distinctly different regional experience.',
    },

  ],

  summary: {
    totalDistance: '~290 km',

    totalTravelTime: '~10 hrs',

    bestTimeToVisit: 'Oct – Mar',

    transportMode: 'Private Car',

    pace: 'Relaxed',
  },
};