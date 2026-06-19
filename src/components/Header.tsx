import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/PAKTRIX_LOGO_FINAL.24b3cb81231aaa0419f0_(1).jpg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Industrial Service', href: '/service-packaging' },
    { name: 'Certification & Quality', href: '/certifications' },
    { name: 'Blogs', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-24 justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="PAKTRIX" className="h-16 w-auto" />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) =>
              item.name === 'Contact Us' ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-base font-medium px-5 py-2 rounded-lg bg-brand-green text-white hover:bg-brand-teal transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-[brand-green] border-b-2 border-[brand-green]'
                      : 'text-gray-700 hover:text-[brand-green]'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-3 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'text-[brand-green] bg-green-50'
                      : 'text-gray-700 hover:text-[brand-green] hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
