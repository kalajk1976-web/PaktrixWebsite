import { Cpu, Palette, Truck, HeadphonesIcon, Cog, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PAKTRIXServicesImage from '../assets/PAKTRIXServices.jpeg';
import foodPackagingImage from '../assets/food-packaging/pizza-box.png';
import pharmaPackagingImage from '../assets/pharma-packaging/medicine-box.png';
import cosmeticPackagingImage from '../assets/cosmetic-packaging/skincare-box.png';
import textilePackagingImage from '../assets/textile-packaging/garment-box.png';
import giftBoxPackagingImage from '../assets/gift-box/jewelry-box.png';

export default function Services() {
  const industries = [
    {
      slug: 'food-packaging-manufacturers',
      image: foodPackagingImage,
      title: 'Food Packaging Manufacturers',
      description: 'Custom food packaging including cake boxes, pizza boxes, and bakery packaging designed for safety, hygiene, and brand presentation.',
    },
    {
      slug: 'pharma-packaging-manufacturers',
      image: pharmaPackagingImage,
      title: 'Pharma Packaging Manufacturers',
      description: 'Pharmaceutical-grade packaging for medicines, syrups, and capsules designed for product safety, compliance, and professional presentation.',
    },
    {
      slug: 'cosmetics-packaging-manufacturers',
      image: cosmeticPackagingImage,
      title: 'Cosmetics Packaging Manufacturers',
      description: 'Premium packaging for skincare, makeup, and perfume products designed for brand appeal and product protection.',
    },
    {
      slug: 'textile-packaging-manufacturers',
      image: textilePackagingImage,
      title: 'Textile Packaging Manufacturers',
      description: 'Durable packaging solutions for garments, sarees, and fabrics designed for protection and premium brand presentation.',
    },
    {
      slug: 'gift-box-manufacturers',
      image: giftBoxPackagingImage,
      title: 'Gift Box Manufacturers',
      description: 'Premium gift packaging for chocolates, sweets, and jewelry designed for luxury presentation and gifting appeal.',
    },
  ];

  const services = [
    {
      icon: Palette,
      title: 'Custom Design & Development',
      description: 'Work with our experienced design team to create unique packaging solutions that perfectly match your brand identity and product requirements.',
      features: [
        'Brand-aligned designs',        
        'Technical design optimization'
      ]
    },
    {
      icon: Cpu,
      title: 'Advanced Manufacturing',
      description: 'State-of-the-art manufacturing facilities equipped with cutting-edge technology to ensure precision, consistency, and quality in every unit.',
      features: [
        'Automated production lines',
        'Quality control at every stage',
        'High-volume production capability',
        'Flexible batch sizing'
      ]
    },
    {
      icon: Package,
      title: 'Custom Printing Solutions',
      description: 'High-quality printing services to bring your brand to life on packaging.',
      features: [
        'Full-color printing',
        'Metallic and special finishes',
        'Pantone color matching'
      ]
    },
    {
      icon: Cog,
      title: 'Product Testing & Certification',
      description: 'Comprehensive testing and certification services to ensure your packaging meets all regulatory requirements and quality standards.',
      features: [
        'Material safety testing',
        'Durability assessments',
        'International certifications',
        'Compliance documentation'
      ]
    },
    {
      icon: Truck,
      title: 'Global Logistics & Distribution',
      description: 'Reliable shipping and logistics solutions to deliver your packaging anywhere in the world, on time and in perfect condition.',
      features: [
        'Worldwide shipping coverage',
        'Secure packaging for transit'
      ]
    },
    {
      icon: HeadphonesIcon,
      title: 'Dedicated Support',
      description: 'Expert customer support team available throughout your project lifecycle to ensure smooth communication and successful outcomes.',
      features: [
        'Dedicated account managers',
        'Technical consultation',
        'After-sales service'
      ]
    }
  ];

  return (
    <div>
      <Helmet>
        <title>Service Packaging & Product Packaging Services | Paktrix</title>
        <meta name="description" content="Paktrix offers reliable service packaging and product packaging services with custom, durable, and innovative solutions for brands across India." />
      </Helmet>
      <section className="bg-gradient-to-b from-brand-green to-brand-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Industrial Services</h1>
          <p className="text-xl text-green-50 max-w-3xl">
            Comprehensive B2B solutions from design to delivery
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industry/${industry.slug}`}
                className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group flex flex-col"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-green transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1">
                    {industry.description}
                  </p>
                  <span className="inline-flex items-center text-brand-green font-semibold">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              End-to-End Packaging Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to delivery, we provide comprehensive services to meet all your packaging needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-lg mb-4">
                    <IconComponent className="h-7 w-7 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-[#10a5a4] mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Industrial Services?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Industry Expertise
                  </h3>
                  <p className="text-gray-600">
                    With over 15 years in the packaging industry, we understand the unique challenges
                    and requirements of different sectors.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Scalable Solutions
                  </h3>
                  <p className="text-gray-600">
                    Whether you need 1,000 units or 1 million, our flexible manufacturing capabilities
                    can scale to meet your demand without compromising on quality.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Fast Turnaround
                  </h3>
                  <p className="text-gray-600">
                    Our efficient processes and strategic inventory management enable us to deliver
                    your orders quickly without sacrificing attention to detail.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={PAKTRIXServicesImage}
                alt="PAKTRIX Industrial Services"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-brand-green to-brand-teal rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Contact us to discuss how our industrial services can support your business goals
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-green rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
