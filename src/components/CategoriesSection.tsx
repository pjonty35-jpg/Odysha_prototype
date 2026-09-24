import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../data/landingData';
import { CategoryIcon, SectionFlourish } from './OdishaMotifs';
import { CategoryItem } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryItem) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="pt-6 md:pt-8 pb-3 md:pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Heading & Central Motif Flourish */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-5 sm:mb-6 md:mb-8"
      >
        <h2 className="font-serif text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold text-[#14202e] tracking-tight">
          What kind of Odisha are you looking for?
        </h2>
        <SectionFlourish icon="diamond" className="mt-2" />
      </motion.div>

      {/* Discovery categories with smooth staggered slide-in animation */}
      <div className="category-grid gap-2.5 sm:gap-3.5 lg:gap-2.5">
        {CATEGORIES.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            aria-label={`Explore ${category.name}`}
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.55,
              delay: index * 0.055,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="group relative min-w-0 bg-[#fdfcf9] hover:bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#eee4d6] hover:border-[#b84a2d]/50 transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer flex flex-col focus:outline-none focus:ring-2 focus:ring-[#b84a2d]/30"
          >
            {category.image ? (
              <div className="w-full aspect-[3/4] overflow-hidden bg-[#faf7f2] flex items-center justify-center p-2 xs:p-2.5 sm:p-3 transition-colors duration-300 group-hover:bg-[#f5eee4]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="p-3 sm:p-4 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px]">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#eadfce] bg-white/75 sm:h-20 sm:w-20 sm:rounded-2xl">
                  <CategoryIcon type={category.iconType} className="h-11 w-11 sm:h-14 sm:w-14" />
                </div>
                <span className="mt-2 text-xs font-semibold tracking-tight text-gray-800 sm:mt-3 sm:text-sm">
                  {category.name}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
};
