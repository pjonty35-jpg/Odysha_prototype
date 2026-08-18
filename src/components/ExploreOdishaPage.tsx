import React, { useMemo, useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Bookmark,
  ShieldCheck,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  TreePine,
  Landmark,
  Flame,
  Waves,
  PawPrint,
  Palette,
  Utensils,
  Gem,
  X,
  Clock3,
  Accessibility,
} from 'lucide-react';

import { EXPLORE_PLACES, ExplorePlaceItem } from '../data/exploreData';
import { ASSET_IMAGES } from '../data/landingData';

interface ExploreOdishaPageProps {
  onSelectPlace: (place: ExplorePlaceItem) => void;
  onPlanJourney: (initialDestination: string) => void;
  savedPlaceIds: string[];
  onToggleBookmark: (placeId: string) => void;
  onBackHome: () => void;
}

type SortOption = 'recommended' | 'rating' | 'reviews' | 'priceAsc';

const DISTRICTS = [
  'All Odisha',
  'Puri',
  'Bhubaneswar / Khordha',
  'Koraput',
  'Gajapati',
  'Mayurbhanj',
  'Ganjam',
  'Cuttack',
  'Sambalpur',
  'Balasore',
  'Kalahandi',
];

const CATEGORY_FILTERS = [
  {
    id: 'nature',
    label: 'Nature',
    count: 120,
    icon: TreePine,
    color: 'text-emerald-700',
  },
  {
    id: 'heritage',
    label: 'Heritage',
    count: 98,
    icon: Landmark,
    color: 'text-amber-800',
  },
  {
    id: 'spiritual',
    label: 'Spiritual',
    count: 76,
    icon: Flame,
    color: 'text-amber-600',
  },
  {
    id: 'beaches',
    label: 'Beaches',
    count: 52,
    icon: Waves,
    color: 'text-blue-600',
  },
  {
    id: 'wildlife',
    label: 'Wildlife',
    count: 38,
    icon: PawPrint,
    color: 'text-green-800',
  },
  {
    id: 'arts',
    label: 'Arts & Crafts',
    count: 45,
    icon: Palette,
    color: 'text-rose-700',
  },
  {
    id: 'food',
    label: 'Food',
    count: 61,
    icon: Utensils,
    color: 'text-red-600',
  },
  {
    id: 'hidden',
    label: 'Hidden Gems',
    count: 86,
    icon: Gem,
    color: 'text-[#9a3412]',
  },
];

const BUDGET_OPTIONS = [
  { id: 'all', label: 'All Budgets' },
  { id: 'low', label: '₹ Low' },
  { id: 'moderate', label: '₹₹ Moderate' },
  { id: 'high', label: '₹₹₹ High' },
  { id: 'luxury', label: '₹₹₹₹ Luxury' },
];

const DURATION_OPTIONS = [
  { id: 'all', label: 'All Durations' },
  { id: 'half', label: 'Half Day (2–4 hrs)' },
  { id: 'full', label: 'Full Day' },
  { id: 'weekend', label: 'Weekend / 2–3 Days' },
];

const POPULARITY_OPTIONS = [
  { id: 'all', label: 'All Places' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'hidden', label: 'Hidden Gems Only' },
  { id: 'trending', label: 'Trending This Month' },
];

const ACCESSIBILITY_OPTIONS = [
  'Wheelchair Accessible',
  'Family Friendly',
  'Senior Citizen Easy Path',
  'Pet Friendly',
];

export const ExploreOdishaPage: React.FC<ExploreOdishaPageProps> = ({
  onSelectPlace,
  onPlanJourney,
  savedPlaceIds,
  onToggleBookmark,
  onBackHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Odisha');

  // Empty by default so the Explore page initially shows the full collection.
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPopularity, setSelectedPopularity] = useState('all');

  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [activePage, setActivePage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((current) =>
      current === name ? null : name
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );

    setActivePage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All Odisha');
    setSelectedCategories([]);
    setSelectedBudget('all');
    setSelectedDuration('all');
    setSelectedPopularity('all');
    setSortBy('recommended');
    setActivePage(1);
  };

  const filteredPlaces = useMemo(() => {
    const results = EXPLORE_PLACES.filter((place) => {
      /* ---------------- SEARCH ---------------- */

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
          place.name.toLowerCase().includes(query) ||
          place.category.toLowerCase().includes(query) ||
          place.district.toLowerCase().includes(query) ||
          place.tipText.toLowerCase().includes(query) ||
          (place.description || '').toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      /* ---------------- REGION ---------------- */

      if (selectedRegion !== 'All Odisha') {
        const region = selectedRegion.toLowerCase();

        if (!place.district.toLowerCase().includes(region)) {
          return false;
        }
      }

      /* ---------------- CATEGORY ---------------- */

      if (selectedCategories.length > 0) {
        const matchesCategory = selectedCategories.some((category) => {
          if (category === 'hidden') {
            return place.badgeType === 'Hidden Gem';
          }

          return place.categoryType === category;
        });

        if (!matchesCategory) return false;
      }

      /* ---------------- BUDGET ---------------- */

      if (selectedBudget !== 'all') {
        if (
          selectedBudget === 'low' &&
          place.priceLevel !== 'Low'
        ) {
          return false;
        }

        if (
          selectedBudget === 'moderate' &&
          place.priceLevel !== 'Moderate'
        ) {
          return false;
        }

        if (
          selectedBudget === 'high' &&
          place.priceLevel !== 'High'
        ) {
          return false;
        }

        if (
          selectedBudget === 'luxury' &&
          place.priceLevel !== 'Luxury'
        ) {
          return false;
        }
      }

      /* ---------------- POPULARITY ---------------- */

      if (selectedPopularity === 'popular') {
        if (place.badgeType !== 'Popular') return false;
      }

      if (selectedPopularity === 'hidden') {
        if (place.badgeType !== 'Hidden Gem') return false;
      }

      return true;
    });

    /* ---------------- SORTING ---------------- */

    return [...results].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }

      if (sortBy === 'reviews') {
        return b.reviewCount - a.reviewCount;
      }

      if (sortBy === 'priceAsc') {
        const priceOrder: Record<string, number> = {
          Low: 1,
          Moderate: 2,
          High: 3,
          Luxury: 4,
        };

        return (
          (priceOrder[a.priceLevel] || 1) -
          (priceOrder[b.priceLevel] || 1)
        );
      }

      return 0;
    });
  }, [
    searchQuery,
    selectedRegion,
    selectedCategories,
    selectedBudget,
    selectedDuration,
    selectedPopularity,
    sortBy,
  ]);

  const resultCount =
    selectedCategories.length === 0 &&
    selectedRegion === 'All Odisha' &&
    selectedBudget === 'all' &&
    selectedPopularity === 'all' &&
    !searchQuery
      ? 248
      : filteredPlaces.length;

  return (
    <div
      className="
        relative min-h-screen
        bg-[#faf8f4]
        text-[#202020]
        pb-16
        selection:bg-[#b84a2d]/20
        selection:text-[#9a3412]
      "
      onClick={() => {
        if (activeDropdown) {
          setActiveDropdown(null);
        }
      }}
    >

      {/* =========================================================
          HERO / PAGE INTRO
      ========================================================= */}

      <section
        className="
          relative
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          pt-8 sm:pt-10
          pb-5
          overflow-hidden
        "
      >

        {/* Decorative temple sketch */}

        <div
          className="
            absolute
            right-0
            -top-1
            w-56 sm:w-72 md:w-80 lg:w-96
            h-40 sm:h-48
            pointer-events-none
            select-none
            opacity-25
            md:opacity-35
          "
        >
          <img
            src={ASSET_IMAGES.templeSketch}
            alt=""
            className="
              w-full
              h-full
              object-contain
              object-right-top
              mix-blend-multiply
            "
            referrerPolicy="no-referrer"
          />
        </div>

        <div
          className="
            relative
            z-10
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
          "
        >

          {/* Title */}

          <div className="max-w-xl">

            <button
              type="button"
              onClick={onBackHome}
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#26364c] transition-colors hover:text-[#b84a2d]"
            >
              <span className="text-base">←</span>
              Back to Home
            </button>

            <h1
              className="
                font-serif
                text-[2.4rem]
                sm:text-5xl
                md:text-[2.7rem]
                lg:text-[3rem]
                leading-none
                font-bold
                tracking-tight
                text-[#142232]
              "
            >
              Explore Odisha
            </h1>

            <p
              className="
                mt-2
                text-sm
                sm:text-base
                text-[#4c4c4c]
              "
            >
              From iconic destinations to places locals love.
            </p>

            {/* Divider */}

            <div className="mt-3">
              <img
                src={ASSET_IMAGES.dividerMandala}
                alt=""
                className="
                  h-4
                  sm:h-5
                  w-auto
                  max-w-[210px]
                  object-contain
                  object-left
                  opacity-90
                "
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          {/* Search */}

          <div
            className="
              w-full
              md:w-[52%]
              lg:max-w-[565px]
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="
                relative
                h-[58px]
                bg-white
                rounded-[14px]
                border
                border-[#e5ddcf]
                shadow-[0_3px_14px_rgba(0,0,0,0.07)]
                flex
                items-center
                px-5
                gap-3
                transition-all
                focus-within:border-[#b84a2d]/50
                focus-within:shadow-[0_5px_22px_rgba(0,0,0,0.10)]
              "
            >
              <Search
                className="
                  w-5 h-5
                  text-[#253449]
                  shrink-0
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setActivePage(1);
                }}
                placeholder="Search destinations, experiences, food, districts..."
                className="
                  flex-1
                  min-w-0
                  bg-transparent
                  outline-none
                  border-none
                  text-sm
                  text-gray-800
                  placeholder:text-gray-400
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="
                    p-1
                    rounded-full
                    text-gray-400
                    hover:text-gray-700
                  "
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="
                  hidden
                  lg:flex
                  items-center
                  justify-center
                  p-1
                  text-[#26364a]
                "
                title="Filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>

            </div>
          </div>

        </div>
      </section>


      {/* =========================================================
          TOP FILTER BAR
      ========================================================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
          mb-5
        "
        onClick={(event) => event.stopPropagation()}
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-b
            border-[#e8ddcf]
            pb-3
          "
        >

          {/* Filter Pills */}

          <div
            className="
              flex
              items-center
              gap-2
              overflow-x-auto
              scrollbar-none
              pb-1
              flex-1
            "
          >

            {/* REGION */}

            <DropdownButton
              label={
                selectedRegion === 'All Odisha'
                  ? 'Region'
                  : selectedRegion
              }
              icon={<MapPin className="w-3.5 h-3.5" />}
              active={selectedRegion !== 'All Odisha'}
              open={activeDropdown === 'region'}
              onClick={() => toggleDropdown('region')}
            />

            {activeDropdown === 'region' && (
              <DropdownMenu width="w-60">
                {DISTRICTS.map((district) => (
                  <DropdownItem
                    key={district}
                    active={selectedRegion === district}
                    onClick={() => {
                      setSelectedRegion(district);
                      setActiveDropdown(null);
                      setActivePage(1);
                    }}
                  >
                    {district}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}


            {/* CATEGORY */}

            <DropdownButton
              label={
                selectedCategories.length
                  ? `Category (${selectedCategories.length})`
                  : 'Category'
              }
              icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
              active={selectedCategories.length > 0}
              open={activeDropdown === 'category'}
              onClick={() => toggleDropdown('category')}
            />

            {activeDropdown === 'category' && (
              <DropdownMenu width="w-60">
                {CATEGORY_FILTERS.map((category) => {
                  const Icon = category.icon;
                  const checked = selectedCategories.includes(
                    category.id
                  );

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        toggleCategory(category.id)
                      }
                      className="
                        w-full
                        flex
                        items-center
                        justify-between
                        px-3
                        py-2
                        rounded-lg
                        text-xs
                        text-gray-700
                        hover:bg-[#faf6f0]
                      "
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`
                            w-4 h-4
                            rounded
                            border
                            flex
                            items-center
                            justify-center
                            ${
                              checked
                                ? 'bg-[#9a3412] border-[#9a3412]'
                                : 'border-[#cfc5b8]'
                            }
                          `}
                        >
                          {checked && (
                            <span className="text-white text-[9px]">
                              ✓
                            </span>
                          )}
                        </span>

                        <Icon
                          className={`w-3.5 h-3.5 ${category.color}`}
                        />

                        {category.label}
                      </span>

                      <span
                        className="
                          text-[10px]
                          bg-gray-100
                          text-gray-600
                          rounded
                          px-1.5
                          py-0.5
                        "
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </DropdownMenu>
            )}


            {/* BUDGET */}

            <DropdownButton
              label="₹ Budget"
              active={selectedBudget !== 'all'}
              open={activeDropdown === 'budget'}
              onClick={() => toggleDropdown('budget')}
            />

            {activeDropdown === 'budget' && (
              <DropdownMenu width="w-52">
                {BUDGET_OPTIONS.map((option) => (
                  <DropdownItem
                    key={option.id}
                    active={selectedBudget === option.id}
                    onClick={() => {
                      setSelectedBudget(option.id);
                      setActiveDropdown(null);
                      setActivePage(1);
                    }}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}


            {/* DURATION */}

            <DropdownButton
              label="Duration"
              icon={<Clock3 className="w-3.5 h-3.5" />}
              active={selectedDuration !== 'all'}
              open={activeDropdown === 'duration'}
              onClick={() => toggleDropdown('duration')}
            />

            {activeDropdown === 'duration' && (
              <DropdownMenu width="w-56">
                {DURATION_OPTIONS.map((option) => (
                  <DropdownItem
                    key={option.id}
                    active={selectedDuration === option.id}
                    onClick={() => {
                      setSelectedDuration(option.id);
                      setActiveDropdown(null);
                    }}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}


            {/* ACCESSIBILITY */}

            <DropdownButton
              label="Accessibility"
              icon={<Accessibility className="w-3.5 h-3.5" />}
              open={activeDropdown === 'accessibility'}
              onClick={() => toggleDropdown('accessibility')}
            />

            {activeDropdown === 'accessibility' && (
              <DropdownMenu width="w-60">
                {ACCESSIBILITY_OPTIONS.map((option) => (
                  <DropdownItem
                    key={option}
                    onClick={() =>
                      setActiveDropdown(null)
                    }
                  >
                    {option}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}


            {/* POPULARITY */}

            <DropdownButton
              label="Popularity"
              icon={
                <span className="text-sm leading-none">
                  🔥
                </span>
              }
              active={selectedPopularity !== 'all'}
              open={activeDropdown === 'popularity'}
              onClick={() => toggleDropdown('popularity')}
            />

            {activeDropdown === 'popularity' && (
              <DropdownMenu width="w-52">
                {POPULARITY_OPTIONS.map((option) => (
                  <DropdownItem
                    key={option.id}
                    active={selectedPopularity === option.id}
                    onClick={() => {
                      setSelectedPopularity(option.id);
                      setActiveDropdown(null);
                      setActivePage(1);
                    }}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}

          </div>


          {/* SORT */}

          <div className="relative shrink-0">

            <button
              type="button"
              onClick={() => toggleDropdown('sort')}
              className="
                hidden
                sm:flex
                items-center
                gap-1.5
                px-3.5
                py-2
                rounded-xl
                border
                border-[#e5ddcf]
                bg-white
                text-xs
                sm:text-sm
                whitespace-nowrap
                text-gray-700
                hover:bg-gray-50
              "
            >
              <span className="text-gray-500">
                Sort by:
              </span>

              <span className="font-semibold text-gray-900">
                {sortBy === 'recommended'
                  ? 'Recommended'
                  : sortBy === 'rating'
                  ? 'Highest Rated'
                  : sortBy === 'reviews'
                  ? 'Most Reviewed'
                  : 'Price: Low to High'}
              </span>

              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {activeDropdown === 'sort' && (
              <DropdownMenu
                width="w-56"
                align="right"
              >
                {[
                  {
                    id: 'recommended',
                    label: 'Recommended',
                  },
                  {
                    id: 'rating',
                    label: 'Highest Rated',
                  },
                  {
                    id: 'reviews',
                    label: 'Most Reviewed',
                  },
                  {
                    id: 'priceAsc',
                    label: 'Price: Low to High',
                  },
                ].map((option) => (
                  <DropdownItem
                    key={option.id}
                    active={sortBy === option.id}
                    onClick={() => {
                      setSortBy(option.id as SortOption);
                      setActiveDropdown(null);
                    }}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}

          </div>

        </div>
      </section>


      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <main
        className="
          max-w-7xl
          mx-auto
          px-4 sm:px-6 lg:px-8
        "
      >

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-6
            lg:gap-7
            items-start
          "
        >

          {/* =====================================================
              LEFT SIDEBAR
          ===================================================== */}

          <aside
            className="
              hidden
              lg:block
              lg:col-span-3
              sticky
              top-24
            "
          >

            <div
              className="
                bg-white
                border
                border-[#e8dfd3]
                rounded-xl
                overflow-hidden
              "
            >

              {/* Sidebar Header */}

              <div
                className="
                  px-4
                  py-4
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#eee7dd]
                "
              >
                <h3
                  className="
                    text-base
                    font-bold
                    text-[#252525]
                  "
                >
                  Filters
                </h3>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="
                    text-xs
                    font-semibold
                    text-[#b84a2d]
                    hover:text-[#8f321b]
                  "
                >
                  Clear all
                </button>
              </div>


              {/* REGION */}

              <div className="px-4 py-4 border-b border-[#eee7dd]">

                <label
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    font-bold
                    text-gray-800
                    mb-2
                  "
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Region / District
                </label>

                <div className="relative">

                  <select
                    value={selectedRegion}
                    onChange={(event) => {
                      setSelectedRegion(
                        event.target.value
                      );
                      setActivePage(1);
                    }}
                    className="
                      w-full
                      appearance-none
                      bg-white
                      border
                      border-[#ded5c9]
                      rounded-xl
                      px-3.5
                      py-2.5
                      text-xs
                      font-medium
                      text-gray-800
                      outline-none
                      focus:border-[#b84a2d]
                    "
                  >
                    {DISTRICTS.map((district) => (
                      <option
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      w-4 h-4
                      text-gray-400
                      pointer-events-none
                    "
                  />

                </div>
              </div>


              {/* CATEGORIES */}

              <div className="px-4 py-4 border-b border-[#eee7dd]">

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-xs
                      font-bold
                      text-gray-800
                    "
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Categories
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        selectedCategories.length ===
                        CATEGORY_FILTERS.length
                      ) {
                        setSelectedCategories([]);
                      } else {
                        setSelectedCategories(
                          CATEGORY_FILTERS.map(
                            (category) => category.id
                          )
                        );
                      }

                      setActivePage(1);
                    }}
                    className="
                      text-[11px]
                      font-medium
                      text-[#b84a2d]
                    "
                  >
                    See all
                  </button>

                </div>


                <div className="space-y-2.5">

                  {CATEGORY_FILTERS.map((category) => {
                    const Icon = category.icon;
                    const checked =
                      selectedCategories.includes(
                        category.id
                      );

                    return (
                      <label
                        key={category.id}
                        className="
                          flex
                          items-center
                          justify-between
                          cursor-pointer
                          group
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2.5
                          "
                        >

                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              toggleCategory(
                                category.id
                              )
                            }
                            className="
                              w-4 h-4
                              accent-[#b84a2d]
                              cursor-pointer
                            "
                          />

                          <Icon
                            className={`
                              w-3.5 h-3.5
                              ${category.color}
                            `}
                          />

                          <span
                            className={`
                              text-xs
                              ${
                                checked
                                  ? 'font-semibold text-gray-900'
                                  : 'text-gray-700'
                              }
                            `}
                          >
                            {category.label}
                          </span>

                        </div>

                        <span
                          className="
                            text-[11px]
                            text-gray-500
                          "
                        >
                          {category.count}
                        </span>

                      </label>
                    );
                  })}

                </div>
              </div>


              {/* BUDGET */}

              <div className="px-4 py-4">

                <label
                  className="
                    block
                    text-xs
                    font-bold
                    text-gray-800
                    mb-3
                  "
                >
                  ₹ Budget
                </label>

                <div className="space-y-2">

                  <div className="grid grid-cols-3 gap-1.5">

                    {['all', 'low', 'moderate'].map(
                      (budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() =>
                            setSelectedBudget(
                              budget
                            )
                          }
                          className={`
                            py-2
                            rounded-lg
                            border
                            text-[11px]
                            font-semibold
                            transition-colors
                            ${
                              selectedBudget === budget
                                ? 'bg-white border-[#b84a2d] text-[#262626]'
                                : 'bg-white border-[#ded5c9] text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {budget === 'all'
                            ? 'All'
                            : budget === 'low'
                            ? '₹ Low'
                            : '₹₹ Moderate'}
                        </button>
                      )
                    )}

                  </div>

                  <div className="grid grid-cols-2 gap-1.5">

                    {['high', 'luxury'].map(
                      (budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() =>
                            setSelectedBudget(
                              budget
                            )
                          }
                          className={`
                            py-2
                            rounded-lg
                            border
                            text-[11px]
                            font-semibold
                            transition-colors
                            ${
                              selectedBudget === budget
                                ? 'bg-white border-[#b84a2d] text-[#262626]'
                                : 'bg-white border-[#ded5c9] text-gray-700 hover:bg-gray-50'
                            }
                          `}
                        >
                          {budget === 'high'
                            ? '₹₹₹ High'
                            : '₹₹₹₹ Luxury'}
                        </button>
                      )
                    )}

                  </div>

                </div>
              </div>


              {/* APPLY */}

              <div className="px-4 pb-4">

                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById('places-grid')
                      ?.scrollIntoView({
                        behavior: 'smooth',
                      });
                  }}
                  className="
                    w-full
                    bg-[#11244a]
                    hover:bg-[#0c1b38]
                    text-white
                    text-xs
                    sm:text-sm
                    font-semibold
                    py-3
                    rounded-lg
                    transition-colors
                  "
                >
                  Apply Filters
                </button>

              </div>

            </div>

          </aside>


          {/* =====================================================
              DESTINATION AREA
          ===================================================== */}

          <section
            id="places-grid"
            className="
              lg:col-span-9
              min-w-0
            "
          >

            {/* Result Count + View */}

            <div
              className="
                flex
                items-center
                justify-between
                mb-4
              "
            >

              <div>

                <span
                  className="
                    text-sm
                    sm:text-base
                    font-bold
                    text-[#292929]
                  "
                >
                  {resultCount} places found
                </span>

              </div>


              <div
                className="
                  flex
                  items-center
                  gap-1
                  bg-white
                  border
                  border-[#e4dbcf]
                  rounded-lg
                  p-1
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    setViewMode('grid')
                  }
                  className={`
                    p-1.5
                    rounded-md
                    transition-colors
                    ${
                      viewMode === 'grid'
                        ? 'bg-[#f0ebe4] text-[#182639]'
                        : 'text-gray-500 hover:text-gray-800'
                    }
                  `}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setViewMode('list')
                  }
                  className={`
                    p-1.5
                    rounded-md
                    transition-colors
                    ${
                      viewMode === 'list'
                        ? 'bg-[#f0ebe4] text-[#182639]'
                        : 'text-gray-500 hover:text-gray-800'
                    }
                  `}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>

              </div>

            </div>


            {/* EMPTY STATE */}

            {filteredPlaces.length === 0 && (
              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-[#e4dbcf]
                  p-12
                  text-center
                "
              >

                <Gem
                  className="
                    w-12 h-12
                    mx-auto
                    mb-4
                    text-[#d7cabc]
                  "
                />

                <h3
                  className="
                    font-serif
                    text-xl
                    font-bold
                    text-[#182639]
                  "
                >
                  No matching destinations found
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-2
                  "
                >
                  Try adjusting your filters or
                  search keywords.
                </p>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    bg-[#182639]
                    text-white
                    px-4
                    py-2.5
                    rounded-xl
                    text-xs
                    font-semibold
                  "
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset filters
                </button>

              </div>
            )}


            {/* ===================================================
                GRID VIEW
            =================================================== */}

            {filteredPlaces.length > 0 &&
              viewMode === 'grid' && (

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-4
                  "
                >

                  {filteredPlaces.map((place) => {
                    const isSaved =
                      savedPlaceIds.includes(
                        place.id
                      );

                    return (
                      <DestinationCard
                        key={place.id}
                        place={place}
                        isSaved={isSaved}
                        onSelect={() =>
                          onSelectPlace(place)
                        }
                        onToggleBookmark={(event) => {
                          event.stopPropagation();
                          onToggleBookmark(
                            place.id
                          );
                        }}
                      />
                    );
                  })}

                </div>
              )}


            {/* ===================================================
                LIST VIEW
            =================================================== */}

            {filteredPlaces.length > 0 &&
              viewMode === 'list' && (

                <div className="space-y-4">

                  {filteredPlaces.map((place) => {
                    const isSaved =
                      savedPlaceIds.includes(
                        place.id
                      );

                    return (
                      <div
                        key={place.id}
                        onClick={() =>
                          onSelectPlace(place)
                        }
                        className="
                          group
                          bg-white
                          border
                          border-[#e5ddd1]
                          rounded-2xl
                          overflow-hidden
                          p-3
                          flex
                          flex-col
                          sm:flex-row
                          gap-4
                          cursor-pointer
                          hover:shadow-md
                          transition-all
                        "
                      >

                        <div
                          className="
                            relative
                            h-48
                            sm:h-36
                            sm:w-56
                            shrink-0
                            rounded-xl
                            overflow-hidden
                          "
                        >

                          <img
                            src={place.image}
                            alt={place.name}
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-105
                              transition-transform
                              duration-500
                            "
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />

                          <span
                            className={`
                              absolute
                              top-2.5
                              left-2.5
                              text-[10px]
                              font-bold
                              px-2
                              py-1
                              rounded-md
                              ${place.badgeColor}
                            `}
                          >
                            {place.badgeType}
                          </span>

                        </div>


                        <div
                          className="
                            flex-1
                            min-w-0
                            py-1
                            flex
                            flex-col
                            justify-between
                          "
                        >

                          <div>

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-3
                              "
                            >

                              <div>

                                <h3
                                  className="
                                    font-serif
                                    text-xl
                                    font-bold
                                    text-[#17283d]
                                  "
                                >
                                  {place.name}
                                </h3>

                                <p
                                  className="
                                    text-xs
                                    text-gray-600
                                    mt-1
                                  "
                                >
                                  {place.category}
                                  {' • '}
                                  {place.district}
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  onToggleBookmark(
                                    place.id
                                  );
                                }}
                                className="
                                  p-2
                                  rounded-lg
                                  hover:bg-gray-50
                                  shrink-0
                                "
                              >
                                <Bookmark
                                  className={`
                                    w-4 h-4
                                    ${
                                      isSaved
                                        ? 'fill-[#f59e0b] text-[#f59e0b]'
                                        : 'text-gray-400'
                                    }
                                  `}
                                />
                              </button>

                            </div>


                            <p
                              className="
                                text-xs
                                text-gray-600
                                mt-3
                                leading-relaxed
                                line-clamp-2
                              "
                            >
                              {place.description}
                            </p>


                            <div
                              className={`
                                mt-3
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                px-2.5
                                py-2
                                text-xs
                                border
                                ${place.tipBgClass}
                                ${place.tipBorderClass}
                              `}
                            >
                              <span>
                                {place.tipIcon}
                              </span>

                              <span className="font-medium">
                                {place.tipText}
                              </span>
                            </div>

                          </div>


                          <div
                            className="
                              mt-4
                              pt-3
                              border-t
                              border-gray-100
                              flex
                              items-center
                              justify-between
                              gap-3
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-1
                                text-xs
                              "
                            >
                              <Star
                                className="
                                  w-3.5 h-3.5
                                  fill-amber-500
                                  text-amber-500
                                "
                              />

                              <span className="font-bold">
                                {place.rating}
                              </span>

                              <span className="text-gray-500">
                                ({place.reviewCount})
                              </span>

                            </div>

                            <span
                              className="
                                text-xs
                                font-bold
                                text-emerald-700
                              "
                            >
                              {place.priceDisplay}
                            </span>

                            <span
                              className="
                                ml-auto
                                flex
                                items-center
                                gap-1
                                text-[11px]
                                font-semibold
                                text-emerald-700
                              "
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {place.verificationType}
                            </span>

                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>
              )}


            {/* ===================================================
                PAGINATION
            =================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                gap-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <button
                  type="button"
                  disabled={activePage === 1}
                  onClick={() =>
                    setActivePage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  className="
                    w-10 h-10
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#e3d9cc]
                    bg-white
                    text-gray-600
                    disabled:opacity-40
                  "
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>


                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      setActivePage(page)
                    }
                    className={`
                      w-10 h-10
                      rounded-lg
                      text-xs
                      font-semibold
                      ${
                        activePage === page
                          ? 'bg-[#b84a2d] text-white'
                          : 'bg-white border border-[#e3d9cc] text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}


                <span
                  className="
                    px-2
                    text-xs
                    text-gray-500
                  "
                >
                  ...
                </span>


                <button
                  type="button"
                  onClick={() =>
                    setActivePage(16)
                  }
                  className={`
                    w-10 h-10
                    rounded-lg
                    text-xs
                    font-semibold
                    ${
                      activePage === 16
                        ? 'bg-[#b84a2d] text-white'
                        : 'bg-white border border-[#e3d9cc] text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  16
                </button>


                <button
                  type="button"
                  disabled={activePage === 16}
                  onClick={() =>
                    setActivePage((page) =>
                      Math.min(16, page + 1)
                    )
                  }
                  className="
                    w-10 h-10
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#e3d9cc]
                    bg-white
                    text-gray-600
                    disabled:opacity-40
                  "
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>


              {/* Traditional divider */}

              <img
                src={ASSET_IMAGES.dividerMandala}
                alt=""
                className="
                  h-5
                  w-auto
                  max-w-[210px]
                  object-contain
                  opacity-75
                "
                referrerPolicy="no-referrer"
              />

            </div>

          </section>

        </div>
      </main>


      {/* =========================================================
          SUBTLE IMAGE-FREE PATTACHITRA FOOTER ACCENT
          The old AI Studio export referenced two corrupted image
          assets here. We intentionally do not render those assets.
      ========================================================= */}

      <div
        className="
          relative
          w-full
          h-16
          mt-2
          overflow-hidden
          pointer-events-none
          select-none
        "
      >
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-[#d8a26d]/45
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-2
            flex
            items-center
            justify-center
            opacity-70
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-px w-16 sm:w-24 bg-[#d8a26d]/45" />
            <span className="text-[#b86a32] text-sm">❈</span>
            <span className="h-px w-16 sm:w-24 bg-[#d8a26d]/45" />
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 8px 8px, #b86a32 1px, transparent 1.5px),
              radial-gradient(circle at 24px 8px, #b86a32 1px, transparent 1.5px)
            `,
            backgroundSize: "32px 18px",
          }}
        />
      </div>

      {/* =========================================================
          MOBILE FILTER DRAWER
      ========================================================= */}

      {mobileFilterOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            lg:hidden
          "
        >

          <div
            className="
              absolute
              inset-0
              bg-black/40
              backdrop-blur-[2px]
            "
            onClick={() =>
              setMobileFilterOpen(false)
            }
          />


          <aside
            className="
              absolute
              right-0
              top-0
              h-full
              w-[88%]
              max-w-sm
              bg-white
              shadow-2xl
              overflow-y-auto
              p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                pb-4
                border-b
                border-gray-100
              "
            >

              <h3
                className="
                  font-bold
                  text-lg
                  text-[#182639]
                "
              >
                Filters
              </h3>

              <button
                type="button"
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="
                  p-2
                  rounded-lg
                  hover:bg-gray-100
                "
              >
                <X className="w-5 h-5" />
              </button>

            </div>


            {/* Region */}

            <div className="mt-5">

              <label
                className="
                  block
                  text-xs
                  font-bold
                  text-gray-700
                  mb-2
                "
              >
                Region / District
              </label>

              <select
                value={selectedRegion}
                onChange={(event) =>
                  setSelectedRegion(
                    event.target.value
                  )
                }
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  outline-none
                "
              >
                {DISTRICTS.map((district) => (
                  <option
                    key={district}
                    value={district}
                  >
                    {district}
                  </option>
                ))}
              </select>

            </div>


            {/* Categories */}

            <div className="mt-6">

              <label
                className="
                  block
                  text-xs
                  font-bold
                  text-gray-700
                  mb-3
                "
              >
                Categories
              </label>

              <div className="space-y-3">

                {CATEGORY_FILTERS.map((category) => {
                  const checked =
                    selectedCategories.includes(
                      category.id
                    );

                  return (
                    <label
                      key={category.id}
                      className="
                        flex
                        items-center
                        justify-between
                        cursor-pointer
                      "
                    >

                      <span
                        className="
                          flex
                          items-center
                          gap-2.5
                        "
                      >

                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleCategory(
                              category.id
                            )
                          }
                          className="
                            w-4 h-4
                            accent-[#b84a2d]
                          "
                        />

                        <span className="text-sm">
                          {category.label}
                        </span>

                      </span>

                      <span
                        className="
                          text-xs
                          text-gray-500
                        "
                      >
                        {category.count}
                      </span>

                    </label>
                  );
                })}

              </div>

            </div>


            {/* Budget */}

            <div className="mt-6">

              <label
                className="
                  block
                  text-xs
                  font-bold
                  text-gray-700
                  mb-3
                "
              >
                Budget
              </label>

              <div className="grid grid-cols-2 gap-2">

                {BUDGET_OPTIONS.map((budget) => (
                  <button
                    key={budget.id}
                    type="button"
                    onClick={() =>
                      setSelectedBudget(
                        budget.id
                      )
                    }
                    className={`
                      py-2.5
                      rounded-xl
                      border
                      text-xs
                      font-semibold
                      ${
                        selectedBudget ===
                        budget.id
                          ? 'bg-[#182639] text-white border-[#182639]'
                          : 'bg-white text-gray-700 border-gray-200'
                      }
                    `}
                  >
                    {budget.label}
                  </button>
                ))}

              </div>

            </div>


            {/* Bottom actions */}

            <div
              className="
                mt-8
                pt-4
                border-t
                border-gray-100
              "
            >

              <button
                type="button"
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="
                  w-full
                  bg-[#11244a]
                  text-white
                  py-3
                  rounded-xl
                  font-semibold
                  text-sm
                "
              >
                Show {filteredPlaces.length} Places
              </button>

              <button
                type="button"
                onClick={clearAllFilters}
                className="
                  w-full
                  mt-2
                  py-2
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                Reset All
              </button>

            </div>

          </aside>

        </div>
      )}

    </div>
  );
};


/* ===============================================================
   REUSABLE DROPDOWN BUTTON
=============================================================== */

interface DropdownButtonProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  open?: boolean;
  onClick: () => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  icon,
  active = false,
  open = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        gap-1.5
        px-3.5
        py-2
        rounded-xl
        border
        text-xs
        sm:text-sm
        font-medium
        whitespace-nowrap
        transition-colors
        ${
          active
            ? 'bg-[#182639] text-white border-[#182639]'
            : 'bg-white text-gray-700 border-[#e5ddcf] hover:bg-gray-50'
        }
        ${open ? 'ring-1 ring-[#b84a2d]/20' : ''}
      `}
    >

      {icon && (
        <span className="shrink-0">
          {icon}
        </span>
      )}

      <span>{label}</span>

      <ChevronDown
        className={`
          w-3.5 h-3.5
          shrink-0
          transition-transform
          ${
            open
              ? 'rotate-180'
              : ''
          }
          ${
            active
              ? 'text-white/70'
              : 'text-gray-400'
          }
        `}
      />

    </button>
  );
};


/* ===============================================================
   DROPDOWN MENU
=============================================================== */

interface DropdownMenuProps {
  children: React.ReactNode;
  width?: string;
  align?: 'left' | 'right';
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  width = 'w-52',
  align = 'left',
}) => {
  return (
    <div
      className={`
        absolute
        ${align === 'right' ? 'right-0' : 'left-0'}
        top-full
        mt-2
        ${width}
        bg-white
        rounded-2xl
        border
        border-[#e8dfd3]
        shadow-[0_10px_35px_rgba(0,0,0,0.12)]
        p-2
        z-[80]
        max-h-72
        overflow-y-auto
      `}
    >
      {children}
    </div>
  );
};


/* ===============================================================
   DROPDOWN ITEM
=============================================================== */

interface DropdownItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  active = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        text-left
        px-3
        py-2.5
        rounded-lg
        text-xs
        font-medium
        transition-colors
        ${
          active
            ? 'bg-[#faf1e7] text-[#9a3412] font-semibold'
            : 'text-gray-700 hover:bg-[#faf6f0]'
        }
      `}
    >
      {children}
    </button>
  );
};


/* ===============================================================
   DESTINATION CARD
=============================================================== */

interface DestinationCardProps {
  place: ExplorePlaceItem;
  isSaved: boolean;
  onSelect: () => void;
  onToggleBookmark: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const DestinationCard: React.FC<
  DestinationCardProps
> = ({
  place,
  isSaved,
  onSelect,
  onToggleBookmark,
}) => {
  return (
    <article
      onClick={onSelect}
      className="
        group
        bg-white
        rounded-xl
        border
        border-[#e5ddd1]
        overflow-hidden
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_7px_20px_rgba(0,0,0,0.08)]
      "
    >

      {/* IMAGE */}

      <div
        className="
          relative
          h-[155px]
          sm:h-[156px]
          w-full
          overflow-hidden
          bg-gray-100
        "
      >

        <img
          src={place.image}
          alt={place.name}
          className="
            w-full
            h-full
            object-cover
            object-center
            group-hover:scale-[1.045]
            transition-transform
            duration-500
          "
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />


        {/* Badge */}

        <div
          className="
            absolute
            left-2.5
            top-2.5
          "
        >
          <span
            className={`
              inline-block
              text-[10px]
              font-bold
              px-2
              py-1
              rounded-md
              shadow-sm
              ${place.badgeColor}
            `}
          >
            {place.badgeType}
          </span>
        </div>


        {/* Bookmark */}

        <button
          type="button"
          onClick={onToggleBookmark}
          className="
            absolute
            right-2.5
            top-2.5
            p-1.5
            rounded-md
            bg-black/25
            hover:bg-black/45
            text-white
            backdrop-blur-sm
            border
            border-white/20
            transition-colors
          "
          title={
            isSaved
              ? 'Remove bookmark'
              : 'Save place'
          }
        >
          <Bookmark
            className={`
              w-4 h-4
              ${
                isSaved
                  ? 'fill-[#fbbf24] text-[#fbbf24]'
                  : 'text-white'
              }
            `}
          />
        </button>

      </div>


      {/* BODY */}

      <div
        className="
          p-3
          flex
          flex-col
        "
      >

        {/* TITLE */}

        <h3
          className="
            font-serif
            text-[16px]
            sm:text-[17px]
            leading-tight
            font-bold
            text-[#17283d]
            group-hover:text-[#9a3412]
            transition-colors
            truncate
          "
        >
          {place.name}
        </h3>


        {/* CATEGORY */}

        <div
          className="
            flex
            items-center
            gap-1
            mt-1.5
            text-[11px]
            text-gray-600
          "
        >
          <span>{place.category}</span>
        </div>


        {/* DISTRICT */}

        <div
          className="
            flex
            items-center
            gap-1
            mt-1
            text-[11px]
            text-gray-600
          "
        >
          <MapPin
            className="
              w-3 h-3
              text-gray-400
              shrink-0
            "
          />

          <span className="truncate">
            {place.district}
          </span>
        </div>


        {/* RATING + PRICE */}

        <div
          className="
            flex
            items-center
            justify-between
            mt-2.5
          "
        >

          <div
            className="
              flex
              items-center
              gap-1
              text-[11px]
            "
          >

            <Star
              className="
                w-3.5 h-3.5
                fill-amber-500
                text-amber-500
              "
            />

            <span className="font-bold text-gray-900">
              {place.rating}
            </span>

            <span className="text-gray-500">
              ({place.reviewCount})
            </span>

          </div>


          <span
            className={`
              text-[11px]
              font-bold
              ${
                place.priceLevel === 'Low'
                  ? 'text-emerald-700'
                  : 'text-amber-700'
              }
            `}
          >
            {place.priceDisplay}
          </span>

        </div>


        {/* LOCAL TIP */}

        <div
          className={`
            mt-2.5
            p-2
            rounded-lg
            text-[10px]
            leading-[1.35]
            flex
            items-start
            gap-1.5
            border
            ${place.tipBgClass}
            ${place.tipBorderClass}
          `}
        >

          <span className="shrink-0 text-xs">
            {place.tipIcon}
          </span>

          <p className="font-medium line-clamp-2">
            {place.tipText}
          </p>

        </div>


        {/* VERIFICATION */}

        <div
          className="
            mt-2.5
            pt-2
            border-t
            border-gray-100
            flex
            items-center
            justify-between
            gap-2
            text-[9px]
          "
        >

          <div
            className="
              flex
              items-center
              gap-1
              min-w-0
            "
          >

            <ShieldCheck
              className={`
                w-3.5 h-3.5
                shrink-0
                ${
                  place.verificationType ===
                  'Officially verified'
                    ? 'text-blue-600'
                    : 'text-emerald-600'
                }
              `}
            />

            <span
              className={`
                truncate
                font-semibold
                ${
                  place.verificationType ===
                  'Officially verified'
                    ? 'text-blue-700'
                    : 'text-emerald-800'
                }
              `}
            >
              {place.verificationType}
            </span>

          </div>

          <span
            className="
              text-gray-500
              whitespace-nowrap
            "
          >
            {place.updatedTime}
          </span>

        </div>

      </div>

    </article>
  );
};

export default ExploreOdishaPage;