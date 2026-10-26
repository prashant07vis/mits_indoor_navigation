import React, { useState } from 'react';
import {
  ChevronDown,
  Compass,
  Navigation,
  Accessibility,
  Building2,
  Users,
  MessageSquareHeart,
  Info,
  ArrowUp,
  Route,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is MITS Indoor Campus Navigation?',
    answer:
      'It is an indoor navigation system designed to help students, faculty and visitors find classrooms, laboratories, offices and other important locations inside the MITS campus.',
  },
  {
    question: 'Why is indoor navigation needed?',
    answer:
      'Large academic buildings can be difficult to navigate, especially for new students and visitors. Indoor navigation provides clear step-by-step guidance and helps users reach their destination with less confusion.',
  },
  {
    question: 'How does the navigation system work?',
    answer:
      'Locations across campus are connected as a network of routes. The system automatically calculates the fastest, most accurate path between the selected origin and destination.',
  },
  {
    question: 'Can I navigate between different floors?',
    answer:
      'Yes. The system supports multi-floor navigation and can guide users through lifts or stairs depending on the selected navigation mode.',
  },
  {
    question: 'Is an accessible route available?',
    answer:
      'Yes. Step-free navigation can be selected when available, helping users avoid stairs and choose an accessible path.',
  },
  {
    question: 'Can I change my starting location?',
    answer:
      'Yes. Select any available location as your starting point and choose your destination. You can also use the swap control to reverse the route.',
  },
];

interface FooterProps {
  onOpenFeedback: () => void;
  onOpenDevelopers: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFeedback,
  onOpenDevelopers,
}) => {

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [activeInfo, setActiveInfo] = useState<'about' | 'why' | 'features' | null>(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openFAQSection = () => {
    document
      .getElementById('footer-faq')
      ?.scrollIntoView({ behavior: 'smooth' });

    setOpenFAQ(0);
  };

  return (
    <>
      <footer className="mt-10 border-t border-[#E3C5D5] dark:border-[#4A2035] bg-white dark:bg-[#1B0D15] transition-colors duration-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#97144D] to-[#C2185B] flex items-center justify-center text-white shadow-lg shadow-[#97144D]/20">
                  <Compass className="w-5 h-5" />
                </div>

                <div>
                  <h2 className="font-extrabold text-[#241820] dark:text-white text-sm transition-colors duration-300">
                    MITS Indoor Navigation
                  </h2>

                  <p className="text-[11px] text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                    Smart campus wayfinding
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#6B5963] dark:text-[#C9B6C0] leading-relaxed max-w-xs transition-colors duration-300">
                A smart indoor navigation system designed to help students,
                faculty and visitors find their way around the MITS campus.
              </p>

              {/* System Status */}
              <div className="inline-flex items-center gap-2 mt-5 px-3 py-2 rounded-xl bg-[#F3E7EF] dark:bg-[#351524] border border-[#E3C5D5] dark:border-[#633049] transition-colors duration-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2185B] opacity-40" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16805C]" />
                </span>

                <span className="text-xs font-semibold text-[#4A3942] dark:text-[#E8D8DF] transition-colors duration-300">
                  Navigation System Operational
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-bold text-[#241820] dark:text-white mb-4 transition-colors duration-300">
                Navigation
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                  <Navigation className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Plan a Route
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                  <Route className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Step-by-Step Directions
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                  <Building2 className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Multi-Floor Navigation
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                  <Accessibility className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Accessible Routes
                </div>
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-bold text-[#241820] dark:text-white mb-4 transition-colors duration-300">
                About the System
              </h3>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setActiveInfo('about')}
                  className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] transition-colors"
                >
                  <Info className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  What is this?
                </button>

                <button
                  type="button"
                  onClick={() => setActiveInfo('why')}
                  className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Why do we need it?
                </button>

                <button
                  type="button"
                  onClick={() => setActiveInfo('features')}
                  className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Key Features
                </button>

                <button
                  type="button"
                  onClick={onOpenDevelopers}
                  className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] transition-colors"
                >
                  <Users className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Development Team
                </button>
              </div>
            </div>

            {/* Help & Support */}
            <div>
              <h3 className="text-sm font-bold text-[#241820] dark:text-white mb-4 transition-colors duration-300">
                Help & Support
              </h3>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={openFAQSection}
                  className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] transition-colors"
                >
                  <MessageSquareHeart className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Frequently Asked Questions
                </button>

                <button
                  type="button"
                  onClick={onOpenFeedback}
                  className="flex items-center gap-2 text-sm text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] transition-colors"
                >
                  <MessageSquareHeart className="w-4 h-4 text-[#C2185B] dark:text-[#F08AB4]" />
                  Send Feedback
                </button>

                <p className="text-sm text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                  Need help choosing a route?
                </p>

                <p className="text-sm text-[#6B5963] dark:text-[#C9B6C0] transition-colors duration-300">
                  Use the Route Planner above.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            id="footer-faq"
            className="mt-12 pt-8 border-t border-[#E3C5D5] dark:border-[#4A2035] transition-colors duration-300"
          >
            <div className="mb-5">
              <h3 className="text-lg font-extrabold text-[#241820] dark:text-white transition-colors duration-300">
                Frequently Asked Questions
              </h3>

              <p className="text-sm text-[#6B5963] dark:text-[#C9B6C0] mt-1 transition-colors duration-300">
                Quick answers about the MITS Indoor Navigation System.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqItems.map((faq, index) => {
                const isOpen = openFAQ === index;

                return (
                  <div
                    key={index}
                    className={`rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? 'border-[#C2185B] dark:border-[#F08AB4] bg-[#F8F1F6] dark:bg-[#28131E] shadow-sm'
                        : 'border-[#E3C5D5] dark:border-[#4A2035] bg-white dark:bg-[#1B0D15] hover:border-[#D49AB5] dark:hover:border-[#633049]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left"
                    >
                      <span className="text-sm font-semibold text-[#241820] dark:text-white transition-colors duration-300">
                        {faq.question}
                      </span>

                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[#97144D] dark:text-[#F08AB4] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 text-sm text-[#6B5963] dark:text-[#C9B6C0] leading-relaxed transition-colors duration-300">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E3C5D5] dark:border-[#4A2035] bg-[#F8F1F6] dark:bg-[#160A11] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#6B5963] dark:text-[#C9B6C0] text-center sm:text-left transition-colors duration-300">
              © 2026 MITS Indoor Campus Navigation System
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1B0D15] border border-[#E3C5D5] dark:border-[#4A2035] text-xs font-semibold text-[#97144D] dark:text-[#F08AB4] hover:bg-[#97144D] dark:hover:bg-[#97144D] hover:text-white dark:hover:text-white transition-all duration-200 active:scale-95"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Information Modal */}
      {activeInfo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveInfo(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#1B0D15] rounded-2xl border border-[#E3C5D5] dark:border-[#4A2035] shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200 transition-colors"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveInfo(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-[#6B5963] dark:text-[#C9B6C0] hover:text-[#97144D] dark:hover:text-[#F08AB4] hover:bg-[#F3E7EF] dark:hover:bg-[#351524] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="w-11 h-11 rounded-xl bg-[#F3E7EF] dark:bg-[#351524] text-[#97144D] dark:text-[#F08AB4] flex items-center justify-center mb-4 transition-colors duration-300">
              {activeInfo === 'about' && <Info className="w-5 h-5" />}
              {activeInfo === 'why' && <MapPin className="w-5 h-5" />}
              {activeInfo === 'features' && (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>

            {activeInfo === 'about' && (
              <>
                <h2 className="text-xl font-extrabold text-[#241820] dark:text-white transition-colors duration-300">
                  About the System
                </h2>

                <p className="mt-3 text-sm text-[#6B5963] dark:text-[#C9B6C0] leading-relaxed transition-colors duration-300">
                  MITS Indoor Campus Navigation is designed to provide
                  simple and efficient navigation inside academic buildings.
                  The system guides users through rooms, corridors, stairs
                  and lifts.
                </p>
              </>
            )}

            {activeInfo === 'why' && (
              <>
                <h2 className="text-xl font-extrabold text-[#241820] dark:text-white transition-colors duration-300">
                  Why Indoor Navigation?
                </h2>

                <p className="mt-3 text-sm text-[#6B5963] dark:text-[#C9B6C0] leading-relaxed transition-colors duration-300">
                  Finding a particular classroom, laboratory or faculty office
                  inside a large academic building can be difficult for new
                  students and visitors. Indoor navigation reduces this
                  confusion by providing a clear route from the selected
                  starting point to the required destination.
                </p>
              </>
            )}

            {activeInfo === 'features' && (
              <>
                <h2 className="text-xl font-extrabold text-[#241820] dark:text-white transition-colors duration-300">
                  Key Features
                </h2>

                <div className="mt-4 space-y-3">
                  {[
                    'Fast & accurate route calculation',
                    'Multi-floor navigation',
                    'Lift and stairs route selection',
                    'Step-free navigation',
                    'Room and location search',
                    'Step-by-step navigation instructions',
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#4A3942] dark:text-[#E8D8DF] transition-colors duration-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#16805C] dark:text-emerald-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => setActiveInfo(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#97144D] hover:bg-[#7D103F] text-white text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;