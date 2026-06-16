import { useEffect, useRef, useState } from 'react';
import conceptImage from '../assets/whatsapp_image_2026-02-02_at_18.12.49.jpeg';
import developmentImage from 
'../assets/whatsapp_image_2026-02-02_at_18.12.48.jpeg';
import testingImage from '../assets/whatsapp_image_2026-02-02_at_18.12.48_(1).jpeg';
import deliveryImage from '../assets/whatsapp_image_2026-02-02_at_18.12.49_(1).jpeg';
import brandExperience from '../assets/WhatsApp_Image_2026-02-16_at_11.56.46.jpeg';
import sustainablePractice from '../assets/WhatsApp_Image_2026-02-16_at_11.58.31.jpeg';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Concept & Design',
    description: 'Creative designs that align with your brand vision and product requirements.',
    image: conceptImage,
  },
  {
    number: '02',
    title: 'Development',
    description: 'Starting the packaging journey with a product that contains the quintessence of a brand.',
    image: developmentImage,
  },
  {
    number: '03',
    title: 'Testing',
    description: 'Ensuring performance, functionality and durability through rigorous quality checks.',
    image: testingImage,
  },
  {
    number: '04',
    title: 'Brand Experience',
    description: 'Enhancing customer experience through packaging that drives your brand story.',
    image: brandExperience,
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'Timely delivery with efficient logistics ensuring your products reach you on time.',
    image: deliveryImage,
  },
  {
    number: '06',
    title: 'Sustainable Practices',
    description: 'Reducing environmental impact through responsibly sourced materials.',
    image: sustainablePractice,
  },
];

export default function ProcessCycle() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / steps.length;
      scrollRef.current.scrollTo({
        left: scrollWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Packaging Development Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our streamlined packaging process ensures quality, precision, and timely delivery at every stage. From design and material selection to printing and final production, we create packaging solutions tailored to your business needs.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-4 snap-center"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full border-2 border-brand-green relative group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green via-[#10a5a4] to-brand-green rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-start mb-6">
                    <div className="relative">
                      <span className="text-5xl font-bold text-[#e63946] opacity-20 transition-all duration-300 group-hover:opacity-30 group-hover:scale-110">
                        {step.number}
                      </span>
                      <div className="absolute inset-0 bg-[#10a55f] opacity-0 group-hover:opacity-5 rounded-full blur-xl transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 ml-4 mt-2 transition-colors duration-300 group-hover:text-brand-green">
                      {step.title}
                    </h3>
                  </div>

                  <div className="mb-6 relative overflow-hidden rounded-lg bg-white p-6 h-64 flex items-center justify-center border-2 border-brand-green">
                    <div
                      className="process-image-container"
                      style={{
                        animation: `fadeInScale 1.2s ease-out ${index * 0.15}s both`,
                      }}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="max-w-full max-h-full object-contain filter-green"
                      />
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-10">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        className="animate-pulse"
                      >
                        <path
                          d="M20 32 L44 32 M44 32 L36 24 M44 32 L36 40"
                          stroke="#10a55f"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="animate-draw-arrow"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'w-12 bg-gradient-to-r from-[#10a5a4] to-[#10a5a4] shadow-lg shadow-red-300'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-500'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 italic">
              {isHovered ? 'Paused - Hover away to auto-scroll' : 'Auto-scrolling through our process'}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-5deg);
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes drawLine {
          0% {
            stroke-dashoffset: 100;
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
        }

        .animate-draw-arrow {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawLine 3s ease-in-out infinite;
        }

        .process-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .process-image-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(27, 94, 32, 0.05) 0%, transparent 70%);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.8;
          }
        }

        .filter-green {
          filter:
            drop-shadow(0 4px 6px rgba(27, 94, 32, 0.1))
            drop-shadow(0 2px 4px rgba(27, 94, 32, 0.06));
          transition: all 0.3s ease;
        }

        .filter-green:hover {
          filter:
            drop-shadow(0 10px 15px rgba(27, 94, 32, 0.2))
            drop-shadow(0 4px 6px rgba(27, 94, 32, 0.1));
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </section>
  );
}
