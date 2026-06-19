import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchProductBySlug, Product } from '../lib/products';
import FAQItem from '../components/FAQItem';
import foodPackagingImage from '../assets/food-packaging/pizza-box.png';
import pharmaPackagingImage from '../assets/pharma-packaging/medicine-box.png';
import cosmeticPackagingImage from '../assets/cosmetic-packaging/skincare-box.png';
import textilePackagingImage from '../assets/textile-packaging/garment-box.png';
import giftBoxPackagingImage from '../assets/gift-box/jewelry-box.png';

const industriesWeServe = [
  { name: 'Food Packaging', slug: 'food-packaging-manufacturers', image: foodPackagingImage },
  { name: 'Pharma Packaging', slug: 'pharma-packaging-manufacturers', image: pharmaPackagingImage },
  { name: 'Cosmetics Packaging', slug: 'cosmetics-packaging-manufacturers', image: cosmeticPackagingImage },
  { name: 'Textile Packaging', slug: 'textile-packaging-manufacturers', image: textilePackagingImage },
  { name: 'Gift Box Packaging', slug: 'gift-box-manufacturers', image: giftBoxPackagingImage },
];

const productPageSEO: Record<string, { title: string; description: string }> = {
  'premium-boxes-manufacturers': {
    title: 'Premium Box Manufacturers & Custom Luxury Boxes India',
    description: 'Paktrix offers premium box packaging, custom luxury boxes, and premium box packaging design solutions for elegant and high-quality branding.',
  },
  'export-packaging-service-providers': {
    title: 'Export Packaging Service Providers & Packing Boxes India',
    description: 'Paktrix provides export packaging services, export packing boxes, and corrugated box export solutions for safe global product transportation.',
  },
  'industrial-packaging-solutions': {
    title: 'Industrial Packaging Solutions & Packaging Boxes India',
    description: 'Paktrix offers industrial packaging solutions, wooden packaging boxes, and custom industrial packaging for safe and durable product handling.',
  },
  'mono-carton-box': {
    title: 'Mono Carton Box Manufacturer & Mono Box Packaging India',
    description: 'Paktrix is a trusted mono carton box manufacturer offering durable mono box packaging and custom carton solutions for various industries.',
  },
  'corrugated-seperator': {
    title: 'Corrugated Separator Solutions for Safe Product Packaging',
    description: 'Paktrix provides durable corrugated separator solutions designed for safe product handling, storage, and transit across multiple industries.',
  },
  'die-cut-boxes': {
    title: 'Die Cut Corrugated Boxes & Packaging Solutions India | Paktrix',
    description: 'Paktrix offers die cut box packaging, corrugated die cut boxes, and custom die cut carton box solutions for secure product packaging.',
  },
  'mailer-box-manufacturer': {
    title: 'Mailer Box Manufacturer & Custom Mailer Boxes India | Paktrix',
    description: 'Paktrix is a trusted mailer box manufacturer offering custom mailer boxes, corrugated mailer boxes, and wholesale packaging solutions.',
  },
  'honey-comb-seperator': {
    title: 'Honey-Comb Seperator for Protective Packaging Solutions India | Paktrix',
    description: 'Paktrix offers durable honey-comb seperator solutions designed for secure product protection, safe handling, and efficient packaging needs.',
  },
  'paper-box-manufacturer': {
    title: 'Paper Box Manufacturer & Paper Box Packaging India | Paktrix',
    description: 'Paktrix is a leading paper box manufacturer offering durable paper box packaging solutions for businesses across various industries in India.',
  },
};

const productKeyFeaturesTitle: Record<string, string> = {
  'mono-carton-box': 'Key Features of Our Export Packing Boxes',
  'premium-boxes-manufacturers': 'Key Features of Our Premium Box Packaging',
  'export-boxes': 'Key Features of Our Export Packing Boxes',
  'die-cut-boxes': 'Key Features of Our Die Cut Box Packaging',
  'export-packaging-service-providers': 'Key Features of Our Export Packing Boxes',
  'industrial-packaging-solutions': 'Key Features of Our Export Packing Boxes',
  'corrugated-seperator': 'Key Features of Our Corrugated Separators',
  'honey-comb-seperator': 'Key Features of Our Honey Comb Separators',
  'paper-box-manufacturer': 'Key Features of Our Paper Box Packaging',
  'mailer-box-manufacturer': 'Key Features of Our Mailer Boxes',
};

interface InfoSubSection {
  title: string;
  description: string;
  listTitle: string;
  items: string[];
  footer: string;
}

interface ProductInfoSectionData {
  slug: string;
  title: string;
  intro: string;
  subSections: InfoSubSection[];
}

function ProductInfoSection({ title, intro, subSections }: Omit<ProductInfoSectionData, 'slug'>) {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{intro}</p>
        </div>
        <div className="space-y-8">
          {subSections.map((sub) => (
            <div key={sub.title} className="bg-white rounded-lg shadow-md p-8 lg:p-10 border-2 border-gray-200 hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">{sub.title}</h2>
              <p className="text-gray-600 mb-8 max-w-4xl">{sub.description}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-6">{sub.listTitle}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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

// ── Spotlight Section ────────────────────────────────────────────────────────

interface ProductSpotlightSubSection {
  image: string;
  title: string;
  paragraphs: string[];
  tags: string[];
}

interface ProductSpotlightData {
  slug: string;
  subSections: ProductSpotlightSubSection[];
}

function ProductSpotlightSection({ subSections }: { subSections: ProductSpotlightSubSection[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {subSections.map((sub, index) => (
          <div key={index} className="grid lg:grid-cols-2 rounded-xl shadow-md overflow-hidden">
            <div className="bg-green-50 flex items-center justify-center p-10 min-h-72">
              <img
                src={sub.image}
                alt={sub.title}
                className="max-h-72 w-full object-contain"
              />
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

const productSpotlightSections: ProductSpotlightData[] = [];

// ── Info sections ─────────────────────────────────────────────────────────────

const productInfoSections: ProductInfoSectionData[] = [
  {
    slug: 'premium-boxes-manufacturers',
    title: 'Everything You Need to Know About Premium Box Packaging',
    intro: "From the impact of luxury packaging to custom designs and why brands trust us, here's what makes our premium boxes a smart choice for your business.",
    subSections: [
      {
        title: 'Why Premium Box Packaging Matters',
        description: 'Luxury packaging has become a powerful branding tool for modern businesses. A well-designed premium box helps products stand out on shelves, improves unboxing experiences, and increases perceived product value.',
        listTitle: 'Benefits of Premium Packaging',
        items: [
          'Enhances brand identity',
          'Creates a luxurious customer experience',
          'Improves product presentation',
          'Provides superior product protection',
          'Increases customer engagement',
          'Adds value to premium products',
          'Supports better brand recognition',
        ],
        footer: 'Whether you own a luxury retail brand, jewelry business, cosmetics company, or gifting brand, premium packaging can significantly influence customer perception and buying decisions.',
      },
      {
        title: 'Custom Luxury Boxes Designed for Your Brand',
        description: 'Every brand has unique packaging requirements. Our design team works closely with businesses to create custom luxury boxes that match brand identity, product dimensions, and market positioning.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom box sizes and shapes',
          'Premium paper and rigid materials',
          'Matte and gloss lamination',
          'Gold and silver foil stamping',
          'Embossing and debossing',
          'UV coating and texture finishes',
          'Ribbon and magnetic closures',
          'Luxury inserts and compartments',
        ],
        footer: 'Our premium box packaging design services help businesses create packaging that leaves a lasting impression on customers.',
      },
      {
        title: 'Why Choose Us for Premium Box Packaging?',
        description: 'Businesses trust us because we combine creativity, quality, and innovation to deliver world-class luxury packaging solutions.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced luxury packaging experts',
          'Fully customized packaging designs',
          'Premium printing and finishing quality',
          'Competitive pricing',
          'Fast turnaround time',
          'Nationwide service and support',
          'Attention to detail in every project',
        ],
        footer: 'We help brands create premium packaging that strengthens customer trust and enhances market presence.',
      },
    ],
  },
  {
    slug: 'export-packaging-service-providers',
    title: 'Everything You Need to Know About Export Packaging',
    intro: "From why export packaging matters to custom solutions and why brands trust us, here's what makes our export boxes the right choice for your business.",
    subSections: [
      {
        title: 'Why Export Packaging Matters',
        description: 'Export packaging is essential for businesses involved in domestic and international trade. High-quality export packing boxes protect products from damage during shipping, handling, stacking, and storage while maintaining product quality and presentation.',
        listTitle: 'Benefits of Export Packaging Solutions',
        items: [
          'Protects products during long-distance transportation',
          'Reduces damage and return risks',
          'Supports secure international shipping',
          'Improves logistics and storage efficiency',
          'Enhances professional brand presentation',
          'Ensures compliance with export standards',
          'Provides better product safety and durability',
        ],
        footer: 'Whether you export industrial goods, electronics, textiles, food products, pharmaceuticals, or retail items, strong export packaging helps improve supply chain performance and customer satisfaction.',
      },
      {
        title: 'Custom Export Packaging Solutions for Your Business',
        description: 'Every product requires specific packaging protection based on its size, weight, and transportation requirements. Our team creates customized export packaging solutions designed according to your industry needs and shipping conditions.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom export box sizes and dimensions',
          'Heavy-duty corrugated materials',
          'Multi-layer corrugated box options',
          'Printed branding and labelling',
          'Moisture-resistant packaging',
          'Protective foam and inserts',
          'Export-safe packaging designs',
          'Customized industrial packaging solutions',
        ],
        footer: 'Our export packaging services ensure products remain safe, secure, and professionally packed during transportation and storage.',
      },
      {
        title: 'Trusted Corrugated Box Exporters in India',
        description: 'As experienced corrugated box exporters in India, we manufacture high-quality corrugated packaging boxes designed for durability and maximum load-bearing capacity. Our advanced manufacturing process ensures every export box meets industry standards and shipping requirements.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Advanced corrugated box manufacturing',
          'Strong and durable packaging materials',
          'Large-scale production capacity',
          'Precision printing and box finishing',
          'Strict quality control standards',
          'Fast turnaround and delivery',
          'Cost-effective export packaging production',
        ],
        footer: 'We help businesses simplify logistics with export packaging solutions that combine strength, functionality, and branding.',
      },
      {
        title: 'Why Choose Our Export Packaging Services?',
        description: 'Businesses trust us because we deliver durable, customized, and export-standard packaging solutions designed for safe transportation and product protection.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced export packaging experts',
          'Customized export packaging solutions',
          'High-strength corrugated box manufacturing',
          'Premium material quality',
          'Competitive pricing',
          'Timely production and delivery',
          'Nationwide support for exporters',
          'Focus on product safety and packaging durability',
        ],
        footer: 'Our goal is to help businesses streamline shipping operations with reliable export packaging services and high-quality corrugated boxes.',
      },
    ],
  },
  {
    slug: 'industrial-packaging-solutions',
    title: 'Everything You Need to Know About Industrial Packaging Solutions',
    intro: "From why industrial packaging matters to custom designs, wooden boxes, and why brands trust us, here's what makes our industrial packaging the right choice for your business.",
    subSections: [
      {
        title: 'Why Industrial Packaging Solutions Matter',
        description: 'Industrial products require strong and reliable packaging to withstand transportation, storage, and handling challenges. High-quality industrial packaging boxes help protect valuable products from physical damage, environmental exposure, and logistics-related risks.',
        listTitle: 'Benefits of Industrial Packaging',
        items: [
          'Protects heavy and fragile industrial products',
          'Reduces transportation and handling damage',
          'Improves supply chain efficiency',
          'Ensures product safety during shipping',
          'Supports organized storage and logistics',
          'Enhances packaging durability and strength',
          'Provides secure export and domestic transportation',
        ],
        footer: 'Whether you manufacture industrial equipment, automotive parts, machinery, electronics, or commercial products, strong industrial packaging solutions are essential for safe product movement and storage.',
      },
      {
        title: 'Custom Industrial Packaging Designed for Your Business',
        description: 'Every industry has unique packaging requirements based on product weight, dimensions, handling methods, and transportation conditions. Our team develops custom industrial packaging solutions tailored to your specific business needs.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom industrial box sizes and structures',
          'Industrial wooden packaging boxes',
          'Heavy-duty corrugated packaging solutions',
          'Protective foam and cushioning inserts',
          'Moisture-resistant packaging materials',
          'Customized export packaging designs',
          'Industrial product labeling and printing',
          'Multi-layer protective packaging systems',
        ],
        footer: 'Our custom industrial packaging solutions are designed to maximize product safety while optimizing transportation and storage efficiency.',
      },
      {
        title: 'Trusted Industrial Packaging Manufacturers',
        description: 'As experienced industrial packaging manufacturers, we use advanced production technology and premium-grade materials to manufacture packaging solutions that meet industrial safety and transportation standards.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'High-strength industrial packaging production',
          'Premium wood and corrugated material sourcing',
          'Advanced cutting and box manufacturing technology',
          'Large-scale production capabilities',
          'Strict quality control process',
          'Fast turnaround and delivery support',
          'Cost-effective industrial packaging manufacturing',
        ],
        footer: 'We help businesses improve logistics operations with industrial packaging solutions that combine durability, protection, and operational efficiency.',
      },
      {
        title: 'Industrial Wooden Packaging Boxes for Heavy-Duty Protection',
        description: 'Industrial wooden packaging boxes are widely used for heavy machinery, industrial equipment, export products, and fragile commercial goods. These boxes provide exceptional durability and load-bearing strength for secure transportation.',
        listTitle: 'Applications of Industrial Wooden Packaging Boxes',
        items: [
          'Machinery packaging',
          'Automotive components packaging',
          'Heavy equipment transportation',
          'Industrial tools and parts packaging',
          'Export shipping solutions',
          'Fragile equipment protection',
          'Warehouse and storage packaging',
        ],
        footer: 'Our wooden industrial packaging solutions are manufactured according to industry standards for safe and reliable product transportation.',
      },
      {
        title: 'Why Choose Us for Industrial Packaging Solutions?',
        description: 'Businesses trust us because we combine durability, innovation, and customization to deliver reliable industrial packaging systems for multiple industries.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced industrial packaging experts',
          'Fully customized packaging solutions',
          'Strong and durable packaging materials',
          'Industrial-grade manufacturing standards',
          'Competitive pricing and bulk production',
          'Timely delivery and nationwide support',
          'Focus on product safety and packaging quality',
          'Reliable packaging for export and industrial logistics',
        ],
        footer: 'Our goal is to help businesses transport and protect products safely with high-performance industrial packaging solutions.',
      },
    ],
  },
  {
    slug: 'mono-carton-box',
    title: 'Everything You Need to Know About Mono Box Packaging',
    intro: "From why mono box packaging matters to custom designs and why brands trust us, here's what makes our mono carton boxes a smart choice for your business.",
    subSections: [
      {
        title: 'Why Mono Box Packaging Matters',
        description: 'Mono box packaging plays an important role in product presentation, branding, and customer experience. A well-designed mono carton box improves shelf visibility, protects products, and helps businesses create a professional market presence.',
        listTitle: 'Benefits of Mono Carton Box Packaging',
        items: [
          'Enhances brand identity and product presentation',
          'Creates attractive retail packaging',
          'Improves customer engagement and trust',
          'Protects products during storage and transportation',
          'Supports better product visibility on shelves',
          'Allows premium printing and branding options',
          'Provides cost-effective packaging solutions',
        ],
        footer: 'Whether you own a cosmetics brand, pharmaceutical company, FMCG business, or retail product line, quality mono box packaging can significantly improve product appeal and customer perception.',
      },
      {
        title: 'Custom Mono Carton Box Packaging Designed for Your Brand',
        description: 'Every product has unique packaging requirements. Our team creates custom mono carton box packaging solutions designed according to your product dimensions, branding needs, and industry standards.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom mono carton box sizes and shapes',
          'Premium paperboard packaging materials',
          'Matte and gloss lamination',
          'Gold and silver foil stamping',
          'Embossing and debossing',
          'Spot UV and texture finishes',
          'Window patching and die-cut designs',
          'High-quality product printing and branding',
        ],
        footer: 'Our mono box packaging solutions help businesses create packaging that attracts customers and strengthens brand identity.',
      },
      {
        title: 'Trusted Mono Carton Box Manufacturer Near Me',
        description: 'As an experienced mono carton box manufacturer near me, we provide high-quality packaging solutions with advanced manufacturing and printing capabilities. Our packaging solutions are designed for durability, premium appearance, and efficient production.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Advanced mono carton box manufacturing',
          'Premium printing and finishing technology',
          'High-quality packaging material sourcing',
          'Large-scale production capabilities',
          'Strict quality control standards',
          'Fast turnaround and delivery support',
          'Cost-effective packaging production',
        ],
        footer: 'We help businesses create professional packaging solutions that improve product presentation and packaging performance.',
      },
      {
        title: 'Why Choose Us for Mono Box Packaging?',
        description: 'Businesses trust us because we combine quality, customization, and innovative packaging solutions to deliver premium mono carton box packaging.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced packaging professionals',
          'Fully customized mono box packaging designs',
          'Premium printing and finishing quality',
          'Competitive pricing for bulk orders',
          'Fast production and delivery timelines',
          'Nationwide packaging support',
          'Focus on quality and brand presentation',
          'Durable and eco-friendly packaging materials',
        ],
        footer: 'Our goal is to help brands improve product visibility and customer experience with high-quality mono carton packaging solutions.',
      },
    ],
  },
  {
    slug: 'corrugated-seperator',
    title: 'Everything You Need to Know About Corrugated Separators',
    intro: "From why corrugated separators matter to custom solutions and why brands trust us, here's what makes our corrugated separators a smart choice for your business.",
    subSections: [
      {
        title: 'Why Corrugated Separators Matter',
        description: 'Corrugated separators help organize products inside packaging boxes while reducing product movement and collision during transportation. These separators improve product safety and packaging efficiency for businesses handling delicate or multiple items.',
        listTitle: 'Benefits of Corrugated Separators',
        items: [
          'Prevents product damage during shipping',
          'Reduces product movement inside packaging',
          'Improves packaging organization',
          'Provides cushioning and support',
          'Enhances transportation safety',
          'Cost-effective protective packaging solution',
          'Suitable for multiple product categories',
        ],
        footer: 'Whether you are packaging bottles, glass products, electronics, pharmaceuticals, automotive components, or retail products, corrugated separators provide reliable protection and packaging support.',
      },
      {
        title: 'Custom Corrugated Separator Solutions',
        description: 'Every product requires different packaging protection and compartment sizing. Our team provides customized corrugated separator solutions designed according to your packaging and product requirements.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom separator dimensions',
          'Multi-slot separator designs',
          'Heavy-duty corrugated materials',
          'Layered product protection systems',
          'Die-cut corrugated separators',
          'Customized industrial packaging inserts',
          'Export packaging separator solutions',
          'Product-specific packaging designs',
        ],
        footer: 'Our corrugated separator solutions are designed to maximize packaging efficiency and ensure safe product transportation.',
      },
      {
        title: 'Why Choose Our Corrugated Separators?',
        description: 'Businesses trust us because we deliver durable, customized, and cost-effective corrugated separator packaging solutions for different industries.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced packaging solution experts',
          'High-quality corrugated materials',
          'Fully customized separator designs',
          'Competitive pricing and bulk production',
          'Strong and durable packaging solutions',
          'Fast turnaround and delivery support',
          'Eco-friendly packaging manufacturing',
          'Reliable industrial and export packaging solutions',
        ],
        footer: 'Our goal is to help businesses improve product protection and packaging efficiency with premium corrugated separator solutions.',
      },
    ],
  },
  {
    slug: 'die-cut-boxes',
    title: 'Everything You Need to Know About Die Cut Packaging Boxes',
    intro: "From why die cut packaging matters to custom solutions and why brands trust us, here's what makes our die cut boxes a smart choice for your business.",
    subSections: [
      {
        title: 'Why Die Cut Packaging Boxes Matter',
        description: 'Die cut packaging boxes help businesses create packaging that fits products perfectly while improving visual appeal and packaging efficiency. These boxes are widely used for branding, product protection, and optimized packaging performance.',
        listTitle: 'Benefits of Die Cut Box Packaging',
        items: [
          'Provides accurate product fitting',
          'Enhances product presentation',
          'Improves packaging durability',
          'Reduces product movement inside boxes',
          'Supports custom branding and printing',
          'Increases shelf appeal and visibility',
          'Offers cost-effective packaging solutions',
        ],
        footer: 'Whether you need packaging for electronics, cosmetics, food products, pharmaceuticals, retail products, or industrial goods, die cut carton box packaging helps improve both protection and branding.',
      },
      {
        title: 'Custom Die Cut Corrugated Boxes for Your Business',
        description: 'Every product requires a unique packaging structure. Our team creates custom die cut corrugated boxes tailored according to your product dimensions, transportation needs, and branding requirements.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom die cut box sizes and shapes',
          'Corrugated and paperboard material options',
          'Printed logos and product branding',
          'Matte and gloss lamination',
          'UV coating and foil stamping',
          'Window patching and display packaging',
          'Heavy-duty corrugated die cut structures',
          'Custom inserts and protective compartments',
        ],
        footer: 'Our die cut packaging boxes are designed to provide excellent functionality while creating an attractive packaging experience.',
      },
      {
        title: 'Durable Corrugated Die Cut Boxes for Safe Packaging',
        description: 'Corrugated die cut boxes provide enhanced strength and structural stability for shipping, storage, and industrial packaging applications. These boxes are ideal for products requiring additional protection during transportation and handling.',
        listTitle: 'Applications of Corrugated Die Cut Boxes',
        items: [
          'eCommerce packaging',
          'Electronics packaging',
          'FMCG product packaging',
          'Food and beverage packaging',
          'Pharmaceutical packaging',
          'Industrial product packaging',
          'Retail display packaging',
          'Export packaging solutions',
        ],
        footer: 'Our corrugated die cut boxes are manufactured using premium materials to ensure long-lasting durability and product safety.',
      },
      {
        title: 'Why Choose Us for Die Cut Packaging Boxes?',
        description: 'Businesses trust us because we provide innovative, durable, and fully customized die cut box packaging solutions designed for modern packaging requirements.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced packaging manufacturing team',
          'Advanced die cutting technology',
          'High-quality corrugated packaging materials',
          'Fully customized packaging solutions',
          'Premium printing and finishing quality',
          'Competitive pricing for bulk orders',
          'Fast turnaround and delivery support',
          'Eco-friendly packaging manufacturing',
        ],
        footer: 'Our goal is to help businesses improve product protection, shelf appeal, and packaging efficiency with premium die cut packaging boxes.',
      },
    ],
  },
  {
    slug: 'honey-comb-seperator',
    title: 'Everything You Need to Know About Honey Comb Separators',
    intro: "From why honeycomb separators matter to custom solutions and why brands trust us, here's what makes our honey comb separators a smart choice for your business.",
    subSections: [
      {
        title: 'Why Honey Comb Separators Matter',
        description: 'Honey comb separators help businesses improve product safety by reducing product movement and impact during transportation and storage. Their strong internal structure provides better cushioning and support compared to standard packaging inserts.',
        listTitle: 'Benefits of Honey Comb Separators',
        items: [
          'Prevents product damage during shipping',
          'Provides superior cushioning and protection',
          'Reduces vibration and impact risks',
          'Improves product organization inside boxes',
          'Lightweight packaging for cost efficiency',
          'Supports safe export and industrial packaging',
          'Eco-friendly alternative to plastic packaging',
        ],
        footer: 'Whether you are packaging glass products, electronics, automotive parts, FMCG products, or industrial goods, honeycomb separators provide reliable and secure packaging support.',
      },
      {
        title: 'Custom Honey Comb Separator Solutions',
        description: 'Every product requires specific packaging protection and compartment arrangements. Our team develops customized honey comb separator solutions according to your product dimensions, packaging requirements, and transportation conditions.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom separator dimensions and thickness',
          'Multi-compartment honeycomb designs',
          'Heavy-duty protective separator structures',
          'Die-cut honeycomb packaging inserts',
          'Industrial product protection systems',
          'Customized export packaging separators',
          'Product-specific protective packaging solutions',
          'High-strength honeycomb board materials',
        ],
        footer: 'Our honey comb separator solutions are designed to maximize packaging efficiency while ensuring safe product handling and transportation.',
      },
      {
        title: 'Durable Honeycomb Packaging for Multiple Industries',
        description: 'Honeycomb packaging materials are widely used because of their excellent strength-to-weight ratio and protective performance. These separators are suitable for both lightweight and heavy-duty packaging applications.',
        listTitle: 'Applications of Honey Comb Separators',
        items: [
          'Glass bottle packaging',
          'Electronics product packaging',
          'Automotive component packaging',
          'Industrial equipment packaging',
          'Pharmaceutical packaging',
          'Food & beverage packaging',
          'Furniture and interior product packaging',
          'Export and logistics packaging',
        ],
        footer: 'Our honeycomb packaging solutions help businesses reduce packaging damage and improve transportation safety.',
      },
      {
        title: 'Why Choose Our Honey Comb Separators?',
        description: 'Businesses trust us because we deliver strong, customized, and eco-friendly packaging separator solutions designed for modern logistics and industrial packaging needs.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced packaging manufacturing team',
          'High-strength honeycomb material quality',
          'Fully customized separator solutions',
          'Competitive pricing and bulk production',
          'Eco-friendly and recyclable packaging',
          'Fast turnaround and nationwide delivery',
          'Reliable industrial packaging expertise',
          'Focus on product safety and packaging efficiency',
        ],
        footer: 'Our goal is to help businesses improve packaging protection and transportation performance with durable honey comb separator solutions.',
      },
    ],
  },
  {
    slug: 'mailer-box-manufacturer',
    title: 'Everything You Need to Know About Mailer Box Packaging',
    intro: "From why mailer boxes matter to custom solutions and why brands trust us, here's what makes our mailer boxes a smart choice for your business.",
    subSections: [
      {
        title: 'Why Mailer Box Packaging Matters',
        description: 'Mailer boxes are designed to provide secure product packaging while enhancing customer experience and brand visibility. Well-designed custom mailer boxes help businesses create professional packaging that improves product presentation and customer satisfaction.',
        listTitle: 'Benefits of Custom Mailer Boxes',
        items: [
          'Protects products during shipping and handling',
          'Enhances brand presentation and packaging appeal',
          'Improves customer unboxing experience',
          'Provides lightweight and durable packaging',
          'Supports custom printing and branding',
          'Reduces packaging damage during transit',
          'Ideal for subscription and eCommerce packaging',
        ],
        footer: 'Whether you sell cosmetics, apparel, electronics, food products, gifts, or subscription products, custom mailer packaging helps strengthen your brand image and improve customer engagement.',
      },
      {
        title: 'Custom Mailer Boxes Designed for Your Brand',
        description: 'Every product and business requires unique packaging. Our team creates custom mailer boxes tailored according to your product size, shipping needs, and branding requirements.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom mailer box sizes and shapes',
          'Corrugated and kraft material options',
          'Printed logos and product branding',
          'Matte and gloss lamination',
          'Spot UV and foil stamping',
          'Inside and outside box printing',
          'Custom inserts and compartments',
          'Eco-friendly packaging solutions',
        ],
        footer: 'Our custom mailer box packaging solutions are designed to combine durability with premium brand presentation.',
      },
      {
        title: 'Corrugated Mailer Boxes for Secure Shipping',
        description: 'Corrugated mailer boxes are designed to provide superior strength and cushioning for products during transportation and delivery. These boxes are ideal for eCommerce businesses and product shipping applications.',
        listTitle: 'Applications of Corrugated Mailer Boxes',
        items: [
          'eCommerce product shipping',
          'Subscription box packaging',
          'Cosmetics and beauty products',
          'Apparel and fashion accessories',
          'Electronics and gadgets',
          'Food and bakery products',
          'Gift and promotional packaging',
          'Retail product packaging',
        ],
        footer: 'Our corrugated mailer boxes are manufactured using high-quality materials to ensure maximum product protection and professional packaging appearance.',
      },
      {
        title: 'Mailer Boxes Wholesale for Businesses',
        description: 'We offer mailer boxes wholesale solutions for startups, retailers, wholesalers, and large-scale businesses looking for cost-effective and premium packaging options.',
        listTitle: 'Our Wholesale Packaging Advantages',
        items: [
          'Competitive bulk pricing',
          'Consistent packaging quality',
          'Large-scale production capacity',
          'Fast turnaround and delivery',
          'Fully customized packaging solutions',
          'Nationwide packaging support',
          'Reliable packaging manufacturing standards',
        ],
        footer: 'Our wholesale mailer packaging solutions help businesses reduce packaging costs while maintaining premium quality.',
      },
      {
        title: 'Why Choose Us as Your Mailer Box Manufacturer?',
        description: 'Businesses trust us because we provide durable, customized, and visually appealing mailer packaging solutions for modern shipping and retail requirements.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced packaging manufacturing team',
          'Fully customized mailer box solutions',
          'Premium printing and finishing quality',
          'Strong corrugated packaging materials',
          'Competitive wholesale pricing',
          'Fast production and nationwide delivery',
          'Eco-friendly packaging manufacturing',
          'Focus on branding and customer experience',
        ],
        footer: 'Our goal is to help businesses create high-quality mailer packaging that improves product safety, branding, and customer satisfaction.',
      },
    ],
  },
  {
    slug: 'paper-box-manufacturer',
    title: 'Everything You Need to Know About Paper Box Packaging',
    intro: "From why paper box packaging matters to custom solutions and why brands trust us, here's what makes our paper boxes a smart choice for your business.",
    subSections: [
      {
        title: 'Why Paper Box Packaging Matters',
        description: 'Paper box packaging helps businesses create professional product presentation while protecting products during storage, display, and transportation. Attractive paper packaging improves customer experience and supports better brand visibility in competitive markets.',
        listTitle: 'Benefits of Paper Box Packaging',
        items: [
          'Enhances product presentation and branding',
          'Improves shelf visibility and customer appeal',
          'Provides lightweight and durable packaging',
          'Supports eco-friendly packaging practices',
          'Offers cost-effective packaging solutions',
          'Allows premium customization and printing',
          'Protects products during handling and delivery',
        ],
        footer: 'Whether you own a cosmetics brand, food business, electronics company, or retail product line, quality paper box packaging helps strengthen your market presence and customer trust.',
      },
      {
        title: 'Custom Paper Box Packaging Designed for Your Brand',
        description: 'Every business has unique packaging requirements. Our team develops customized paper box packaging solutions according to your product specifications, branding goals, and industry standards.',
        listTitle: 'Customization Options Available',
        items: [
          'Custom paper box sizes and dimensions',
          'Printed logos and brand designs',
          'Matte and gloss lamination',
          'Gold and silver foil stamping',
          'Embossing and debossing',
          'UV coating and texture finishes',
          'Window patching and die-cut designs',
          'Eco-friendly kraft paper packaging options',
        ],
        footer: 'Our custom paper packaging solutions help businesses create packaging that enhances both product safety and brand identity.',
      },
      {
        title: 'Trusted Paper Box Company of India',
        description: 'As a reliable paper box company of India, we use advanced manufacturing and printing technology to deliver premium-quality packaging solutions for multiple industries and commercial applications.',
        listTitle: 'Our Manufacturing Strengths',
        items: [
          'Advanced paper box manufacturing technology',
          'High-quality packaging material sourcing',
          'Premium offset and digital printing solutions',
          'Large-scale production capabilities',
          'Strict quality control process',
          'Fast turnaround and delivery support',
          'Competitive pricing for bulk orders',
        ],
        footer: 'We help businesses create attractive and durable packaging solutions that improve product presentation and customer experience.',
      },
      {
        title: 'Sustainable & Eco-Friendly Paper Packaging Solutions',
        description: 'Modern businesses are increasingly choosing sustainable packaging solutions to reduce environmental impact. Our paper box packaging solutions are designed using recyclable and eco-friendly materials to support environmentally responsible packaging practices.',
        listTitle: 'Eco-Friendly Packaging Features',
        items: [
          'Recyclable paperboard materials',
          'Sustainable printing methods',
          'Lightweight packaging for reduced waste',
          'Eco-safe inks and coatings',
          'Reusable and biodegradable packaging options',
        ],
        footer: 'Our eco-friendly paper packaging solutions help businesses maintain premium packaging quality while supporting sustainability goals.',
      },
      {
        title: 'Why Choose Us as Your Paper Box Manufacturer?',
        description: 'Businesses trust us because we combine quality, customization, and innovative packaging solutions to deliver premium paper box packaging for modern brands.',
        listTitle: 'What Makes Us Different?',
        items: [
          'Experienced packaging manufacturing experts',
          'Fully customized paper packaging solutions',
          'Premium printing and finishing quality',
          'Eco-friendly packaging manufacturing',
          'Competitive pricing and bulk production',
          'Fast production and nationwide delivery',
          'Reliable customer support and service',
          'Focus on branding and product presentation',
        ],
        footer: 'Our goal is to help businesses improve product visibility and customer experience with high-quality paper box packaging solutions.',
      },
    ],
  },
];

interface ProductFAQ {
  question: string;
  answer: string;
}

interface ProductFAQSectionData {
  slug: string;
  intro: string;
  faqs: ProductFAQ[];
}

const productFAQSections: ProductFAQSectionData[] = [
  {
    slug: 'premium-boxes-manufacturers',
    intro: 'Common questions about our premium box packaging solutions.',
    faqs: [
      {
        question: 'What are premium box packaging solutions?',
        answer: 'Premium box packaging solutions are high-quality packaging boxes designed to enhance product presentation, branding, and customer experience. These boxes are commonly used for luxury products, gifting, cosmetics, jewellery, electronics, and retail packaging.',
      },
      {
        question: 'Can I customize the design of luxury packaging boxes?',
        answer: 'Yes, custom luxury boxes can be fully personalized with custom sizes, materials, colors, logo printing, foil stamping, embossing, magnetic closures, and premium finishes to match your brand identity.',
      },
      {
        question: 'Which industries use premium box packaging?',
        answer: 'Premium box packaging is widely used in industries such as cosmetics, fashion, jewelry, electronics, perfumes, corporate gifting, chocolates, and luxury retail products.',
      },
      {
        question: 'What materials are used in premium packaging boxes?',
        answer: 'Most premium box manufacturers use rigid board, kappa board, laminated paperboard, specialty papers, and eco-friendly materials to ensure durability and a luxurious appearance.',
      },
      {
        question: 'Are eco-friendly custom luxury boxes available?',
        answer: 'Yes, many premium box packaging designs are created using recyclable and sustainable materials with eco-friendly printing methods to support environmentally responsible packaging solutions.',
      },
      {
        question: 'What finishing options are available for premium box packaging?',
        answer: 'Premium packaging boxes can include matte or gloss lamination, spot UV, embossing, debossing, gold foiling, silver foiling, velvet finishes, and magnetic closure designs for a luxury look and feel.',
      },
      {
        question: 'Why should businesses invest in premium box packaging design?',
        answer: 'Premium box packaging design helps businesses improve brand value, create a memorable unboxing experience, increase customer engagement, and enhance product presentation in competitive markets.',
      },
    ],
  },
  {
    slug: 'export-packaging-service-providers',
    intro: 'Common questions about our export packaging solutions.',
    faqs: [
      {
        question: 'What are export packing boxes?',
        answer: 'Export packing boxes are heavy-duty packaging boxes designed to protect products during domestic and international transportation, storage, and handling.',
      },
      {
        question: 'What industries use export packaging services?',
        answer: 'Export packaging services are commonly used by industries such as textiles, electronics, pharmaceuticals, food products, automotive, retail, and industrial manufacturing.',
      },
      {
        question: 'Why are corrugated boxes used for export packaging?',
        answer: 'Corrugated boxes provide excellent strength, cushioning, durability, and protection, making them ideal for export and long-distance transportation.',
      },
      {
        question: 'Can export packing boxes be customized?',
        answer: 'Yes, export packing boxes can be customized in terms of size, material strength, printing, branding, protective inserts, and packaging design according to product requirements.',
      },
      {
        question: 'Are eco-friendly export packaging solutions available?',
        answer: 'Yes, many export packaging solutions are manufactured using recyclable and eco-friendly corrugated materials to support sustainable packaging practices.',
      },
      {
        question: 'Do export packaging service providers offer bulk manufacturing?',
        answer: 'Yes, export packaging service providers offer bulk production capabilities for businesses involved in large-scale domestic and international shipping.',
      },
      {
        question: 'How do strong export packaging solutions help businesses?',
        answer: 'Strong export packaging solutions reduce product damage, improve shipping safety, support logistics efficiency, and enhance customer satisfaction during product delivery.',
      },
    ],
  },
  {
    slug: 'industrial-packaging-solutions',
    intro: 'Common questions about our industrial packaging solutions.',
    faqs: [
      {
        question: 'What are industrial packaging solutions?',
        answer: 'Industrial packaging solutions are heavy-duty packaging systems designed to protect industrial products, machinery, equipment, and materials during storage, handling, and transportation.',
      },
      {
        question: 'What are industrial wooden packaging boxes used for?',
        answer: 'Industrial wooden packaging boxes are commonly used for transporting heavy machinery, industrial equipment, automotive parts, export products, and fragile commercial goods.',
      },
      {
        question: 'Can industrial packaging boxes be customized?',
        answer: 'Yes, industrial packaging boxes can be customized based on product size, weight, material requirements, transportation conditions, and industry standards.',
      },
      {
        question: 'Which industries use industrial packaging solutions?',
        answer: 'Industries such as manufacturing, automotive, machinery, electronics, pharmaceuticals, engineering, logistics, and exports commonly use industrial packaging solutions.',
      },
      {
        question: 'Are eco-friendly industrial packaging options available?',
        answer: 'Yes, many industrial packaging manufacturers offer eco-friendly and recyclable packaging materials to support sustainable industrial packaging practices.',
      },
      {
        question: 'Why is durable industrial packaging important?',
        answer: 'Durable industrial packaging helps reduce product damage, improves transportation safety, supports efficient logistics, and protects products during storage and shipping.',
      },
      {
        question: 'Do industrial packaging manufacturers provide bulk packaging solutions?',
        answer: 'Yes, industrial packaging manufacturers provide bulk production capabilities for businesses requiring large-scale industrial packaging and export packaging solutions.',
      },
    ],
  },
  {
    slug: 'mono-carton-box',
    intro: 'Common questions about our mono box packaging solutions.',
    faqs: [
      {
        question: 'What is a mono carton box?',
        answer: 'A mono carton box is a lightweight paperboard packaging box commonly used for retail products, cosmetics, pharmaceuticals, FMCG items, and consumer goods packaging.',
      },
      {
        question: 'What industries use mono box packaging?',
        answer: 'Mono box packaging is widely used in industries such as cosmetics, pharmaceuticals, food products, electronics, FMCG, healthcare, and retail packaging.',
      },
      {
        question: 'Can mono carton boxes be customized?',
        answer: 'Yes, mono carton boxes can be customized with different sizes, shapes, printing designs, lamination finishes, embossing, foil stamping, and branding elements.',
      },
      {
        question: 'What materials are used in mono carton box packaging?',
        answer: 'Mono carton boxes are generally made using high-quality paperboard, duplex board, kraft board, and eco-friendly packaging materials.',
      },
      {
        question: 'Are eco-friendly mono carton boxes available?',
        answer: 'Yes, many mono carton box manufacturers offer recyclable and sustainable packaging materials to support environmentally responsible packaging solutions.',
      },
      {
        question: 'What printing options are available for mono box packaging?',
        answer: 'Mono box packaging can include offset printing, UV printing, foil stamping, embossing, debossing, matte lamination, gloss lamination, and spot UV finishes.',
      },
      {
        question: 'Why is mono carton box packaging important for businesses?',
        answer: 'Mono carton box packaging helps businesses improve product presentation, increase brand visibility, protect products, and create a better customer experience in competitive markets.',
      },
    ],
  },
  {
    slug: 'corrugated-seperator',
    intro: 'Common questions about our corrugated separator packaging solutions.',
    faqs: [
      {
        question: 'What are corrugated separators?',
        answer: 'Corrugated separators are protective packaging inserts used inside boxes to separate products and prevent damage during transportation and storage.',
      },
      {
        question: 'What industries use corrugated separators?',
        answer: 'Corrugated separators are widely used in FMCG, pharmaceuticals, electronics, food & beverage, glass packaging, automotive, and export industries.',
      },
      {
        question: 'Can corrugated separators be customized?',
        answer: 'Yes, corrugated separators can be customized in different sizes, slot designs, thicknesses, and material strengths according to product packaging requirements.',
      },
      {
        question: 'Are corrugated separators eco-friendly?',
        answer: 'Yes, most corrugated separators are made from recyclable and eco-friendly corrugated materials, making them a sustainable packaging option.',
      },
      {
        question: 'Why are corrugated separators important in packaging?',
        answer: 'Corrugated separators help prevent product collision, improve packaging organization, reduce damage risks, and enhance transportation safety.',
      },
      {
        question: 'Are heavy-duty corrugated separators available?',
        answer: 'Yes, heavy-duty corrugated separators are available for industrial products, glass items, automotive parts, and export packaging applications.',
      },
      {
        question: 'Can corrugated separators be used for export packaging?',
        answer: 'Yes, corrugated separators are commonly used in export packaging to provide additional product protection during long-distance transportation and handling.',
      },
    ],
  },
  {
    slug: 'die-cut-boxes',
    intro: 'Common questions about our die cut box packaging solutions.',
    faqs: [
      {
        question: 'What is a die cut box?',
        answer: 'A die cut box is a custom-shaped packaging box manufactured using precision die cutting technology for accurate sizing, folding, and product fitting.',
      },
      {
        question: 'What are corrugated die cut boxes used for?',
        answer: 'Corrugated die cut boxes are used for shipping, retail packaging, eCommerce packaging, industrial products, electronics, FMCG products, and export packaging.',
      },
      {
        question: 'Can die cut packaging boxes be customized?',
        answer: 'Yes, die cut packaging boxes can be customized in terms of size, shape, printing, material, finishing, and structural design according to product requirements.',
      },
      {
        question: 'What materials are used for die cut carton boxes?',
        answer: 'Die cut carton boxes are commonly made using corrugated board, kraft paper, duplex board, and paperboard packaging materials.',
      },
      {
        question: 'Are die cut boxes suitable for heavy products?',
        answer: 'Yes, heavy-duty corrugated die cut boxes are designed for industrial products, machinery parts, electronics, and products requiring strong packaging protection.',
      },
      {
        question: 'Are eco-friendly die cut packaging boxes available?',
        answer: 'Yes, many die cut packaging boxes are manufactured using recyclable and sustainable materials to support eco-friendly packaging solutions.',
      },
      {
        question: 'Why is die cut box packaging important for businesses?',
        answer: 'Die cut box packaging improves product protection, enhances branding, creates better product presentation, and provides customized packaging solutions for different industries.',
      },
    ],
  },
  {
    slug: 'honey-comb-seperator',
    intro: 'Common questions about our honey comb separator packaging solutions.',
    faqs: [
      {
        question: 'What is a honey comb separator?',
        answer: 'A honey comb separator is a protective packaging insert made with a honeycomb structured material designed to separate and protect products during transportation and storage.',
      },
      {
        question: 'What are honey comb separators used for?',
        answer: 'Honey comb separators are used for packaging fragile products, electronics, glass items, automotive parts, industrial products, and export goods.',
      },
      {
        question: 'Are honey comb separators strong enough for heavy products?',
        answer: 'Yes, honeycomb separators offer excellent load-bearing strength and are suitable for both lightweight and heavy-duty packaging applications.',
      },
      {
        question: 'Can honey comb separators be customized?',
        answer: 'Yes, honey comb separators can be customized in different sizes, thicknesses, compartment designs, and protective structures according to product requirements.',
      },
      {
        question: 'Are honeycomb packaging materials eco-friendly?',
        answer: 'Yes, honeycomb packaging materials are recyclable, lightweight, and environmentally friendly, making them a sustainable packaging solution.',
      },
      {
        question: 'Why are honey comb separators important in packaging?',
        answer: 'Honey comb separators help prevent product collision, absorb shocks, improve product organization, and reduce packaging damage during transportation.',
      },
      {
        question: 'Which industries use honey comb separator packaging?',
        answer: 'Industries such as electronics, automotive, FMCG, pharmaceuticals, food & beverage, industrial manufacturing, and export logistics commonly use honey comb separator packaging.',
      },
    ],
  },
  {
    slug: 'mailer-box-manufacturer',
    intro: 'Common questions about our custom mailer box packaging solutions.',
    faqs: [
      {
        question: 'What are mailer boxes?',
        answer: 'Mailer boxes are durable packaging boxes commonly used for shipping, eCommerce packaging, subscription boxes, and retail product packaging.',
      },
      {
        question: 'What are corrugated mailer boxes used for?',
        answer: 'Corrugated mailer boxes are used for secure shipping and packaging of products such as electronics, cosmetics, apparel, food items, gifts, and subscription products.',
      },
      {
        question: 'Can custom mailer boxes be personalized?',
        answer: 'Yes, custom mailer boxes can be customized with different sizes, printing, colors, finishes, inserts, logos, and branding elements.',
      },
      {
        question: 'Are mailer boxes suitable for eCommerce businesses?',
        answer: 'Yes, mailer boxes are ideal for eCommerce businesses because they provide strong product protection and create a premium unboxing experience.',
      },
      {
        question: 'Are eco-friendly mailer boxes available?',
        answer: 'Yes, many custom mailer boxes are manufactured using recyclable and eco-friendly corrugated or kraft materials.',
      },
      {
        question: 'Do you offer mailer boxes wholesale?',
        answer: 'Yes, we provide mailer boxes wholesale solutions for startups, retailers, subscription brands, and large-scale businesses requiring bulk packaging orders.',
      },
      {
        question: 'Why are custom mailer boxes important for branding?',
        answer: 'Custom mailer boxes help businesses improve brand visibility, enhance customer experience, create attractive packaging, and build customer loyalty through premium presentation.',
      },
    ],
  },
  {
    slug: 'paper-box-manufacturer',
    intro: 'Common questions about our paper box packaging solutions.',
    faqs: [
      {
        question: 'What is paper box packaging?',
        answer: 'Paper box packaging is a packaging solution made from paperboard or cardboard materials used for product protection, branding, retail display, and transportation.',
      },
      {
        question: 'Which industries use paper box packaging?',
        answer: 'Paper box packaging is widely used in cosmetics, food & beverage, pharmaceuticals, electronics, FMCG, retail, healthcare, and eCommerce industries.',
      },
      {
        question: 'Can paper boxes be customized?',
        answer: 'Yes, paper boxes can be customized in terms of size, shape, printing, branding, finishing, and structural design according to product requirements.',
      },
      {
        question: 'Are paper packaging boxes eco-friendly?',
        answer: 'Yes, most paper packaging boxes are recyclable, biodegradable, and manufactured using eco-friendly materials and sustainable printing methods.',
      },
      {
        question: 'What printing options are available for paper box packaging?',
        answer: 'Paper box packaging can include offset printing, digital printing, foil stamping, embossing, debossing, UV coating, matte lamination, and gloss finishes.',
      },
      {
        question: 'Why is paper box packaging important for businesses?',
        answer: 'Paper box packaging helps businesses improve product presentation, strengthen branding, protect products, and create a better customer experience.',
      },
      {
        question: 'Do paper box manufacturers provide bulk packaging solutions?',
        answer: 'Yes, paper box manufacturers offer bulk production capabilities for startups, wholesalers, retailers, and large-scale commercial packaging requirements.',
      },
    ],
  },
];

const industriesWeServeDescriptions: Record<string, string> = {
  'export-packaging-service-providers': 'We provide export packaging solutions for multiple industries and international shipping requirements.',
  'industrial-packaging-solutions': 'We provide industrial packaging solutions for a wide range of industries and commercial sectors.',
  'mono-carton-box': 'We provide mono carton box packaging solutions for multiple industries and product categories.',
  'corrugated-seperator': 'We manufacture corrugated separators for multiple industries and packaging applications.',
  'die-cut-boxes': 'We provide die cut box packaging solutions for multiple industries and commercial applications.',
  'honey-comb-seperator': 'We manufacture honey comb separators for a wide range of industries and packaging applications.',
  'mailer-box-manufacturer': 'We provide custom mailer box packaging solutions for multiple industries and business categories.',
  'paper-box-manufacturer': 'We provide paper box packaging solutions for a wide range of industries and product categories.',
};

interface ProductCTASectionData {
  slug: string;
  title: string;
  paragraphs: string[];
}

const productCTASections: ProductCTASectionData[] = [
  {
    slug: 'export-packaging-service-providers',
    title: 'Get Reliable Export Packing Boxes for Safe Transportation',
    paragraphs: [
      'Looking for trusted export packaging service providers in India? We offer durable export packing boxes and customized export packaging solutions designed for secure domestic and international shipping.',
      'From heavy-duty corrugated boxes to fully customized export packaging, we provide reliable solutions that protect your products and support your business growth.',
      'Contact us today to discuss your export packaging requirements and get high-quality packaging solutions for your products.',
    ],
  },
  {
    slug: 'industrial-packaging-solutions',
    title: 'Get Reliable Industrial Packaging Boxes for Your Business',
    paragraphs: [
      'Looking for trusted industrial packaging manufacturers in India? We provide durable industrial packaging boxes, industrial wooden packaging boxes, and custom industrial packaging solutions designed for heavy-duty protection and secure transportation.',
      'From industrial machinery packaging to customized export packaging systems, we deliver reliable packaging solutions tailored to your operational needs.',
      'Contact us today to discuss your industrial packaging requirements and get customized packaging solutions for your business.',
    ],
  },
  {
    slug: 'mono-carton-box',
    title: 'Get Custom Mono Carton Box Packaging for Your Business',
    paragraphs: [
      'Looking for a reliable mono carton box manufacturer for your packaging requirements? We provide premium mono box packaging solutions tailored to your branding, product specifications, and business goals.',
      'From retail packaging to customized product boxes, we deliver packaging solutions designed to enhance brand value and product presentation.',
      'Contact us today to discuss your mono carton packaging requirements and get customized packaging solutions for your business.',
    ],
  },
  {
    slug: 'corrugated-seperator',
    title: 'Get Durable Corrugated Separators for Safe Product Packaging',
    paragraphs: [
      'Looking for reliable corrugated separators for your packaging needs? We provide customized corrugated separator solutions designed to improve product safety, storage organization, and transportation efficiency.',
      'From industrial packaging to retail and export packaging solutions, we deliver high-quality corrugated separators tailored to your business requirements.',
      'Contact us today to discuss your corrugated separator packaging needs and get customized packaging solutions for your products.',
    ],
  },
  {
    slug: 'die-cut-boxes',
    title: 'Get Custom Die Cut Box Packaging for Your Products',
    paragraphs: [
      'Looking for reliable die cut corrugated boxes and customized die cut packaging solutions? We provide durable and attractive die cut carton box packaging designed to meet your product and branding requirements.',
      'From retail packaging to industrial corrugated box solutions, we deliver packaging that improves product safety, presentation, and customer experience.',
      'Contact us today to discuss your die cut packaging box requirements and get customized packaging solutions for your business.',
    ],
  },
  {
    slug: 'honey-comb-seperator',
    title: 'Get Reliable Honey Comb Separators for Safe Product Packaging',
    paragraphs: [
      'Looking for durable honey comb separators for your packaging requirements? We provide customized honeycomb separator solutions designed for maximum product protection, efficient storage, and safe transportation.',
      'From industrial packaging to export packaging applications, we deliver high-quality honeycomb packaging solutions tailored to your business needs.',
      'Contact us today to discuss your honey comb separator requirements and get customized protective packaging solutions for your products.',
    ],
  },
  {
    slug: 'mailer-box-manufacturer',
    title: 'Get Custom Mailer Boxes for Your Business',
    paragraphs: [
      'Looking for a reliable mailer box manufacturer for your packaging needs? We provide custom mailer boxes, corrugated mailer boxes, and wholesale packaging solutions designed for product protection and premium presentation.',
      'From eCommerce packaging to subscription box solutions, we deliver packaging that strengthens your brand and enhances customer experience.',
      'Contact us today to discuss your mailer packaging requirements and get customized packaging solutions for your business.',
    ],
  },
  {
    slug: 'paper-box-manufacturer',
    title: 'Get Custom Paper Box Packaging for Your Business',
    paragraphs: [
      'Looking for a reliable paper box manufacturer for your packaging requirements? We provide customized paper box packaging solutions designed for product protection, branding, and premium presentation.',
      'From retail packaging to custom printed paper boxes, we deliver packaging solutions tailored to your business needs and industry standards.',
      'Contact us today to discuss your paper packaging requirements and get customized packaging solutions for your products.',
    ],
  },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    if (!slug) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await fetchProductBySlug(slug);
    setProduct(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="inline-flex items-center text-brand-green font-semibold hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const seo = productPageSEO[product.slug];

  return (
    <div>
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
        </Helmet>
      )}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center text-[#1b5e20] font-semibold hover:underline mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-teal transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="max-w-6xl mx-auto text-2xl font-bold text-gray-900 mb-12 text-start">
              {productKeyFeaturesTitle[product.slug] ?? 'Key Features'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 max-w-6xl mx-auto justify-items-start justify-center">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#10a5a4]/15 flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-[#10a5a4]" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {productInfoSections
        .filter((section) => section.slug === product.slug)
        .map((section) => (
          <ProductInfoSection
            key={section.slug}
            title={section.title}
            intro={section.intro}
            subSections={section.subSections}
          />
        ))}

      {productSpotlightSections
        .filter((s) => s.slug === product.slug)
        .map((s) => (
          <ProductSpotlightSection key={s.slug} subSections={s.subSections} />
        ))}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {industriesWeServeDescriptions[product.slug] ?? 'We understand the importance of presentation in luxury markets and create packaging that enhances brand value.'}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {industriesWeServe.map((industry) => (
              <Link
                key={industry.slug}
                to={`/industry/${industry.slug}`}
                className="rounded-lg overflow-hidden border-2 border-gray-200 hover:border-brand-green hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-brand-green py-3 px-4 text-center">
                  <span className="text-white font-semibold text-sm">{industry.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {productFAQSections
        .filter((section) => section.slug === product.slug)
        .map((section) => (
          <section key={section.slug} className="py-20 bg-green-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  {section.intro}
                </p>
              </div>
              <div className="space-y-4">
                {section.faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>
        ))}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-brand-green to-brand-teal rounded-2xl p-12 text-center text-white">
            {(() => {
              const cta = productCTASections.find((section) => section.slug === product.slug);
              if (cta) {
                return (
                  <>
                    <h2 className="text-3xl font-bold mb-4">{cta.title}</h2>
                    {cta.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                        {paragraph}
                      </p>
                    ))}
                  </>
                );
              }
              return (
                <>
                  <h2 className="text-3xl font-bold mb-4">
                    Interested in {product.name}?
                  </h2>
                  <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
                    Contact our team today to discuss your requirements and receive a customized quote
                  </p>
                </>
              );
            })()}
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
