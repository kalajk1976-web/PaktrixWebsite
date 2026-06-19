import { Target, Eye, Award, Users, Globe, TrendingUp } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About Paktrix | Leading Packaging Solutions Company in India</title>
        <meta name="description" content="Learn about Paktrix, a trusted packaging solutions company offering innovative, sustainable, and premium packaging services for brands across multiple industries in India." />
      </Helmet>
      <section className="bg-gradient-to-b from-brand-green to-brand-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About PAKTRIX</h1>
          <p className="text-xl text-green-50 max-w-3xl">
            Leading the way in sustainable packaging solutions for businesses worldwide
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With more than 15 years of industry experience, PAKTRIX has established itself as a reliable name in the packaging sector, delivering high-quality and customized packaging solutions to businesses across various industries. Our expertise lies in creating packaging that not only protects products but also enhances brand presentation and customer experience.
                </p>
                <p>
                  We work with premium-grade paper and materials sourced from some of the most trusted paper mills in India, ensuring superior quality, durability, and finishing in every packaging product we manufacture. Our strong manufacturing capabilities, combined with an extensive supplier and partner network, allow us to offer a wide range of packaging solutions under one roof while maintaining consistency, efficiency, and timely delivery.
                </p>
                <p>
                  At PAKTRIX, we believe packaging should reflect the identity and value of a brand. That’s why we focus on delivering tailor-made packaging solutions designed around the unique requirements of each client. From startups to established enterprises, we collaborate closely with businesses to create packaging that aligns with their vision and market goals.
                </p>
                <p>
                  Our commitment goes beyond manufacturing. We prioritize transparent communication, dependable service, and long-term client relationships. Supported by a responsive customer support team and a passion for innovation, PAKTRIX continues to help brands transform their packaging ideas into impactful solutions.
                </p>
                {/* <p>
                  Our dedicated customer care team is always ready to respond with clarity, speed, and genuine support—because we don’t just deliver boxes; we build long-term relationships based on trust, transparency, and service.
                </p>
                <p>
                Choose PAKTRIX-where experience meets innovation, and your packaging vision becomes reality.
                </p> */}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg"
                alt="Manufacturing Facility"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-green-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <Target className="h-10 w-10 text-brand-green mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to deliver innovative, sustainable, and high-quality packaging solutions that help businesses enhance their brand value and product presentation. We aim to provide complete packaging solutions under one roof while building long-term partnerships through reliability, customization, and exceptional service.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <Eye className="h-10 w-10 text-brand-green mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our vision is to become a trusted leader in the packaging industry by setting new benchmarks in quality, innovation, sustainability, and customer convenience. We strive to create packaging solutions that combine functionality, aesthetics, and responsible co-manufacturing while offering complete packaging solutions under one roof for businesses worldwide.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Excellence</h3>
                <p className="text-gray-600">
                  We never compromise on quality, ensuring every product meets the highest international
                  standards and exceeds customer expectations.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We build lasting relationships through
                  transparency, reliability, and exceptional service.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to environmental responsibility, using recyclable materials and sustainable
                  practices throughout our manufacturing process.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously invest in research and development to bring cutting-edge packaging
                  solutions to our clients.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
                <p className="text-gray-600">
                  Honesty and transparency guide our business practices, building trust with every interaction
                  and transaction.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
                <p className="text-gray-600">
                  We believe in the power of partnership, working closely with clients to deliver
                  customized solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-brand-green to-brand-teal rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Partner With Us
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses worldwide who trust PAKTRIX for their packaging needs
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-brand-green rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
