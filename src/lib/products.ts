import { supabase } from './supabase';

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  applications: string[];
  image: string;
}

interface DBProduct {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  applications: string[];
  image: string;
  category_id: string;
  display_order: number;
  product_categories?: {
    display_order: number;
  };
}

function mapDBProductToProduct(dbProduct: DBProduct): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    slug: dbProduct.slug,
    shortDescription: dbProduct.short_description,
    description: dbProduct.description,
    features: dbProduct.features || [],
    specifications: dbProduct.specifications || [],
    applications: dbProduct.applications || [],
    image: dbProduct.image,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_categories (
        display_order
      )
    `)
    .eq('published', true);

  if (error || !data || data.length === 0) {
    if (error) console.error('Error fetching products:', error);
    return products;
  }

  const sortedData = [...data].sort((a, b) => {
    const categoryOrderA = a.product_categories?.display_order ?? 999;
    const categoryOrderB = b.product_categories?.display_order ?? 999;

    if (categoryOrderA !== categoryOrderB) {
      return categoryOrderA - categoryOrderB;
    }

    return (a.display_order ?? 999) - (b.display_order ?? 999);
  });

  return sortedData.map(mapDBProductToProduct);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error('Error fetching product:', error);
    return products.find(p => p.slug === slug) ?? null;
  }

  return mapDBProductToProduct(data);
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Corrugated boxes',
    slug: 'Corrugated boxes',
    shortDescription: 'Versatile and secure boxes perfect for retail packaging and product display.',
    description: 'Our Corrugated End Boxes combine durability with crystal-clear visibility, making them ideal for showcasing your products while providing secure closure. These boxes feature convenient tuck-end flaps for easy assembly and reliable protection.',
    features: [
      'Crystal-clear material for maximum product visibility',
      'Secure tuck-end closure mechanism',
      'Easy to assemble without tools or adhesive',
      'Available in multiple sizes and thicknesses',
      'Excellent for retail display and gift packaging',
      'Recyclable and eco-friendly material'
    ],
    specifications: [
      { label: 'Material', value: 'Premium PET/APET' },
      { label: 'Thickness', value: '0.3mm - 0.5mm' },
      { label: 'Finish', value: 'Crystal Clear' },
      { label: 'Customization', value: 'Size, printing available' },
      { label: 'Minimum Order', value: '1000 units' }
    ],
    applications: [
      'Cosmetics and beauty products',
      'Confectionery and food items',
      'Toys and collectibles',
      'Electronics accessories',
      'Gift packaging'
    ],
    image: 'https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg'
  },
  {
    id: '2',
    name: 'Mono Boxes',
    slug: 'mono-carton-box',
    shortDescription: 'Elegant curved design perfect for small gifts, favors, and premium product packaging.',
    description: 'Mono Boxes offer a unique and attractive packaging solution with their distinctive curved shape. These boxes are perfect for creating memorable unboxing experiences while maintaining product visibility.',
    features: [
      'Distinctive pillow-shaped design',
      'Easy snap-close assembly',
      'Perfect for gift packaging and party favors',
      'Transparent material showcases contents beautifully',
      'Available in various sizes',
      'Lightweight yet sturdy construction'
    ],
    specifications: [
      { label: 'Material', value: 'Clear PET' },
      { label: 'Thickness', value: '0.35mm - 0.4mm' },
      { label: 'Finish', value: 'High Clarity' },
      { label: 'Customization', value: 'Size, color tinting available' },
      { label: 'Minimum Order', value: '500 units' }
    ],
    applications: [
      'Wedding and party favors',
      'Jewelry and accessories',
      'Small confectionery items',
      'Sample products',
      'Promotional items'
    ],
    image: 'https://images.pexels.com/photos/5706281/pexels-photo-5706281.jpeg'
  },
  {
    id: '3',
    name: 'Premium Boxes',
    slug: 'Premium Boxes',
    shortDescription: 'Fully customizable boxes with high-quality printing for brand recognition.',
    description: 'Elevate your brand with our Customized Premium Boxes. Featuring high-resolution printing capabilities, these boxes combine with custom branding to create stunning packaging solutions.',
    features: [
      'Full-color custom printing options',
      'Combine transparency with branded elements',
      'UV-resistant inks for long-lasting quality',
      'Multiple design layouts supported',
      'White, metallic, or transparent printing available',
      'Perfect for brand differentiation'
    ],
    specifications: [
      { label: 'Material', value: 'Premium APET/PET' },
      { label: 'Thickness', value: '0.3mm - 0.6mm' },
      { label: 'Printing', value: 'Offset/Screen printing' },
      { label: 'Customization', value: 'Full custom design' },
      { label: 'Minimum Order', value: '2000 units' }
    ],
    applications: [
      'Branded product packaging',
      'Retail merchandise',
      'Corporate gifts',
      'Premium consumer goods',
      'Event merchandise'
    ],
    image: 'https://images.pexels.com/photos/4792513/pexels-photo-4792513.jpeg'
  },
  {
    id: '4',
    name: 'Clear Tubes',
    slug: 'clear-tubes',
    shortDescription: 'Cylindrical packaging ideal for rolled products, posters, and unique items.',
    description: 'Our Clear Tubes provide 360-degree product visibility in a sleek cylindrical format. These tubes are perfect for packaging rolled items, elongated products, or creating unique packaging presentations.',
    features: [
      'Complete 360-degree visibility',
      'Secure end-cap closures',
      'Various diameter and length options',
      'Crush-resistant construction',
      'Ideal for rolled and cylindrical products',
      'Can be customized with labels or printing'
    ],
    specifications: [
      { label: 'Material', value: 'Clear PET' },
      { label: 'Thickness', value: '0.4mm - 0.5mm' },
      { label: 'Diameter', value: '30mm - 200mm' },
      { label: 'Customization', value: 'Length, end caps, labeling' },
      { label: 'Minimum Order', value: '1000 units' }
    ],
    applications: [
      'Posters and prints',
      'Bottles and cylindrical products',
      'Candles',
      'Textiles and fabrics',
      'Documents and certificates'
    ],
    image: 'https://images.pexels.com/photos/8251829/pexels-photo-8251829.jpeg'
  },
  {
    id: '5',
    name: 'Display Boxes',
    slug: 'display-boxes',
    shortDescription: 'Premium display packaging with superior clarity for retail and exhibition use.',
    description: 'Display Boxes are designed specifically for retail environments and exhibitions where product presentation is paramount. These boxes offer exceptional clarity and sturdy construction to showcase your products in the best light.',
    features: [
      'Ultra-clear material for maximum visibility',
      'Rigid construction for stable display',
      'Multiple opening styles available',
      'Stackable design for efficient storage',
      'Scratch-resistant coating option',
      'Professional appearance for retail settings'
    ],
    specifications: [
      { label: 'Material', value: 'Premium APET' },
      { label: 'Thickness', value: '0.5mm - 0.8mm' },
      { label: 'Finish', value: 'Ultra Clear/Anti-glare' },
      { label: 'Customization', value: 'Size, insert cards, printing' },
      { label: 'Minimum Order', value: '1500 units' }
    ],
    applications: [
      'Retail product display',
      'Collectibles and figurines',
      'Electronics and gadgets',
      'Trade show exhibits',
      'Museum and gallery items'
    ],
    image: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
