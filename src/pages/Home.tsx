import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';
import { useState, useEffect } from 'react';
import { fetchProducts, Product } from '../lib/products';
import { supabase } from '../lib/supabase';
import ProcessCycle from '../components/ProcessCycle';
import FAQItem from '../components/FAQItem';
import ClientLogos from '../components/ClientLogos';
import heroFallback from '../assets/heroImage.png';

interface HeroSection {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroSection, setHeroSection] = useState<HeroSection>({
    title: 'Packaging Box Manufacturers & Packaging Solutions Provider in India',
    subtitle: 'In today’s competitive market, packaging is more than just a box; it reflects your brand, protects your products, and creates a strong first impression. As trusted packaging box manufacturers and packaging solutions providers in India, we deliver durable, innovative, and customized packaging solutions for industries including retail, eCommerce, food, cosmetics, pharmaceuticals, textiles, and gifting. From premium printed boxes to industrial packaging, we help businesses enhance product presentation and customer experience.',
    cta_text: 'Get in Touch',
    cta_link: '/products',
    background_image: heroFallback
  });

  useEffect(() => {
    loadFeaturedProducts();
    loadHeroSection();
  }, []);

  const loadFeaturedProducts = async () => {
    const products = await fetchProducts();
    setFeaturedProducts(products.slice(0, 3));
  };

  const loadHeroSection = async () => {
    const { data } = await supabase
      .from('hero_sections')
      .select('*')
      .eq('page', 'home')
      .eq('is_active', true)
      .maybeSingle();

    if (data) {
      setHeroSection({
        title: data.title,
        subtitle: data.subtitle,
        cta_text: data.cta_text,
        cta_link: data.cta_link,
        background_image: data.background_image
      });
    }
  };

  return (
    <div>
      <section className="relative bg-gradient-to-b from-brand-green to-brand-teal text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {heroSection.title}
              </h1>
              <p className="text-md mb-8 text-green-50 leading-relaxed">
                {heroSection.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={heroSection.cta_link}
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-green rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  {heroSection.cta_text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-brand-green transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img style={{"height":"29rem","maxWidth":"40rem"}}
                src={heroSection.background_image}
                alt=""
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroFallback; }}
              />
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Wide Range of Packaging Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our packaging products are designed to meet the needs of modern businesses across multiple industries. From custom printed boxes to durable industrial packaging, we deliver quality solutions that enhance brand value and product protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-3 border-2 border-transparent hover:border-brand-green transition-all duration-500 group"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-green duration-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  <span className="inline-flex items-center text-brand-green font-semibold">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-teal transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Sets Our Packaging Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From custom branding to sustainable materials and advanced manufacturing, every part of our process is built to help your products stand out.
            </p>
          </div>

          <div className="space-y-8">
            {/* Custom Branding */}
            <div className="bg-white rounded-lg shadow-md p-8 lg:p-10 border-2 border-transparent hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">
                Best Packaging Company in India for Custom Branding
              </h3>
              <p className="text-gray-600 mb-8 max-w-4xl">
                Packaging plays a major role in building brand identity. Our design and printing experts work closely with businesses to create packaging that increases shelf appeal and customer engagement.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  'Offset Printing',
                  'Digital Printing',
                  'Flexographic Printing',
                  'UV Printing',
                  'Foil Stamping',
                  'Embossing & Debossing',
                  'Matte & Gloss Lamination',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                As one of the best printing & packaging companies in India, we ensure every box reflects professionalism and quality.
              </p>
            </div>

            {/* Eco-Friendly */}
            <div className="bg-white rounded-lg shadow-md p-8 lg:p-10 border-2 border-transparent hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">
                Sustainable & Eco-Friendly Packaging Solutions
              </h3>
              <p className="text-gray-600 mb-8 max-w-4xl">
                Modern businesses are shifting towards environmentally responsible packaging. We offer sustainable packaging solutions made with recyclable and eco-friendly materials, helping brands reduce environmental impact while maintaining premium quality.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Recyclable materials',
                  'Minimal waste production',
                  'Sustainable printing methods',
                  'Biodegradable packaging options',
                  'Reusable packaging designs',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Manufacturing */}
            <div className="bg-white rounded-lg shadow-md p-8 lg:p-10 border-2 border-transparent hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">
                Advanced Manufacturing & Quality Control
              </h3>
              <p className="text-gray-600 mb-8 max-w-4xl">
                Our manufacturing facility uses modern machinery and strict quality standards to ensure consistency in every packaging order. We are committed to delivering packaging solutions that meet industry standards and client expectations.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Large-scale production capacity',
                  'Precision die-cutting',
                  'Automated printing systems',
                  'Custom box prototyping',
                  'Quality inspection at every stage',
                  'Secure packaging and delivery',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ProcessCycle />

      <WhyChooseUs
        title="Why Choose Our Packaging Solutions?"
        subtitle="Businesses today require packaging that is functional, attractive, and cost-effective. Our team specializes in creating packaging solutions tailored to your industry requirements and branding goals."
      />

      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Businesses Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">15+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">100+</div>
              <div className="text-gray-600">Global Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">50M+</div>
              <div className="text-gray-600">Units Produced</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-green mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our packaging solutions and services.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: 'What services do packaging box manufacturers provide?',
                answer: 'Packaging box manufacturers provide custom box design, printing, branding, and packaging solutions for industries such as retail, food, cosmetics, textiles, pharmaceuticals, and e-commerce.',
              },
              {
                question: 'How do I choose the best packaging company in India?',
                answer: 'To choose the best packaging company in India, look for experience, product quality, customization options, printing capabilities, timely delivery, and customer support.',
              },
              {
                question: 'Do packaging companies in India offer custom packaging solutions?',
                answer: 'Yes, most packaging companies in India offer customized packaging solutions based on product size, branding requirements, material preferences, and industry needs.',
              },
              {
                question: 'Can I get printing and packaging services from one company?',
                answer: 'Yes, many printing & packaging companies in India provide complete services including box manufacturing, custom printing, branding, finishing, and bulk production.',
              },
              {
                question: 'Are eco-friendly packaging solutions available?',
                answer: 'Yes, leading packaging solutions providers offer eco-friendly packaging options made from recyclable and sustainable materials to support environmentally responsible businesses.',
              },
              {
                question: 'How can I find packaging solutions near me?',
                answer: 'You can find packaging solutions near me by searching for local packaging manufacturers or companies that provide nationwide delivery and customized packaging services across India.',
              },
            ].map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-brand-green to-brand-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Custom Packaging Solutions for Your Business
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Looking for reliable packaging box manufacturers in India? Our team is ready to provide customized packaging solutions that match your business needs and branding goals.
          </p>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            From design and printing to manufacturing and delivery, we offer complete packaging support for startups, wholesalers, retailers, and large enterprises.
          </p>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your packaging requirements and get the perfect packaging solution for your products.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-white text-brand-green rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Get In Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
