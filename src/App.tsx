import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Certifications from './pages/Certifications';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import IndustryDetail from './pages/IndustryDetail';
import UnderConstruction from './pages/UnderConstruction';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminHeroSections from './pages/admin/AdminHeroSections';
import AdminContactRequests from './pages/admin/AdminContactRequests';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AdminProvider } from './contexts/AdminContext';

// Set to false to restore the full website
const UNDER_CONSTRUCTION = false;

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={UNDER_CONSTRUCTION ? <UnderConstruction /> : <Layout />}>
            {!UNDER_CONSTRUCTION && (
              <>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:slug" element={<ProductDetail />} />
                <Route path="industry/:slug" element={<IndustryDetail />} />
                <Route path="service-packaging" element={<Services />} />
                <Route path="certifications" element={<Certifications />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="contact" element={<Contact />} />
              </>
            )}
          </Route>
          {UNDER_CONSTRUCTION && (
            <>
              <Route path="/about" element={<UnderConstruction />} />
              <Route path="/products" element={<UnderConstruction />} />
              <Route path="/products/:slug" element={<UnderConstruction />} />
              <Route path="/services" element={<UnderConstruction />} />
              <Route path="/certifications" element={<UnderConstruction />} />
              <Route path="/blog" element={<UnderConstruction />} />
              <Route path="/blog/:slug" element={<UnderConstruction />} />
              <Route path="/contact" element={<UnderConstruction />} />
            </>
          )}

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminCategories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/hero-sections"
            element={
              <ProtectedRoute>
                <AdminHeroSections />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact-requests"
            element={
              <ProtectedRoute>
                <AdminContactRequests />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
