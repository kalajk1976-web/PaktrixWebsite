import { Package, Shield, Leaf, Truck, Award, Palette, DollarSign, Clock } from 'lucide-react';

interface WhyChooseUsProps {
  title: string;
  subtitle: string;
}

export default function WhyChooseUs({ title, subtitle }: WhyChooseUsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">ISO Certification</h3>
            <p className="text-gray-600">ISO certified manufacturing facilities ensuring top quality</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Palette className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Custom Design</h3>
            <p className="text-gray-600">Tailored design and printing capabilities for your brand</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Leaf className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Sustainability</h3>
            <p className="text-gray-600">Eco-conscious packaging solutions for a better tomorrow</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assurance</h3>
            <p className="text-gray-600">Premium materials meeting international standards</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Competitive Pricing</h3>
            <p className="text-gray-600">Best value for bulk orders and long-term partnerships</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Clock className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Turnaround</h3>
            <p className="text-gray-600">Quick production and delivery times for urgent needs</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Truck className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Shipping</h3>
            <p className="text-gray-600">Efficient logistics and global shipping capabilities</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Package className="h-8 w-8 text-brand-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Trust & Reliability</h3>
            <p className="text-gray-600">Consistent quality and on-time delivery for your business needs</p>
          </div>
        </div>
      </div>
    </section>
  );
}
