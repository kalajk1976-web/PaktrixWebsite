import aromeworld from '../assets/client-logo/aromeworld.png';
import bikaji from '../assets/client-logo/bikaji.png';
import bombayshavingcompany from '../assets/client-logo/bombayshavingcompany.png';
import chhedas from '../assets/client-logo/chhedas-com.png';
import discoverpilgrim from '../assets/client-logo/discoverpilgrim.png';
import girnarayurvedic from '../assets/client-logo/girnarayurvedic.png';
import haldiram from '../assets/client-logo/haldiram-nagpur.png';
import kohinoor from '../assets/client-logo/kohinoor.png';
import ramsonsperfumes from '../assets/client-logo/ramsonsperfumes.png';
import reneecosmetics from '../assets/client-logo/reneecosmetics.png';
import snitch from '../assets/client-logo/snitch.png';
import vadilalicecream from '../assets/client-logo/vadilalicecream.png';

const clientLogos = [
  { src: aromeworld, alt: 'Arome World' },
  { src: bikaji, alt: 'Bikaji' },
  { src: bombayshavingcompany, alt: 'Bombay Shaving Company' },
  { src: chhedas, alt: "Chheda's" },
  { src: discoverpilgrim, alt: 'Discover Pilgrim' },
  { src: girnarayurvedic, alt: 'Girnar Ayurvedic' },
  { src: haldiram, alt: 'Haldiram Nagpur' },
  { src: kohinoor, alt: 'Kohinoor' },
  { src: ramsonsperfumes, alt: 'Ramsons Perfumes' },
  { src: reneecosmetics, alt: 'Renee Cosmetics' },
  { src: snitch, alt: 'Snitch' },
  { src: vadilalicecream, alt: 'Vadilal Ice Cream' },
];

export default function ClientLogos() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by some of India's most recognized brands across food, beauty, fashion, and lifestyle.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center">
          {clientLogos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center p-4">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
