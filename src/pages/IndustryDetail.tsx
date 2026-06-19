import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchProducts, Product } from '../lib/products';
import { supabase } from '../lib/supabase';
import ProcessCycle from '../components/ProcessCycle';
import FAQItem from '../components/FAQItem';
import ClientLogos from '../components/ClientLogos';
import WhyChooseUs from '../components/WhyChooseUs';
import cakeBoxImage from '../assets/food-packaging/cake-box.png';
import cookieBoxImage from '../assets/food-packaging/cookie-box.png';
import chocolateBoxImage from '../assets/food-packaging/chocolate-box.png';
import sandwichBoxImage from '../assets/food-packaging/sandwich-box.png';
import sweetBoxImage from '../assets/food-packaging/sweet-box.png';
import pizzaBoxImage from '../assets/food-packaging/pizza-box.png';
import bakeryBoxImage from '../assets/food-packaging/bakery-box.png';
import medicineBoxImage from '../assets/pharma-packaging/medicine-box.png';
import syrupBoxImage from '../assets/pharma-packaging/syrup-box.png';
import capsuleBoxImage from '../assets/pharma-packaging/capsule-box.png';
import healthBoxImage from '../assets/pharma-packaging/health-box.png';
import pharmaExportBoxImage from '../assets/pharma-packaging/pharma-export-box.png';
import skincareBoxImage from '../assets/cosmetic-packaging/skincare-box.png';
import makeupBoxImage from '../assets/cosmetic-packaging/makeup-box.png';
import perfumeBoxImage from '../assets/cosmetic-packaging/perfume-box.png';
import haircareBoxImage from '../assets/cosmetic-packaging/haircare-box.png';
import lipstickBoxImage from '../assets/cosmetic-packaging/lipstick-box.png';
import garmentBoxImage from '../assets/textile-packaging/garment-box.png';
import sareeBoxImage from '../assets/textile-packaging/saree-box.png';
import shirtBoxImage from '../assets/textile-packaging/shirt-box.png';
import fabricRollBoxImage from '../assets/textile-packaging/fabric-roll-box.png';
import textileExportBoxImage from '../assets/textile-packaging/textile-export-box.png';
import chocolateGiftBoxImage from '../assets/gift-box/chocolate-gift-box.png';
import crackerGiftBoxImage from '../assets/gift-box/cracker-gift-box.png';
import sweetGiftBoxImage from '../assets/gift-box/sweet-gift-box.png';
import dryfruitGiftBoxImage from '../assets/gift-box/dryfruit-gift-box.png';
import jewelryBoxImage from '../assets/gift-box/jewelry-box.png';

// ── SEO ───────────────────────────────────────────────────────────────────────

const industryPageSEO: Record<string, { title: string; description: string }> = {
  'food-packaging-manufacturers': {
    title: 'Food Packaging Manufacturers & Custom Food Boxes India | Paktrix',
    description: 'Paktrix offers custom food packaging, bakery boxes, pizza packaging, sweet boxes, and food packaging solutions for brands across India.',
  },
  'pharma-packaging-manufacturers': {
    title: 'Pharma Packaging Manufacturers & Solutions Company India | Paktrix',
    description: 'Paktrix provides pharma packaging solutions with secure, high-quality packaging for healthcare and pharmaceutical brands across India.',
  },
  'cosmetics-packaging-manufacturers': {
    title: 'Cosmetic Packaging Manufacturers & Skincare Boxes India | Paktrix',
    description: 'Paktrix offers cosmetic box packaging, skincare packaging, perfume boxes, and custom cosmetic packaging boxes for beauty brands in India.',
  },
  'textile-packaging-manufacturers': {
    title: 'Textile Packaging & Yarn Packaging Solutions India | Paktrix',
    description: 'Paktrix provides textile packaging and yarn packaging solutions designed for safe storage, branding, and transportation in the textile industry.',
  },
  'gift-box-manufacturers': {
    title: 'Gift Box Manufacturers & Gift Box Packaging India | Paktrix',
    description: 'Paktrix offers gift box packaging, chocolate gift boxes, dry fruit gift boxes, and custom jewelry gift boxes for premium gifting needs.',
  },
};

// ── Per-slug metadata ────────────────────────────────────────────────────────

interface IndustryMeta {
  heroTitle: string;
  heroSubtitle: string;
  productsSectionTitle: string;
  productsSectionSubtitle: string;
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
}

const industryMeta: Record<string, IndustryMeta> = {
  'food-packaging-manufacturers': {
    heroTitle: 'Food Packaging Manufacturers in India',
    heroSubtitle: 'Looking for trusted food packaging manufacturers in India? We provide premium food packaging solutions designed for safety, hygiene, and brand presentation.',
    productsSectionTitle: 'Food Packaging Products We Offer',
    productsSectionSubtitle: 'Explore our wide range of high-quality packaging products designed for durability, branding, and product protection. We provide customized packaging solutions tailored to meet the needs of multiple industries and businesses.',
    whyChooseUsTitle: 'Why Choose Us for Food Packaging Boxes?',
    whyChooseUsSubtitle: 'Businesses trust us because we provide reliable, customized, and food-safe packaging solutions designed for modern food industry requirements.',
  },
  'pharma-packaging-manufacturers': {
    heroTitle: 'Pharma Packaging Manufacturers in India',
    heroSubtitle: 'Looking for trusted pharma packaging manufacturers in India? We provide premium pharmaceutical packaging solutions designed for product safety, compliance, and professional presentation.',
    productsSectionTitle: 'Pharma Packaging Products We Offer',
    productsSectionSubtitle: 'Explore our wide range of pharma packaging products designed for safety, durability, branding, and pharmaceutical compliance. We provide customized pharma packaging solutions tailored to meet the needs of pharmaceutical companies, healthcare brands, and medical industries.',
    whyChooseUsTitle: 'Why Choose Us for Pharma Packaging Solutions?',
    whyChooseUsSubtitle: 'Businesses trust us because we provide reliable, customized, and pharmaceutical-grade packaging solutions designed for modern healthcare and pharma industry requirements.',
  },
  'cosmetics-packaging-manufacturers': {
    heroTitle: 'Cosmetics Packaging Manufacturers in India',
    heroSubtitle: 'Looking for trusted cosmetics packaging manufacturers in India? We provide premium beauty and cosmetics packaging solutions designed for brand appeal and product safety.',
    productsSectionTitle: 'Cosmetic Packaging Products We Offer',
    productsSectionSubtitle: 'Explore our wide range of cosmetic box packaging solutions designed for beauty, skincare, wellness, and personal care brands. We provide premium cosmetic product packaging that combines durability, elegant presentation, branding, and product protection for modern cosmetic businesses.',
    whyChooseUsTitle: 'Why Choose Us for Cosmetic Packaging Solutions?',
    whyChooseUsSubtitle: 'Businesses trust us because we provide reliable, customized, and premium cosmetic packaging solutions designed for modern beauty and personal care industry requirements.',
  },
  'textile-packaging-manufacturers': {
    heroTitle: 'Textile Packaging Manufacturers in India',
    heroSubtitle: 'Looking for trusted textile packaging manufacturers in India? We provide premium packaging solutions for garments, apparel, and textile products designed for protection and brand presentation.',
    productsSectionTitle: 'Textile Packaging Products We Offer',
    productsSectionSubtitle: 'Explore our wide range of textile packaging solutions designed for product safety, branding, and premium presentation. We provide customized packaging solutions tailored to the needs of textile manufacturers, fashion brands, and garment industries.',
    whyChooseUsTitle: 'Why Choose Us for Textile Packaging Solutions?',
    whyChooseUsSubtitle: 'Businesses trust us because we provide reliable, customized, and premium textile packaging solutions designed for modern garment and fashion industry requirements.',
  },
  'gift-box-manufacturers': {
    heroTitle: 'Gift Box Manufacturers in India',
    heroSubtitle: 'Looking for trusted gift box manufacturers in India? We provide premium gift packaging solutions designed for luxury presentation, brand gifting, and special occasions.',
    productsSectionTitle: 'Gift Box Packaging Products We Offer',
    productsSectionSubtitle: 'Explore our wide range of gift box packaging solutions designed for premium presentation, product protection, and memorable gifting experiences. We provide customized gift packaging tailored to the needs of multiple industries and businesses.',
    whyChooseUsTitle: 'Why Choose Us for Gift Box Packaging?',
    whyChooseUsSubtitle: 'Businesses trust us because we provide reliable, customized, and premium gift box packaging solutions designed for modern gifting and retail industry requirements.',
  },
};

// ── Spotlight Section ────────────────────────────────────────────────────────

interface IndustrySpotlightSubSection {
  image: string;
  title: string;
  paragraphs: string[];
  tags: string[];
}

interface IndustrySpotlightData {
  slug: string;
  subSections: IndustrySpotlightSubSection[];
}

function IndustrySpotlightSection({ subSections }: { subSections: IndustrySpotlightSubSection[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {subSections.map((sub, index) => (
          <div key={index} className="grid lg:grid-cols-2 rounded-xl shadow-md overflow-hidden">
            <div className="bg-green-50 flex flex-col min-h-72">
              <div className="flex-1 flex items-center justify-center p-10">
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="max-h-64 w-full object-contain"
                />
              </div>
              <div className="bg-brand-green px-6 py-3 text-center">
                <span className="text-white font-semibold text-sm tracking-wide">{sub.title}</span>
              </div>
            </div>
            <div className="bg-white p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-brand-green mb-4 leading-snug">{sub.title}</h3>
              {sub.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">{p}</p>
              ))}
              {sub.tags.length > 0 && (
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-700">Tags: </span>
                  {sub.tags.join(', ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const industrySpotlightSections: IndustrySpotlightData[] = [
  {
    slug: 'textile-packaging-manufacturers',
    subSections: [
      {
        image: garmentBoxImage,
        title: 'Garment Packaging Box Solutions',
        paragraphs: [
          'Garment packaging boxes are designed to protect clothing products while enhancing their presentation and retail appeal. Attractive packaging helps fashion brands improve customer experience and strengthen brand identity.',
          'We provide custom garment packaging solutions for apparel brands, boutiques, and retail businesses. From printed clothing boxes to premium garment packaging, our solutions combine durability, branding, and functionality.',
        ],
        tags: [],
      },
      {
        image: sareeBoxImage,
        title: 'Saree Packaging Box Solutions',
        paragraphs: [
          'Saree packaging boxes help protect sarees from dust, moisture, and damage while creating elegant product presentation. Professionally designed saree packaging improves gifting appeal and retail visibility for textile brands.',
          'We manufacture premium saree packaging box solutions with customized printing, premium finishes, and attractive packaging designs for textile and fashion businesses.',
        ],
        tags: [],
      },
      {
        image: shirtBoxImage,
        title: 'Shirt & Apparel Packaging Solutions',
        paragraphs: [
          'Shirt and apparel packaging solutions are designed for organized product presentation and safe storage during retail display and transportation. Stylish packaging helps apparel brands create a premium customer experience.',
          'We provide customized apparel packaging solutions for shirts, t-shirts, ethnic wear, uniforms, and fashion accessories with premium branding and protective packaging features.',
        ],
        tags: [],
      },
      {
        image: fabricRollBoxImage,
        title: 'Fabric Roll Packaging Solutions',
        paragraphs: [
          'Fabric roll packaging is essential for protecting textile materials during storage, transportation, and export handling. Durable packaging helps textile manufacturers maintain fabric quality and reduce product damage.',
          'We offer strong and customized fabric packaging solutions designed for textile mills, wholesalers, exporters, and industrial textile businesses.',
        ],
        tags: [],
      },
      {
        image: textileExportBoxImage,
        title: 'Textile Export Packaging Solutions',
        paragraphs: [
          'Textile export packaging solutions are designed to ensure safe transportation of garments, fabrics, and textile products in domestic and international markets. Secure packaging protects products from moisture, dust, and handling damage during logistics operations.',
          'We provide export-quality textile packaging solutions with durable materials, customized branding, and strong protective packaging structures.',
        ],
        tags: [],
      },
    ],
  },
  {
    slug: 'cosmetics-packaging-manufacturers',
    subSections: [
      {
        image: skincareBoxImage,
        title: 'Skincare Packaging Box Solutions',
        paragraphs: [
          'Skincare packaging boxes are designed to protect creams, serums, lotions, and wellness products while enhancing product presentation and brand visibility. Attractive and durable skincare packaging helps brands create a premium customer experience.',
          'We provide custom skincare packaging solutions for beauty brands and cosmetic companies. From printed skincare boxes to luxury product packaging, our solutions combine functionality, aesthetics, and durability.',
        ],
        tags: [],
      },
      {
        image: makeupBoxImage,
        title: 'Makeup Packaging Box Solutions',
        paragraphs: [
          'Makeup packaging boxes play an important role in protecting cosmetic products while creating attractive retail presentation. High-quality packaging helps beauty brands improve shelf appeal and strengthen customer trust.',
          'We manufacture premium makeup packaging boxes for lipstick, foundation, compact, mascara, and beauty product brands. Our packaging solutions are designed for durability, branding, and premium product presentation.',
        ],
        tags: [],
      },
      {
        image: perfumeBoxImage,
        title: 'Perfume Packaging Box Solutions',
        paragraphs: [
          'Perfume packaging boxes are designed to provide luxury presentation and secure protection for fragrance products. Elegant packaging enhances product value and improves gifting appeal for premium perfume brands.',
          'We provide custom perfume packaging solutions with premium printing, foil stamping, embossing, and luxury finishing options to help brands create memorable customer experiences.',
        ],
        tags: [],
      },
      {
        image: haircareBoxImage,
        title: 'Haircare Product Packaging Solutions',
        paragraphs: [
          'Haircare product packaging is essential for protecting shampoos, oils, conditioners, and personal care products during storage and transportation. Durable packaging also helps businesses improve branding and retail visibility.',
          'We offer customized haircare packaging solutions designed for beauty brands, salons, and wellness companies. Our packaging combines functionality, safety, and premium visual appeal.',
        ],
        tags: [],
      },
      {
        image: lipstickBoxImage,
        title: 'Lipstick & Small Cosmetic Packaging Solutions',
        paragraphs: [
          'Small cosmetic packaging solutions are ideal for lipstick, compact powder, nail polish, and mini beauty products. Professionally designed packaging helps brands improve shelf presence and customer engagement.',
          'We provide compact and customized cosmetic packaging boxes tailored for beauty and personal care product lines with premium branding and printing options.',
        ],
        tags: [],
      },
    ],
  },
  {
    slug: 'pharma-packaging-manufacturers',
    subSections: [
      {
        image: medicineBoxImage,
        title: 'Medicine Box Packaging Solutions',
        paragraphs: [
          'Medicine box packaging is designed to protect tablets, capsules, syrups, and healthcare products from moisture, contamination, and external damage. Durable and professionally printed medicine packaging helps pharmaceutical brands maintain product safety while improving brand presentation and regulatory compliance.',
          'We provide high-quality medicine box packaging solutions for pharmaceutical companies, healthcare brands, and medical distributors. From printed medicine cartons to customized pharmaceutical packaging, our solutions combine hygiene, durability, and secure product protection.',
        ],
        tags: [],
      },
      {
        image: syrupBoxImage,
        title: 'Syrup Packaging Box Solutions',
        paragraphs: [
          'Syrup packaging boxes play an important role in protecting liquid medicines during storage and transportation. Strong and secure syrup packaging helps maintain product quality while providing accurate product information and attractive branding.',
          'We manufacture premium syrup packaging box solutions for pharmaceutical companies and healthcare businesses. From custom printed syrup cartons to moisture-resistant packaging, our solutions are designed for safety, durability, and professional product presentation.',
        ],
        tags: [],
      },
      {
        image: capsuleBoxImage,
        title: 'Tablet & Capsule Packaging Solutions',
        paragraphs: [
          'Tablet and capsule packaging solutions are essential for protecting pharmaceutical products from environmental exposure and maintaining medicine quality. Proper packaging also supports product identification, dosage information, and regulatory labeling requirements.',
          'We provide customized tablet and capsule packaging solutions using high-quality pharma-grade materials and advanced printing technology. Our packaging is designed to ensure product safety, hygiene, and efficient pharmaceutical branding.',
        ],
        tags: [],
      },
      {
        image: healthBoxImage,
        title: 'Healthcare Product Packaging Solutions',
        paragraphs: [
          'Healthcare product packaging is designed for medical devices, wellness products, supplements, and personal healthcare items. Safe and reliable packaging helps businesses maintain hygiene standards while improving customer trust and product presentation.',
          'We offer customized healthcare packaging solutions tailored for healthcare brands, wellness companies, and pharmaceutical businesses. From printed healthcare cartons to durable protective packaging, our solutions combine functionality, compliance, and premium branding.',
        ],
        tags: [],
      },
      {
        image: pharmaExportBoxImage,
        title: 'Pharma Export Packaging Solutions',
        paragraphs: [
          'Pharma export packaging solutions are designed to provide maximum product safety during domestic and international transportation. Secure packaging helps pharmaceutical products remain protected from environmental conditions, handling damage, and contamination risks.',
          'We provide durable pharma export packaging solutions with high-strength materials, secure packaging structures, and customized printing options to support pharmaceutical logistics and export requirements.',
        ],
        tags: [],
      },
    ],
  },
  {
    slug: 'food-packaging-manufacturers',
    subSections: [
      {
        image: cakeBoxImage,
        title: 'Cake Box Packaging Solutions',
        paragraphs: [
          'Cake box packaging is essential for maintaining the freshness, safety, and presentation of cakes during storage and delivery. Attractive and durable cake packaging not only protects cakes from damage but also enhances brand value and customer experience for bakeries, cafés, and dessert brands.',
          'We provide high-quality cake box packaging solutions designed for bakeries, pastry shops, home bakers, and food businesses. From custom printed cake boxes to eco-friendly packaging options, our solutions combine durability, hygiene, and premium presentation to make your products stand out in the market.',
        ],
        tags: [],
      },
      {
        image: cookieBoxImage,
        title: 'Cookie Box Packaging Solutions',
        paragraphs: [
          'Cookie box packaging plays an important role in preserving freshness, maintaining product quality, and creating attractive product presentation for bakeries and food brands. Well-designed cookie packaging helps protect cookies during storage and delivery while enhancing shelf appeal and brand visibility.',
          'We provide premium cookie box packaging solutions for bakeries, cafés, dessert brands, and food businesses. From custom printed cookie boxes to eco-friendly packaging options, our packaging solutions are designed to combine durability, hygiene, functionality, and premium branding for a better customer experience.',
        ],
        tags: [],
      },
      {
        image: chocolateBoxImage,
        title: 'Chocolate Box Packaging Solutions',
        paragraphs: [
          'Chocolate box packaging is essential for protecting chocolates while enhancing their premium look and gifting appeal. Elegant and durable packaging helps maintain product freshness, prevents damage during transportation, and creates a memorable unboxing experience for customers.',
          'We provide high-quality chocolate box packaging solutions for chocolate brands, bakeries, confectionery businesses, and gift packaging companies. From luxury chocolate boxes to custom printed packaging, our solutions combine attractive design, durability, and premium branding to elevate your product presentation.',
        ],
        tags: [],
      },
      {
        image: sandwichBoxImage,
        title: 'Sandwich Box Packaging Solutions',
        paragraphs: [
          'Sandwich box packaging is designed to keep food fresh, hygienic, and secure during storage, takeaway, and delivery. Durable and attractive sandwich packaging helps food businesses improve product presentation while ensuring convenience and safe handling for customers.',
          'We provide premium sandwich box packaging solutions for cafés, restaurants, bakeries, cloud kitchens, and food delivery businesses. From custom printed sandwich boxes to eco-friendly takeaway packaging, our solutions combine functionality, food safety, durability, and branding to enhance customer experience.',
        ],
        tags: [],
      },
      {
        image: sweetBoxImage,
        title: 'Sweet Packaging Box Solutions',
        paragraphs: [
          'Sweet packaging boxes are designed to protect sweets while enhancing their presentation and gifting appeal. Attractive and durable packaging helps maintain freshness, supports safe transportation, and creates a premium experience for customers during festivals, celebrations, and retail purchases.',
          'We provide high-quality packaging sweet box solutions for मिठाई shops, confectionery brands, bakeries, and gifting businesses. From custom printed sweet packaging boxes to luxury and eco-friendly packaging options, our solutions combine durability, hygiene, functionality, and premium branding for modern sweet packaging needs.',
        ],
        tags: [],
      },
      {
        image: pizzaBoxImage,
        title: 'Pizza Packaging Box Solutions',
        paragraphs: [
          'Pizza packaging boxes are essential for keeping pizzas fresh, warm, and secure during takeaway and delivery. Strong and food-grade pizza packaging helps maintain product quality, prevents leakage, and improves customer experience with convenient and attractive packaging.',
          'We provide premium pizza packaging box solutions for restaurants, cafés, pizza outlets, cloud kitchens, and food delivery businesses. From custom printed pizza boxes to eco-friendly packaging options, our solutions are designed to combine durability, hygiene, heat retention, and brand presentation for modern food businesses.',
        ],
        tags: [],
      },
      {
        image: bakeryBoxImage,
        title: 'Bakery Packaging Boxes Solutions',
        paragraphs: [
          'Bakery packaging boxes are designed to protect baked products while enhancing their freshness, presentation, and customer appeal. Attractive and durable bakery packaging helps businesses maintain product quality during storage, takeaway, and delivery while strengthening brand identity.',
          'We provide premium bakery packaging boxes for bakeries, cafés, dessert brands, pastry shops, and food businesses. From cake and pastry boxes to custom printed bakery packaging, our solutions combine hygiene, functionality, durability, and premium branding for a better customer experience.',
        ],
        tags: [],
      },
    ],
  },
  {
    slug: 'gift-box-manufacturers',
    subSections: [
      {
        image: chocolateGiftBoxImage,
        title: 'Chocolate Gift Box Solutions',
        paragraphs: [
          'Chocolate gift boxes are designed to enhance the presentation and gifting appeal of chocolates for festivals, celebrations, corporate gifting, and premium retail packaging. Elegant chocolate box gift packaging helps create a luxurious unboxing experience while protecting delicate chocolates during storage and transportation.',
          'We provide premium chocolate gift box solutions for confectionery brands, bakeries, gifting companies, and luxury retail businesses. From custom printed chocolate gift boxes to luxury rigid packaging, our solutions combine durability, premium finishing, and attractive branding for modern gifting needs.',
        ],
        tags: [],
      },
      {
        image: crackerGiftBoxImage,
        title: 'Crackers Gift Box Solutions',
        paragraphs: [
          'Crackers gift box packaging is specially designed for festive gifting and celebration packaging. Strong and decorative cracker packaging helps improve product presentation while ensuring safe handling and organized packaging during transportation and storage.',
          'We manufacture high-quality crackers gift box solutions for festive brands, wholesalers, retailers, and gifting businesses. From customized printed cracker boxes to premium festive packaging, our solutions combine safety, vibrant designs, and premium branding for festive gifting collections.',
        ],
        tags: [],
      },
      {
        image: sweetGiftBoxImage,
        title: 'Sweet Gift Box Solutions',
        paragraphs: [
          'Sweet gift boxes are widely used for festivals, weddings, celebrations, and corporate gifting. Attractive sweet packaging enhances the overall gifting experience while maintaining freshness and safe product handling.',
          'We provide premium sweet gift box packaging solutions for मिठाई shops, confectionery brands, bakeries, and gifting businesses. From luxury sweet packaging to custom printed gift boxes, our solutions combine durability, hygiene, and elegant presentation for premium gifting experiences.',
        ],
        tags: [],
      },
      {
        image: dryfruitGiftBoxImage,
        title: 'Dry Fruit Gift Box Solutions',
        paragraphs: [
          'Dry fruit gift boxes are designed to offer premium presentation and secure packaging for festive gifting, corporate gifting, and luxury retail products. Elegant dry fruit packaging helps improve product appeal while protecting products from moisture and damage.',
          'We provide high-quality dry fruit gift box and dry fruit box for gift packaging solutions for food brands, gifting companies, and retail businesses. From compartment gift boxes to luxury rigid packaging, our solutions combine premium aesthetics, durability, and customized branding.',
        ],
        tags: [],
      },
      {
        image: jewelryBoxImage,
        title: 'Jewelry Gift Boxes Solutions',
        paragraphs: [
          'Jewelry gift boxes are essential for enhancing the luxury appeal and protection of jewelry products. Premium jewelry packaging creates an elegant unboxing experience while ensuring safe storage and transportation of valuable accessories.',
          'We manufacture customized jewelry gift boxes for jewelry brands, retailers, luxury stores, and gifting businesses. From velvet-lined rigid boxes to premium printed jewelry packaging, our solutions combine sophistication, durability, and high-end presentation for luxury jewelry collections.',
        ],
        tags: [],
      },
    ],
  },
];

// ── Info Section ─────────────────────────────────────────────────────────────

interface IndustryInfoSubSection {
  title: string;
  description: string;
  listTitle: string;
  items: string[];
  footer: string;
}

interface IndustryInfoSectionData {
  slug: string;
  sectionTitle: string;
  sectionSubtitle: string;
  subSections: IndustryInfoSubSection[];
}

function IndustryInfoSection({ sectionTitle, sectionSubtitle, subSections }: Omit<IndustryInfoSectionData, 'slug'>) {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{sectionSubtitle}</p>
        </div>
        <div className="space-y-8">
          {subSections.map((sub) => (
            <div key={sub.title} className="bg-white rounded-lg shadow-md p-8 lg:p-10 border-2 border-gray-200 hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">{sub.title}</h3>
              <p className="text-gray-600 mb-8 max-w-4xl">{sub.description}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {sub.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600">{sub.footer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const industryInfoSections: IndustryInfoSectionData[] = [
  {
    slug: 'gift-box-manufacturers',
    sectionTitle: 'What Sets Our Gift Box Packaging Apart',
    sectionSubtitle: "From trusted manufacturing to custom solutions, here's what makes our gift box packaging a smart choice for your business.",
    subSections: [
      {
        title: 'Trusted Gift Box Manufacturers',
        description: 'As experienced gift box manufacturers, we use advanced packaging technology and premium-quality materials to deliver high-quality gift packaging solutions for businesses across India.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Premium gift box material sourcing',
          'Advanced packaging and printing technology',
          'High-quality finishing and branding solutions',
          'Large-scale manufacturing capabilities',
          'Strict quality control standards',
          'Fast production and delivery support',
          'Competitive pricing for bulk packaging orders',
        ],
        footer: 'We help businesses create attractive gift packaging solutions that improve customer experience and strengthen brand identity.',
      },
      {
        title: 'Custom Gift Packing Box Designed for Your Brand',
        description: 'Every gifting business requires unique packaging based on product type, branding, and customer expectations. Our team creates custom gift packing box solutions tailored according to your business and product requirements.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom gift box sizes and structures',
          'Printed logos and brand designs',
          'Matte and gloss lamination',
          'Gold and silver foil stamping',
          'Embossing and debossing',
          'Ribbon and magnetic closure options',
          'Eco-friendly gift packaging materials',
          'Custom inserts and luxury compartments',
        ],
        footer: 'Our custom gift box packaging solutions help businesses improve branding while ensuring premium product presentation.',
      },
    ],
  },
  {
    slug: 'textile-packaging-manufacturers',
    sectionTitle: 'What Sets Our Textile Packaging Apart',
    sectionSubtitle: "From trusted manufacturing to custom solutions, here's what makes our textile packaging a smart choice for your business.",
    subSections: [
      {
        title: 'Trusted Textile Packaging Manufacturers',
        description: 'As experienced textile packaging solution providers, we use advanced packaging technology and premium-quality materials to deliver reliable packaging solutions for textile businesses across India.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'High-quality textile packaging material sourcing',
          'Advanced printing and packaging technology',
          'Premium finishing and branding solutions',
          'Large-scale manufacturing capabilities',
          'Strict quality control standards',
          'Fast production and delivery support',
          'Competitive pricing for bulk packaging orders',
        ],
        footer: 'We help textile businesses create packaging solutions that improve product protection, customer experience, and brand value.',
      },
      {
        title: 'Custom Textile Packaging Designed for Your Brand',
        description: 'Every textile and fashion brand requires unique packaging based on product type, branding, and retail presentation. Our team creates custom textile packaging solutions tailored according to your business and product requirements.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom textile packaging sizes and structures',
          'Printed logos and brand designs',
          'Matte and gloss lamination',
          'Window patching and die-cut packaging',
          'Premium texture and finishing options',
          'Eco-friendly textile packaging materials',
          'Protective garment and fabric packaging',
          'Custom inserts and product compartments',
        ],
        footer: 'Our textile packaging solutions help businesses improve branding while ensuring safe and attractive product presentation.',
      },
    ],
  },
  {
    slug: 'cosmetics-packaging-manufacturers',
    sectionTitle: 'What Sets Our Cosmetic Packaging Apart',
    sectionSubtitle: "From trusted manufacturing to custom solutions, here's what makes our cosmetic packaging a smart choice for your business.",
    subSections: [
      {
        title: 'Trusted Cosmetic Packaging Manufacturers',
        description: 'As experienced cosmetic packaging manufacturers, we use advanced packaging technology and high-quality materials to deliver premium cosmetic packaging solutions for beauty brands across India.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Premium cosmetic packaging material sourcing',
          'Advanced packaging and printing technology',
          'High-quality finishing and branding solutions',
          'Large-scale manufacturing capabilities',
          'Strict quality control standards',
          'Fast production and delivery support',
          'Competitive pricing for bulk packaging orders',
        ],
        footer: 'We help beauty and cosmetic businesses create attractive packaging solutions that improve customer experience and strengthen brand identity.',
      },
      {
        title: 'Custom Cosmetic Packaging Boxes Designed for Your Brand',
        description: 'Every cosmetic brand requires unique packaging based on product type, branding, and market positioning. Our team creates custom cosmetic packaging boxes tailored according to your product and branding requirements.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom cosmetic box sizes and structures',
          'Printed logos and brand designs',
          'Matte and gloss lamination',
          'Gold and silver foil stamping',
          'Embossing and debossing',
          'UV coating and texture finishes',
          'Window patching and die-cut packaging',
          'Eco-friendly cosmetic packaging solutions',
        ],
        footer: 'Our custom cosmetic packaging boxes help businesses improve branding while ensuring safe and attractive product presentation.',
      },
    ],
  },
  {
    slug: 'pharma-packaging-manufacturers',
    sectionTitle: 'What Sets Our Pharma Packaging Apart',
    sectionSubtitle: "From trusted manufacturing to custom solutions, here's what makes our pharma packaging a smart choice for your business.",
    subSections: [
      {
        title: 'Trusted Pharma Packaging Manufacturers in India',
        description: 'As experienced pharma packaging manufacturers, we use advanced packaging technology and pharmaceutical-grade materials to deliver secure and high-quality packaging solutions for healthcare businesses across India.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Pharma-grade packaging material sourcing',
          'Advanced pharmaceutical packaging production',
          'Premium printing and finishing quality',
          'Large-scale manufacturing capabilities',
          'Strict hygiene and quality control standards',
          'Fast production and delivery support',
          'Competitive pricing for bulk packaging orders',
        ],
        footer: 'We help pharmaceutical businesses create safe, attractive, and regulation-focused packaging solutions that improve both product safety and brand value.',
      },
      {
        title: 'Custom Pharma Packaging Designed for Your Brand',
        description: 'Every pharmaceutical product requires specific packaging based on product type, dosage form, storage conditions, and compliance requirements. Our team creates custom pharma packaging solutions tailored according to your business and product needs.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom pharma packaging box sizes and structures',
          'Printed logos and pharmaceutical branding',
          'Tamper-proof and moisture-resistant packaging',
          'Matte and gloss lamination',
          'Batch coding and barcode printing compatibility',
          'Die-cut and window packaging options',
          'Eco-friendly pharma packaging solutions',
          'Custom inserts and protective packaging compartments',
        ],
        footer: 'Our custom pharma packaging solutions help businesses improve branding while ensuring pharmaceutical product safety and compliance.',
      },
    ],
  },
  {
    slug: 'food-packaging-manufacturers',
    sectionTitle: 'What Sets Our Food Packaging Apart',
    sectionSubtitle: "From trusted manufacturing to custom solutions, here's what makes our food packaging a smart choice for your business.",
    subSections: [
      {
        title: 'Trusted Food Packaging Manufacturers in India',
        description: 'As experienced food packaging manufacturers, we use advanced packaging technology and food-safe materials to deliver premium packaging solutions for food businesses across India.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Food-grade packaging material sourcing',
          'Advanced food packaging manufacturing',
          'Premium printing and finishing quality',
          'Large-scale production capabilities',
          'Strict hygiene and quality standards',
          'Fast turnaround and delivery support',
          'Competitive pricing for bulk orders',
        ],
        footer: 'We help businesses create safe and attractive food packaging solutions that improve both operational efficiency and customer experience.',
      },
      {
        title: 'Custom Food Packaging Designed for Your Brand',
        description: 'Every food product requires different packaging based on its type, temperature, shelf life, and delivery requirements. Our team creates custom food packaging solutions tailored according to your business and product needs.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom food packaging box sizes and shapes',
          'Printed logos and brand designs',
          'Food-grade kraft and paper packaging materials',
          'Matte and gloss lamination',
          'Grease-proof and moisture-resistant coatings',
          'Window patching and die-cut packaging',
          'Eco-friendly takeaway packaging solutions',
          'Custom inserts and food compartments',
        ],
        footer: 'Our custom food packaging solutions help businesses create packaging that improves branding while ensuring food safety and convenience.',
      },
    ],
  },
];

// ── FAQ Section ──────────────────────────────────────────────────────────────

interface IndustryFAQ {
  question: string;
  answer: string;
}

interface IndustryFAQSectionData {
  slug: string;
  intro: string;
  faqs: IndustryFAQ[];
}

const industryFAQSections: IndustryFAQSectionData[] = [
  {
    slug: 'gift-box-manufacturers',
    intro: 'Common questions about our gift box packaging solutions and services.',
    faqs: [
      {
        question: 'What is gift box packaging?',
        answer: 'Gift box packaging refers to customized packaging solutions designed for gifting products with attractive presentation, durability, and premium branding.',
      },
      {
        question: 'Can gift packing boxes be customized?',
        answer: 'Yes, gift packing boxes can be customized with different sizes, shapes, printing designs, luxury finishes, ribbon closures, and branding elements.',
      },
      {
        question: 'Which industries use gift box packaging?',
        answer: 'Gift box packaging is widely used in jewelry, cosmetics, chocolates, confectionery, fashion accessories, retail products, and corporate gifting industries.',
      },
      {
        question: 'What materials are used for gift box packaging?',
        answer: 'Gift box packaging is commonly made using rigid board, paperboard, kraft paper, laminated packaging materials, and premium decorative finishes.',
      },
      {
        question: 'Are eco-friendly gift boxes available?',
        answer: 'Yes, many gift box manufacturers provide recyclable and eco-friendly gift packaging solutions using sustainable materials.',
      },
      {
        question: 'Why is premium gift box packaging important?',
        answer: 'Premium gift box packaging improves product presentation, enhances customer experience, strengthens brand image, and increases gifting appeal.',
      },
      {
        question: 'Do gift box manufacturers provide bulk packaging solutions?',
        answer: 'Yes, gift box manufacturers provide bulk production solutions for retail brands, gifting businesses, wholesalers, and corporate gifting companies.',
      },
    ],
  },
  {
    slug: 'textile-packaging-manufacturers',
    intro: 'Common questions about our textile packaging solutions and services.',
    faqs: [
      {
        question: 'What is textile packaging?',
        answer: 'Textile packaging refers to customized packaging solutions used for garments, fabrics, apparel products, sarees, and textile accessories for protection, storage, and branding.',
      },
      {
        question: 'Why is packaging important in textile industry?',
        answer: 'Packaging in textile industry helps protect products from dust, moisture, and damage while improving product presentation, branding, and customer experience.',
      },
      {
        question: 'Can textile packaging be customized?',
        answer: 'Yes, textile packaging solutions can be customized with different sizes, printing designs, branding elements, finishes, and packaging structures according to business needs.',
      },
      {
        question: 'Are eco-friendly textile packaging solutions available?',
        answer: 'Yes, many textile packaging solutions are manufactured using recyclable and eco-friendly materials to support sustainable packaging practices.',
      },
      {
        question: 'Which businesses use textile packaging solutions?',
        answer: 'Garment manufacturers, fashion brands, saree businesses, apparel exporters, textile mills, boutiques, and retail clothing stores commonly use textile packaging solutions.',
      },
      {
        question: 'What materials are used in textile packaging?',
        answer: 'Textile packaging is commonly made using paperboard, corrugated boxes, kraft paper, rigid packaging materials, and protective packaging solutions.',
      },
      {
        question: 'Do textile packaging manufacturers provide bulk packaging solutions?',
        answer: 'Yes, textile packaging manufacturers provide bulk production solutions for garment brands, textile exporters, wholesalers, and large-scale apparel businesses.',
      },
    ],
  },
  {
    slug: 'cosmetics-packaging-manufacturers',
    intro: 'Common questions about our cosmetic packaging solutions and services.',
    faqs: [
      {
        question: 'What is cosmetic box packaging?',
        answer: 'Cosmetic box packaging refers to customized packaging solutions used for beauty, skincare, makeup, perfume, and personal care products to ensure protection and premium presentation.',
      },
      {
        question: 'What materials are used for cosmetic product packaging?',
        answer: 'Cosmetic product packaging is commonly made using paperboard, rigid boxes, corrugated materials, kraft paper, and luxury packaging materials with premium finishes.',
      },
      {
        question: 'Can cosmetic packaging boxes be customized?',
        answer: 'Yes, cosmetic packaging boxes can be customized with different sizes, shapes, printing designs, branding elements, foil stamping, embossing, and premium finishes.',
      },
      {
        question: 'Are eco-friendly cosmetic packaging solutions available?',
        answer: 'Yes, many cosmetic packaging manufacturers provide recyclable and eco-friendly cosmetic packaging solutions for sustainable beauty brands.',
      },
      {
        question: 'Which industries use cosmetic packaging solutions?',
        answer: 'Cosmetic packaging solutions are widely used by skincare brands, makeup companies, perfume brands, haircare businesses, wellness products, and personal care industries.',
      },
      {
        question: 'Why is cosmetic packaging important for brands?',
        answer: 'Cosmetic packaging helps improve product presentation, protect beauty products, strengthen branding, enhance customer experience, and increase shelf appeal.',
      },
      {
        question: 'Do cosmetic packaging manufacturers provide bulk packaging solutions?',
        answer: 'Yes, cosmetic packaging manufacturers provide bulk production solutions for beauty brands, cosmetic companies, wholesalers, and retail businesses.',
      },
    ],
  },
  {
    slug: 'pharma-packaging-manufacturers',
    intro: 'Common questions about our pharma packaging solutions and services.',
    faqs: [
      {
        question: 'What is pharma packaging?',
        answer: 'Pharma packaging refers to specialized packaging solutions used for medicines, healthcare products, syrups, tablets, capsules, and pharmaceutical products to ensure safety, hygiene, and product protection.',
      },
      {
        question: 'What materials are used for pharma packaging?',
        answer: 'Pharma packaging is commonly made using pharmaceutical-grade paperboard, corrugated materials, blister packaging materials, moisture-resistant coatings, and hygienic packaging solutions.',
      },
      {
        question: 'Can pharma packaging be customized?',
        answer: 'Yes, pharma packaging solutions can be customized with different sizes, printing designs, branding elements, tamper-proof features, and regulatory labeling options.',
      },
      {
        question: 'Are eco-friendly pharma packaging solutions available?',
        answer: 'Yes, many pharma packaging manufacturers provide recyclable and eco-friendly pharmaceutical packaging solutions to support sustainable healthcare packaging practices.',
      },
      {
        question: 'Which industries use pharma packaging solutions?',
        answer: 'Pharma packaging solutions are widely used by pharmaceutical companies, healthcare brands, wellness businesses, medical suppliers, and nutraceutical industries.',
      },
      {
        question: 'Why is pharma packaging important for businesses?',
        answer: 'Pharma packaging helps maintain medicine safety, prevent contamination, improve product presentation, ensure regulatory compliance, and support secure transportation and storage.',
      },
      {
        question: 'Do pharma packaging companies in India provide bulk packaging solutions?',
        answer: 'Yes, pharma packaging companies in India provide bulk manufacturing solutions for pharmaceutical companies, healthcare distributors, and large-scale medical businesses.',
      },
    ],
  },
  {
    slug: 'food-packaging-manufacturers',
    intro: 'Common questions about our food packaging solutions and services.',
    faqs: [
      {
        question: 'What are food packaging boxes?',
        answer: 'Food packaging boxes are specially designed packaging solutions used to protect, store, transport, and present food products safely and hygienically.',
      },
      {
        question: 'What materials are used for food packaging?',
        answer: 'Food packaging is commonly made using food-grade paper, kraft paper, corrugated board, biodegradable materials, and moisture-resistant packaging materials.',
      },
      {
        question: 'Can food packaging boxes be customized?',
        answer: 'Yes, food packaging boxes can be customized with different sizes, shapes, printing designs, branding elements, and protective coatings according to business needs.',
      },
      {
        question: 'Are eco-friendly food packaging solutions available?',
        answer: 'Yes, many food packaging manufacturers provide recyclable, biodegradable, and eco-friendly packaging solutions for sustainable food businesses.',
      },
      {
        question: 'Which industries use custom food packaging?',
        answer: 'Restaurants, bakeries, cafes, cloud kitchens, FMCG brands, catering companies, and packaged food businesses commonly use custom food packaging solutions.',
      },
      {
        question: 'Why is food packaging important for businesses?',
        answer: 'Food packaging helps maintain hygiene, protect food quality, improve branding, enhance customer experience, and support safe transportation and delivery.',
      },
      {
        question: 'Do food packaging companies in India provide bulk packaging solutions?',
        answer: 'Yes, food packaging companies in India offer bulk manufacturing solutions for restaurants, food brands, wholesalers, and large-scale food businesses.',
      },
    ],
  },
];

// ── CTA Section ──────────────────────────────────────────────────────────────

interface IndustryCTASectionData {
  slug: string;
  title: string;
  paragraphs: string[];
}

const industryCTASections: IndustryCTASectionData[] = [
  {
    slug: 'gift-box-manufacturers',
    title: 'Get Custom Gift Box Packaging for Your Business',
    paragraphs: [
      'Looking for trusted gift box manufacturers for your packaging needs? We provide premium gift box packaging, custom gift packing box solutions, and luxury gift packaging designed for branding and product presentation.',
      'From corporate gifting boxes to luxury retail gift packaging, we deliver customized packaging solutions tailored to your business requirements.',
      'Contact us today to discuss your gift box packaging requirements and get premium packaging solutions for your products.',
    ],
  },
  {
    slug: 'textile-packaging-manufacturers',
    title: 'Get Custom Textile Packaging Solutions for Your Business',
    paragraphs: [
      'Looking for reliable textile packaging solutions for your brand? We provide high-quality packaging in textile industry designed for product protection, branding, and premium presentation.',
      'From garment packaging boxes to export textile packaging solutions, we deliver customized packaging tailored to your textile and fashion business requirements.',
      'Contact us today to discuss your textile packaging requirements and get premium packaging solutions for your products.',
    ],
  },
  {
    slug: 'cosmetics-packaging-manufacturers',
    title: 'Get Custom Cosmetic Packaging Solutions for Your Brand',
    paragraphs: [
      'Looking for trusted cosmetic packaging manufacturers in India? We provide high-quality cosmetic box packaging, custom cosmetic packaging boxes, and premium beauty product packaging designed for branding and product protection.',
      'From skincare packaging to luxury cosmetic boxes, we deliver customized packaging solutions tailored to your beauty and personal care business requirements.',
      'Contact us today to discuss your cosmetic packaging requirements and get premium packaging solutions for your products.',
    ],
  },
  {
    slug: 'pharma-packaging-manufacturers',
    title: 'Get Custom Pharma Packaging Solutions for Your Business',
    paragraphs: [
      'Looking for trusted pharma packaging manufacturers in India? We provide high-quality pharma packaging solutions, customized pharmaceutical packaging, and secure healthcare packaging designed for product safety and premium branding.',
      'From medicine boxes to custom pharmaceutical packaging solutions, we deliver packaging tailored to your healthcare and pharmaceutical industry requirements.',
      'Contact us today to discuss your pharma packaging requirements and get customized packaging solutions for your products.',
    ],
  },
  {
    slug: 'food-packaging-manufacturers',
    title: 'Get Custom Food Packaging Solutions for Your Business',
    paragraphs: [
      'Looking for trusted food packaging manufacturers in India? We provide high-quality food packaging boxes, custom food packaging, and innovative food packaging solutions designed for product safety and premium branding.',
      'From takeaway food boxes to custom printed food packaging, we deliver packaging solutions tailored to your business and food industry requirements.',
      'Contact us today to discuss your food packaging requirements and get customized packaging solutions for your products.',
    ],
  },
];

// ── Hero defaults ─────────────────────────────────────────────────────────────

interface HeroSection {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  background_image: string;
}

function defaultHero(slug: string): HeroSection {
  const meta = industryMeta[slug];
  return {
    title: meta?.heroTitle ?? 'Packaging Solutions Provider in India',
    subtitle: meta?.heroSubtitle ?? 'We deliver durable, innovative, and customized packaging solutions for industries across India.',
    cta_text: 'Get in Touch',
    cta_link: '/products',
    background_image: 'https://img.magnific.com/free-vector/illustration-gallery-icon_53876-27002.jpg',
  };
}

// ── Page component ────────────────────────────────────────────────────────────

export default function IndustryDetail() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroSection, setHeroSection] = useState<HeroSection>(defaultHero(slug));

  const loadFeaturedProducts = async () => {
    try {
      const products = await fetchProducts();
      setFeaturedProducts(products.slice(0, 3));
    } catch {
      // fallback: keep empty
    }
  };

  const loadHeroSection = async (currentSlug: string) => {
    try {
      const { data } = await supabase
        .from('hero_sections')
        .select('*')
        .eq('page', currentSlug)
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        setHeroSection({
          title: data.title,
          subtitle: data.subtitle,
          cta_text: data.cta_text,
          cta_link: data.cta_link,
          background_image: data.background_image,
        });
      }
    } catch {
      // fallback: keep default hero
    }
  };

  useEffect(() => {
    setHeroSection(defaultHero(slug));
    loadFeaturedProducts();
    loadHeroSection(slug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const meta = industryMeta[slug];
  const seo = industryPageSEO[slug];
  const infoSection = industryInfoSections.find(s => s.slug === slug);
  const faqSection = industryFAQSections.find(s => s.slug === slug);
  const ctaSection = industryCTASections.find(s => s.slug === slug);

  return (
    <div>
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
        </Helmet>
      )}
      {/* Hero */}
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
              <img
                src={heroSection.background_image}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      {/* Products grid */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {meta?.productsSectionTitle ?? 'Our Packaging Products'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {meta?.productsSectionSubtitle ?? 'Explore our wide range of high-quality packaging products designed for durability, branding, and product protection.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-green transition-colors duration-300">
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

      {industrySpotlightSections
        .filter((s) => s.slug === slug)
        .map((s) => (
          <IndustrySpotlightSection key={s.slug} subSections={s.subSections} />
        ))}

      <ProcessCycle />

      <WhyChooseUs
        title={meta?.whyChooseUsTitle ?? 'Why Choose Our Packaging Solutions?'}
        subtitle={meta?.whyChooseUsSubtitle ?? 'Businesses today require packaging that is functional, attractive, and cost-effective.'}
      />

      {/* Info sections — only renders if data exists for this slug */}
      {infoSection && <IndustryInfoSection {...infoSection} />}

      {/* FAQ — only renders if data exists for this slug */}
      {faqSection && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">{faqSection.intro}</p>
            </div>
            <div className="space-y-4">
              {faqSection.faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-brand-green to-brand-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {ctaSection?.title ?? 'Get Custom Packaging Solutions for Your Business'}
          </h2>
          {ctaSection ? (
            ctaSection.paragraphs.map((p, i) => (
              <p key={i} className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">{p}</p>
            ))
          ) : (
            <>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                Looking for reliable packaging manufacturers in India? Our team is ready to provide customized packaging solutions that match your business needs and branding goals.
              </p>
              <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your packaging requirements and get the perfect packaging solution for your products.
              </p>
            </>
          )}
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
