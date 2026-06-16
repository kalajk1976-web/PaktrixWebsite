import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { Package, FolderOpen, LogOut, LayoutDashboard, Image, Mail, FileText } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { path: '/admin/blogs', icon: FileText, label: 'Blog Posts' },
    { path: '/admin/hero-sections', icon: Image, label: 'Hero Sections' },
    { path: '/admin/contact-requests', icon: Mail, label: 'Contact Requests' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-gray-900 min-h-screen text-white">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Package className="h-8 w-8 text-[#10a5a4]" />
              <span className="text-xl font-bold">PAKTRIX Admin</span>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-brand-green text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
            <div className="mb-4">
              <p className="text-sm text-gray-400">Logged in as</p>
              <p className="font-semibold">{user?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
