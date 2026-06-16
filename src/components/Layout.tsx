import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Packaging Box Manufacturers & Solutions Provider India</title>
        <meta name="description" content="Paktrix is a trusted packaging solutions provider offering custom boxes, printing, and innovative services among top packaging companies in India." />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
