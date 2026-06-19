import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/WhiteLogoPaktrix-Photoroom.png';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0e2a1e' }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="flex flex-col lg:flex-row lg:items-center py-12 gap-8 lg:gap-0">
          <div className="flex flex-col gap-3 lg:w-72 flex-shrink-0">
            <img
              src={logo}
              alt="PAKTRIX"
              className="h-20 w-48 object-contain object-left"
              style={{ filter: 'brightness(1.1)' }}
            />
            <p className="text-sm text-gray-400">Packaging Solutions | Mono Cartons | Folding Cartons | Luxury Packaging</p>
          </div>

          <div
            className="hidden lg:block w-px self-stretch mx-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          />

          <div className="flex flex-col gap-4">
            <p className="text-base font-semibold text-white">Connect with Us</p>

            <div className="flex items-start gap-3">
              <span className="text-lg leading-none mt-0.5">🇮🇳</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=336%2C+LA+Victoria%2C+near+galaxy+circle%2C+PAL%2C+Surat+-+394510+-+Gujarat%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-200 hover:text-brand-teal hover:underline underline-offset-2 transition-colors"
              >
                <span className="font-semibold text-white">Registered Address:</span>{' '}
                336, LA Victoria, near galaxy circle, PAL, Surat - 394510 - Gujarat, India
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-16">
              <div className="flex items-center gap-3">
                <a href="tel:+919099924140" className="text-sm text-gray-200 hover:text-brand-teal hover:underline underline-offset-2 transition-colors">
                  <span className="font-semibold text-white">Call:</span> +91 90999 24140
                </a>
                <span className="text-gray-500">|</span>
                <a href="tel:+919924624140" className="text-sm text-gray-200 hover:text-brand-teal hover:underline underline-offset-2 transition-colors">
                  +91 99246 24140
                </a>
              </div>
              <a href="mailto:info@paktrix.com" className="text-sm text-gray-200 hover:text-brand-teal hover:underline underline-offset-2 transition-colors">
                <span className="font-semibold text-white">Mail:</span> info@paktrix.com
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between py-5 gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/people/Paktrix/61577301784476/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#1877F2' }}
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.instagram.com/paktrix_packagings/?igsh=MW05ZWdtc29xdm94Mw%3D%3D&utm_source=qr#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://in.linkedin.com/in/paktrix-packaging-712873415"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)' }}
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
            
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <span>&copy;{new Date().getFullYear()} by PAKTRIX</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
