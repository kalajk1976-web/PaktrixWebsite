import { Shield, Award, CheckCircle } from 'lucide-react';
import brgsLogo from '../assets/WhatsApp_Image_2026-03-13_at_12.31.09.jpeg';
import excellencelogo from "../assets/excellence.png";
import fscLogo from '../assets/fscLogo.jpg';
export default function Certifications() {
  const certifications = [
    {
      icon: Shield,
      title: 'ISO 9001:2015',
      description: 'Quality Management Systems',
      details: 'Certified for maintaining consistent quality standards in all our manufacturing processes and service delivery.'
    },
    {
      image: brgsLogo,
      title: 'BRGS Food Packaging',
      description: 'Food Contact Safety Certification',
      details: 'Certified for food packaging safety standards, ensuring our materials meet the highest requirements for food contact applications.'
    },
    {
      image: fscLogo,
      title: 'FSC Certified',
      description: 'Food Safety Certified',
      details: 'FSC (Food Safety Certified) certified packaging solutions ensuring safe, hygienic and compliant packaging for food-grade applications.'
    }
  ];

  const qualityProcesses = [
    {
      title: 'Raw Material Inspection',
      description: 'Rigorous testing of all incoming materials to ensure they meet our stringent quality standards before production.'
    },
    {
      title: 'In-Process Quality Control',
      description: 'Continuous monitoring and inspection at every stage of the manufacturing process to maintain consistency.'
    },
    {
      title: 'Final Product Testing',
      description: 'Comprehensive testing of finished products including dimensional accuracy, clarity, and durability checks.'
    },
    {
      title: 'Documentation & Traceability',
      description: 'Complete documentation of every batch with full traceability from raw materials to finished products.'
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-green to-brand-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Certification & Quality</h1>
          <p className="text-xl text-green-50 max-w-3xl">
            Committed to excellence through internationally recognized standards and rigorous quality control
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Certifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-recognized certifications that demonstrate our commitment to quality, safety, and sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {certifications.slice(0, 2).map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {cert.icon ? (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-lg">
                        <cert.icon className="h-8 w-8 text-white" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg border-2 border-gray-200">
                        <img src={cert.image} alt={cert.title} className="w-14 h-14 object-contain" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-brand-green font-medium mb-3">{cert.description}</p>
                    <p className="text-gray-600 leading-relaxed">{cert.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            {certifications.slice(2).map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow w-full md:w-1/2"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {cert.icon ? (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-lg">
                        <cert.icon className="h-8 w-8 text-white" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg border-2 border-gray-200">
                        <img src={cert.image} alt={cert.title} className="w-14 h-14 object-contain" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-brand-green font-medium mb-3">{cert.description}</p>
                    <p className="text-gray-600 leading-relaxed">{cert.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green rounded-full mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quality Assurance Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive quality control system ensures every product meets the highest standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {qualityProcesses.map((process, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-[brand-teal] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {process.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={excellencelogo}
                alt="Quality Control"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Commitment to Excellence
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  At PAKTRIX, quality is not just a goal – it's our foundation. Every product that leaves
                  our facility represents our commitment to excellence and our promise to our clients.
                </p>
                <p>
                  Our quality management system encompasses every aspect of our operations, from supplier
                  selection and material procurement to manufacturing, testing, and final delivery.
                </p>
                <p>
                  We continuously invest in training our team, upgrading our equipment, and refining our
                  processes to stay ahead of industry standards and exceed customer expectations.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-brand-green mb-2">100%</div>
                  <div className="text-gray-600">Quality Inspected</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-green mb-2">99.8%</div>
                  <div className="text-gray-600">Pass Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Material Safety & Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Standards</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>RoHS compliant materials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>REACH regulation compliance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>BPA-free formulations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Recyclable PET/APET materials</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing Capabilities</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Material composition analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Mechanical strength testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Environmental stress testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[brand-teal] mr-3 flex-shrink-0 mt-0.5" />
                    <span>Migration and safety testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
