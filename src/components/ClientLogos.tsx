import schmitten from '../assets/client-logo/schmitten.png';
import bikaji from '../assets/client-logo/bikaji.png';
import bombayshavingcompany from '../assets/client-logo/bombayshavingcompany.png';
import chhedas from '../assets/client-logo/chhedas-com.png';
import discoverpilgrim from '../assets/client-logo/discoverpilgrim.png';
import girnarayurvedic from '../assets/client-logo/girnarayurvedic.png';
import haldiram from '../assets/client-logo/haldiram-nagpur.png';
import yogabar from '../assets/client-logo/yogabar.png';
import ramsonsperfumes from '../assets/client-logo/ramsonsperfumes.png';
import stuti from '../assets/client-logo/stuti.jpg';
import snitch from '../assets/client-logo/snitch.png';
import vadilalicecream from '../assets/client-logo/vadilalicecream.png';
import hoppits from '../assets/client-logo/hoppits.jpg';

const clientLogos = [
  { src: schmitten, alt: 'Arome World' },
  { src: bikaji, alt: 'Bikaji' },
  { src: bombayshavingcompany, alt: 'Bombay Shaving Company' },
  { src: chhedas, alt: "Chheda's" },
  { src: discoverpilgrim, alt: 'Discover Pilgrim' },
  { src: girnarayurvedic, alt: 'Girnar Ayurvedic' },
  { src: haldiram, alt: 'Haldiram Nagpur' },
  { src: yogabar, alt: 'yogabar' },
  { src: ramsonsperfumes, alt: 'Ramsons Perfumes' },
  { src: stuti, alt: 'Renee Cosmetics' },
  { src: snitch, alt: 'Snitch' },
  { src: vadilalicecream, alt: 'Vadilal Ice Cream' },
  { src: hoppits, alt: 'Hoppits' },
];

export default function ClientLogos() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            We Are Trusted By
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by some of India's most recognized brands across food, beauty, fashion, and lifestyle.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="marquee-track">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-10 flex-shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
