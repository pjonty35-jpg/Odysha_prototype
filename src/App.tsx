/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { VisualStoriesSection } from './components/VisualStoriesSection';
import { WatchOdishaPage } from './components/WatchOdishaPage';
import { EmergencyHelpPage } from './components/EmergencyHelpPage';
import { ValuePropositionSection } from './components/ValuePropositionSection';
import { DestinationsSection } from './components/DestinationsSection';
import { ExploreOdishaPage } from './components/ExploreOdishaPage';
import PlanJourneyPage from './components/PlanJourneyPage';
import GeneratedJourneyPage from './components/GeneratedJourneyPage';
import { FooterBanner } from './components/FooterBanner';
import { AboutUsPage } from './components/AboutUsPage';
import { FoodOdishaPage } from './components/FoodOdishaPage';
import { DestinationModal, CategoryModal, PlanJourneyModal, ExplorePlaceModal } from './components/Modals';
import { PattachitraGrainBackground } from './components/OdishaMotifs';
import { POPULAR_DESTINATIONS } from './data/landingData';
import { EXPLORE_PLACES, ExplorePlaceItem } from './data/exploreData';
import { DestinationItem, CategoryItem } from './types';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'explore' | 'watch' | 'food' | 'emergency' | 'about' | 'plan' | 'generatedJourney'
  >('home');
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [selectedExplorePlace, setSelectedExplorePlace] = useState<ExplorePlaceItem | null>(null);
  const [planJourneyOpen, setPlanJourneyOpen] = useState(false);
  const [planInitialDest, setPlanInitialDest] = useState('');
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(['raghurajpur-craft-village', 'gulmi-waterfall']);
  
  const [journeyPreferences, setJourneyPreferences] = useState<any>(null);

  const handleBuildJourney = (preferences: any) => {
    setJourneyPreferences(preferences);
    setCurrentPage('generatedJourney');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle URL hash changes or direct routing
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#explore') {
        setCurrentPage('explore');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: 'home' | 'explore' | 'watch' | 'food' | 'emergency' | 'about' | 'plan') => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleToggleBookmark = (placeId: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  const handleOpenPlanWithDest = (destName: string) => {
  setPlanInitialDest(destName);
  setCurrentPage('plan');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleSelectDestById = (id: string) => {
    const found = POPULAR_DESTINATIONS.find((d) => d.id === id);
    if (found) {
      setSelectedDestination(found);
    } else {
      setPlanInitialDest(id);
      setCurrentPage('plan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: CategoryItem) => {
    if (category.id === 'food') {
      handleNavigate('food');
      return;
    }
    setSelectedCategory(category);
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f4] flex flex-col selection:bg-[#b84a2d]/20 selection:text-[#b84a2d]">
      {/* Subtle Pattachitra art & canvas grain background overlay */}
      <PattachitraGrainBackground />

      {/* 1. Header / Navbar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPlan={() => {
          setPlanInitialDest('');
          setCurrentPage('plan');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedPlaceIds.length}
        onOpenSaved={() => {
          if (savedPlaceIds.length > 0) {
            const firstSaved = EXPLORE_PLACES.find((p) => p.id === savedPlaceIds[0]);
            if (firstSaved) setSelectedExplorePlace(firstSaved);
          } else {
            alert('You have no saved places yet! Click the bookmark icon on any card to save it.');
          }
        }}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <>
            {/* 2. Hero Section with Floating Search and Temple Frieze Divider */}
            <Hero
              onOpenPlan={() => {
                setPlanInitialDest('');
                setCurrentPage('plan');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectDestination={handleSelectDestById}
              onExplore={() => handleNavigate('explore')}
              onExploreVisual={() => handleNavigate('watch')}
            />

            <VisualStoriesSection
              onWatchOdisha={() => handleNavigate('watch')}
            />

            {/* 3. Categories ("What kind of Odisha are you looking for?") */}
            <CategoriesSection onSelectCategory={handleSelectCategory} />

            {/* 4. Value Proposition ("Don't just visit Odisha. Discover it.") */}
            <ValuePropositionSection />

            {/* 5. Popular Destinations */}
            <DestinationsSection
              onSelectDestination={setSelectedDestination}
              onViewAll={() => handleNavigate('explore')}
            />
          </>
        ) : currentPage === 'explore' ? (
  /* Explore Odisha Dedicated Page */
  <ExploreOdishaPage
    onSelectPlace={(place) => setSelectedExplorePlace(place)}
    onPlanJourney={handleOpenPlanWithDest}
    savedPlaceIds={savedPlaceIds}
    onToggleBookmark={handleToggleBookmark}
    onBackHome={() => {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  />
) : currentPage === 'watch' ? (
  <WatchOdishaPage
    onBackHome={() => handleNavigate('home')}
    onPlanJourney={() => {
      setPlanInitialDest('');
      setCurrentPage('plan');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  />
) : currentPage === 'food' ? (
  <FoodOdishaPage
    onBackHome={() => handleNavigate('home')}
    onPlanJourney={handleOpenPlanWithDest}
  />
) : currentPage === 'emergency' ? (
  <EmergencyHelpPage onBackHome={() => handleNavigate('home')} />
) : currentPage === 'about' ? (
  <AboutUsPage onBackHome={() => handleNavigate('home')} />
) : currentPage === 'plan' ? (
  /* Plan Your Journey Dedicated Page */
  <PlanJourneyPage
  initialDestination={planInitialDest}
    onBuildJourney={handleBuildJourney}
    onBackHome={() => {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  />
) : (
  /* Generated Journey Page */
  <GeneratedJourneyPage
  preferences={journeyPreferences}
  onBack={() => {
    setCurrentPage('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
/>
)}
      </main>

      {/* 6. Footer Banner with Authentic Pattachitra Banner & Apple Translucent Card */}
      <FooterBanner
        variant={
          currentPage === 'explore' || currentPage === 'plan'
            ? 'journey'
            : 'default'
        }
        onAboutUs={currentPage === 'home' ? () => handleNavigate('about') : undefined}
      />

      {currentPage !== 'emergency' && (
        <button
          type="button"
          onClick={() => handleNavigate('emergency')}
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border border-[#f4c58b]/70 bg-[#172d49] px-4 py-3 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(23,45,73,0.28)] transition hover:-translate-y-0.5 hover:bg-[#203c60] sm:bottom-7 sm:right-7"
          aria-label="Open emergency help"
        >
          <ShieldAlert className="h-4 w-4 text-[#f4c58b]" />
          <span>Safety help</span>
        </button>
      )}

      {/* Interactive Modals */}
      <ExplorePlaceModal
        place={selectedExplorePlace}
        onClose={() => setSelectedExplorePlace(null)}
        onPlanTrip={handleOpenPlanWithDest}
        isSaved={selectedExplorePlace ? savedPlaceIds.includes(selectedExplorePlace.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanTrip={handleOpenPlanWithDest}
      />

      <CategoryModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onPlanTrip={handleOpenPlanWithDest}
      />

      <PlanJourneyModal
        isOpen={planJourneyOpen}
        initialDestination={planInitialDest}
        onClose={() => setPlanJourneyOpen(false)}
      />
    </div>
  );
}
