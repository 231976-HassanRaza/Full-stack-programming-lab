import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

function Navbar() {
  var location = useLocation();
  var pathname = location.pathname;

  var links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '2px solid #e0e0e0',
      padding: '0px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      flexWrap: 'wrap',
    }}>
      <div style={{
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#185FA5',
        padding: '14px 0px',
        marginRight: '16px',
      }}>
        ReactStore
      </div>

      {links.map(function(l) {
        var isActive = pathname === l.to;
        return (
          <Link
            key={l.to}
            to={l.to}
            style={{
              padding: '14px 14px',
              fontSize: '13px',
              fontWeight: '500',
              textDecoration: 'none',
              color: isActive ? '#185FA5' : '#555555',
              borderBottom: isActive ? '3px solid #185FA5' : '3px solid transparent',
              transition: 'color 0.2s',
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AppLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f7fa',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
