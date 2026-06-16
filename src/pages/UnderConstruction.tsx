import logo from '../assets/PAKTRIX_LOGO_FINAL.24b3cb81231aaa0419f0_(1).jpg';

export default function UnderConstruction() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #fefde8 0%, #fef9c3 50%, #fef3c7 100%)' }}
    >
      <div className="flex flex-col items-center gap-8 max-w-xl w-full text-center">
        {/* Logo */}
        <div className="bg-white rounded-2xl shadow-md px-10 py-6">
          <img src={logo} alt="Paktrix" className="h-16 object-contain" />
        </div>

        {/* Construction icon */}
        <span className="text-6xl select-none" role="img" aria-label="Under construction">
          🚧
        </span>

        {/* Heading */}
        <h1 className="text-5xl font-black tracking-tight text-gray-900">
          Under Maintenance
        </h1>

        {/* Body */}
        <p className="text-gray-600 text-lg leading-relaxed">
          We're currently working on improvements to bring you a better experience.
          Our website will be back up shortly. Thank you for your patience.
        </p>

        {/* CTA button */}
        <button
          className="px-10 py-4 rounded-full text-white font-semibold text-lg shadow-md cursor-default select-none"
          style={{ background: '#f5a623' }}
        >
          Coming Back Soon
        </button>

        {/* Contact line */}
        <p className="text-gray-500 text-sm">
          For urgent inquiries, reach us at{' '}
          <a
            href="mailto:info@paktrix.com"
            className="font-semibold text-blue-600 hover:underline"
          >
            info@paktrix.com
          </a>
        </p>
      </div>
    </div>
  );
}
