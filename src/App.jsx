import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails';
import ReviewsPage from './pages/ReviewsPage';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:productSlug" element={<ProductDetails />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

