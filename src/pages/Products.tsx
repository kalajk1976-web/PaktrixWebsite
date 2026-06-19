import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchProducts, Product } from '../lib/products';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setIsLoading(false);
  };

  return (
    <div>
      <Helmet>
        <title>Custom Printed Packaging Boxes & Printing Solutions India</title>
        <meta name="description" content="Explore custom printed packaging boxes and custom printing and packaging solutions at Paktrix for premium, durable, and branded packaging needs." />
      </Helmet>
      <section className="bg-gradient-to-b from-brand-green to-brand-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Premium Custom Printed Packaging Boxes for Every Business</h1>
          <p className="text-xl text-green-50 max-w-3xl">
            Packaging plays a major role in building brand identity and creating a memorable customer experience. At Paktrix, we provide high-quality custom printed packaging solutions designed to enhance product presentation and strengthen your brand presence in the market.
          </p>
          <p className="text-xl text-green-50 max-w-3xl mt-2">
            From retail products to eCommerce shipments, our custom packaging boxes are manufactured with precision, durability, and premium printing quality to meet modern business requirements.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading products...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-brand-green px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-brand-green font-semibold">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We offer fully customized packaging solutions tailored to your specific requirements
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-teal transition-colors"
          >
            Request a Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
