import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, X } from 'lucide-react';
import { OdishaDivider } from './OdishaMotifs';
import chilikaImage from '../assets/images/explore_chilika.jpg';
import konarkImage from '../assets/images/explore_konark.jpg';

interface VisualStory {
  id: string;
  title: string;
  location: string;
  duration: string;
  description: string;
  image: string;
  videoId: string;
}

const VISUAL_STORIES: VisualStory[] = [
  {
    id: 'chilika',
    title: 'Where the water remembers the sky',
    location: 'Chilika Lake',
    duration: '02:31',
    description: 'Boats, birds and the stillness of Asia’s largest brackish lagoon.',
    image: chilikaImage,
    videoId: 'DDKQDpY_nCo',
  },
  {
    id: 'konark',
    title: 'The language of stone',
    location: 'Konark Sun Temple',
    duration: '03:08',
    description: 'A closer look at the artistry and rhythm of Odisha’s most iconic monument.',
    image: konarkImage,
    videoId: 'ruqZJSXLkg0',
  },
];

interface VisualStoriesSectionProps {
  onWatchOdisha: () => void;
}

export const VisualStoriesSection: React.FC<VisualStoriesSectionProps> = ({
  onWatchOdisha,
}) => {
  const [activeStory, setActiveStory] = useState<VisualStory | null>(null);

  return (
    <section
      id="visual-stories"
      className="relative overflow-hidden bg-[#faf8f4] px-4 pb-5 pt-16 sm:px-6 sm:pb-6 sm:pt-20 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(192,123,62,0.09),transparent_26%),radial-gradient(circle_at_90%_80%,rgba(24,47,89,0.08),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b84a2d]">
            Visual journeys
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#142232] sm:text-4xl">
            Explore Odisha before you arrive.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#526070] sm:text-base">
            Start with a feeling. Then turn the places that move you into a journey of your own.
          </p>
          <OdishaDivider className="my-5 justify-center" maxHeight="max-h-4 sm:max-h-5" />
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {VISUAL_STORIES.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/70 bg-[#172637] shadow-[0_16px_42px_rgba(22,38,54,0.14)] md:min-h-[440px]"
            >
              <img
                src={story.image}
                alt={story.location}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b2b]/90 via-[#0c1b2b]/20 to-[#0c1b2b]/5" />

              <div className="relative flex h-full min-h-[360px] flex-col justify-between p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 text-white">
                  <span className="rounded-full border border-white/35 bg-[#102339]/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                    {story.location}
                  </span>
                  <span className="text-xs font-medium text-white/85">{story.duration}</span>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setActiveStory(story)}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/18 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/28"
                    aria-label={`Play ${story.title}`}
                  >
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </button>
                  <h3 className="max-w-lg font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {story.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
                    {story.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            type="button"
            onClick={onWatchOdisha}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#162436] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f1a27]"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Watch more of Odisha
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>

      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1725]/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeStory.location} visual story`}
          onClick={() => setActiveStory(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/25 bg-[#0f2031] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white sm:px-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f4c58b]">
                  Visual story
                </p>
                <h3 className="mt-0.5 font-serif text-lg">{activeStory.location}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="rounded-full p-2 text-white/85 transition hover:bg-white/10 hover:text-white"
                aria-label="Close visual story"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${activeStory.videoId}?autoplay=1&rel=0`}
                title={`${activeStory.location} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
